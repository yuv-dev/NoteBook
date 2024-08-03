import React, { useRef, useReducer, useState } from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";
import { noteReducer } from "../Context/noteReducer";
import EditNote from "./EditNote";
import NoteDetail from "./NoteDetail";
import { FaPlusCircle } from "react-icons/fa";
import UtilityBar from "./UtilityBar";

const initialNotes = [
  {
    id: 2,
    title: "Read a Book",
    description: "Reading a book is good for mind Health",
    tag: "General",
    date: new Date(),
  },
  {
    id: 1,
    title: "Read a Novel",
    description: "Reading a Novel0 666 is good for mind Health",
    tag: "General",
    date: new Date(),
  },
  {
    id: 0,
    title: "Write a Novel",
    description: "Express your imagination in the form of a Novel",
    tag: "General",
    date: new Date(),
  },
];

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
            
            <h2 style={{position:"fixed", top:"50px"}}>Display Notes</h2>
            <Notes
              notes={notes}
              handleRemoveNote={handleRemoveNote}
              handleEditNoteClick={handleEditNoteClick}
              handleDisplayNoteClick={handleDisplayNoteClick}
            />
            <button className="Add-button" onClick={handleAddNoteClick}>
              <FaPlusCircle />
            </button>
          </div>
        )}
      </div>
      <UtilityBar />
    </>
  );
};

export default Home;
