import React from "react";
import Cell ,{ AttireContent } from "./Cell";
import CellManager from "./CellManager";
import {SizeEditionModal} from "./SizeEditionModal";
import Attire, { AttireJSON } from "./Attire";


type BoardState = {
    columnsQuantity: number;
    rowsQuantity: number;
    header: Coord;
    cells: CellManager;
    attire : Attire;

}

type Coord = {
    x: number,
    y: number,
}
type BoardProps = {
    columnsQuantity: number,
    rowsQuantity: number,
    header: Coord,
    editable: boolean,
    attire:AttireJSON
}

type BorderProps = {
    index?: number;
    attire?:string;

}

function TopLeftCorner(props : BorderProps) {
    return <td style={{backgroundImage : `url(${props.attire})`}} className={"gbs_lx gbs_top_left "}/>;
}

function TopRightCorner(props: BorderProps) {
    return <td style={{backgroundImage : `url(${props.attire})`}} className={"gbs_lx gbs_top_right"}/>;
}

function RightBorder(props: BorderProps) {
    return <td style={{backgroundImage : `url(${props.attire})`}} className="gbs_lv gbs_lvr">{props.index}</td>;
}

function LeftBorder(props: BorderProps) {
    return <td style={{backgroundImage : `url(${props.attire})`}} className="gbs_lv gbs_lvl">{props.index}</td>;
}

function BottomLeftCorner(props: BorderProps) {
    return <td style={{backgroundImage : `url(${props.attire})`}} className="gbs_lx gbs_bottom_left"/>
}

function BottomRightCorner(props: BorderProps) {
    return <td style={{backgroundImage : `url(${props.attire})`}} className="gbs_lx gbs_bottom_right"/>
}

const arrowImgSrc = "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-right-01-512.png";

