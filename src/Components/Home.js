import React, { useRef, useReducer, useState } from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";
import { noteReducer } from "../Context/noteReducer";
import EditNote from "./EditNote";
import NoteDetail from "./NoteDetail";
import { initialNotes } from "../Data/Notes";
import "./Home.css";

const Home = () => {
  const nextId = useRef(initialNotes.length);
  const [notes, dispatch] = useReducer(noteReducer, initialNotes);
  const [isaddingNote, setIsaddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(-1);
  const [displayNote, setDisplayNote] = useState(-1);

  const handleAddNote = (title, description) => {
    handleAddNoteClick();
    dispatch({
      type: "added",
      id: nextId.current++,
      title: title,
      description: description,
    });
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
  };

  const handleAddNoteClick = () => {
    setIsaddingNote(!isaddingNote);
  };

  const handleEditNoteClick = (id) => {
    setEditingNote(id);
    handleDisplayNoteClick(-1);
  };
  const handleDisplayNoteClick = (id) => {
    setDisplayNote(id);
  };

  const handleChangeDisplayNote = (id, change) => {
    let index = notes.findIndex((note) => note.id === id);
    if (index === 0 && change === -1) index = notes.length;
    if (index === notes.length - 1 && change === 1) index = -1;
    setDisplayNote(notes[index + change].id);
  };

  const displayNoteList =
    !isaddingNote && editingNote === -1 && displayNote === -1;

  return (
    <>
      <div className="home-Note">
        {isaddingNote && (
          <div>
            <h2>Create a Note </h2>
            <AddNote handleAddNote={handleAddNote} />
          </div>
        )}

        {editingNote >= 0 && (
          <EditNote
            note={notes.find((note) => {
              return editingNote === note.id;
            })}
            handleNoteChange={handleNoteChange}
          />
        )}

        {displayNote >= 0 && (
          <NoteDetail
            total={notes.length}
            note={notes.find((note) => {
              return displayNote === note.id;
            })}
            handleRemoveNote={handleRemoveNote}
            handleEditNoteClick={handleEditNoteClick}
            handleDisplayNoteClick={handleDisplayNoteClick}
            handleChangeDisplayNote={handleChangeDisplayNote}
          />
        )}

        {displayNoteList && (
          <div className="flex-div notes-container">
            <Notes
              notes={notes}
              handleRemoveNote={handleRemoveNote}
              handleEditNoteClick={handleEditNoteClick}
              handleDisplayNoteClick={handleDisplayNoteClick}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
