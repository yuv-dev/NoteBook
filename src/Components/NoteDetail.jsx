import React, { useState } from "react";
import "./NoteDetail.css";
import {
  FaRegTrashAlt,
  FaRegEdit,
  FaTimes,
  FaTelegramPlane,
} from "react-icons/fa";
import ShareNote from "./ShareNote";

const NoteDetail = ({
  displayNote,
  handleEditNoteClick,
  handleDisplayNoteClick,
  handleRemoveNote,
}) => {
  const note = displayNote;
  const [share, setShare] = useState(false);

  if (!displayNote) return null;
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

        <button
          className="utils-btn"
          onClick={() => {
            setShare((x) => !x);
          }}
        >
          <FaTelegramPlane />
        </button>

        {/* Share Component */}
        {share && <ShareNote note={displayNote} />}
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
