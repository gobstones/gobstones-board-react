import React from "react";
import Stone from "./Stone";

type CellState = {
    isHeader: boolean;
}

export interface CellContent {
    red: number;
    green:number;
    black:number;
    blue:number;
}

type CellProps = {
    isHeader: boolean;
    content: CellContent;
    addBlue: () => void;
    removeBlue: () => void;
    addBlack: () => void;
    removeBlack: () => void;
    addRed: () => void;
    removeRed: () => void;
    addGreen: () => void;
    removeGreen: () => void;
}

export default class Cell extends React.Component<CellProps, CellState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isHeader: props.isHeader,
        }
    }

    cssClass() {
        if (this.state.isHeader) {
            return "gbs_gh"
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="gbs_gc border">
                <table className={this.cssClass()}>
                    <tbody>
                    <tr>
                        <td>
                            <Stone color={"blue"} amount={this.props.content.blue} leftClick={this.props.addBlue} rightClick={this.props.removeBlue}/>
                        </td>
                        <td>
                            <Stone color={"black"} amount={this.props.content.black} leftClick={this.props.addBlack} rightClick={this.props.removeBlack}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Stone color={"red"} amount={this.props.content.red} leftClick={this.props.addRed} rightClick={this.props.removeRed}/>
                        </td>
                        <td>
                            <Stone color={"green"} amount={this.props.content.green} leftClick={this.props.addGreen} rightClick={this.props.removeGreen}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}