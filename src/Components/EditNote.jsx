import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import {
  FaLock,
  FaLockOpen,
  FaRegTrashAlt,
  FaTelegramPlane,
  FaTimes,
} from "react-icons/fa";

import "./EditNote.css";
//utility Functions
import useDebounce from "../Hooks/useDebounce";
import useDebounceCallback from "../Hooks/useDebounceCallback";
import { textAreaAdjust } from "../Utils/textAreaAdjust";
//API
import { updateNote } from "../api/notesApi";
//Components
import ShareNote from "./ShareNote";

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
  const prevIsLock = useRef(note.isLock);

  const textAreaRef = useRef(null); // Ref for scrolling

  //Utility states
  const [share, setShare] = useState(false);
  const [isLock, setIsLock] = useState(note.isLock);
  const masterpassword = localStorage.getItem("masterpassword");
  const navigate = useNavigate();

  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.focus();
  }, []);

  const autosave = async () => {
    try {
      console.log("autosave triggered");
      const updatedNote = {
        ...note,
        title: debounceTitle,
        description: debounceDescription,
        isLock: isLock,
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
  };

  useEffect(() => {
    if (
      debounceTitle !== lastSavedTitle.current ||
      debounceDescription !== lastSavedDescription.current
    ) {
      autosave();
    }
  }, [debounceDescription, debounceTitle]);

  //Trigger autosave on isLock state change
  useEffect(() => {
    console.log("islOckUefect", isLock);
    if (prevIsLock.current !== isLock) {
      prevIsLock.current = isLock;
      autosave();
    }
  }, [isLock]); // Trigger autosave when lock state changes

  //  Debounced Auto-Resize Logic
  const debouncedResize = useDebounceCallback((element) => {
    textAreaAdjust(element);
  }, 150); // Resizes only after 150ms delay

  const handleNoteLock = () => {
    //Check if master password is present or not
    if (!masterpassword) {
      navigate("/setting", { state: { gotoMasterPassword: true } });
    } else {
      setIsLock((x) => {
        console.log("Lock state changed", !x);
        return !x;
      });
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

        <button
          className="utils-btn"
          onClick={() => {
            setShare((x) => !x);
          }}
        >
          <FaTelegramPlane />
        </button>
        <button className="utils-btn" onClick={handleNoteLock}>
          {!isLock ? <FaLock /> : <FaLockOpen />}
        </button>

        {/* Share Component */}
        {share && (
          <ShareNote
            note={{
              ...note,
              title: lastSavedTitle.current,
              description: lastSavedDescription.current,
            }}
          />
        )}
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
