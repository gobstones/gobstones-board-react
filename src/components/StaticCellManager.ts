import {CellManager} from "./CellManager";
import {CellLocation} from "./BoardComponent";
import {CellInfo} from "@gobstones/gobstones-gbb-parser";

export class StaticCellManager extends CellManager {
    constructor(columnsQuantity: number, rowsQuantity: number, boardInfo: CellInfo[][] | undefined) {
        super(columnsQuantity, rowsQuantity, boardInfo);
    }

    addBlackAtOn([x, y]: CellLocation): CellManager {
        return this;
    }

    addBlueAtOn([x, y]: CellLocation): CellManager {
        return this;
    }

    addGreenAtOn([x, y]: CellLocation): CellManager {
        return this;
    }

    addRedAtOn([x, y]: CellLocation): CellManager {
        return this;
    }

    removeBlackAtOn([x, y]: CellLocation): CellManager {
        return this;
    }

    removeBlueAtOn([x, y]: CellLocation): CellManager {
        return this;
    }

    removeGreenAtOn([x, y]: CellLocation): CellManager {
        return this;
    }

    removeRedAtOn([x, y]: CellLocation): CellManager {
        return this;
    }

}