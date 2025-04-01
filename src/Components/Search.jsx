import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";

const Search = ({searchText,setSearchText}) => {
  const [searchClick, setSearchClick] = useState(false);
  const ref = useRef(null);

  const HandleSearchButton = () => {
    if (!searchClick) {
      setSearchClick(true)
      setTimeout(() => ref.current.focus(), 1);
    } else {
      setSearchClick(false);
      setSearchText("")
    }
  };

  return (
    <div className="search-box">
      {searchClick && (
        <input
          ref={ref} 
          className="search-input"
          placeholder="Search here..."
          maxLength={60}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      )}
      <FaSearch className="search-icon" onClick={() => HandleSearchButton()} />
    </div>
  );
};

export default Search;
