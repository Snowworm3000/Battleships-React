import { useRef } from "react";
import io from "socket.io-client"


function useClient() {
    const server = "localhost:5000" // TODO: Server can be removed as a parameter in io() if the socket.io server is hosted on the same server serving the react files. Otherwise, set the string to the domain or ip address of the socket.io server.
    const socket = useRef(io(server))

    let pending = true // TODO: Whether the client can make a move or not. This should be set on the server as well.

    startGame()

    function startGame(params) {
        socket.current.emit("startGame", params, response)
        console.log("start")
    }

    function response(response) {
        console.log(response, " response 🤖")
        pending = !response
    }

    function onMove(x, y) {
        console.log("move")
        socket.current.emit("move", { x, y }, response)
    }

    socket.current.on('connect', function () {
        socket.current.emit('my event', { data: 'I\'m connected!' });
    });

    return { serverMove: onMove, pending }
}

export default useClient