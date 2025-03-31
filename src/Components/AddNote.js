import React from "react";
import { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./EditNote.css";
import useDebounce from "../Hooks/useDebounce";
import { createNote, updateNote } from "../api/notesApi";

const AddNote = ({ handleAddNoteClick, handleAddNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newNoteId, setNewNoteId] = useState(null);
  const ref = useRef(null); // Ref for scrolling
  const noteCreated = useRef(false); // Track note creation status

  const debounceTitle = useDebounce(title, 500); //debounced Title
  const debounceDescription = useDebounce(description, 500); //debounced Description

  const lastSavedTitle = useRef("");
  const lastSavedDescription = useRef("");
  const createdNote = useRef({});

  //Automatically focus on text area
  useEffect(() => {
    ref.current.focus();
  }, []);

  //Create note on first keystroke
  const createNewNote = async () => {
    if (noteCreated.current) return; // Prevent multiple creations

    if (!debounceTitle.trim() && !debounceDescription.trim()) {
      return;
    }

    const newNote = {
      title: debounceTitle || " ",
      description: debounceDescription || "  ",
    };

    // If description exists but title is empty, assign part of description to title
    if (debounceDescription && !debounceTitle) {
      newNote.title =
        debounceDescription.length > 20
          ? debounceDescription.slice(0, 20)
          : debounceDescription;
    }

    try {
      const response = await createNote(newNote);
      setNewNoteId(response.data._id); //Store new note ID for future updates
      noteCreated.current = true;
      console.log("New note created:", response.data);

      setTitle(response.data.title);
      setDescription(response.data.description);
      // To have a reference of original created data
      createdNote.current = response.data;
    } catch (error) {
      console.error("Failed to created note:", error);
    }
  };

  //Auto save function
  const autoSave = async () => {
    if (!newNoteId && !noteCreated.current) {
      await createNewNote(); // Create new note only on first keystroke
    } else if (
      debounceTitle !== lastSavedTitle.current ||
      debounceDescription !== lastSavedDescription.current
    ) {
      const updatedNote = {
        title: debounceTitle,
        description: debounceDescription,
      };
      try {
        const response = await updateNote(newNoteId, updatedNote); // Update existing note
        lastSavedTitle.current = debounceTitle;
        lastSavedDescription.current = debounceDescription;
        console.log("Note updated successfully:", response.data);
        createdNote.current = response.data;
      } catch (error) {
        console.error("Failed to autosave note:", error);
      }
    }
  };
  // Trigger Auto-Save with Debounce
  useEffect(() => {
    if (debounceTitle || debounceDescription) {
      autoSave();
    }
  }, [debounceTitle, debounceDescription]);

  const ButtonBox = () => {
    const handleClose = async () => {
      if (debounceTitle || debounceDescription) {
        console.log("closing");
        await autoSave(); //ensure the latest save before closing
      }
      console.log(createdNote.current);
      if(noteCreated.current ) handleAddNote(createdNote.current); //pass the latest data
      else handleAddNoteClick();
  };
    return (
      <div className="note-btn-box">
        {/* Close Button */}
        <button className="utils-btn" onClick={handleClose}>
          <FaTimes />
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
          placeholder="Add Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* Content */}
      <div className="note-edit-content">
        <textarea
          ref={ref}
          className="note-edit-textarea"
          placeholder="Write your notes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <ButtonBox />
    </div>
  );
};

export default AddNote;
