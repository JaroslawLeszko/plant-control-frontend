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
        <Nav defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <h2>Plant control</h2>
            <Nav.Item as="li">
                <Nav.Link href="/add">Add plant</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}