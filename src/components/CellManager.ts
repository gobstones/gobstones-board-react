import {CellContent} from "./Cell";

type Coord = {
    x: number,
    y: number,
}


export default class CellManager {
    cells: Map<string, CellContent>;
    private editable: boolean;

    constructor(editable: boolean) {
        this.cells = new Map();
        this.editable = editable;
    }

    coordToString(coord: Coord) {
        return ("x:" + coord.x.toString() + " - y:" + coord.y.toString())
    }

    getCell(coord: Coord): CellContent {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            return this.cells.get(this.coordToString(coord));
        } else {
            return {red: 0, green: 0, black: 0, blue: 0};
        }
    }

    removeBlueAtOn(coord: Coord) {
        if (this.editable && this.cells.has(this.coordToString(coord)) && this.getCell(coord).blue > 0) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).blue--
        }
        return this;
    }

    removeBlackAtOn(coord: Coord) {
        if (this.editable && this.cells.has(this.coordToString(coord)) && this.getCell(coord).black > 0) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).black--
        }
        return this;
    }

    removeRedAtOn(coord: Coord) {
        if (this.editable && this.cells.has(this.coordToString(coord)) && this.getCell(coord).red > 0) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).red--
        }
        return this;
    }

    removeGreenAtOn(coord: Coord) {
        if (this.editable && this.cells.has(this.coordToString(coord)) && this.getCell(coord).green > 0) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).green--
        }
        return this;
    }

    addBlackAtOn(coord: Coord) {
        if(this.editable){
            this.initializeCellIfNeeded(coord);
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).black++
        }
        return this;
    }

    addBlueAtOn(coord: Coord) {
        if(this.editable){
            this.initializeCellIfNeeded(coord);
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).blue++;
        }
        return this;
    }

    addRedAtOn(coord: Coord) {
        if(this.editable){
            this.initializeCellIfNeeded(coord);
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).red++
        }
        return this;
    }

    addGreenAtOn(coord: Coord) {
        if(this.editable){
            this.initializeCellIfNeeded(coord);
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).green++
        }
        return this;
    }

    private initializeCellIfNeeded(coord: Coord) {
        if (!this.cells.has(this.coordToString(coord))) {
            this.cells.set(this.coordToString(coord), {red: 0, green: 0, black: 0, blue: 0})
        }
    }
}