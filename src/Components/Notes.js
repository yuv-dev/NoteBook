import React from "react";
import Note from "./Note";

const Notes = ({
  notes,
  handleRemoveNote,
  handleEditNoteClick,
  handleDisplayNoteClick,
}) => {


  return (
    <>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleRemoveNote={handleRemoveNote}
          handleEditNoteClick={handleEditNoteClick}
          handleDisplayNoteClick={handleDisplayNoteClick}
        />
      ))}
    </>
  );
};

export default Notes;
