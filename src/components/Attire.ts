export type AttireJSON = {
    enabled : boolean,
    rules : Rule[],
    borders : Borders,
}

export type CellWhenAttire = {
    red: number | string;
    green:number | string;
    black:number | string;
    blue:number | string;
}

export type Rule = {
    when : CellWhenAttire,
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

export default class Attire {
    attire :AttireJSON;
    constructor(att? : AttireJSON){
            this.attire = att ? att : basicAttire;
    }

    getAttireJSON() : AttireJSON {
        return this.attire;
    }

    getAttireFor(black : number, blue : number, green :number, red:number) {
        return this.getwhen(black,blue,green,red)
    }

    getwhen(black : number, blue : number, green :number, red:number) {
        const rule = this.attire.rules.find( rule => this.ruleMatchWith(rule,black,blue,green,red))
        if (!rule){
            return {image:"", text:""}
        }
        return { image:rule.image,text:rule.text || "" }
    }

    ruleMatchWith(rule : Rule,black : number, blue : number, green :number, red:number) {
        return this.match(rule.when.black, black) 
            && this.match(rule.when.blue, blue) 
            && this.match(rule.when.green, green) 
            && this.match(rule.when.red, red)
    }

    match(when : number | string,  amount : number) {
        return typeof when === 'number' ? when === amount : this.matchRegex(when as string, amount)
    }

    matchRegex(when :string, amount : number) {
        switch (when) {
            case "*" : return amount > 0;
            case "+" : return amount >= 0;
            default : return false;
        }

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