import React from "react";
import "./NoteDetail.css";

const NoteDetail = ({
  total,
  note,
  handleEditNoteClick,
  handleDisplayNoteClick,
  handleChangeDisplayNote,
}) => {
  const ButtonBox = () => {
    return (
      <div className="note-detail-btn-box">
        <button
          className="utils-btn"
          onClick={() => {
            handleDisplayNoteClick(-1);
          }}
        >
          Close
        </button>
        <button
          className="utils-btn"
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
    <div className="note-detail">
      {/* Header */}
      <div className="note-detail-header">
        <h2 className="note-detail-title">{note.title}</h2>
        <span className="note-detail-updateTime">
          Last Update: {note.date.toLocaleDateString()}{" "}
          {note.date.toLocaleTimeString()}
        </span>
      </div>
      {/* Content */}
      <div className="note-detail-content">
        <p className="note-display-text">{note.description}</p>
      </div>
      <ButtonBox />
    </div>
  );
};

export default NoteDetail;
