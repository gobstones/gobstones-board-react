import React from "react";
import Cell from "./Cell";

type BoardState = {
    columnsQuantity: number;
    rowsQuantity : number;
    header : Header;
}

type Header = {
    x : number,
    y : number,
}
type BoardProps = {
    columnsQuantity : number,
    rowsQuantity : number,
    header : Header,
    editable :boolean,
}

type BorderProps = {
    index :number;
}

function TopLeftCorner() {
    return <td className={"gbs_lx gbs_top_left "}/>;
}

function TopRightCorner() {
    return <td className={"gbs_lx gbs_top_right"}/>;
}

function RightBorder(props: BorderProps) {
    return <td className="gbs_lv gbs_lvr">{props.index}</td>;
}

function LeftBorder(props: BorderProps) {
    return <td className="gbs_lv gbs_lvl">{props.index}</td>;
}

function BottomLeftCorner(){
    return <td className="gbs_lx gbs_bottom_left" />
}

function BottomRightCorner(){
    return <td className="gbs_lx gbs_bottom_right" />
}


export class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            columnsQuantity: props.columnsQuantity,
            rowsQuantity : props.rowsQuantity,
            header : props.header 
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", e => {
            this.handleKeyPressed(e);
          });
    }

    componentWillUnmount(){
        document.removeEventListener("keydown",this.handleKeyPressed,false);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
        <div>
        <table  className={"gbs_board"}>
            <tbody className={""}>
            <tr className={""}>
                <TopLeftCorner/>
                {this.mapColumnsBorder()}
                <TopRightCorner/>
            </tr>
            </tbody>
              {this.mapRaws()}
            <tbody>
              <tr>
                <BottomLeftCorner />
                {this.mapColumnsBorder()}
                <BottomRightCorner />
              </tr>
            </tbody>
        </table>
        {this.renderRightArrow()}
        {this.renderBottomArrow()}
        </div>
        );
    }
    
    handleRightArrowClick(){
        this.setState({columnsQuantity : this.state.columnsQuantity + 1})
    }

    handleLeftArrowClick(){
        this.setState({rowsQuantity : this.state.rowsQuantity + 1})
    }

    renderRightArrow(){
        if(this.props.editable){
            return(
                <button className="right-arrow-button arrow-button" onClick={() => this.handleRightArrowClick()}>
                    <img alt="arrow" className="arrow-img" src= "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-right-01-512.png"/>
                </button>
            );
        }
        
    }

    renderBottomArrow(){
        if(this.props.editable){
            return(
                <div>
                    <button className="left-arrow-button arrow-button" onClick={() => this.handleLeftArrowClick()}>
                        <img alt="arrow" className="bottom-arrow-img arrow-img" src= "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-right-01-512.png"/>
                    </button>
                </div>
            );
        }
        
    }

    private mapColumnsBorder() {
        // @ts-ignore
        return [...Array(this.state.columnsQuantity).keys()].map(index => <td
            className={"gbs_lh gbs_lht"} key={index}> {index} </td>);
    }

    private mapRaws(){
        // @ts-ignore
        return [...Array(this.state.rowsQuantity).keys()].reverse().map(coordY => 
        <tbody key={Math.random()}>
          <tr>
            <LeftBorder index={coordY} />
            {this.mapColumnsContent(coordY)}
            <RightBorder index={coordY} />
          </tr>
        </tbody>);
    }

    private mapColumnsContent(coordY :number){
        //@ts-ignore
        return [...Array(this.state.columnsQuantity).keys()].map(coordX => 
        <td key={coordX}> <Cell editable={this.props.editable} isHeader={this.isHeader(coordX,coordY)}/> </td>);
    }

    isHeader(x:number, y:number){
        return x===this.state.header.x && y===this.state.header.y
    }

    handleKeyPressed(e : KeyboardEvent){
        switch(e.key){
            case "ArrowUp" : 
                const newHeaderU = {
                    x : this.state.header.x ,
                    y : Math.min(this.state.header.y +1,this.state.rowsQuantity-1)
                }
                this.setState({header : newHeaderU})
                break;
            case "ArrowDown" : 
                const newHeaderD = {
                    x : this.state.header.x ,
                    y : Math.max(this.state.header.y -1,0)
                }
                this.setState({header : newHeaderD})
                break;
            case "ArrowRight" : 
                const newHeaderR = {
                    x : Math.min(this.state.header.x +1,this.state.columnsQuantity-1),
                    y : this.state.header.y,
                }
                this.setState({header : newHeaderR})
                break;
            case "ArrowLeft" : 
                const newHeaderL = {
                    x : Math.max(this.state.header.x -1,0),
                    y : this.state.header.y,
                }
                this.setState({header : newHeaderL})
                break;
        }
    }
}