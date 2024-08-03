import React from "react";
import { useState, useRef, useEffect } from "react";

const EditNote = ({ note, handleNoteChange }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="editNote-box">
      <h2>Edit Note: {note.id}</h2>
      <div className="addNote-input-box">
        <input
          ref={ref}
          className="note-input"
          placeholder="Add Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="note-textarea"
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button
          className="btn Xbutton"
          onClick={() => {
            handleNoteChange({
              ...note,
            });
          }}
        >
          Close
        </button>
        <button
          className="btn Xbutton"
          onClick={() => {
            handleNoteChange({
              ...note,
              title: title,
              description: description,
              date: new Date(),
            });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditNote;
