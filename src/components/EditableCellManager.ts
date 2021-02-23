import {CellLocation} from "./BoardComponent";
import {Board} from "./Board";

export default class EditableCellManager extends Board {

    removeNBlueAt([x, y]: CellLocation, n: number) {
        let m: number = this.cells[x][y].a > n ? n : this.cells[x][y].a;
        this.cells[x][y].a = this.cells[x][y].a - m;
        return this;
    }

    removeNBlackAt([x, y]: CellLocation, n: number) {
        let m: number = this.cells[x][y].n > n ? n : this.cells[x][y].n;
        this.cells[x][y].n = this.cells[x][y].n - m;
        return this;
    }

    removeNRedAt([x, y]: CellLocation, n: number) {
        let m: number = this.cells[x][y].r > n ? n : this.cells[x][y].r;
        this.cells[x][y].r = this.cells[x][y].r - m;
        return this;
    }

    removeNGreenAt([x, y]: CellLocation, n: number) {
        let m: number = this.cells[x][y].v > n ? n : this.cells[x][y].v;
        this.cells[x][y].v = this.cells[x][y].v - m;
        return this;
    }

    addNBlueAtOn([x, y]: CellLocation, n: number): Board {
        this.cells[x][y].a = this.cells[x][y].a + n;
        return this;
    }

    addNBlackAtOn([x, y]: CellLocation, n: number): Board {
        this.cells[x][y].n = this.cells[x][y].n + n;
        return this;
    }

    addNGreenAtOn([x, y]: CellLocation, n: number): Board {
        this.cells[x][y].v = this.cells[x][y].v + n;
        return this;
    }

    addNRedAtOn([x, y]: CellLocation, n: number): Board {
        this.cells[x][y].r = this.cells[x][y].r + n;
        return this;
    }
}