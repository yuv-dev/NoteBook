import React from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaPlusCircle } from "react-icons/fa";
import "./UtilityBar.css";

const UtilityBar = (handleAddNoteClick) => {
  const handleSearchNote = () => {};
  const navigate = useNavigate();

  return (
    <div className="utility-bar">
      <FaPlusCircle className="Add-button" onClick={handleAddNoteClick} />
      <Search className="Search-icon" handleSearchNote={handleSearchNote} />
    </div>
  );
};

export default UtilityBar;
