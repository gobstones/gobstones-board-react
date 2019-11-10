import React from "react";
import Stone from "./Stone";

type CellState ={
    isHeader : boolean;
}

type CellProps ={
    isHeader : boolean
}

export default class Cell extends React.Component<CellProps, CellState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isHeader : props.isHeader,
        }
    }

    cssClass(){
        if(this.state.isHeader){
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
                            <Stone color={"blue"}/>
                        </td>
                        <td>
                            <Stone color={"black"}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Stone color={"red"}/>
                        </td>
                        <td>
                            <Stone color={"green"}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}