import Square from "./Square";

const Board = ({ squares, onClick }) => {
  const renderSquare = i => (
    <Square value={squares[i]} onClick={() => onClick(i)} />
  );

  const rows = [0, 1, 2].map(i => (
    <div className="board-row">
      {renderSquare(i * 3 + 0)}
      {renderSquare(i * 3 + 1)}
      {renderSquare(i * 3 + 2)}
    </div>
  ));

  return <div>{rows}</div>;
};

export default Board;




