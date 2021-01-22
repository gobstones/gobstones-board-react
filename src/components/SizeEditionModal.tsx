import React, {useEffect, useState} from "react";
import '../style/size-edition.css'
import dice from '../img/dice.svg'
import {randomInt} from "../utils/random";
import {CellLocation} from "./BoardComponent";

interface Props {
    initialRows: number;
    initialColumns: number;
    rowQuantitySetter: (quantity: number) => void;
    columnQuantitySetter: (quantity: number) => void;
    initialHead: CellLocation;
    headSetter: (coord: CellLocation) => void;
}

function NumericInput(props: { label: string, value: number, onChange: (e: number) => void }) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const number = parseInt(e.target.value.replace(/\D/g, ''));
        props.onChange(isNaN(number) ? 0 : number);
    }

    return <div className='input_container'>
        <label className='modal_label'>{props.label} </label>
        <input className='modal_input' value={props.value} onChange={(e) => handleChange(e)}/>
        <img src={dice} alt='Random' className='random_button'
             onClick={() => props.onChange(randomInt(1, 100))}/>
    </div>;
}

export const SizeEditionModal = ({
                                     rowQuantitySetter,
                                     columnQuantitySetter,
                                     headSetter,
                                     initialColumns,
                                     initialRows,
                                     initialHead
                                 }: Props) => {
    const [show, setShow] = useState(false)
    const [x, setX]: [number, (x: number) => void] = useState(initialColumns);
    const [y, setY]: [number, (x: number) => void] = useState(initialRows);
    const [headY, setHeadY]: [number, (x: number) => void] = useState(initialHead[1]);
    const [headX, setHeadX]: [number, (x: number) => void] = useState(initialHead[0]);

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
                <div className='modal_section_break'></div>
                <div className='modal_section_content'>
                    <NumericInput label='Columns: ' value={x} onChange={setX}/>
                    <NumericInput label='Rows: ' value={y} onChange={setY}/>
                </div>
            </div>
            <div className='modal_section'>
                <label className='section_title'>Head position</label>
                <div className='modal_section_break'></div>
                <div className='modal_section_content'>
                    <NumericInput label='At column: ' value={headX} onChange={setHeadX}/>
                    <NumericInput label='At rows: ' value={headY} onChange={setHeadY}/>
                </div>
            </div>
            <div className='modal_section'>
                <div className='modal_section'>
                    <button className='modal_button' onClick={() => {
                        columnQuantitySetter(5);
                        rowQuantitySetter(5);
                        headSetter([0, 0])
                    }}>New Board
                    </button>
                </div>
                <button className='modal_button' onClick={() => {
                    columnQuantitySetter(x);
                    rowQuantitySetter(y);
                    headSetter([headX, headY])
                    setShow(false)
                }}>OK
                </button>
            </div>
        </div>
    )
}