import React from "react";
import { CellValue } from "../../types";
import "./index.scss";

type Props = {
  value: CellValue;
  isWinner: boolean;
  isJustClicked: boolean;
  onClick: () => void;
};

const Cell: React.FC<Props> = ({ value, isWinner, isJustClicked, onClick }) => {
  const handleClick = () => {
    if (!value) {
      onClick();
    }
  };

  return (
    <div
      className={`cell border position-relative ${value ? "cursor-not-allowed" : "cursor-pointer"} ${
        isWinner && value ? `${value}Winner` : ""
      } ${isJustClicked ? "cell--just-clicked" : ""}`}
      onClick={handleClick}
    >
      {value && <div className={value === "x" ? "xPlayer" : "oPlayer"}></div>}
    </div>
  );
};

export default Cell;
