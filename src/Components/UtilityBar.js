import React from "react";
import Search from "./Search";
import { FaPlusCircle } from "react-icons/fa";
import "./UtilityBar.css";

const UtilityBar = ({ handleAddNoteClick, searchText, setSearchText }) => {
  return (
    <div className="utility-bar">
      <section>
        <FaPlusCircle
          className="Add-button"
          onClick={() => handleAddNoteClick()}
        />
      </section>
      {/* Utilities */}
      <section>{/* <ButtonBox /> */}</section>
      <section>
        <Search
          className="Search-icon"
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </section>
    </div>
  );
};

export default UtilityBar;
