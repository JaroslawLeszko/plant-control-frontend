import React from "react";
import {Btn} from "../common/Btn";
// import './Header.css'
import {Link} from "react-router-dom";

import Nav from 'react-bootstrap/Nav';

export const Header = () => {

    // return (
    //     <header>
    //         <Btn className="button" to="/" text="Plant Control"/>
    //         <h1>MY PLANTS</h1>
    //         <Btn className="button" to="/add" text="Add Plant"/>
    //     </header>
    // )

    return (
        <Nav className="justify-content-between bg-primary px-4 py-2" defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
                <a className="btn btn-primary text-white text-uppercase" href="/" role="button">Home</a>
            </Nav.Item>
            <p className="h2 text-white text-uppercase">Plant control</p>
            <Nav.Item as="li">
                <a className="btn btn-primary text-white text-uppercase" href="/add" role="button">Add plant</a>
            </Nav.Item>
        </Nav>
    )
}