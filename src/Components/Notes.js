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
          key={note._id}
          note={note}
          handleDisplayNoteClick={handleDisplayNoteClick}
        />
      ))}
    </>
  );
};

export default Notes;
