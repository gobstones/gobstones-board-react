import React from 'react';

type StoneProps = {
    color: string;
    amount: number | string;
    rightClick: (event: React.MouseEvent<HTMLDivElement>) => any;
    leftClick: (event: React.MouseEvent<HTMLDivElement>) => any;
}

function Stone({color, leftClick, amount, rightClick}: StoneProps) {
    function hasBigAmount(): boolean {
        return amount > 99;
    }

    function amountText(): string | number {
        if (hasBigAmount()) {
            return "*";
        } else {
            return amount;
        }
    }

    function hiddenClass(): string {
        return "gbs_hidden";
    }

    function cssClass(): string {
        if (amount > 0) {
            return "gbs_pointer";
        } else {
            return `${hiddenClass()} gbs_ghost-` + color;
        }
    }

    return (
        <div onClick={(e) => leftClick(e)}
             onContextMenu={(e) => {
                 e.preventDefault();
                 rightClick(e)
             }}
             className={`gbs_color-${color} gbs_stone gbs_tooltip gbs_${color} ${cssClass()}`}>
            <span role={`${color}-stone`} className="gbs_stone_amount">{amountText()}</span>
        </div>
    );
}

export default Stone;