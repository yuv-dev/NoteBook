import React from "react";
import Search from "./Search";
import { FaPlusCircle } from "react-icons/fa";
import "./UtilityBar.css";

const UtilityBar = ({
  handleAddNoteClick,
  handleEditNoteClick,
  handleRemoveNote,
  handleDisplayNoteClick,
  note,
}) => {
  const handleSearchNote = () => {};

  return (
    <div className="utility-bar">
      <section>
        <FaPlusCircle className="Add-button" onClick={() => handleAddNoteClick(1)} />
      </section>
      {/* Utilities */}
      <section>{/* <ButtonBox /> */}</section>
      <section>
        <Search className="Search-icon" handleSearchNote={handleSearchNote} />
      </section>
    </div>
  );
};

export default UtilityBar;
