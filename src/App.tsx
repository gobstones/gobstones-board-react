import React from 'react';
import './style/App.css';
//import Cell from "./components/Cell";
import "./style/board.css"
import "./style/cell.css"
import "./style/stone.css"
import {Board} from "./components/Board";

const App: React.FC = () => {
    return (
            <Board/>
    );
};


export default App;
