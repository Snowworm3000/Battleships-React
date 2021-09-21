import { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import io from "socket.io-client"


function useClient() {
    const server = "localhost:5000" // TODO: Server can be removed as a parameter in io() if the socket.io server is hosted on the same server serving the react files. Otherwise, set the string to the domain or ip address of the socket.io server.
    const socket = useRef(io(server))

    console.log("reload 👽")

    let pending = useRef(true) // TODO: Whether the client can make a move or not. This should be set on the server as well.

    // useEffect(startGame,[])

    function startGame(params) {
        socket.current.emit("startGame", formatParams(params), response)
        console.log("start")
    }

    function formatParams(params){
        const formatted = []
        for(const ship of params.battleships){
            const coords = {x: ship.x, y: ship.y}
            const direction = ship.savedRotation ? 0 : 1
            formatted.push([ship.battleship, coords, direction])
        }
        return formatted
    }

    function response(response) {
        console.log(response, " response 🤖")
        pending.current = (!response)
        console.log(pending)
    }
    

    function onMove(x, y, cb) {
        console.log("move")
        socket.current.emit("move", { x, y }, function (response) {
            console.log("👺",response)
            cb(response) // TODO: Not getting called
            console.log("callback complete")
        })
    }

    // function responseMove(response){
    //     console.log("👺",response)
    // }

    socket.current.on('connect', function () {
        socket.current.emit('my event', { data: 'I\'m connected!' });
    });

    return { serverMove: onMove, pending, startGame }
}

export default useClient