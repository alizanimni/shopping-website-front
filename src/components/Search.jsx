import React from 'react';
import '../styles/Search.css';
import { FaSearch } from "react-icons/fa";

const Search = () => {
    return (
        <div className='center'>
        <div className='search-container'>
            <input className='search_input' placeholder="search..." />
            <FaSearch className="search-icon" />  
        </div>
        </div>
    );
};

export default Search;