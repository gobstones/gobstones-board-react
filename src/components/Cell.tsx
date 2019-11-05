import React from "react";
import Stone from "./Stone";

export default class Cell extends React.Component<{}, {}> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className={"gbs_gc"}>
                <table>
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