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

    addBlackAtOn([x, y]: CellLocation) {
        this.cells[x][y].n++;
        return this;
    }

    addBlueAtOn([x, y]: CellLocation) {
        this.cells[x][y].a++;
        return this;
    }

    addRedAtOn([x, y]: CellLocation) {
        this.cells[x][y].r++;
        return this;
    }

    addGreenAtOn([x, y]: CellLocation) {
        this.cells[x][y].v++;
        return this;
    }
}