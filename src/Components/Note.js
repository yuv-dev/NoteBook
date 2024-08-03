import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const Note = ({
  note,
  handleRemoveNote,
  handleEditNoteClick,
  handleDisplayNoteClick,
}) => {
  const NoteText = () => {
    return (
      <>
        <p className="note-p">{note.title}</p>
        <span style={{ fontSize: "12px" }}>
          {note.date.toLocaleDateString()} {note.date.toLocaleTimeString()}
        </span>
      </>
    );
  };

  const ButtonBox = () => {
    return (
      <div className="note-btn-box">
        <button
          className="note-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleDisplayNoteClick(note.id);
          }}
        >
          View
        </button>
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
    <div className={"flex-div note-box"}>
      <NoteText />
      <ButtonBox />
    </div>
  );
};

export default Note;
