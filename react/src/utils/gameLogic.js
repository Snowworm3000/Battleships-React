import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { getId, gridPosition, nextTileIndex } from "../utils/common";

export const resetGameBoard = (rows, cols) => {
    // Index restarts from 0 on reset
    // resetTileIndex();
    const grid = createEmptyGrid(rows, cols);
    const newTiles = []
    // const emptyCells = getEmptyCellsLocation(grid);
    // const newTiles = createRandomTiles(emptyCells, rows * cols >= 24 ? 4 : 2);
  
    // newTiles.forEach((tile) => {
    //   grid[tile.r][tile.c] = tile;
    // });
  
    return {
      grid,
      tiles: newTiles,
    };
  };
  
export const createNewTile = (row, col, hitType) => {
    const index = nextTileIndex();
    const id = getId(index);
    console.log("hit type", hitType, hitType == "Miss" ? 0 : 1)
    // debugger
    return {
      index,
      id,
      row,
      col,
      isNew: true,
      value: hitType == "Miss" ? 0 : 1,
    };
  };
  
export const createRow = (rows, cb) =>
    Array.from(Array(rows)).map((_, r) => cb(r));
  
export const createEmptyGrid = (rows, cols) =>
    createRow(rows, () => createRow(cols, () => undefined));
  
export const isWin = () => {
    return false
  }
  
export const types = {
    miss: 0,
    hit: 1,
    sink: 2
  }
export const hitType = (x, y) => { // TODO: Change hitType dynamically depending on the value recieved from the server
    return types.miss
  }
  
export const replaceWithSunkShip = (grid, ) => {

}
  
export const movePosition = (grid, gridRef, row, col, hitType) => {
    const newGrid = grid.slice(0);
    const totalRows = newGrid.length;
    const totalCols = newGrid[0].length;
    const tiles = [];
  
    // const tile = newGrid[row][col];
  
    
  
    // const currentTile = newGrid[row][col]
    // if (currentTile != null) {
    //   tiles.push({ ...currentTile, value: hitType(), isNew: false });
    // } else {
    //   const updatedTile = {
    //     ...tile,
    //     value: hitType(),
    //     row: row,
    //     col: col,
    //     isNew: false,
    //   };
    const newTile = createNewTile(row, col, hitType)
    console.log(newTile)
    // debugger
    console.log(row, col)
    newGrid[row][col] = newTile;
    console.log(newGrid, gridRef.current, "the grid", row, col)
  
    //   tiles.push(updatedTile);
    // }
  
    tiles.push(newTile)
    console.log(tiles, "tiles")
  
    return {
      tiles,
      grid: newGrid,
    };
  }
  