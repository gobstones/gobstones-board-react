import React from 'react';
import bolita_roja from '../img/op_bolita_roja.svg'

type StoneProps = {}

type StoneAmount = {
    value: number,
    editable: boolean
}

type StoneState = {
    color: string,
    amount: StoneAmount
}

class Stone extends React.Component<StoneProps, StoneState> {
    constructor(props: StoneProps) {
        super(props);
        this.state = {
            color: "red",
            amount: {
                value: 0,
                editable: true,
            }
        }
    }

    hasBigAmount(amount : number) {
        return amount > 99;
    }

    amountText(amount : number) {
        if (this.hasBigAmount(amount)) {
            return "*";
        } else {
            return amount;
        }
    }

    cssClass(color : string) {
        if (this.state.amount.editable) {
            if (this.state.amount.value > 0) {
                return "gbs_pointer";
            } else {
                return "gbs_ghost-" + color;
            }
        } else {
            return "";
        }
    }

    leftClick() {
        this.setState(prevState => ({
            amount: {
                ...prevState.amount,
                value: prevState.amount.value + 1
            }
        }));
    }

    renderStone() {
        if (this.state.amount.value > 0) {
            if (this.hasBigAmount(this.state.amount.value)) {
                return (
                    <img
                        className={` gbs_stone gbs_tooltip gbs_color-${this.state.color} ${this.cssClass(this.state.color)}`}
                        src={bolita_roja} alt="" onClick={() => this.leftClick()}/>
                );
            } else {
                return (
                    <img
                        className={` gbs_stone gbs_tooltip gbs_color-${this.state.color} ${this.cssClass(this.state.color)}`}
                        src={bolita_roja} alt="" onClick={() => this.leftClick()}/>
                );
            }
        } else {
            return (
                <img
                    className={` gbs_stone gbs_O ${this.cssClass(this.state.color)} `}
                    src={bolita_roja} alt="" onClick={() => this.leftClick()}/>

            )
        }


    }

    render() {
        return (
            <div>
                {this.renderStone()}
                <span className="gbs_stone_amount">{this.amountText(this.state.amount.value)}</span>
            </div>
        );
    }

}

export default Stone;