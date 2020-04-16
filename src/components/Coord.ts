export default class Coord {
    x : number;
    y : number;

    constructor( x : number , y : number){
        this.x = x;
        this.y = y;
    }

    equals( coord: Coord){
        return this.x === coord.x && this.y === coord.y
    }
}