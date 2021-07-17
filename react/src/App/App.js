import { ThemeProvider } from 'styled-components';
import GameBoard from '../components/GameBoard';
import useLocalStorage from '../hooks/useLocalStorage';
import useTheme from '../hooks/useTheme';
import { useEffect } from 'react';
import theme from '../themes/default';
import './App.css';
import useGameBoard from '../hooks/useGameBoard';
import useGameState from '../hooks/useGameState';
import React from 'react';

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

  const { tiles, onMove, onMovePending } = useGameBoard({
    rows,
    cols,
    pause,
    gameStatus,
    setGameStatus,
  });

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
        <GameBoard
          tiles={tiles}
          rows={rows}
          cols={cols}
          spacing={spacing}
          boardSize={gridSize}
          onMove={onMove}
        />
        {/* <p>Opponent</p>
        <GameBoard
          rows={rows}
          cols={cols}
          spacing={spacing}
          boardSize={gridSize}
        /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