export class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            columnsQuantity: props.columnsQuantity,
            rowsQuantity: props.rowsQuantity,
            header: props.header,
            cells: new CellManager(props.editable),
            attire : new Attire(this.props.attire)
        };
    }

    // Setea props por default
    static defaultProps = {
        columnsQuantity: 2,
        rowsQuantity: 2,
        header: { x:0, y:0 },
        editable: false,
        attire: new Attire().getAttireJSON()
    }


    componentDidMount() {
        document.addEventListener("keydown", e => {
            this.handleKeyPressed(e);
        });
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPressed, false);
    }

    render(): React.ReactElement {
        return (
            <div>
                <SizeEditionModal
                    initialRows={this.state.rowsQuantity}
                    initialColumns={this.state.columnsQuantity}
                    rowQuantitySetter={(x) => this.setState({rowsQuantity: x})}
                    columnQuantitySetter={(x) => this.setState({columnsQuantity: x})}
                    headSetter={(coord => this.setState({header: coord}))} initialHead={this.state.header}/>
                {this.renderSizePanel()}
                <div className="container">
                    <table className={"gbs_board board"}>
                        <tbody className={""}>
                        <tr className={""}>
                            <TopLeftCorner attire={this.state.attire.getTopLeftCorner()}/>
                            {this.mapColumnsBorder(this.state.attire.getTopBorder())}
                            <TopRightCorner attire={this.state.attire.getTopRightCorner()} />
                        </tr>
                        </tbody>
                        {this.mapRaws()}
                        <tbody>
                        <tr>
                            <BottomLeftCorner attire={this.state.attire.getBottomLeftCorner()}/>
                            {this.mapColumnsBorder(this.state.attire.getBottomBorder())}
                            <BottomRightCorner attire={this.state.attire.getBottomRightCorner()} />
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
        this.setState({columnsQuantity: this.state.columnsQuantity + 1})
    }

    handleRightArrowClickLeft() {
        if (this.state.columnsQuantity > 1) {
            this.setState({columnsQuantity: this.state.columnsQuantity - 1})
        }
    }

    handleTopArrowClickUp() {
        this.setState({rowsQuantity: this.state.rowsQuantity + 1})
    }

    handleTopArrowClickDown() {
        if (this.state.rowsQuantity > 1) {
            this.setState({rowsQuantity: this.state.rowsQuantity - 1})
        }
    }

    handleChangeXSize(e : any){
        if(parseInt(e.target.value) > 0){
            e.preventDefault()
            this.resetHeader()
            this.setState({columnsQuantity: parseInt(e.target.value)})
        }
    }

    handleChangeYSize(e: any) {
        if (parseInt(e.target.value) > 0) {
            e.preventDefault()
            this.resetHeader()
            this.setState({rowsQuantity: parseInt(e.target.value)})
        }
    }

    resetHeader() {
        this.setState({header: {x: 0, y: 0}})
    }

    renderSizePanel() {
        if (this.props.editable) {
            return (
                <div className="panel">
                    Tamaño:
                    <input className="input-size" type="number" onChange={(e: any) => this.handleChangeXSize(e)}
                           value={this.state.columnsQuantity}/>
                    columnas x
                    <input className="input-size" type="number" onChange={(e: any) => this.handleChangeYSize(e)}
                           value={this.state.rowsQuantity}/>
                    filas
                </div>
            );
        }
    }

    renderRightArrows() {
        if (this.props.editable) {
            return (
                <div>
                    <button className="right-arrow-button arrow-button"
                            onClick={() => this.handleRightArrowClickRight()}>
                        <img alt="arrow" className="arrow-img" src={arrowImgSrc}/>
                    </button>
                    <button className="arrow-button" onClick={() => this.handleRightArrowClickLeft()}>
                        <img alt="arrow" className="arrow-img arrow-img-left" src={arrowImgSrc}/>
                    </button>
                </div>
            );
        }
    }

    renderTopArrows() {
        if (this.props.editable) {
            return (
                <div className="wrapper">
                    <button className="top-arrow-button arrow-button" onClick={() => this.handleTopArrowClickDown()}>
                        <img alt="arrow" className="top-arrow-img-down arrow-img" src={arrowImgSrc}/>
                    </button>
                    <button className="top-arrow-button arrow-button" onClick={() => this.handleTopArrowClickUp()}>
                        <img alt="arrow" className="top-arrow-img-up arrow-img" src={arrowImgSrc}/>
                    </button>
                </div>
            );
        }
    }

    private mapColumnsBorder(attire:string) {
        // @ts-ignore
        return [...Array(this.state.columnsQuantity).keys()].map(index => <td
            style={{backgroundImage : `url(${attire})`}} 
            className={"gbs_lh gbs_lht"} key={index}> {index} </td>);
    }

    private mapRaws() {
        // @ts-ignore
        return [...Array(this.state.rowsQuantity).keys()].reverse().map(coordY =>
            <tbody key={Math.random()}>
            <tr>
                <LeftBorder attire={this.state.attire.getLeftBorder()} index={coordY}/>
                {this.mapColumnsContent(coordY)}
                <RightBorder attire={this.state.attire.getRightBorder()} index={coordY}/>
            </tr>
            </tbody>);
    }

    private mapColumnsContent(coordY: number) {
        //@ts-ignore
        return [...Array(this.state.columnsQuantity).keys()].map(coordX => {
            const coord = {x: coordX, y: coordY};
            return (
                <td key={coordX}><Cell isHeader={this.isHeader(coordX, coordY)}
                                       attire={this.getAttireFor(coordX,coordY)}
                                       content={this.state.cells.getCell(coord)}
                                       addBlue={() => this.setState({
                                           cells: this.state.cells.addBlueAtOn(coord)
                                       })}
                                       removeBlue={() => this.setState({
                                           cells: this.state.cells.removeBlueAtOn(coord)
                                       })}
                                       addBlack={() => this.setState({
                                           cells: this.state.cells.addBlackAtOn(coord)
                                       })}
                                       removeBlack={() => this.setState({
                                           cells: this.state.cells.removeBlackAtOn(coord)
                                       })}
                                       addGreen={() => this.setState({
                                           cells: this.state.cells.addGreenAtOn(coord)
                                       })}
                                       removeGreen={() => this.setState({
                                           cells: this.state.cells.removeGreenAtOn(coord)
                                       })}
                                       addRed={() => this.setState({
                                           cells: this.state.cells.addRedAtOn(coord)
                                       })}
                                       removeRed={() => this.setState({
                                           cells: this.state.cells.removeRedAtOn(coord)
                                       })}
                />

                </td>)
        });
    }

    getAttireFor(x: number, y: number):AttireContent{
        const cell = this.state.cells.getCell({x,y})
        const att  = this.state.attire.getAttireFor(cell.black,cell.blue,cell.green,cell.red)
        return att
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