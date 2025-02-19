import React from "react";
import { useState, useRef, useEffect } from "react";
import { FaRegTrashAlt, FaSave } from "react-icons/fa";
import "./EditNote.css";

const EditNote = ({
  note,
  handleNoteChange,
  handleDisplayNoteClick,
  handleRemoveNote,
}) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleNoteDescriptionEditEvent = (e) => {
    console.log("key pressed");
    setDescription(e);
    // handleNoteChange({
    //   ...note,
    //   title: title,
    //   description: description,
    //   date: new Date(),
    // });
  };
  const handleNoteTitleEditEvent = (e) => {
    console.log("key pressed");
    setTitle(e);
  };

  const ButtonBox = () => {
    return (
      <div className="note-detail-btn-box">
        {/* Save Button */}
        <button
          className="utils-btn"
          onClick={() => {
            handleNoteChange({
              ...note,
              title: title,
              description: description,
              date: new Date(),
            });
            handleDisplayNoteClick(-1);
          }}
        >
          <FaSave />
        </button>
        {/* Delete Button */}
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
    <div className="edit-note">
      {/* Header */}
      <div className="note-header">
        <input
          ref={ref}
          className="note-edit-input"
          placeholder="Add Title"
          value={title}
          onChange={(e) => handleNoteTitleEditEvent(e.target.value)}
        />
        <span className="note-detail-updateTime">
          Last Update: {note.date.toLocaleDateString()}{" "}
          {note.date.toLocaleTimeString()}
        </span>
      </div>
      {/* Content */}
      <div className="note-edit-content">
        {/* <MDEditor
        className="Markdown-editorX"
          value={description}
          height="100%"
          onChange={(value, viewUpdate) => setDescription(value)}
          preview="edit"
          previewOptions={{
            disallowedElements: ["style"],
          }}

        /> */}
        <textarea
          className="note-edit-textarea"
          placeholder="Write your notes"
          value={description}
          onChange={(e) => handleNoteDescriptionEditEvent(e.target.value)}
        />
      </div>
      <ButtonBox />
    </div>
  );
};

export default EditNote;
