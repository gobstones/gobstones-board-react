import React from 'react';

type StoneProps = {
    color: string,
    editable: boolean
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
                editable: this.props.editable,
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

    hiddenClass(){
        return (this.state.amount.editable) ? "gbs_hidden" : "gbs_hidden_blocked"
    }

    cssClass() {
        if (this.state.amount.value > 0) {
            return "gbs_pointer";
        } else {
            return `${this.hiddenClass()} gbs_ghost-` + this.props.color;
        }
    }

    leftClick() {
        if(this.state.amount.editable){
            this.setState(prevState => ({
                amount: {
                    ...prevState.amount,
                    value: prevState.amount.value + 1
                }
            }));
        }
    }

    handleRightClick(event: React.MouseEvent<HTMLDivElement>) {
        if(this.state.amount.editable){
            event.preventDefault();
            this.setState(prevState => ({
                amount: {
                    ...prevState.amount,
                    value: prevState.amount.value > 0 ? prevState.amount.value - 1 : 0
                }
            }))    
        }
    }

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