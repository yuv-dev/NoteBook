import React, { useState, useRef, useEffect } from "react";

const AddNote = ({ handleAddNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="addNote-box">
      <input
        ref={ref}
        className="note-input"
        placeholder="Add Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        row="18"
        className="note-textarea"
        placeholder="Add Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="btn Xbutton"
        onClick={() => {
          setTitle("");
          setDescription("");
          handleAddNote(title, description);
          ref.current.focus();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default AddNote;
