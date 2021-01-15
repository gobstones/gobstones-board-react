import { CellContent } from "./Cell";

export type AttireJSON = {
    enabled : boolean,
    rules : Rule[],
    borders : Borders,
}

export type Rule = {
    when : CellContent,
    image : string,
    text?:string
}

export type Borders = {
    bottom :string,
    bottomLeft :string,
    bottomRight :string,
    left :string,
    right :string,
    top:string,
    topLeft : string,
    topRight :string,
}

export default class Attire {
    attire :AttireJSON;
    constructor(att? : AttireJSON){
        const basicAttire = {
            enabled : false,
            rules : [],
            borders : {
                bottom :"",
                bottomLeft :"",
                bottomRight :"",
                left :"",
                right :"",
                top:"",
                topLeft : "",
                topRight :"",
            },
        }
            this.attire = att? att : basicAttire;
    }

    getAttireJSON() : AttireJSON {
        return this.attire;
    }

    getAttireFor(black : number | string,blue : number | string,green :number | string,red:number | string){
        return this.getwhen(black,blue,green,red)
    }

    getwhen(black : number | string,blue : number | string,green :number | string,red:number | string){
        const rule = this.attire.rules.find( rule => this.ruleMatchWith(rule,black,blue,green,red))
        if (!rule){
            return {image:"", text:""}
        }
        return { image:rule.image,text:rule.text || "" }
    }

    ruleMatchWith(rule : Rule,black : number | string,blue : number | string,green :number | string,red:number | string){
        return this.match(rule.when.black, black) 
            && this.match(rule.when.blue, blue) 
            && this.match(rule.when.green, green) 
            && this.match(rule.when.red, red)
    }

    match(when : number | string, amount : number | string){
        return when === amount || (when === "*" && amount > 99)
    }

    getTopLeftCorner(){
        return this.attire.borders.topLeft
    }

    getTopRightCorner(){
        return this.attire.borders.topRight
    }

    getBottomRightCorner(){
        return this.attire.borders.bottomRight
    }

    getBottomLeftCorner(){
        return this.attire.borders.bottomLeft
    }

    getBottomBorder(){
        return this.attire.borders.bottom
    }

    getTopBorder(){
        return this.attire.borders.top
    }

    getLeftBorder(){
        return this.attire.borders.left
    }

    getRightBorder(){
        return this.attire.borders.right
    }
       
}