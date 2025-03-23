import React from "react";
import { useState, useRef, useEffect } from "react";
import { FaRegTrashAlt, FaTimes } from "react-icons/fa";
import "./EditNote.css";
import useDebounce from "../Hooks/useDebounce";
import useDebounceCallback from "../Hooks/useDebounceCallback";
import { updateNote } from "../api/notesApi";

const EditNote = ({
  editingNote,
  handleNoteChange,
  handleEditNoteClick,
  handleRemoveNote,
}) => {
  const note = editingNote;

  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const debounceTitle = useDebounce(title, 1000); //debounced Title
  const debounceDescription = useDebounce(description, 500); //debounced Description

  const lastSavedTitle = useRef(note.title);
  const lastSavedDescription = useRef(note.description);

  const textAreaRef = useRef(null); // Ref for scrolling

  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.focus();
  }, []);

  useEffect(() => {
    const autosave = async () => {
      if (
        debounceTitle !== lastSavedTitle.current ||
        debounceDescription !== lastSavedDescription.current
      ) {
        try {
          const updatedNote = {
            ...note,
            title: debounceTitle,
            description: debounceDescription,
          };
          await updateNote(note._id, updatedNote); //Call APi to save updated note

          //update the last save value
          lastSavedDescription.current = debounceDescription;
          lastSavedTitle.current = debounceTitle;
          console.log("Note updated Succesfully");
          handleNoteChange(updatedNote);
        } catch (error) {
          console.log("Failed to autosave note!", error);
        }
      }
    };

    autosave();
  }, [debounceTitle, debounceDescription, note, handleNoteChange]);

  //
  //  Debounced Auto-Resize Logic
  const debouncedResize = useDebounceCallback((element) => {
    textAreaAdjust(element);
  }, 150); // Resizes only after 150ms delay

  const textAreaAdjust = (element) => {
    if (element) {
      const scrollPos = element.scrollTop; // Save scroll position
      const cursorPos = element.selectionStart; // Save cursor position

      const prevHeight = element.style.height;
      element.style.height = "auto"; // Reset height

      const newHeight = `${element.scrollHeight}px`;

      // Resize only when necessary
      if (prevHeight !== newHeight) {
        element.style.height = newHeight;
      }

      // Restore cursor and scroll position smoothly
      element.scrollTop = scrollPos;
      element.setSelectionRange(cursorPos, cursorPos);
    }
  };

  const ButtonBox = () => {
    return (
      <div className="note-btn-box">
        {/**Close button */}
        <button
          className="utils-btn"
          onClick={() => {
            handleEditNoteClick(null);
          }}
        >
          <FaTimes />
        </button>
        {/* Delete Button */}
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
    <div className="edit-note">
      {/* Header */}
      <div className="note-header">
        <input
          className="note-edit-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="note-detail-updateTime">
          {note.updatedAt.slice(0, 10)} {note.updatedAt.slice(11, 19)}
        </span>
      </div>
      {/* Content */}
      <div className="note-edit-content">
        <textarea
          ref={textAreaRef}
          className="note-edit-textarea"
          placeholder="Write your notes"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            debouncedResize(e.target); // Debounced auto-resize
          }}
        />
      </div>
      <ButtonBox />
    </div>
  );
};

export default EditNote;
