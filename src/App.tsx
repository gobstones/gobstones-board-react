import React from 'react';
import './style/App.css';
//import Cell from "./components/Cell";
import "./style/board.css"
import "./style/cell.css"
import "./style/stone.css"
import {Board} from "./components/Board";

const App: React.FC = () => {
    return (
            <Board editable columnsQuantity={5} rowsQuantity={7} header={{x : 2,y :0}} />
    );
};


export default App;
