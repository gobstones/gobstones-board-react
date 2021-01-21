import {CellLocation} from "./BoardComponent";
import {CellManager} from "./CellManager";

export default class EditableCellManager extends CellManager {

    removeBlueAtOn([x, y]: CellLocation) {
        if (this.cells[x][y].a > 0) {
            this.cells[x][y].a--;
        }
        return this;
    }

    removeBlackAtOn([x, y]: CellLocation) {
        if (this.cells[x][y].n > 0) {
            this.cells[x][y].n--;
        }
        return this;
    }

    removeRedAtOn([x, y]: CellLocation) {
        if (this.cells[x][y].r > 0) {
            this.cells[x][y].r--;
        }
        return this;
    }

    removeGreenAtOn([x, y]: CellLocation) {
        if (this.cells[x][y].v > 0) {
            this.cells[x][y].v--;
        }
        return this;
    }

    addNBlueAtOn([x, y]: CellLocation, n: number): CellManager {
        this.cells[x][y].a = this.cells[x][y].a + n;
        return this;
    }

    addNBlackAtOn([x, y]: CellLocation, n: number): CellManager {
        this.cells[x][y].n = this.cells[x][y].n + n;
        return this;
    }

    addNGreenAtOn([x, y]: CellLocation, n: number): CellManager {
        this.cells[x][y].v = this.cells[x][y].v + n;
        return this;
    }

    addNRedAtOn([x, y]: CellLocation, n: number): CellManager {
        this.cells[x][y].r = this.cells[x][y].r + n;
        return this;
    }
}