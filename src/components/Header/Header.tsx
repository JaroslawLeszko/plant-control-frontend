import React from "react";
import {Btn} from "../common/Btn";
import '../common/Btn.css';


export const Header = () => {

    return (
        <header>
            <Btn className="btn" to="/" text="Plant Control"/>
            <h1>MY PLANTS</h1>
            <Btn className="btn" to="/add" text="Add Plant"/>
        </header>
    )
}