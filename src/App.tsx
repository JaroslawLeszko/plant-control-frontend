import React from 'react';
// import './App.css';
import {AddPlant} from "./components/AddPlant/AddPlant";
import {PlantList} from "./components/Plant/PlantList";
import {Header} from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import {EditPlant} from "./components/Plant/EditPlant";

import image from './5169546.jpg';

function App() {

  return (
    <>

        <Header/>
        <div className="img-fluid" style={{
            backgroundImage: `url(${image})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }}>
        <Routes >
            <Route path="/" element={<PlantList/>}/>
            <Route path="/add" element={<AddPlant/>}/>
            <Route path="/edit/:id" element={<EditPlant/>}/>
        </Routes>
        <a href="http://www.freepik.com">Designed by pikisuperstar / Freepik</a>
        </div>
    </>
  );
}

export default App;
