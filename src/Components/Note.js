import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "./Note.css";

const Note = ({
  note,
  handleRemoveNote,
  handleEditNoteClick,
  handleDisplayNoteClick,
}) => {
  // console.log("Note",note)
  //Note Text
  const NoteText = () => {
    return (
      <div>
        <p className="note-p">{note.title}</p>
        <span style={{ fontSize: "12px" }}>
          
          {note.date.toLocaleDateString()} {note.date.toLocaleTimeString()}
        </span>
      </div>
    );
  };
  //Button Box
  const ButtonBox = () => {
    return (
      <div className="notelist-btn-box">
        <button
          className="note-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleEditNoteClick(note.id);
          }}
        >
          <FaRegEdit />
        </button>
        <button
          className="note-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveNote(note.id);
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    );
  };

  return (
    <div
      className={"note-box"}
      onClick={(e) => {
        e.stopPropagation();
        handleDisplayNoteClick(note.id);
      }}
    >
      <NoteText />
      <ButtonBox />
    </div>
  );
};

export default Note;
