import React, { useState } from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';

const Square = (props) => {
   
  return (
    <button 
      className='square'
      onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  );
};

const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    const squaresCopy = [...squares];

    if (Boolean(calculateWinner(squaresCopy)) || Boolean(squaresCopy[i])) {
      return;
    }

    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  }

  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]} 
        onClickEvent={() => handleClickEvent(i)}
      />
    );
  };

  const winner = calculateWinner(squares);
  const status = winner ?
    `Winner: ${winner}` :
    `Next player: ${xIsNext ? 'X' : 'O'}`;
  
  return (
    <div>
      <div className='status'>{status}</div>
      <div className='reset-container'>
        <button className='reset' onClick={() => setSquares(initialSquares)}>Reset Game</button>
      </div>
      <div className='board-row'>
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className='game'>
      Tic-Tac-Toe
      <Board /> 
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Game />);

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}