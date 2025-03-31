import React from "react";
import "./NoteDetail.css";
import { FaRegTrashAlt, FaRegEdit, FaTimes } from "react-icons/fa";

const NoteDetail = ({
  displayNote,
  handleEditNoteClick,
  handleDisplayNoteClick,
  handleRemoveNote,
}) => {
  const user = localStorage.getItem("user");
  const note = displayNote;
  console.log(user);

  const ButtonBox = () => {
    return (
      <div className="note-btn-box">
        <button
          className="utils-btn"
          onClick={() => {
            handleDisplayNoteClick(null);
          }}
        >
          <FaTimes />
        </button>
        <button
          className="utils-btn"
          onClick={() => {
            handleEditNoteClick(note);
          }}
        >
          <FaRegEdit />
        </button>
        <button
          className="utils-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveNote(note._id);
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    );
  };

  return (
    <div className="note-detail">
      {/* Header */}
      <div className="note-header">
        <h2
          className="note-detail-title"
          onDoubleClickCapture={() => {
            handleEditNoteClick(note);
          }}
        >
          {note.title}
        </h2>
        <span>| {note.username} |</span>

        <span className="note-detail-updateTime">
          {note.updatedAt.slice(0, 10)} {note.updatedAt.slice(11, 19)}
        </span>
      </div>
      {/* Content */}
      <div
        className="note-detail-content"
        onDoubleClickCapture={() => {
          handleEditNoteClick(note);
        }}
      >
        <span className="note-display-text">{note.description}</span>
      </div>
      <ButtonBox />
    </div>
  );
};

export default NoteDetail;
