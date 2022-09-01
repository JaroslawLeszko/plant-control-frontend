import React from "react";
import styled from "styled-components";
import {Btn} from "../common/Btn";

const Component = styled.div`
  height: 80px;
  background: #498460;
  color: white;
  display: flex;
  justify-content: space-between;

  & .button {
    background: #498460;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1rem;
    padding: 25px 35px;
    border-radius: 2px;
    line-height: 22px;
    text-decoration: none;
  }
`


export const Header = () => {

    return (
        <Component>
            <Btn className="button" to="/" text="Plant Control"/>
            <h1>MY PLANTS</h1>
            <Btn className="button" to="/add" text="Add Plant"/>
        </Component>
    )
}