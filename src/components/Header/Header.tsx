import React from "react";
import {Btn} from "../common/Btn";
import './Header.css'

export const Header = () => {

    return (
        <header>
            <Btn className="button" to="/" text="Plant Control"/>
            <h1>MY PLANTS</h1>
            <Btn className="button" to="/add" text="Add Plant"/>
        </header>
    )
}