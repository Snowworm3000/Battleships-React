import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { getId, gridPosition, nextTileIndex } from "../utils/common";
import { createEmptyGrid, movePosition, resetGameBoard } from "../utils/gameLogic";



function useGameBoard({
  rows,
  cols,
  pending,
  gameStatus,
  setGameStatus,
  serverMove
}) {
  const gridRef = useRef(createEmptyGrid(rows, cols));
  // const [grid, setGrid] = useState(createEmptyGrid(rows, cols))
  const [tiles, setTiles] = useState([]);
  const pendingStackRef = useRef([]);
  const [moving, setMoving] = useState(false);

  const onMove = useCallback((x, y, width, height) => {
    if (!pending.current) {
      const { gridX, gridY } = gridPosition(x, y, width, height, rows, cols)
      // console.log(x, y)
      // console.log(width, height)
      // console.log(rows, cols)
      console.log(tiles, "tiles")

      // let response
      serverMove(gridX -1 , gridY -1, (hitType) => moveResult(gridX, gridY, hitType))
      // console.log(response, " yay👀")

      
    }
  }, [])


  function moveResult(gridX,gridY,hitType){
    console.log(gridX - 1, gridY - 1, hitType)
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

      setMoving(true)
      // // Don't trigger upates if no movments
      // if (moveStack.length > 0) {
      //   setMoving(true);
      //   // Sort by index to persist iteration order of tiles array
      //   // so that transform animation won't be interrupted by rerending
      //   // when id is not changed.

      const arrayToSet = [newTiles[0], ...tiles]
      // const arrayToSet = "testing"
      setTiles(prev => [newTiles[0], ...prev]);
      // setTiles(["testing", 52])
      console.log(tiles, arrayToSet, "new tiles", [newTiles[0]])
      // }
  }

  const onMovePending = useCallback(() => {
    pendingStackRef.current.pop();
    setMoving(pendingStackRef.current.length > 0);
  }, []);

  // useLayoutEffect(() => {
  //   if (!moving) {
  //     const { tiles: newTiles, score, grid } = mergeAndCreateNewTiles(
  //       gridRef.current,
  //     );
  //     gridRef.current = grid;

  //     addScore(score);
  //     setTiles(sortTiles(newTiles));
  //   }
  // }, [moving, addScore]);

  // useLayoutEffect(() => {
  //   pendingRef.current = pending;
  // }, [pending]);

  useEffect(() => {
    const { grid, tiles: newTiles } = resetGameBoard(rows, cols);
    setTiles(newTiles)
    gridRef.current = grid;
    console.log("reset 😡")
    // setGameStatus('running');
  }, [rows, cols, setGameStatus]);

  useEffect(() => {
    if (gameStatus === 'restart') {
      const r = gridRef.current.length;
      const c = gridRef.current[0].length;
      const { grid } = resetGameBoard(r, c);
      console.log("restart 😡")

      gridRef.current = grid;
      // setGameStatus('running');
    }
    // } else if (gameStatus === 'running' && isWin(tiles)) {
    //   setGameStatus('win');
    // }
    // } else if (
    //   gameStatus !== 'lost' &&
    //   !canGameContinue(gridRef.current, tiles)
    // ) {
    //   setGameStatus('lost');
    // }
  }, [gameStatus, setGameStatus]);

  return { tiles, onMove };
}
export default useGameBoard