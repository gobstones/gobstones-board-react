import React, {useEffect, useRef, useState} from "react";
import '../style/size-edition.css'
import dice from '../img/dice.svg'
import {randomInt} from "../utils/random";
import {CellLocation} from "./BoardComponent";
import {ThemeSelect} from "./ThemeSelect";

interface Props {
    initialRows: number;
    initialColumns: number;
    rowQuantitySetter: (quantity: number) => void;
    columnQuantitySetter: (quantity: number) => void;
    initialHead: CellLocation;
    headSetter: (coord: CellLocation) => void;
    exportGBB: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleBoardLoaded: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleThemeChange: (theme: string) => void;
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
                                     initialHead,
                                     exportGBB,
                                     handleBoardLoaded,
                                     handleThemeChange
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
    let fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <div className={`modal ${show && 'active'}`}>
            <div className='modal_section'>
                <label className='section_title'>Board size</label>
                <div className='modal_section_break'/>
                <div className='modal_section_content'>
                    <NumericInput label='Columns: ' value={x} onChange={setX}/>
                    <NumericInput label='Rows: ' value={y} onChange={setY}/>
                </div>
            </div>
            <div className='modal_section'>
                <label className='section_title'>Head position</label>
                <div className='modal_section_break'/>
                <div className='modal_section_content'>
                    <NumericInput label='At column: ' value={headX} onChange={setHeadX}/>
                    <NumericInput label='At rows: ' value={headY} onChange={setHeadY}/>
                </div>
            </div>
            <div className='modal_section modal_section--center'>
                <div className='modal_section modal_section--column'>
                    <button className='modal_button' onClick={exportGBB}>Save Board</button>
                    <input style={{display: 'none'}} ref={fileInputRef} type='file'
                           onChange={(e) => handleBoardLoaded(e)}/>
                    <button className='modal_button'
                            onClick={() => fileInputRef.current ? fileInputRef.current.click() : undefined}>Open Board
                    </button>
                </div>
                <div className='modal_section modal_section--column'>
                    <button className='modal_button' onClick={() => {
                        columnQuantitySetter(4);
                        rowQuantitySetter(4);
                        headSetter([0, 0])
                    }}>New Board
                    </button>
                    <button className='modal_button'>Random Board</button>
                </div>
            </div>
            <ThemeSelect onChange={event => handleThemeChange(event.target.value)}/>
            <div className='modal_section modal_section--right'>
                <label onClick={() => setShow(false)} className='modal_close'> Close </label>
                <button className='modal_button' onClick={() => {
                    columnQuantitySetter(x);
                    rowQuantitySetter(y);
                    headSetter([headX, headY])
                    setShow(false)
                }}>Done
                </button>
            </div>
        </div>
    )
}