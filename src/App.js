import { useState } from "react";
function Sqaure({ value, OnSquareClicked }) {
  // const [value, setValue] = useState(null); // Why can't I place this in global space?
  return (
    <button className="Square" onClick={OnSquareClicked}>
      {value}
    </button>
  );
}
function Board({ xIsNext, squares, onPlay }) {
  // const [squares, setSquares] = useState(Array(9).fill(null));

  // const [XisNext, setXisNext] = useState(true);

  function handleClick(i) {
    const newSquare = squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    if (xIsNext) {
      newSquare[i] = "X";
    } else {
      newSquare[i] = "O";
    }
    // setSquares(newSquare);
    // setXisNext(!XisNext);
    onPlay(newSquare);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Next player" + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="Status">{status}</div>
      <div className="board-row">
        <Sqaure value={squares[0]} OnSquareClicked={() => handleClick(0)} />
        <Sqaure value={squares[1]} OnSquareClicked={() => handleClick(1)} />
        <Sqaure value={squares[2]} OnSquareClicked={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Sqaure value={squares[3]} OnSquareClicked={() => handleClick(3)} />
        <Sqaure value={squares[4]} OnSquareClicked={() => handleClick(4)} />
        <Sqaure value={squares[5]} OnSquareClicked={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Sqaure value={squares[6]} OnSquareClicked={() => handleClick(6)} />
        <Sqaure value={squares[7]} OnSquareClicked={() => handleClick(7)} />
        <Sqaure value={squares[8]} OnSquareClicked={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [History, setHistory] = useState([Array(9).fill(null)]);
  // const currentSquares = History[History.length - 1];
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 == 0;
  const currentSquares = History[currentMove];
  function HandlePlay(newSquare) {
    const nextHistory = [...History.slice(0, currentMove + 1), newSquare];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextmove) {
    setCurrentMove(nextmove);
  }
  const moves = History.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to the start of the game";
    }
    return (
      <>
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      </>
    );
  });

  return (
    <>
      <div className="Game">
        <div className="Game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={HandlePlay}
          />
        </div>
        <div className="Game-Info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}
