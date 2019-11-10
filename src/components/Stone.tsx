import React from 'react';
import bolita_roja_svg from '../img/op_bolita_roja.svg'
import bolita_azul_svg from '../img/op_bolita_azul.svg'
import bolita_verde_svg from '../img/op_bolita_verde.svg'
import bolita_negra_svg from '../img/op_bolita_negra.svg'

type StoneProps = {
    color: string
}

type StoneAmount = {
    value: number,
    editable: boolean
}

type StoneState = {
    amount: StoneAmount
}

class Stone extends React.Component<StoneProps, StoneState> {
    constructor(props: StoneProps) {
        super(props);
        this.state = {
            amount: {
                value: 0,
                editable: true,
            }
        }
    }

    hasBigAmount(amount: number) {
        return amount > 99;
    }

    amountText(amount: number) {
        if (this.hasBigAmount(amount)) {
            return "*";
        } else {
            return amount;
        }
    }

    cssClass() {
        if (this.state.amount.editable) {
            if (this.state.amount.value > 0) {
                return "gbs_pointer";
            } else {
                return "gbs_hidden gbs_ghost-" + this.props.color;
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
        return (
            <div
                className={` gbs_stone gbs_tooltip gbs_color-${this.props.color} gbs_black ${this.cssClass()}`}
                onClick={() => this.leftClick()}/>
        );
    }

    private getImageSource(): string {
        if (this.props.color === "red") {
            return bolita_roja_svg;
        }
        if (this.props.color === "green") {
            return bolita_verde_svg;
        }
        if (this.props.color === "blue") {
            return bolita_azul_svg;
        }
        return bolita_negra_svg;

    }

    render() {
        return (
            <div onClick={() => this.leftClick()} className={`  gbs_color-${this.props.color} gbs_stone gbs_tooltip gbs_${this.props.color} ${this.cssClass()} `}>
                <span className="gbs_stone_amount">{this.amountText(this.state.amount.value)}</span>
            </div>
        );
    }
}

export default Stone;