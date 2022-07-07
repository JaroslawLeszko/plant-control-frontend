import React, {FormEvent, useContext, useState} from "react";
import {SearchContext} from "../../contexts/search";
import {Btn} from "../common/Btn";

export const Header = () => {

    const {search, setSearch} = useContext(SearchContext);
    const [input, setInput] = useState(search);

    const setSearchLocal = (event: FormEvent) => {
        event.preventDefault();
        setSearch(input);
    }

    return (
        <header>
            <Btn to="/" text="Plant Control"/>
            <Btn to="/add" text="Add Plant"/>
            <form onSubmit={setSearchLocal}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}/>
                <Btn text="Search"/>
            </form>
        </header>
    )
}