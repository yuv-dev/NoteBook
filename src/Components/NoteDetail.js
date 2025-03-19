import React from "react";
import "./NoteDetail.css";
import { FaRegTrashAlt, FaRegEdit, FaTimes } from "react-icons/fa";

const NoteDetail = ({
  note,
  handleEditNoteClick,
  handleDisplayNoteClick,
  handleRemoveNote,
}) => {
  const ButtonBox = () => {
    return (
      <div className="note-btn-box">
        <button
          className="utils-btn"
          onClick={() => {
            handleDisplayNoteClick(-1);
          }}
        >
          <FaTimes />
        </button>
        <button
          className="utils-btn"
          onClick={() => {
            handleEditNoteClick(note.id);
          }}
        >
          <FaRegEdit />
        </button>
        <button
          className="utils-btn"
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
    <div className="note-detail">
      {/* Header */}
      <div className="note-header">
        <h2
          className="note-detail-title"
          onDoubleClickCapture={() => {
            handleEditNoteClick(note.id);
          }}
        >
          {note.title}
        </h2>
        <span className="note-detail-updateTime">
          {note.date.toLocaleDateString()}{" "}
          {note.date.toLocaleTimeString()}
        </span>
      </div>
      {/* Content */}
      <div
        className="note-detail-content"
        onDoubleClickCapture={() => {
          handleEditNoteClick(note.id);
        }}
      >
        <span className="note-display-text">{note.description}</span>
      </div>
      <ButtonBox />
    </div>
  );
};

export default NoteDetail;
