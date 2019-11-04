import React from "react";

type BoardState = {
    columnsQuantity: number;
}
type BoardProps = {}

function TopLeftCorner() {
    return <td className={"gbs_lx gbs_top_left "}/>;
}

function TopRightCorner() {
    return <td className={"gbs_lx gbs_top_right"}/>;
}

export class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            columnsQuantity: 5
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <table className={"gbs_board"}>
            <tbody className={""}>
            <tr className={""}>
                <TopLeftCorner/>
                {this.mapColumns()}
                <TopRightCorner/>
            </tr>
            </tbody>
        </table>;
    }

    private mapColumns() {
        // @ts-ignore
        return [...Array(this.state.columnsQuantity).keys()].map(index => <td
            className={"gbs_lh gbs_lht"}> {index} </td>);
    }
}