import React, { useRef, useReducer, useState } from "react";
import Notes from "./Notes";
import { noteReducer } from "../Context/noteReducer";
import EditNote from "./EditNote";
import NoteDetail from "./NoteDetail";
import { initialNotes } from "../Data/Notes";
import "./Home.css";
import UtilityBar from "./UtilityBar";

const Home = () => {
  const nextId = useRef(initialNotes.length);
  const [notes, dispatch] = useReducer(noteReducer, initialNotes);
  const [isaddingNote, setIsaddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(-1);
  const [displayNote, setDisplayNote] = useState(-1);
  const [activeNote, setActiveNote] = useState(-1);

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
    let note = notes.find((note) => {
      return displayNote === note.id;
    });
    setActiveNote(note);
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
            handleChangeDisplayNote={handleChangeDisplayNote}
          />
        )}

        {/* Editing Note */}
        {editingNote >= 0 && (
          <EditNote
            note={notes.find((note) => {
              return editingNote === note.id;
            })}
            handleNoteChange={handleNoteChange}
          />
        )}
      </div>

      {/* Footer */}
      <div className="Footer">
        <UtilityBar
          handleEditNoteClick={handleEditNoteClick}
          handleRemoveNote={handleRemoveNote}
          handleDisplayNoteClick={handleDisplayNoteClick}
          note={notes.find((note) => {
            return displayNote === note.id;
          })}
        />
      </div>
    </>
  );
};

export default Home;
