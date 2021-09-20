import React, { useMemo, useState, useRef } from "react";
import { calcLocation, createIndexArray } from "../../utils/common";
import StyledGrid from "./StyledGrid";
import { calcTileSize } from "../../utils/common";
import useClickListener from "../../hooks/useClickListener";
import Tile from "../Tile";
import { useEffect } from "react";
import Box from "../Box";
import Cell from "./Cell";
import Draggable from "../Battleships/Draggable";
import BoardContainer from "../Battleships/BoardContainer";

function GameBoard({ rows, cols, spacing, boardSize, rotation, setDragging, tiles, onMove, addBattleship, battleshipTemp, battleshipBoard }) {
  const [{ width: tileWidth, height: tileHeight }, setTileSize] = useState(() =>
    calcTileSize(boardSize, rows, cols, spacing),
  );

  const Cells = useMemo(() => {
    const cells = createIndexArray(rows * cols);
    return cells.map((c) => <Cell key={c} addBattleship={addBattleship} position={c}/>);
  }, [rows, cols]);

  // const boardRef = useRef(null)
  // useClickListener(boardRef, onMove)

  function handleClick(e) {
    console.log(e, "click")
    // onMove(e)
    const rect = e.currentTarget.getBoundingClientRect()
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    console.log(x, y)
    onMove(x, y, rect.width, rect.height)
  }

  useEffect(() => {
    console.log(tiles)
    
    console.log("done")
  }, [tiles])
  console.log(tiles)


  console.log(tileWidth, tileHeight)
  return (
    <div >
      <StyledGrid onClick={handleClick}
        width={boardSize}
        height={boardSize}
        rows={rows}
        cols={cols}
        spacing={spacing}>
        {Cells}
        <BoardContainer tileWidth={tileWidth} tileHeight={tileHeight} rotation={rotation} setDragging={setDragging} battleshipTemp={battleshipTemp} battleshipBoard={battleshipBoard} spacing={spacing}/>
        {/* <Draggable x={calcLocation(tileWidth, 1, spacing)}
            y={calcLocation(tileHeight, 1, spacing)} 
            width={tileWidth*4} 
            height={tileHeight} 
            position="absolute"
            /> */}
      </StyledGrid>
      
      {/* <Box
        position="absolute"
        top={0}
        left={0}
        blockSize="100%"
        inlineSize="100%"
      > */}
      {tiles?.map(({ col, row, id, value, isMerging, isNew }) => (
          <Tile
            key={id}
            width={tileWidth}
            height={tileHeight}
            x={calcLocation(tileWidth, col, spacing)}
            y={calcLocation(tileHeight, row, spacing)}
            value={value}
            isNew={isNew}
            isMerging={isMerging}
          />
        ))}
      {/* </Box> */}


    </div>
  )
}

export default React.memo(GameBoard)