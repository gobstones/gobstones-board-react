import React from "react";
import Cell from "./Cell";

type BoardState = {
    columnsQuantity: number;
    rowsQuantity : number;
}
type BoardProps = {}

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
            columnsQuantity: 5,
            rowsQuantity : 5,
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <table className={"gbs_board"}>
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
        </table>;
    }

    private mapColumnsBorder() {
        // @ts-ignore
        return [...Array(this.state.columnsQuantity).keys()].map(index => <td
            className={"gbs_lh gbs_lht"} key={index}> {index} </td>);
    }

    private mapRaws(){
        // @ts-ignore
        return [...Array(this.state.rowsQuantity).keys()].map(index => 
        <tbody key={index}>
          <tr>
            <LeftBorder index={index} />
            {this.mapColumnsContent()}
            <RightBorder index={index} />
          </tr>
        </tbody>);
    }

    private mapColumnsContent(){
        //@ts-ignore
        return [...Array(this.state.columnsQuantity).keys()].map(index => 
        <td key={index}> <Cell /> </td>);
    }
}