import React from "react";
import {Btn} from "../common/Btn";
import '../common/Btn.css';


export const Header = () => {

    return (
        <header>
            <Btn className="btn" to="/" text="Plant Control"/>
            <Btn className="btn" to="/add" text="Add Plant"/>
        </header>
    )
}