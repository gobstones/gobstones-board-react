import React from 'react';
import './style/App.css';
//import Cell from "./components/Cell";
import "./style/board.css"
import "./style/cell.css"
import "./style/stone.css"
import {Board} from "./components/Board";

const App: React.FC = () => {
    return (
            <Board columnsQuantity={5} rowsQuantity={5} header={{x : 0,y :0}} />
    );
};


export default App;
