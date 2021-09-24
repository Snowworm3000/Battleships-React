import React, { useMemo, useState } from "react";
import { calcLocation, calcTileSize, createIndexArray } from "../../utils/common";
import BoardContainer from "../Battleships/BoardContainer";
import Tile from "../Tile";
import Cell from "./Cell";
import StyledGrid from "./StyledGrid";

function GameBoard({ rows, cols, spacing, boardSize, rotation, setDragging, tiles, addBattleship, battleshipTemp, battleshipBoard }) {
  const [{ width: tileWidth, height: tileHeight }, setTileSize] = useState(() =>
    calcTileSize(boardSize, rows, cols, spacing),
  );

  const Cells = useMemo(() => {
    const cells = createIndexArray(rows * cols);
    return cells.map((c) => <Cell key={c} addBattleship={addBattleship} position={c}/>);
  }, [rows, cols]);

  console.log(tiles, " tiles opponent rerender 🐧")

  return (
    <div >
      <StyledGrid
        width={boardSize}
        height={boardSize}
        rows={rows}
        cols={cols}
        spacing={spacing}>
        {Cells}
        <BoardContainer tileWidth={tileWidth} tileHeight={tileHeight} rotation={rotation} setDragging={setDragging} battleshipTemp={battleshipTemp} battleshipBoard={battleshipBoard} spacing={spacing}/>
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
    </div>
  )
}

export default React.memo(GameBoard)