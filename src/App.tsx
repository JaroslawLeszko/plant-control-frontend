import React, {useState} from 'react';
import './App.css';
import {AddPlant} from "./components/AddPlant/AddPlant";
import {PlantList} from "./components/Plant/PlantList";
import {Header} from "./components/Header/Header";
import {SearchContext} from "./contexts/search";
import {Route, Routes, useParams} from "react-router-dom";
import {EditPlant} from "./components/Plant/EditPlant";


function App() {
    const [search, setSearch] = useState('');
    // const {id} = useParams();

  return (
    <>
        <SearchContext.Provider value={{search, setSearch}}>
            <Header/>
            <Routes>
                <Route path="/" element={<PlantList/>}/>
                <Route path="/add" element={<AddPlant/>}/>
                <Route path="/edit/:id" element={<EditPlant/>}/>
            </Routes>
        </SearchContext.Provider>
    </>
  );
}

export default App;
