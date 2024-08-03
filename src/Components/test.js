const NoteText = () => {
  return (
    <div onClick={() => handleNoteClick()} >
      <p className="note-p">{note.title}</p>
      <span style={{ fontSize: "12px" }}>
        {note.date.toLocaleDateString()} {note.date.toLocaleTimeString()}
      </span>
    </div>
  );
};



{isEditing && (
  <EditNote
    id={note.id}
    note={note}
    handleNoteChangeClick={handleNoteChangeClick}
  />
)}



{/* {isNoteDetail && (
          <NoteDisplay note={note} handleNoteClick={handleNoteClick} />
        )} */}



        const handleNoteChangeClick = (title, description) => {
          handleNoteChange({
            ...note,
            title: title,
            description: description,
            date: new Date(),
          });
        };


        {displayNote >= 0 && (
          <NoteDetail
            note={notes[displayNote]}
            handleRemoveNote={handleRemoveNote}
            handleEditNoteClick={handleEditNoteClick}
            handleDisplayNoteClick={handleDisplayNoteClick}
          />
        )}

        const handleSearchNote = (searchKey) => {
          let notesRegex = new RegExp(searchKey);
          console.log("search Note");
          if (searchKey.length > 0) {
            let newNotes = [...notes].filter((note) => notesRegex.test(note.title));
            setSearchNotes(newNotes);
          } else {
            setSearchNotes([...searchNotes]);
          }
        };
      