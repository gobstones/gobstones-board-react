import {Board} from "./Board";
import {CellLocation} from "./BoardComponent";
import {CellInfo} from "@gobstones/gobstones-gbb-parser";

export class StaticCellManager extends Board {
    constructor(columnsQuantity: number, rowsQuantity: number, boardInfo: CellInfo[][] | undefined) {
        super(columnsQuantity, rowsQuantity, boardInfo);
    }

    addBlackAtOn([x, y]: CellLocation): Board {
        return this;
    }

    addBlueAtOn([x, y]: CellLocation): Board {
        return this;
    }

    addGreenAtOn([x, y]: CellLocation): Board {
        return this;
    }

    addRedAtOn([x, y]: CellLocation): Board {
        return this;
    }

    removeBlackAtOn([x, y]: CellLocation): Board {
        return this;
    }

    removeBlueAtOn([x, y]: CellLocation): Board {
        return this;
    }

    removeGreenAtOn([x, y]: CellLocation): Board {
        return this;
    }

    removeRedAtOn([x, y]: CellLocation): Board {
        return this;
    }

}