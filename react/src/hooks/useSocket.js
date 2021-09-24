import { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import io from "socket.io-client"
import { createEmptyGrid, movePosition } from "../utils/gameLogic";


function useClient() {
    const server = "ws://localhost:5000" // TODO: Server can be removed as a parameter in io() if the socket.io server is hosted on the same server serving the react files. Otherwise, set the string to the domain or ip address of the socket.io server.
    const socket = useRef(io(server))

    const [tilesOpponent, setTilesOpponent] = useState([])
    const rows = 10
    const cols = 10
    const gridRef = useRef(createEmptyGrid(rows, cols));
    
    console.log("reload 👽")

    let pending = useRef(true) // TODO: Whether the client can make a move or not. This should be set on the server as well.

    // useEffect(startGame,[])
    function moveResult(gridX,gridY,hitType){
        // debugger
        console.log(gridX - 1, gridY - 1)
          const { grid, tiles: newTiles } = movePosition(
            gridRef.current,
            gridRef,
            gridY - 1,
            gridX - 1,
            hitType
          );
          gridRef.current = grid;
    
          console.log("move", grid)
          // pendingStackRef.current = moveStack;
    
        //   setMoving(true)
          // // Don't trigger upates if no movments
          // if (moveStack.length > 0) {
          //   setMoving(true);
          //   // Sort by index to persist iteration order of tiles array
          //   // so that transform animation won't be interrupted by rerending
          //   // when id is not changed.
    
          const arrayToSet = [newTiles[0], ...tilesOpponent]
          // const arrayToSet = "testing"
          setTilesOpponent(prev => [newTiles[0], ...prev]);
          // setTiles(["testing", 52])
          console.log(tilesOpponent, arrayToSet, "new tilesOpponent", [newTiles[0]])
          // }
      }

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

    useEffect(() => {
        socket.current.on('connect', function () {
            socket.current.emit('my event', { data: 'I\'m connected!' });
        });
        socket.current.on('compMove', (response) => {
            console.log("comp move", response)
            const {location, result: hitType} = response
            // debugger
            console.log(location, " loc")
            console.log(tilesOpponent, " tiles opponent 🐻")
            moveResult(location.x + 1, 10 - location.y , hitType)
            // if(hitType == "Miss" || hitType == "Hit"){
                // moveResult(location.x + 1, 10 - location.y , hitType)
            // }else{
                // console.log("🦋 destroyed")
                // moveResult(location[0][0], location)
            // }
        })
    }, [])

    // function convertResult(value){
    //     // return 9-value
    //     return value + 1
    // }
    

    return { serverMove: onMove, pending, startGame, tilesOpponent }
}

export default useClient