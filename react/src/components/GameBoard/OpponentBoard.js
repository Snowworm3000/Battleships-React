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
import RelativeContainer from "./RelativeContainer";

function GameBoard({ rows, cols, spacing, boardSize, tiles, onMove }) {
  const [{ width: tileWidth, height: tileHeight }, setTileSize] = useState(() =>
    calcTileSize(boardSize, rows, cols, spacing),
  );

  const Cells = useMemo(() => {
    const cells = createIndexArray(rows * cols);
    return cells.map((c) => <Cell key={c} position={c}/>);
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

  return (
    <RelativeContainer>
      <StyledGrid onClick={handleClick}
        width={boardSize}
        height={boardSize}
        rows={rows}
        cols={cols}
        spacing={spacing}>
        {Cells}
      </StyledGrid>
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


    </RelativeContainer>
  )
}

export default React.memo(GameBoard)