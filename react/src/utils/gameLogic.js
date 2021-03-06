import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { rotation } from "../constants/battleships";
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
  
export const getRotation = (from, to) => {
  if(from.x != to.x){
    return rotation.horizontal
  } else {
    return rotation.vertical
  }
}

export const replaceWithSunkShip = (grid, from, to, hitType) => {
  const shipRotation = getRotation(from, to)

  const newGrid = grid.slice(0);
  const totalRows = newGrid.length;
  const totalCols = newGrid[0].length;
  // const tiles = [];


  // newGrid[]

  for(let y = 0; y<10;y++){
    for(let x = 0; x<10;x++){
      // if(newGrid[y][x]){ // Check if a hit is in the location
        // if(shipRotation == rotation.horizontal){
        //   if(from.y == newGrid[i][j].y && newGrid[i][j].x >= from.x && newGrid[i][j].x <= to.x){ // Check if the location is a sunk battleship position
        //     // newGrid[i][j] = 
        //     // TODO: Set grid position to sunk
        //   }
        // } else {
        //   if(from.x == newGrid[i][j].x && newGrid[i][j].y >= from.y && newGrid[i][j].y <= to.y){
        //     // TODO: Set grid position to sunk here as well
        //   }
        // }

        if(shipRotation == rotation.horizontal){
          if(from.y == y && x >= from.x && x <= to.x){ // Check if the location is a sunk battleship position
            // newGrid[i][j] = 
            // TODO: Set grid position to sunk
            let tile = newGrid[y][x]
            if(tile){
              tile.value = 2
              newGrid[y][x] = tile
            }else{
              tile = createNewTile(y, x, "Miss")
              tile.value = 2
              newGrid[y][x] = tile
            }
          }
        } else {
          if(from.x == x && y <= from.y && y >= to.y){
            // TODO: Set grid position to sunk here as well
            let tile = newGrid[y][x]
            if(tile){
              tile.value = 2
              newGrid[y][x] = tile
            }else{
              tile = createNewTile(y, x, "Miss")
              tile.value = 2
              newGrid[y][x] = tile
            }
          }
        }
      // }
    }
  }

  const tiles = getTilesFromGrid(newGrid)

  return {tiles, grid: newGrid}

}

function getTilesFromGrid(grid){
  const tiles = []
  for(let i = 0; i<10;i++){
    for(let j = 0; j<10;j++){
      const tile = grid[i][j]
      if(tile != null){
        tiles.push(tile)
      }
    }
  }
  return tiles
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
    // debugger
    newGrid[row][col] = newTile;
  
    //   tiles.push(updatedTile);
    // }

    for(let i = 0; i<10;i++){
      for(let j = 0; j<10;j++){
        const tile = newGrid[i][j]
        if(tile != null){
          tiles.push(tile)
        }
      }
    }
  
    // tiles.push(newTile)
  
    return {
      tiles,
      grid: newGrid,
    };
  }
  