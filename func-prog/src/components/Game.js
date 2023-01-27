import { useState } from 'react';
import Board from './Board';
import calculateWinner from './Winner';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const historyTemp = history.slice(0, stepNumber + 1);
    const currentTemp = historyTemp[historyTemp.length - 1];
    const squaresTemp = currentTemp.squares.slice();

    if (calculateWinner(squaresTemp) || squaresTemp[i]) return;
    squaresTemp[i] = xIsNext ? 'X' : 'O';

    setHistory(historyTemp.concat([{ squares: squaresTemp }]));
    setStepNumber(historyTemp.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) status = 'Winner: ' + winner;
  else status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;