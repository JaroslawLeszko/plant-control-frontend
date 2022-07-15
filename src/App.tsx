import React from 'react';
import './App.css';
import {AddPlant} from "./components/AddPlant/AddPlant";
import {PlantList} from "./components/Plant/PlantList";
import {Header} from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import {EditPlant} from "./components/Plant/EditPlant";


function App() {

  return (
    <>
        <Header/>
        <Routes >
            <Route path="/" element={<PlantList/>}/>
            <Route path="/add" element={<AddPlant/>}/>
            <Route path="/edit/:id" element={<EditPlant/>}/>
        </Routes>
    </>
  );
}

export default App;
