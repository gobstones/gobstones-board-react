import React, {ChangeEvent} from "react";
import Cell, { AttireContent } from "./Cell";
import EditableCellManager from "./EditableCellManager";
import {StaticCellManager} from "./StaticCellManager";
import {CellManager} from "./CellManager";
import {SizeEditionModal} from "./SizeEditionModal";
import Theme, { AbstractTheme, ClassicTheme, ThemeStringType } from "./Theme";
import {CellInfo, GBB} from "@gobstones/gobstones-gbb-parser";
import Attire, { AttireJSON } from "./Attire";

type BoardState = {
    header: CellLocation;
    cells: CellManager;
    attire : Attire;
    theme : AbstractTheme;
}

export type CellLocation = [number, number];

type BoardProps = {
    columnsQuantity: number,
    rowsQuantity: number,
    header: CellLocation,
    editable: boolean,
    boardInfo?: CellInfo[][],
    attire:AttireJSON,
    theme : ThemeStringType
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

export class BoardComponent extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            header: props.header,
            cells: props.editable ? new EditableCellManager(props.columnsQuantity, props.rowsQuantity, props.boardInfo)
                : new StaticCellManager(props.columnsQuantity, props.rowsQuantity, props.boardInfo),
                attire : new Attire(this.props.attire),
                theme : new Theme().getThemeFor(this.props.theme)
        };
    }

    // Setea props por default
    static defaultProps = {
        columnsQuantity: 2,
        rowsQuantity: 2,
        header: { x:0, y:0 },
        editable: false,
        attire: new Attire().getAttireJSON(),
        theme : new ClassicTheme()
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

    private mapColumnsBorder(attire:string) {
        // @ts-ignore
        return [...Array(this.state.cells.getColumnsQuantity()).keys()].map(index => <td
            style={{backgroundImage : `url(${attire})`}}
            className={"gbs_lh gbs_lht"} key={index}> {index} </td>);
    }

    private mapRaws() {
        // @ts-ignore
        return [...Array(this.state.cells.getRowsQuantity()).keys()].reverse().map(coordY =>
            <tbody key={Math.random()}>
            <tr>
                <LeftBorder attire={this.state.attire.getLeftBorder()} index={coordY}/>
                {this.mapColumnsContent(coordY)}
                <RightBorder attire={this.state.attire.getRightBorder()} index={coordY}/>
            </tr>
            </tbody>);
    }

    private mapColumnsContent(y: number) {
        //@ts-ignore
        return [...Array(this.state.cells.getColumnsQuantity()).keys()].map(x => {
            const cellLocation: CellLocation = [x, y];
            return (
                <td key={x}><Cell isHeader={this.isHeader(x, y)}
                                  attire={this.getAttireFor(coordX,coordY)}
                                       content={this.state.cells.getCell(cellLocation)}
                                  addBlue={(e: React.MouseEvent<HTMLDivElement>) => this.handleAddBlue(cellLocation, e)}
                                  removeBlue={(e: React.MouseEvent<HTMLDivElement>) => this.handleRemoveBlue(cellLocation, e)}
                                  addBlack={(e: React.MouseEvent<HTMLDivElement>) => this.handleAddBlack(cellLocation, e)}
                                  removeBlack={(e: React.MouseEvent<HTMLDivElement>) => this.handleRemoveBlack(cellLocation, e)}
                                  addGreen={(e: React.MouseEvent<HTMLDivElement>) => this.handleAddGreen(cellLocation, e)}
                                  removeGreen={(e: React.MouseEvent<HTMLDivElement>) => this.handleRemoveGreen(cellLocation, e)}
                                  addRed={(e: React.MouseEvent<HTMLDivElement>) => this.handleAddRed(cellLocation, e)}
                                  removeRed={(e: React.MouseEvent<HTMLDivElement>) => this.handleRemoveRed(cellLocation, e)}
                />

                </td>)
        });
    }

    private handleAddBlue(cellLocation: [number, number], e: React.MouseEvent<HTMLDivElement>) {
        let n: number;
        if (e.shiftKey) {
            n = 10;
        } else {
            n = 1;
        }
        this.setState({
            cells: this.state.cells.addNBlueAtOn(cellLocation, n)
        })
    }

    private handleAddGreen(cellLocation: CellLocation, e: React.MouseEvent<HTMLDivElement>) {
        let n: number;
        if (e.shiftKey) {
            n = 10;
        } else {
            n = 1;
        }
        this.setState({
            cells: this.state.cells.addNGreenAtOn(cellLocation, n)
        })
    }

    private handleAddBlack(cellLocation: CellLocation, e: React.MouseEvent<HTMLDivElement>) {
        let n: number;
        if (e.shiftKey) {
            n = 10;
        } else {
            n = 1;
        }
        this.setState({
            cells: this.state.cells.addNBlackAtOn(cellLocation, n)
        })
    }

    getAttireFor(x: number, y: number): AttireContent{
        const cell = this.state.cells.getCell([x,y])
        const att  = this.state.attire.getAttireFor(cell.n, cell.a, cell.v, cell.r)
        return att
    }

    private handleAddRed(cellLocation: CellLocation, e: React.MouseEvent<HTMLDivElement>) {
        let n: number;
        if (e.shiftKey) {
            n = 10;
        } else {
            n = 1;
        }
        this.setState({
            cells: this.state.cells.addNRedAtOn(cellLocation, n)
        })
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

    private handleRemoveBlue(cellLocation: CellLocation, e: React.MouseEvent<HTMLDivElement>) {
        let n: number;
        if (e.shiftKey) {
            n = 10;
        } else {
            n = 1;
        }
        this.setState({
            cells: this.state.cells.removeNBlueAt(cellLocation, n)
        })
    }

    private handleRemoveBlack(cellLocation: CellLocation, e: React.MouseEvent<HTMLDivElement>) {
        let n: number;
        if (e.shiftKey) {
            n = 10;
        } else {
            n = 1;
        }
        this.setState({
            cells: this.state.cells.removeNBlackAt(cellLocation, n)
        })
    }

    private handleRemoveGreen(cellLocation: CellLocation, e: React.MouseEvent<HTMLDivElement>) {
        let n: number;
        if (e.shiftKey) {
            n = 10;
        } else {
            n = 1;
        }
        this.setState({
            cells: this.state.cells.removeNGreenAt(cellLocation, n)
        })

    }

    private handleRemoveRed(cellLocation: CellLocation, e: React.MouseEvent<HTMLDivElement>) {
        let n: number;
        if (e.shiftKey) {
            n = 10;
        } else {
            n = 1;
        }
        this.setState({
            cells: this.state.cells.removeNRedAt(cellLocation, n)
        })
    }
}