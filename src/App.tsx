import React, {useState} from 'react';
import './App.css';
import {AddPlant} from "./components/AddPlant/AddPlant";
import {PlantList} from "./components/Plant/PlantList";
import {Header} from "./components/Header/Header";
import {SearchContext} from "./contexts/search";
import {Route, Routes} from "react-router-dom";


function App() {
    const [search, setSearch] = useState('')

  return (
    <>
        <SearchContext.Provider value={{search, setSearch}}>
            <Header/>
            <Routes>
                <Route path="/" element={<PlantList/>}/>
                <Route path="/add" element={<AddPlant/>}/>
            </Routes>
        </SearchContext.Provider>
    </>
  );
}

export default App;
