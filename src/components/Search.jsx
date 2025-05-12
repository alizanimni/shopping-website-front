import React, { useState } from 'react';
import '../styles/Search.css';
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState("");
  
    const onInputSearch = (event) => {
      const input = event.target.value.trim().toLowerCase();
      setSearchInput(input);
      onSearch(input);
    };
  
    return (
      <div className='center'>
        <div className='search-container'>
          <input
            className='search_input'
            placeholder="search..."
            value={searchInput}
            onInput={onInputSearch}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
    );
  };
  
  export default Search;