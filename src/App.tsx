import React from 'react';
import './App.css';
import Cell from "./components/Cell";
import "./board.css"
import "./cell.css"
import "./stone.css"
import {Board} from "./components/Board";

const App: React.FC = () => {
    return (
            <Board/>
    );
};


export default App;
