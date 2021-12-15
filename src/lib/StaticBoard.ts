import { Board } from "./Board";
import { CellLocation } from "./BoardComponent";
import { CellInfo } from "@gobstones/gobstones-gbb-parser";

export class StaticBoard extends Board {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    columnsQuantity: number,
    rowsQuantity: number,
    boardInfo: CellInfo[][] | undefined
  ) {
    super(columnsQuantity, rowsQuantity, boardInfo);
  }

  addNBlackAtOn(_c: CellLocation, _n: number): Board {
    return this;
  }

  addNBlueAtOn(_c: CellLocation, _n: number): Board {
    return this;
  }

  addNGreenAtOn(_c: CellLocation, _n: number): Board {
    return this;
  }

  addNRedAtOn(_c: CellLocation): Board {
    return this;
  }

  removeNBlackAt(_c: CellLocation, _n: number): Board {
    return this;
  }

  removeNBlueAt(_c: CellLocation, _n: number): Board {
    return this;
  }

  removeNGreenAt(_c: CellLocation): Board {
    return this;
  }

  removeNRedAt(_c: CellLocation): Board {
    return this;
  }
}
