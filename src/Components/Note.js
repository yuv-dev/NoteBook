import React from "react";
import "./Note.css";

const Note = ({ note, handleDisplayNoteClick }) => {
  return (
    <div
      className={"note-box"}
      onClick={(e) => {
        e.stopPropagation();
        handleDisplayNoteClick(note);
      }}
    >
      <div>
        <p className="note-p">{note.title}</p>
        <span style={{ fontSize: "12px" }}>
          {note.updatedAt.slice(0, 10)} {note.updatedAt.slice(11, 19)}
        </span>
      </div>
    </div>
  );
};

export default Note;
