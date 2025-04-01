import React, { useReducer, useState, useEffect, useContext } from "react";
import Notes from "./Notes";
import "./Home.css";
import { noteReducer } from "../Context/noteReducer";
import EditNote from "./EditNote";
import AddNote from "./AddNote";
import NoteDetail from "./NoteDetail";
import UtilityBar from "./UtilityBar";
import useDebounce from "../Hooks/useDebounce";
import { fetchNotes, updateNote, deleteNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";


const Home = () => {
  const [isaddingNote, setIsaddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [displayNote, setDisplayNote] = useState(null);

  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); //  Loading state

  const [notes, dispatch] = useReducer(noteReducer, []);
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const debouncedSearch = useDebounce(searchText, 300); // Apply debouncing
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return; // Wait for user to be defined

    console.log("HOme>user", user);
    // console.log("HOme>token", token  );

    if (!user) navigate("/signin");
    else {
      const fetchedNotes = async () => {
        setLoading(true);
        try {
          const data = await fetchNotes(user);
          dispatch({
            type: "initialize",
            notes: data,
          });
        } catch (error) {
          console.error("Failed to fetch notes", error.response);
        } finally {
          setLoading(false);
        }
      };
      fetchedNotes();
    }
  }, [user]);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const lowercasedSearch = debouncedSearch.toLowerCase();
      const filtered = notes.filter(
        (note) =>
          note.title?.toLowerCase().includes(lowercasedSearch) ||
          note.description?.toLowerCase().includes(lowercasedSearch) ||
          note.tag?.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredNotes(filtered);
    }
  }, [debouncedSearch, notes]);

  //add new note
  const handleAddNote = (newNote) => {
    dispatch({
      type: "added",
      note: newNote,
    });
    handleAddNoteClick();
  };

  //Edit note handler
  const handleNoteChange = async (updatedNote) => {
    try {
      await updateNote(updatedNote._id, updatedNote);
      dispatch({
        type: "changed",
        newNote: updatedNote,
      });
    } catch (error) {
      console.error("Failed to updated note", error);
      alert("Failed to update the note. Please try Again!");
    }
  };

  const handleRemoveNote = async (id) => {
    await deleteNote(id);
    dispatch({
      type: "removed",
      id: id,
    });
    setDisplayNote(null);
    setEditingNote(null);
  };

  const handleAddNoteClick = () => {
    setIsaddingNote((x) => !x);
  };

  const handleEditNoteClick = (note) => {
    setEditingNote(note);
    handleDisplayNoteClick(null);
  };

  const handleDisplayNoteClick = (note) => {
    setDisplayNote(note);
  };

  const displayNoteList =
    isaddingNote === false && editingNote === null && displayNote === null;

  if (loading) return <div className="Loading-spinner">Loading...</div>;

  return (
    <>
      <div className="home-Note">
        {/* Display list of  notes */}
        {displayNoteList && (
          <div className="notes-container">
            <Notes
              notes={filteredNotes}
              handleDisplayNoteClick={handleDisplayNoteClick}
            />
          </div>
        )}

        {/* Display a Note */}
        {displayNote && (
          <NoteDetail
            displayNote={displayNote}
            handleRemoveNote={handleRemoveNote}
            handleEditNoteClick={handleEditNoteClick}
            handleDisplayNoteClick={handleDisplayNoteClick}
          />
        )}

        {/* Editing Note */}
        {editingNote && (
          <EditNote
            editingNote={editingNote}
            handleEditNoteClick={handleEditNoteClick}
            handleNoteChange={handleNoteChange}
            handleRemoveNote={handleRemoveNote}
          />
        )}

        {/* Adding a new note */}
        {isaddingNote && (
          <AddNote
            handleAddNoteClick={handleAddNoteClick}
            handleAddNote={handleAddNote}
            handleDisplayNoteClick={handleDisplayNoteClick}
          />
        )}
      </div>

      {/* Footer */}
      {displayNoteList && (
        <div className="Footer">
          <UtilityBar
            handleAddNoteClick={handleAddNoteClick}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
      )}
    </>
  );
};

export default Home;
