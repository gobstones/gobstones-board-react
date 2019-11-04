import React from 'react';
import './App.css';
import {Board} from "./components/Board";
import Stone from "./components/Stone";

const App: React.FC = () => {
    return (
        <>
            <Board/>
            <Stone/>
        </>
    );
};


export default App;
