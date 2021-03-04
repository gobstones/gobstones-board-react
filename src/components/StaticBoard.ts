import {Board} from "./Board";
import {CellLocation} from "./BoardComponent";
import {CellInfo} from "@gobstones/gobstones-gbb-parser";

export class StaticBoard extends Board {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(columnsQuantity: number, rowsQuantity: number, boardInfo: CellInfo[][] | undefined) {
        super(columnsQuantity, rowsQuantity, boardInfo);
    }

    addNBlackAtOn([x, y]: CellLocation, n: number): Board {
        return this;
    }

    addNBlueAtOn([x, y]: CellLocation, n: number): Board {
        return this;
    }

    addNGreenAtOn([x, y]: CellLocation, n: number): Board {
        return this;
    }

    addNRedAtOn([x, y]: CellLocation): Board {
        return this;
    }

    removeNBlackAt([x, y]: CellLocation, n: number): Board {
        return this;
    }

    removeNBlueAt([x, y]: CellLocation, n: number): Board {
        return this;
    }

    removeNGreenAt([x, y]: CellLocation): Board {
        return this;
    }

    removeNRedAt([x, y]: CellLocation): Board {
        return this;
    }

}