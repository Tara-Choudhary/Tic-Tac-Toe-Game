import React, { useState } from "react";
import "./styles.css";

function Square(props) {
  // const [value, setValue] = useState(null);

  return (
    <button className="square-style" onClick={props.onClickEvent}>
      {props.value}
    </button>
  );
}

function Board() {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickeEvent = (i) => {
    const newSquares = [...squares];

    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareFilled) {
      return alert(`Game have won by Player : ${winner}`);
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClickEvent={() => handleClickeEvent(i)} />
    );
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner:${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="board-style">
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <div className="game-style">
      <div>
        Tic-Tac-Toe
        <Board />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //cols
    [0, 4, 8],
    [2, 4, 6] //diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
