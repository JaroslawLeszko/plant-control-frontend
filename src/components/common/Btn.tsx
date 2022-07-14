import React from 'react';
import {Link} from "react-router-dom";

interface Props {
    text: string;
    to?: string;
    className: string;
}

export const Btn = (props: Props) => (
    props.to ? <Link className={props.className} to={props.to}>{props.text}</Link> : <button>{props.text}</button>
);