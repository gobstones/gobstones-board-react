import React from 'react';

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

    handleRightClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        this.setState(prevState => ({
            amount: {
                ...prevState.amount,
                value: prevState.amount.value > 0 ? prevState.amount.value - 1 : 0
            }
        }))    }

    render() {
        return (
            <div onClick={() => this.leftClick()} onContextMenu={(event: React.MouseEvent<HTMLDivElement>) => this.handleRightClick(event)}
                 className={`  gbs_color-${this.props.color} gbs_stone gbs_tooltip gbs_${this.props.color} ${this.cssClass()} `}>
                <span className="gbs_stone_amount">{this.amountText(this.state.amount.value)}</span>
            </div>
        );
    }
}

export default Stone;