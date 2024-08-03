import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchKey, setSearchKey] = useState(null);
  const ref = useRef(null);

  const HandleSearchButton = () => {
    if (searchKey === null) {
      setSearchKey("");
      setTimeout(() => ref.current.focus(), 1);
    } else setSearchKey(null);
    // handleSearchNote("");
  };

  return (
    <div className="search-box">
      {searchKey !== null && (
        <input
          ref={ref}
          className="search-input"
          style={{ marginRight: "20px", height: "20px" }}
          placeholder="Search here..."
          maxLength={60}
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
            // handleSearchNote(e.target.value);
          }}
        />
      )}
      <FaSearch onClick={() => HandleSearchButton()} />
    </div>
  );
};

export default Search;
