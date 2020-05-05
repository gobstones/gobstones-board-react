import { CellContent } from "./Cell";

type Coord = {
    x: number,
    y: number,
}


export default class CellManager {
    cells : Map<string,CellContent>;
    update : (cm : CellManager) => void
    constructor(update : (cm : CellManager) => void){
        this.cells = new Map();
        this.update = update;
    }

    coordToString(coord : Coord){
        return ("x:" + coord.x.toString() + " - y:" + coord.y.toString())
    }

    getCell(coord : Coord) : CellContent{
        if(this.cells.has(this.coordToString(coord))){
            // @ts-ignore
            return this.cells.get(this.coordToString(coord));
        }
        else{
            return { red: 0 , green: 0, black: 0, blue: 0};
        }
    }

    removeBlueAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord)) && this.getCell(coord).blue >0) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).blue--
            this.update(this);
        }
    }

    removeBlackAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord)) && this.getCell(coord).black >0) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).black--
            this.update(this);
        }
    }

    removeRedAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord)) && this.getCell(coord).red >0) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).red--
            this.update(this);
        }
    }

    removeGreenAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord)) && this.getCell(coord).green >0) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).green--
            this.update(this);
        }
    }
    
    addBlackAtOn(coord :Coord) {
        if (!this.cells.has(this.coordToString(coord))) {
            this.cells.set(this.coordToString(coord), { red: 0 , green: 0, black: 1, blue: 0})
        }
        else{
                        // @ts-ignore
            this.cells.get(this.coordToString(coord)).black++
        }
        this.update(this);
    }
    
    addBlueAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).blue++;
        }
        else{
            this.cells.set(this.coordToString(coord), { red: 0 , green: 0, black: 0, blue: 0})
        }
        this.update(this);
    }

    addRedAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).red++
        }
        else{
            this.cells.set(this.coordToString(coord), { red: 1 , green: 0, black: 0, blue: 0})
        }
        this.update(this);
    }

    addGreenAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).green++
        }
        else{
            this.cells.set(this.coordToString(coord), { red: 0 , green: 1, black: 0, blue: 0})
        }
        this.update(this);
    }
    
}