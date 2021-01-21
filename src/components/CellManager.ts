import {CellLocation} from "./BoardComponent";
import {CellInfo} from "@gobstones/gobstones-gbb-parser";

export class CellManager {
    cells: CellInfo[][];

    constructor(columnsQuantity: number, rowsQuantity: number, boardInfo: CellInfo[][] | undefined) {
        this.cells = boardInfo ? boardInfo : this.initializeMatrix(columnsQuantity, rowsQuantity);
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

    addColumn(): CellManager {
        this.cells.push(new Array(this.getRowsQuantity()));
        for (let i = 0; i < this.getRowsQuantity(); i++) {
            this.cells[this.cells.length - 1][i] = {a: 0, r: 0, v: 0, n: 0}
        }
        return this;
    }

    removeColumn(): CellManager {
        this.cells.pop();
        return this;
    }

    addRow(): CellManager {
        for (let i = 0; i < this.getColumnsQuantity(); i++) {
            this.cells[i].push({a: 0, r: 0, v: 0, n: 0})
        }
        return this;
    }

    removeRow(): CellManager {
        for (let i = 0; i < this.getColumnsQuantity(); i++) {
            this.cells[i].pop();
        }
        return this;
    }

    setColumnsQuantity(n: number): CellManager {
        const diff = n - this.getColumnsQuantity();
        return diff > 0 ? this.addColumns(diff) : this.removeColumns(-diff);
    }

    addColumns(x: number): CellManager {
        for (let i = 0; i < x; i++) {
            this.addColumn();
        }
        return this;
    }

    private removeColumns(x: number): CellManager {
        for (let i = 0; i < x; i++) {
            this.removeColumn();
        }
        return this;
    }

    setRowsQuantity(x: number): CellManager {
        const diff = x - this.getRowsQuantity();
        return diff > 0 ? this.addRows(diff) : this.removeRows(-diff)
    }

    private addRows(x: number) {
        for (let i = 0; i < x; i++) {
            this.addRow();
        }
        return this;
    }

    private removeRows(x: number): CellManager {
        for (let i = 0; i < x; i++) {
            this.removeRow();
        }
        return this;
    }


    removeBlueAtOn([x, y]: CellLocation): CellManager {
        throw  new Error("Abstract Method. Subclass responsibility");
    };

    removeBlackAtOn([x, y]: CellLocation): CellManager {
        throw  new Error("Abstract Method. Subclass responsibility");
    };

    removeRedAtOn([x, y]: CellLocation): CellManager {
        throw  new Error("Abstract Method. Subclass responsibility");
    };

    removeGreenAtOn([x, y]: CellLocation): CellManager {
        throw  new Error("Abstract Method. Subclass responsibility");
    };

    addNBlueAtOn([x, y]: CellLocation, n: Number): CellManager {
        throw new Error("Abstract Method. Subclass responsibility");
    }

    addNBlackAtOn([x, y]: CellLocation, n: Number): CellManager {
        throw new Error("Abstract Method. Subclass responsibility");
    }

    addNGreenAtOn([x, y]: CellLocation, n: Number): CellManager {
        throw new Error("Abstract Method. Subclass responsibility");
    }

    addNRedAtOn([x, y]: CellLocation, n: Number): CellManager {
        throw new Error("Abstract Method. Subclass responsibility");
    }

    initializeMatrix(columnsQuantity: number, rowsQuantity: number): CellInfo[][] {
        let cells: CellInfo[][] = new Array(columnsQuantity)
        for (let i = 0; i < columnsQuantity; i++) {
            cells[i] = new Array(rowsQuantity);
            for (let j = 0; j < rowsQuantity; j++) {
                cells[i][j] = {a: 0, r: 0, n: 0, v: 0}
            }
        }
        return cells;
    };
}