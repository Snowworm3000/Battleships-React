import { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import io from "socket.io-client"
import { battleshipsConfig, rotation } from "../constants/battleships";
import { createEmptyGrid, getRotation, movePosition, replaceWithSunkShip } from "../utils/gameLogic";


function useClient() {
    const server = "ws://localhost:5000" // TODO: Server can be removed as a parameter in io() if the socket.io server is hosted on the same server serving the react files. Otherwise, set the string to the domain or ip address of the socket.io server.
    const socket = useRef(io(server))

    const [tilesOpponent, setTilesOpponent] = useState([])
    const rows = 10
    const cols = 10
    const gridRef = useRef(createEmptyGrid(rows, cols));


    let pending = useRef(true) // TODO: Whether the client can make a move or not. This should be set on the server as well.

    // useEffect(startGame,[])
    function moveResult(gridX, gridY, hitType) {
        // debugger
        let newTiles = []
        if (hitType == "Miss" || hitType == "Hit") {
            const moveResult = movePosition(
                gridRef.current,
                gridRef,
                gridY - 1,
                gridX - 1,
                hitType
            );
            const grid = moveResult.grid
            newTiles = moveResult.tiles

            gridRef.current = grid;

        } else {
            // TODO: Replace tiles here with destroyed battleship
            const battleshipLength = battleshipsConfig[hitType]

            const from = gridX
            const to = gridY
            const shipRotation = getRotation(from, to)
            // from.x -= 1
            if(shipRotation == rotation.horizontal){
                from.y = 9 - from.y
                // to.x -= 1
                to.y = 9- to.y
            } else {
                from.y = 9 - from.y
                to.y = 9- to.y
            }
            const result = replaceWithSunkShip(gridRef.current, from, to, hitType)
            newTiles = result.tiles
            gridRef.current = result.grid

            
        }
        // pendingStackRef.current = moveStack;

        //   setMoving(true)
        // // Don't trigger upates if no movments
        // if (moveStack.length > 0) {
        //   setMoving(true);
        //   // Sort by index to persist iteration order of tiles array
        //   // so that transform animation won't be interrupted by rerending
        //   // when id is not changed.

        // const arrayToSet = [newTiles[0], ...tilesOpponent]
        // const arrayToSet = "testing"
        // setTilesOpponent(prev => [newTiles[0], ...prev]);
        setTilesOpponent(prev => newTiles)
        // setTiles(["testing", 52])


        // }
    }

    function startGame(params) {
        socket.current.emit("startGame", formatParams(params), response)
    }

    function formatParams(params) {
        const formatted = []
        for (const ship of params.battleships) {
            const coords = { x: ship.x, y: ship.y }
            const direction = ship.savedRotation ? 0 : 1
            formatted.push([ship.battleship, coords, direction])
        }
        return formatted
    }

    function response(response) {
        pending.current = (!response)
    }


    function onMove(x, y, cb) {
        socket.current.emit("move", { x, y }, function (response) {
            cb(response) // TODO: Not getting called
        })
    }

    // function responseMove(response){
    // }

    useEffect(() => {
        socket.current.on('connect', function () {
            socket.current.emit('my event', { data: 'I\'m connected!' });
        });
        socket.current.on('compMove', (response) => {
            const { location, result: hitType } = response
            // debugger
            // moveResult(location.x + 1, 10 - location.y , hitType)
            if (hitType == "Miss" || hitType == "Hit") {
                moveResult(location.x + 1, 10 - location.y, hitType)
            } else {
                moveResult(location.from, location.to, hitType) // TODO: Continue here
            }
        })
    }, [])

    // function convertResult(value){
    //     // return 9-value
    //     return value + 1
    // }


    return { serverMove: onMove, pending, startGame, tilesOpponent }
}

export default useClient