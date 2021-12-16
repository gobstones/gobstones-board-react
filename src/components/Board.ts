import { CellInfo, CellLocation } from "@gobstones/gobstones-gbb-parser";

export class Board {
  cells: CellInfo[][];

  constructor(
    columnsQuantity: number,
    rowsQuantity: number,
    boardInfo: CellInfo[][] | undefined
  ) {
    this.cells = boardInfo
      ? boardInfo
      : Board.initializeMatrix(columnsQuantity, rowsQuantity);
  }

  getCell([x, y]: CellLocation): CellInfo {
    return this.cells[x][y];
  }

  getColumnsQuantity(): number {
    return this.cells.length;
  }

  getRowsQuantity(): number {
    return this.cells[0].length;
  }

  addColumn(): Board {
    this.cells.push(new Array(this.getRowsQuantity()));
    for (let i = 0; i < this.getRowsQuantity(); i++) {
      this.cells[this.cells.length - 1][i] = { a: 0, r: 0, v: 0, n: 0 };
    }
    return this;
  }

  removeColumn(): Board {
    this.cells.pop();
    return this;
  }

  addRow(): Board {
    for (let i = 0; i < this.getColumnsQuantity(); i++) {
      this.cells[i].push({ a: 0, r: 0, v: 0, n: 0 });
    }
    return this;
  }

  removeRow(): Board {
    for (let i = 0; i < this.getColumnsQuantity(); i++) {
      this.cells[i].pop();
    }
    return this;
  }

  setColumnsQuantity(n: number): Board {
    const diff = n - this.getColumnsQuantity();
    return diff > 0 ? this.addColumns(diff) : this.removeColumns(-diff);
  }

  addColumns(x: number): Board {
    for (let i = 0; i < x; i++) {
      this.addColumn();
    }
    return this;
  }

  private removeColumns(x: number): Board {
    for (let i = 0; i < x; i++) {
      this.removeColumn();
    }
    return this;
  }

  setRowsQuantity(x: number): Board {
    const diff = x - this.getRowsQuantity();
    return diff > 0 ? this.addRows(diff) : this.removeRows(-diff);
  }

  private addRows(x: number) {
    for (let i = 0; i < x; i++) {
      this.addRow();
    }
    return this;
  }

  private removeRows(x: number): Board {
    for (let i = 0; i < x; i++) {
      this.removeRow();
    }
    return this;
  }

  removeNBlueAt(_c: CellLocation, _n: number): Board {
    throw new Error("Abstract Method. Subclass responsibility");
  }

  removeNBlackAt(_c: CellLocation, _n: number): Board {
    throw new Error("Abstract Method. Subclass responsibility");
  }

  removeNRedAt(_c: CellLocation, _n: number): Board {
    throw new Error("Abstract Method. Subclass responsibility");
  }

  removeNGreenAt(_c: CellLocation, _n: number): Board {
    throw new Error("Abstract Method. Subclass responsibility");
  }

  addNBlueAtOn(_c: CellLocation, _n: Number): Board {
    throw new Error("Abstract Method. Subclass responsibility");
  }

  addNBlackAtOn(_c: CellLocation, _n: Number): Board {
    throw new Error("Abstract Method. Subclass responsibility");
  }

  addNGreenAtOn(_c: CellLocation, _n: Number): Board {
    throw new Error("Abstract Method. Subclass responsibility");
  }

  addNRedAtOn(_c: CellLocation, _n: Number): Board {
    throw new Error("Abstract Method. Subclass responsibility");
  }

  static initializeMatrix(
    columnsQuantity: number,
    rowsQuantity: number
  ): CellInfo[][] {
    let cells: CellInfo[][] = new Array(columnsQuantity);
    for (let i = 0; i < columnsQuantity; i++) {
      cells[i] = new Array(rowsQuantity);
      for (let j = 0; j < rowsQuantity; j++) {
        cells[i][j] = { a: 0, r: 0, n: 0, v: 0 };
      }
    }
    return cells;
  }

  getCellInfo(): CellInfo[][] {
    return this.cells;
  }
}
