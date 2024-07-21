import React, { useEffect, useState } from "react";
import Cell from "../Cell";
import { CellValue, ResultType } from "../../types";
import "./index.scss";
import { checkWinner } from "../../helper";
import Modal from "../Modal";

const Board: React.FC = () => {
  const [player, setPlayer] = useState<"x" | "o">("x");
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [result, setResult] = useState<ResultType>({ winner: null, line: [] });
  const [isShowModal, setIsShowModal] = useState(false);
  const [indexJustClicked, setIndexJustClicked] = useState<number | null>(null);

  const handleClickCell = (index: number) => {
    if (result.winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === "x" ? "o" : "x");
    setIndexJustClicked(index);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setPlayer("x");
    setResult({ winner: null, line: [] });
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result.winner) {
      setResult(result);
      setIsShowModal(true);
      setIndexJustClicked(null);
    } else if (!board.includes(null)) {
      setResult({ winner: "draw", line: [] });
      setIsShowModal(true);
      setIndexJustClicked(null);
    }
  }, [board]);

  return (
    <div className="board w-75 mx-auto text-center">
      <h1 className="text-center my-5">Tic Tac Toe</h1>
      <div className="d-flex align-items-center justify-content-center">
        <div className="row w-50">
          {board.map((item, index) => (
            <div className="col-4 p-0" key={index}>
              <Cell
                value={item}
                isWinner={result.line.includes(index)}
                isJustClicked={indexJustClicked === index}
                onClick={() => handleClickCell(index)}
              />
            </div>
          ))}
        </div>
      </div>
      {result.winner && !isShowModal && (
        <button className="btn btn-primary btn-sm mt-4" onClick={handleRestart}>
          Restart
        </button>
      )}

      {isShowModal && result && (
        <Modal onClose={() => setIsShowModal(false)} onRestart={handleRestart}>
          {result.winner === "x" ? (
            <h4 className="text-center">Player X is the winner</h4>
          ) : result.winner === "draw" ? (
            <h4 className="text-center">Match is a draw!</h4>
          ) : (
            <h4 className="text-center">Player O is the winner</h4>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Board;
