import React from "react";
import Search from "./Search";
import { FaPlusCircle, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "./UtilityBar.css";

const UtilityBar = ({
  handleAddNoteClick,
  handleEditNoteClick,
  handleRemoveNote,
  handleDisplayNoteClick,
  note,
}) => {
  const handleSearchNote = () => {};

  const ButtonBox = () => {
    return (
      <div className="note-btn-box">
        <button
          className="Xbutton"
          onClick={() => {
            handleDisplayNoteClick(-1);
          }}
        >
          Close
        </button>
        <button
          className="Xbutton"
          onClick={() => {
            handleEditNoteClick(note.id);
          }}
        >
          Edit
        </button>
      </div>
    );
  };

  return (
    <div className="utility-bar">
      <section>
        <FaPlusCircle className="Add-button" onClick={handleAddNoteClick} />
      </section>
      {/* Utilities */}
      <section>
        {/* <ButtonBox /> */}
      </section>
      <section>
        <Search className="Search-icon" handleSearchNote={handleSearchNote} />
      </section>
    </div>
  );
};

export default UtilityBar;
