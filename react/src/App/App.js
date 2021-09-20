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
import { battleshipsConfig, battleshipsNames, isValidPosition, rotation } from '../constants/battleships';
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


  const battleshipDragging= useRef(null)
  //   // board: [],
  //   // hover: null,
  //   // container: battleshipsNames,
  //   dragging: null
  // }) // TODO: Remember to use battleships config in constants

  const [battleshipHover, setBattleshipHover] = useState(null)
  const [battleshipBoard, setBattleshipBoard] = useState([])
  const [battleshipContainer, setBattleshipContainer] = useState(battleshipsNames)

  function setDragging(battleship){ // if dragging is null, set the position of the battleship
    // battleshipPositions.current.dragging = battleship
    // console.log("setDragging", battleshipPositions)

    if(battleship){
      battleshipDragging.current = battleship
    } else {
      battleshipDragging.current = null
      // setBattleshipBoard(prev => [...prev, battleshipHover]) // TODO: This seemed to be causing an issue with two battleships being created in the same position but delayed until after a dragged battleship moved back.
      // setBattleshipHover(null)
    }
    console.log("setDragging", battleshipDragging.current)
  }
  function setDraggingBoard(battleship){
    if(battleship){
      battleshipDragging.current = battleship
    } else {
      battleshipDragging.current = null
    }
    console.log("removing", battleshipBoard)
    setBattleshipBoard((prev) => {
      const index = prev.findIndex(element => element.battleship == battleship)
      console.log(index, "index", battleship)
        if(index > -1){
          prev.splice(index, 1)
        }
      return prev
    }) // TODO: Remove battleship from battleshipBoard
  }
  function addBattleship(x,y,hover){ // TODO: if this is a hover it is not permanent
    const battleship = battleshipDragging.current
    if(hover){
      // battleshipPositions.current.hover = {x,y, battleship}
      const setTo = {x,y,battleship}
      if(battleshipHover != setTo){ // TODO: should prevent multiple rerenders when hovering on the same square position
        console.log("!=", setTo, battleshipHover)
        setBattleshipHover(setTo)
      }
    } else {
      // battleshipPositions.current.board.push({x,y, battleship})
      // battleshipPositions.current.hover = null
      const validMove = isValidPosition(rotationRef.current ? x : y, battleshipsConfig[battleship])
      console.log(validMove, rotationRef.current)
      
      setBattleshipHover(null)
      
      if(validMove){
        setBattleshipBoard((prev) => [{x,y,battleship, savedRotation:rotationRef.current}, ...prev])

        console.log("🙉 Set battleship not hover", battleship, rotationRef.current)
        setBattleshipContainer(prev => {
          // if()
          const index = prev.indexOf(battleship)
          if(index > -1){
            prev.splice(index, 1)
          }
          console.log(battleship, prev, "checking")
          // return prev.splice(prev.indexOf(battleship), 1)
          return prev
        })
      } else {
        console.log("invalid move")
      }

    } 
    console.log(battleshipDragging.current)
  }
  
  const [battleshipRotation, setBattleshipRotation] = useState(rotation.horizontal)
  const rotationRef = useRef(battleshipRotation)

  useEffect(() => {
    rotationRef.current = battleshipRotation;
    console.log(rotationRef, "changed 🐯")
  }, [battleshipRotation])

  function toggleRotation(){
    setBattleshipRotation(prev => !prev)
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
            rotation={battleshipRotation}
            addBattleship={addBattleship}
            setDragging={setDraggingBoard}
            battleshipTemp={battleshipHover}
            battleshipBoard={battleshipBoard}
          />
        </TileContainer>
        {/* <p>Opponent</p>
        <GameBoard
          rows={rows}
          cols={cols}
          spacing={spacing}
          boardSize={gridSize}
        /> */}
        <button onClick={toggleRotation}>Rotate</button>
        <BattleshipContainer rotation={battleshipRotation} setDragging={setDragging} battleships={battleshipContainer}></BattleshipContainer>
      </div>
      {/* <div onDragOver={() => console.log("hover")} onDrop={()=> console.log("drop")}>
        test
      </div> */}
    </ThemeProvider>
  );
}

export default App;
