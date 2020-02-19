import React from "react";
import Cell, {CellContent} from "./Cell";

type BoardState = {
    columnsQuantity: number;
    rowsQuantity: number;
    header: Header;
    cells: CellContent[][];
}

type Header = {
    x: number,
    y: number,
}
type BoardProps = {
    columnsQuantity: number,
    rowsQuantity: number,
    header: Header,
    editable: boolean,
}

type BorderProps = {
    index: number;
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

function BottomLeftCorner() {
    return <td className="gbs_lx gbs_bottom_left"/>
}

function BottomRightCorner() {
    return <td className="gbs_lx gbs_bottom_right"/>
}


function emptyBoard(columnsQuantity: number, rowsQuantity: number) {
    let cells = [];
    for (let i = 0; i < columnsQuantity; i++) {
        cells[i] = Array(rowsQuantity);
        for (let j = 0; j < rowsQuantity; j++) {
            cells[i][j] = {red: 0, blue: 0, green: 0, black: 0}
        }
    }
    return cells;
}

function removeBlueAtOn(coordX: number, coordY: number, cells: CellContent[][]) {
    if (cells[coordX][coordY].blue) {
        cells[coordX][coordY].blue--;
    }
    return cells;
}

function addBlackAtOn(coordX: number, coordY: number, cells: CellContent[][]) {
    cells[coordX][coordY].black++;
    return cells;
}

function removeBlackAtOn(coordX: number, coordY: number, cells: CellContent[][]) {
    if (cells[coordX][coordY].black)
        cells[coordX][coordY].black--;
    return cells;
}

function addGreenAtOn(coordX: number, coordY: number, cells: CellContent[][]) {
    cells[coordX][coordY].green++;
    return cells;
}

function addRedAtOn(coordX: number, coordY: number, cells: CellContent[][]) {
    cells[coordX][coordY].red++;
    return cells;
}

function removeGreenAtOn(coordX: number, coordY: number, cells: CellContent[][]) {
    if (cells[coordX][coordY].green)
        cells[coordX][coordY].green--;
    return cells;
}

function removeRedAtOn(coordX: number, coordY: number, cells: CellContent[][]) {
    if (cells[coordX][coordY].red)
        cells[coordX][coordY].red--;
    return cells
}

const arrowImgSrc = "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-right-01-512.png";

export class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            columnsQuantity: props.columnsQuantity,
            rowsQuantity: props.rowsQuantity,
            header: props.header,
            cells: emptyBoard(props.columnsQuantity, props.rowsQuantity)
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", e => {
            this.handleKeyPressed(e);
        });
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPressed, false);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div>
                {this.renderSizePanel()}
                <div className="container">
                    <table className={"gbs_board board"}>
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
                            <BottomLeftCorner/>
                            {this.mapColumnsBorder()}
                            <BottomRightCorner/>
                        </tr>
                        </tbody>
                    </table>
                    <div className="right-arrows">
                        {this.renderRightArrows()}
                    </div>
                    <div className="top-arrows">
                        {this.renderTopArrows()}
                    </div>
                </div>
            </div>
        );
    }

    handleRightArrowClickRight() {
        this.setState({cells: emptyBoard(this.state.columnsQuantity + 1, this.state.rowsQuantity),columnsQuantity: this.state.columnsQuantity + 1})
    }

    handleRightArrowClickLeft() {
        if(this.state.columnsQuantity > 1){
            this.setState({cells: emptyBoard(this.state.columnsQuantity - 1, this.state.rowsQuantity),columnsQuantity: this.state.columnsQuantity - 1})
        }
    }

    handleTopArrowClickUp() {
        this.setState({cells: emptyBoard(this.state.columnsQuantity, this.state.rowsQuantity +1 ), rowsQuantity: this.state.rowsQuantity + 1})
    }

    handleTopArrowClickDown() {
        if(this.state.rowsQuantity > 1){
            this.setState({cells: emptyBoard(this.state.columnsQuantity, this.state.rowsQuantity -1 ), rowsQuantity: this.state.rowsQuantity - 1})
        }
    }

    handleChangeXSize(e : any){
        if(parseInt(e.target.value) > 0){
            e.preventDefault()
            this.resetHeader()
            this.setState({cells: emptyBoard(e.target.value , this.state.rowsQuantity ), columnsQuantity: parseInt(e.target.value)})
        }
    }

    handleChangeYSize(e : any){
        if(parseInt(e.target.value) > 0){
            e.preventDefault()
            this.resetHeader()
            this.setState({cells: emptyBoard(this.state.columnsQuantity, e.target.value ), rowsQuantity: parseInt(e.target.value)})
        }
    }

    resetHeader(){
        this.setState({header : {x : 0, y : 0}})
    }

    renderSizePanel(){
        if(this.props.editable){
            return(
                <div className="panel">
                    Tamaño:
                    <input className="input-size" type="number" onChange={(e: any) => this.handleChangeXSize(e)} value={this.state.columnsQuantity} />
                    columnas x                
                    <input className="input-size" type="number" onChange={(e: any) => this.handleChangeYSize(e)} value={this.state.rowsQuantity} />
                    filas
                </div>
            );
        }
    }

    renderRightArrows(){
        if(this.props.editable){
            return(
                <div>
                    <button className="right-arrow-button arrow-button" onClick={() => this.handleRightArrowClickRight()}>
                        <img alt="arrow" className="arrow-img" src= {arrowImgSrc}/>
                    </button>
                    <button className="arrow-button" onClick={() => this.handleRightArrowClickLeft()}>
                        <img alt="arrow" className="arrow-img arrow-img-left" src= {arrowImgSrc}/>
                    </button>
                </div>
            );
        }  
    }

    renderTopArrows(){
        if(this.props.editable){
            return(
                <div className="wrapper">
                    <button className="top-arrow-button arrow-button" onClick={() => this.handleTopArrowClickDown()}>
                        <img alt="arrow" className="top-arrow-img-down arrow-img" src={arrowImgSrc}/>
                    </button>
                    <button className="top-arrow-button arrow-button" onClick={() => this.handleTopArrowClickUp()}>
                        <img alt="arrow" className="top-arrow-img-up arrow-img" src= {arrowImgSrc}/>
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

    private mapRaws() {
        // @ts-ignore
        return [...Array(this.state.rowsQuantity).keys()].reverse().map(coordY =>
            <tbody key={Math.random()}>
            <tr>
                <LeftBorder index={coordY}/>
                {this.mapColumnsContent(coordY)}
                <RightBorder index={coordY}/>
            </tr>
            </tbody>);
    }

    private mapColumnsContent(coordY: number) {
        function addBlueAtOn(coordX: number, coordY: number, cells: CellContent[][]): CellContent[][] {
            cells[coordX][coordY].blue++;
            return cells;
        }

        //@ts-ignore
        return [...Array(this.state.columnsQuantity).keys()].map(coordX =>
            <td key={coordX}><Cell isHeader={this.isHeader(coordX, coordY)}
                                   addBlue={() => this.props.editable ? this.setState({cells: addBlueAtOn(coordX, coordY, this.state.cells)}) : () => {}}
                                   content={this.state.cells[coordX][coordY]}
                                   removeBlue={() => this.props.editable ? this.setState({cells: removeBlueAtOn(coordX, coordY, this.state.cells)}) : () => {}}
                                   addBlack={() => this.props.editable ? this.setState({cells: addBlackAtOn(coordX, coordY, this.state.cells)}) : () => {}}
                                   removeBlack={() => this.props.editable ? this.setState({cells: removeBlackAtOn(coordX, coordY, this.state.cells)}) : () => {}}
                                   addGreen={() => this.props.editable ? this.setState({cells: addGreenAtOn(coordX, coordY, this.state.cells)}) : () => {}}
                                   removeGreen={() => this.props.editable ? this.setState({cells: removeGreenAtOn(coordX, coordY, this.state.cells)}) : () => {}}
                                   addRed={() => this.props.editable ? this.setState({cells: addRedAtOn(coordX, coordY, this.state.cells)}) : () => {}}
                                   removeRed={() => this.props.editable ? this.setState({cells: removeRedAtOn(coordX, coordY, this.state.cells)}) : () => {}}/>
            </td>);
    }

    isHeader(x: number, y: number) {
        return x === this.state.header.x && y === this.state.header.y
    }

    handleKeyPressed(e: KeyboardEvent) {
        switch (e.key) {
            case "ArrowUp" :
                const newHeaderU = {
                    x: this.state.header.x,
                    y: Math.min(this.state.header.y + 1, this.state.rowsQuantity - 1)
                }
                this.setState({header: newHeaderU})
                break;
            case "ArrowDown" :
                const newHeaderD = {
                    x: this.state.header.x,
                    y: Math.max(this.state.header.y - 1, 0)
                };
                this.setState({header: newHeaderD})
                break;
            case "ArrowRight" :
                const newHeaderR = {
                    x: Math.min(this.state.header.x + 1, this.state.columnsQuantity - 1),
                    y: this.state.header.y,
                };
                this.setState({header: newHeaderR})
                break;
            case "ArrowLeft" :
                const newHeaderL = {
                    x: Math.max(this.state.header.x - 1, 0),
                    y: this.state.header.y,
                }
                this.setState({header: newHeaderL})
                break;
        }
    }
}