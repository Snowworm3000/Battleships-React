import { ThemeProvider } from 'styled-components';
import GameBoard from '../components/GameBoard';
import useLocalStorage from '../hooks/useLocalStorage';
import useTheme from '../hooks/useTheme';
import { useEffect, useState } from 'react';
import theme from '../themes/default';
import './App.css';
import useGameBoard from '../hooks/useGameBoard';
import useGameState from '../hooks/useGameState';
import React from 'react';
import Box from '../components/Box';
import TileContainer from '../components/TileContainer';
// import startClient from '../Api/socket';
import useClient from '../hooks/useSocket';
import Draggable from '../components/Battleships/Draggable';
import BattleshipContainer from '../components/Battleships/Container';
import { battleshipsNames } from '../constants/battleships';
import { useRef } from 'react';

function App() {
  const rows = 10
  const cols = 10
  const spacing = 5
  const gridSize = 370
  const APP_NAME = 'battleships'

  const [{ status: gameStatus, pause }, setGameStatus] = useGameState({
    status: 'running',
    pause: false,
  });

  const [config, setConfig] = useLocalStorage(APP_NAME, {
    theme: 'default',
    bestScore: 0,
    rows: rows,
    cols: cols,
  });

  const [{ name: themeName, value: themeValue }, setTheme] = useTheme(
    config.theme,
  );

  
  const {serverMove, pending} = useClient()

  const { tiles, onMove } = useGameBoard({
    rows,
    cols,
    pending,
    gameStatus,
    setGameStatus,
    serverMove
  });


  const battleshipPositions = useRef({
    // board: [],
    // hover: null,
    container: battleshipsNames,
    dragging: null
  }) // TODO: Remember to use battleships config in constants

  const [battleshipHover, setBattleshipHover] = useState(null)
  const [battleshipBoard, setBattleshipBoard] = useState([])

  function setDragging(battleship){
    battleshipPositions.current.dragging = battleship
    console.log("setDragging", battleshipPositions)
  }
  function addBattleship(x,y,hover){ // TODO: if this is a hover it is not permanent
    const battleship = battleshipPositions.current.dragging
    if(hover){
      // battleshipPositions.current.hover = {x,y, battleship}
      setBattleshipHover({x,y,battleship})
    } else {
      // battleshipPositions.current.board.push({x,y, battleship})
      // battleshipPositions.current.hover = null
      setBattleshipBoard((prev) => [{x,y,battleship}, ...prev])
      setBattleshipHover(null)
    } 
    
    console.log(battleshipPositions)
  }



  // const [rows, setRows] = useScaleControl(config.rows);
  // const [cols, setCols] = useScaleControl(config.cols);

  useEffect(() => {
    setConfig({ rows, cols, theme: themeName });
  }, [rows, cols, themeName, setConfig]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Battleships</h1>
        <p>Fleet</p>
        <TileContainer
          inlineSize={`${gridSize}px`}
        >
          <GameBoard
            tiles={tiles}
            rows={rows}
            cols={cols}
            spacing={spacing}
            boardSize={gridSize}
            onMove={onMove}
            battleships={battleshipPositions}
            addBattleship={addBattleship}
          />
        </TileContainer>
        {/* <p>Opponent</p>
        <GameBoard
          rows={rows}
          cols={cols}
          spacing={spacing}
          boardSize={gridSize}
        /> */}
        <BattleshipContainer setDragging={setDragging} battleships={battleshipPositions.container}></BattleshipContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
