import React from "react";
import "./style/App.css";
import "./style/board.css";
import "./style/cell.css";
import "./style/stone.css";
import { CellInfo } from "@gobstones/gobstones-gbb-parser";
import { BoardComponent } from "./lib/BoardComponent";

const App: React.FC = () => {
  let boardInfo: CellInfo[][] = new Array(5);
  for (let i = 0; i < 5; i++) {
    boardInfo[i] = new Array(7);
    for (let j = 0; j < 7; j++) {
      boardInfo[i][j] = { a: 1, n: 0, r: 3, v: 1 };
    }
  }
  return (
    <BoardComponent
      editable={true}
      columnsQuantity={5}
      rowsQuantity={7}
      header={[2, 0]}
      boardInfo={boardInfo}
      theme="modern"
      language="es"
    />
  );
};
