import React from 'react';
import './App.css';
import {AddPlant} from "./components/AddPlant";

function App() {
  return (
    <>
        <header>

            <h1>Plant Control</h1>
            <div className="search">
                <input type="text"/> <button>Search</button>
            </div>
        </header>
        <button className="add-button">Add plant</button>
        <AddPlant/>
        <div className="plant-list">

        </div>
    </>
  );
}

export default App;
