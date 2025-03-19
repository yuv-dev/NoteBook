import React, { useRef, useReducer, useState, useEffect } from "react";
import Notes from "./Notes";
import { noteReducer } from "../Context/noteReducer";
import EditNote from "./EditNote";
import AddNote from "./AddNote";
import NoteDetail from "./NoteDetail";
import { initialNotes } from "../Data/Notes";
import "./Home.css";
import UtilityBar from "./UtilityBar";
import getNotes from "../api/notes";
import axios from "axios";

const Home = () => {
  const nextId = useRef(initialNotes.length);
  const [isaddingNote, setIsaddingNote] = useState(-1);
  const [editingNote, setEditingNote] = useState(-1);
  const [displayNote, setDisplayNote] = useState(-1);
  const [activeNote, setActiveNote] = useState(-1);
  const [nnotes, setNnotes] = useState([]);
  const [notes, dispatch] = useReducer(noteReducer, initialNotes);

  // useEffect(() => {
  //   const fetchedNotes = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/api/notes/all/"
  //       );
  //       setNnotes(response.data.data);
  //     } catch (error) {
  //       console.error("Failed to fetch notes", error);
  //     }
  //   };
  //   fetchedNotes();
  // }, []);

  // useEffect(() => {
  //   dispatch({ type: "initialize", notes: nnotes });
  // }, [nnotes]);

  const handleAddNote = (title, description) => {
    dispatch({
      type: "added",
      id: nextId.current++,
      title: title,
      description: description,
    });
    handleAddNoteClick(-1);
  };

  const handleNoteChange = (newNote) => {
    dispatch({
      type: "changed",
      newNote: newNote,
    });
    handleEditNoteClick(-1);
    handleDisplayNoteClick(newNote.id);
  };

  const handleRemoveNote = (id) => {
    dispatch({
      type: "removed",
      id: id,
    });
    setDisplayNote(-1);
    setEditingNote(-1);
  };

  const handleAddNoteClick = (x) => {
    setIsaddingNote(x);
  };

  const handleEditNoteClick = (id) => {
    setEditingNote(id);
    handleDisplayNoteClick(-1);
  };

  const handleDisplayNoteClick = (id) => {
    setDisplayNote(id);
    const note = notes.find((note) => id === note.id);
    setActiveNote(note);
  };

  const displayNoteList =
    isaddingNote === -1 && editingNote === -1 && displayNote === -1;

  // console.log(notes);

  return (
    <>
      <div className="home-Note">
        {/* Display list of  notes */}
        {displayNoteList && (
          <div className="notes-container">
            <Notes
              notes={notes}
              handleRemoveNote={handleRemoveNote}
              handleEditNoteClick={handleEditNoteClick}
              handleDisplayNoteClick={handleDisplayNoteClick}
            />
          </div>
        )}

        {/* Display a Note */}
        {displayNote >= 0 && (
          <NoteDetail
            total={notes.length}
            note={notes.find((note) => {
              return displayNote === note.id;
            })}
            handleRemoveNote={handleRemoveNote}
            handleEditNoteClick={handleEditNoteClick}
            handleDisplayNoteClick={handleDisplayNoteClick}
          />
        )}

        {/* Editing Note */}
        {editingNote >= 0 && (
          <EditNote
            note={notes.find((note) => {
              return editingNote === note.id;
            })}
            handleNoteChange={handleNoteChange}
            handleDisplayNoteClick={handleDisplayNoteClick}
            handleRemoveNote={handleRemoveNote}
          />
        )}

        {/* Adding a new note */}
        {isaddingNote > 0 && (
          <AddNote
            note={{
              title: "",
              description: "",
              date: new Date(),
            }}
            handleAddNote={handleAddNote}
            handleNoteChange={handleNoteChange}
            handleDisplayNoteClick={handleDisplayNoteClick}
          />
        )}
      </div>

      {/* Footer */}
      <div className="Footer">
        <UtilityBar
          handleEditNoteClick={handleEditNoteClick}
          handleRemoveNote={handleRemoveNote}
          handleDisplayNoteClick={handleDisplayNoteClick}
          handleAddNoteClick={handleAddNoteClick}
          note={notes.find((note) => {
            return displayNote === note.id;
          })}
        />
      </div>
    </>
  );
};

export default Home;
