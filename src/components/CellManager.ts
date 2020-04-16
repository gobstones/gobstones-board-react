import { CellContent } from "./Cell";
import Coord from './Coord';

type Header = {
    x: number,
    y: number,
}

export default class CellManager {
    //No olvidar resolver el tamaño
    cells : Map<string,CellContent>;
    header : Header
    constructor(header : Header){
        this.cells = new Map();
        this.header = header;
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
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).blue--
        }
    }

    removeBlackAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).black--
        }
    }

    removeRedAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).red--
        }
    }

    removeGreenAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).green--
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
    }
    
    addBlueAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).blue++
        }
        else{
            this.cells.set(this.coordToString(coord), { red: 0 , green: 0, black: 0, blue: 1})
        }
    }

    addRedAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).red++
        }
        else{
            this.cells.set(this.coordToString(coord), { red: 1 , green: 0, black: 0, blue: 0})
        }
    }

    addGreenAtOn(coord :Coord) {
        if (this.cells.has(this.coordToString(coord))) {
            // @ts-ignore
            this.cells.get(this.coordToString(coord)).green++
        }
        else{
            this.cells.set(this.coordToString(coord), { red: 0 , green: 1, black: 0, blue: 0})
        }
    }
    
}