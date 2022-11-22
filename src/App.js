import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Cell from './Components/Cell/Cell';
import './App.css';

function App() {
  const e = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [grid, setGrid] = useState(e);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (change, i, j) => {
    const gridCopy = JSON.parse(JSON.stringify(grid));
    gridCopy[i][j] = change;
    setGrid(gridCopy);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <Navbar
          grid={grid}
          setGrid={setGrid}
          e={e}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {!isLoading && (
          <>
            <div className='board'>
              {grid.map((cellrow, i) => {
                return cellrow.map((cell, j) => {
                  return (
                    <Cell
                      onChange={onChangeHandler}
                      key={`${i}+${j}`}
                      data={cell}
                      i={i}
                      j={j}
                    />
                  );
                });
              })}
            </div>
          </>
        )}
        {isLoading && <h1>Loading...</h1>}
      </header>
    </div>
  );
}

export default App;
