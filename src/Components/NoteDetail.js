import React from "react";

const NoteDetail = ({
  total,
  note,
  handleEditNoteClick,
  handleDisplayNoteClick,
  handleChangeDisplayNote
}) => {
 

  const ButtonBox = () => {
    return (
      <div className="note-btn-box">
        <button
          className="Xbutton"
          onClick={() => {
            handleChangeDisplayNote(note.id,-1)
          }}
        >
          {"<<"}
        </button>
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
        <button
          className="Xbutton"
          onClick={() => {
            handleChangeDisplayNote(note.id,1)
          }}
        >
          {">>"}
        </button>
      </div>
    );
  };

  return (
    <div className="note-detail">
      <span style={{ fontSize: "14px", textAlign: "left" }}>
      Last Update: {note.date.toLocaleDateString()}{" "}
        {note.date.toLocaleTimeString()} 
      </span>
      <div>
        <h5 className="note-display-title">{note.title}</h5>
        <p className="note-display-title note-display-text">{note.description}</p>
      </div>
      <ButtonBox />
    </div>
  );
};

export default NoteDetail;
