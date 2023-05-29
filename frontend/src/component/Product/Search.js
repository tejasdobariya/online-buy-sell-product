import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css"
import MetaData from "../layout/MetaData"


const Search = ({ }) => {
    let history = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history(`/products/${keyword}`);
        } else {
            history("/products");
        }
    };
    return (
        <Fragment>
            <MetaData title="Search a product" />

            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};
export default Search;