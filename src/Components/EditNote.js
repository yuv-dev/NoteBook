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

  function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = 25 + element.scrollHeight + "px";
    element.style.scrollBottom = element.style.scrollHeight;
  }
  const handleNoteDescriptionEditEvent = (e) => {
    setDescription(e);
  };
  const handleNoteTitleEditEvent = (e) => {
    setTitle(e);
  };

  const ButtonBox = () => {
    return (
      <div className="note-btn-box">
        {/* Save Button */}
        <button
          className="utils-btn"
          onClick={(e) => {
            e.stopPropagation();
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
          {note.date.toLocaleDateString()}{" "} 
          {note.date.toLocaleTimeString()}
        </span>
      </div>
      {/* Content */}
      <div className="note-edit-content">
        <textarea
          className="note-edit-textarea"
          placeholder="Write your notes"
          value={description}
          onChange={(e) => handleNoteDescriptionEditEvent(e.target.value)}
          onKeyUp={() =>
            textAreaAdjust(document.querySelector(".note-edit-textarea"))
          }
        />
      </div>
      <ButtonBox />
    </div>
  );
};

export default EditNote;
