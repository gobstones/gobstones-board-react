import React from 'react';
import './style/App.css';
import "./style/board.css"
import "./style/cell.css"
import "./style/stone.css"
import {Board} from "./components/Board";
import { attireTest } from "./utils/attireTest"

const App: React.FC = () => {
    return (
            <Board editable theme="classic"  columnsQuantity={5} rowsQuantity={7} header={{x : 2,y :0}} />
    );
};


export default App;
