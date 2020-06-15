import React, {useEffect, useState} from "react";
import '../style/size-edition.css'
import {Coord} from "./CellManager";

interface Props {
    initialRows: number;
    initialColumns: number;
    rowQuantitySetter: (quantity: number) => void;
    columnQuantitySetter: (quantity: number) => void;
    initialHead: Coord;
    headSetter: (coord: Coord) => void;
}

function NumericInput(props: {label: string, value: number, onChange: (e: number) => void }) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const number = parseInt(e.target.value.replace(/\D/g, ''));
        props.onChange(isNaN(number) ? 0 : number);
    }

    return <div className='input_container'>
        <label>{props.label} </label>
        <input value={props.value} onChange={(e) => handleChange(e)}/>
    </div>;
}

export const SizeEditionModal = ({rowQuantitySetter, columnQuantitySetter, headSetter, initialColumns, initialRows, initialHead}: Props) => {
    const [show, setShow] = useState(false)
    const [x, setX]: [number, (x: number) => void] = useState(initialColumns);
    const [y, setY]: [number, (x: number) => void] = useState(initialRows);
    const [headY, setHeadY]: [number, (x: number) => void] = useState(initialHead.y);
    const [headX, setHeadX]: [number, (x: number) => void] = useState(initialHead.x);

    const listenOpenShortcut = (e: KeyboardEvent) => {
        if (e.key === 'g' && e.ctrlKey) {
            e.preventDefault();
            setShow(true);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', listenOpenShortcut);
        return (() => document.removeEventListener('keydown', listenOpenShortcut));
    }, []);
    return (
        <div className={`modal ${show && 'active'}`}>
            <div className='modal_section'>
                <label className='section_title'>Board size</label>
                <NumericInput label='Columns' value={x} onChange={setX}/>
                <NumericInput label='Rows' value={y} onChange={setY}/>
            </div>
            <div className='modal_section'>
                <label className='section_title'>Head position</label>
                <NumericInput label='At column' value={headX} onChange={setHeadX}/>
                <NumericInput label='At rows' value={headY} onChange={setHeadY}/>
            </div>
            <div className='modal_section'>
                <button onClick={() => {
                    columnQuantitySetter(5);
                    rowQuantitySetter(5);
                    headSetter({x:0, y:0})
                }}>New Board</button>
            </div>
            <button onClick={() => {
                columnQuantitySetter(y);
                rowQuantitySetter(x);
                headSetter({x: headX, y: headY})
                setShow(false)
            }}>OK
            </button>
        </div>
    )
}