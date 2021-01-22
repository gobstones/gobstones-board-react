import React, {ChangeEvent} from "react";
import Cell from "./Cell";
import EditableCellManager from "./EditableCellManager";
import {StaticCellManager} from "./StaticCellManager";
import {CellManager} from "./CellManager";
import {SizeEditionModal} from "./SizeEditionModal";
import {CellInfo, GBB} from "@gobstones/gobstones-gbb-parser";

type BoardState = {
    header: CellLocation;
    cells: CellManager;
}

export type CellLocation = [number, number];

type BoardProps = {
    columnsQuantity: number,
    rowsQuantity: number,
    header: CellLocation,
    editable: boolean,
    boardInfo?: CellInfo[][]
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

const arrowImgSrc = "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-right-01-512.png";

export class BoardComponent extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            header: props.header,
            cells: props.editable ? new EditableCellManager(props.columnsQuantity, props.rowsQuantity, props.boardInfo)
                : new StaticCellManager(props.columnsQuantity, props.rowsQuantity, props.boardInfo)
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

    render(): React.ReactElement {
        return (
            <div>
                <SizeEditionModal
                    initialRows={this.state.cells.getRowsQuantity()}
                    initialColumns={this.state.cells.getColumnsQuantity()}
                    rowQuantitySetter={(x) => this.handleChangeYSize(x)}
                    columnQuantitySetter={(x) => this.handleChangeXSize(x)}
                    headSetter={(coord => this.setState({header: coord}))} initialHead={this.state.header}/>
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
                <input type='file' onChange={(e) => this.handleFileChange(e)}/>
            </div>
        );
    }

    handleRightArrowClickRight() {
        this.setState({cells: this.state.cells.addColumn()})
    }

    handleRightArrowClickLeft() {
        this.setState({cells: this.state.cells.removeColumn()})
    }

    handleTopArrowClickUp() {
        this.setState({cells: this.state.cells.removeRow()})
    }

    handleTopArrowClickDown() {
        this.setState({cells: this.state.cells.addRow()})
    }

    handleChangeXSize(n: number) {
        if (n > 0) {
            this.resetHeader();
            this.state.cells.setColumnsQuantity(n);
        }
    }

    handleChangeYSize(n: number) {
        if (n > 0) {
            this.resetHeader();
            this.state.cells.setRowsQuantity(n);
        }
    }

    resetHeader() {
        this.setState({header: [0, 0]})
    }

    renderSizePanel() {
        if (this.props.editable) {
            return (
                <div className="panel">
                    Tamaño:
                    <input className="input-size" type="number"
                           onChange={(e: any) => this.handleChangeXSize(e.target.value)}
                           value={this.state.cells.getColumnsQuantity()}/>
                    columnas x
                    <input className="input-size" type="number"
                           onChange={(e: any) => this.handleChangeYSize(e.target.value)}
                           value={this.state.cells.getRowsQuantity()}/>
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

    private mapColumnsBorder() {
        // @ts-ignore
        return [...Array(this.state.cells.getColumnsQuantity()).keys()].map(index => <td
            className={"gbs_lh gbs_lht"} key={index}> {index} </td>);
    }

    private mapRaws() {
        // @ts-ignore
        return [...Array(this.state.cells.getRowsQuantity()).keys()].reverse().map(coordY =>
            <tbody key={Math.random()}>
            <tr>
                <LeftBorder index={coordY}/>
                {this.mapColumnsContent(coordY)}
                <RightBorder index={coordY}/>
            </tr>
            </tbody>);
    }

    private mapColumnsContent(coordY: number) {
        //@ts-ignore
        return [...Array(this.state.cells.getColumnsQuantity()).keys()].map(coordX => {
            const coord: CellLocation = [coordX, coordY];
            return (
                <td key={coordX}><Cell isHeader={this.isHeader(coordX, coordY)}
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

    isHeader(x: number, y: number) {
        return x === this.state.header[0] && y === this.state.header[1]
    }

    handleKeyPressed(e: KeyboardEvent) {
        switch (e.key) {
            case "ArrowUp" :
                const newHeaderU: CellLocation = [this.state.header[0], Math.min(this.state.header[1] + 1, this.state.cells.getRowsQuantity() - 1)];
                this.setState({header: newHeaderU});
                break;
            case "ArrowDown" :
                const newHeaderD: CellLocation = [
                    this.state.header[0],
                    Math.max(this.state.header[1] - 1, 0)
                ];
                this.setState({header: newHeaderD})
                break;
            case "ArrowRight" :
                const newHeaderR: CellLocation = [
                    Math.min(this.state.header[0] + 1, this.state.cells.getColumnsQuantity() - 1),
                    this.state.header[1],
                ];
                this.setState({header: newHeaderR})
                break;
            case "ArrowLeft" :
                const newHeaderL: CellLocation = [
                    Math.max(this.state.header[0] - 1, 0),
                    this.state.header[1],
                ]
                this.setState({header: newHeaderL})
                break;
        }
    }

    private handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        const header: Coord = this.parseBoardFile(event.target.files[0]);
    }

    private parseBoardFile(file: File) {
        //@ts-ignore
        file.text().then(text => GBB.parse(text)).then(board => {
            this.setState({header: board.head, cells: new EditableCellManager(board.width, board.height, board.board)})
        });
    }
}