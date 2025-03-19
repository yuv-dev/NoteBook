export function noteReducer(notes, action) {
  switch (action.type) {
    //initialise notes with fetched data
    case "initialize":
      return action.notes;

    //add a new note
    case "added": {
      return [
        {
          id: action.id,
          title: action.title,
          description: action.description,
          date: new Date(),
        },
        ...notes,
      ];
    }

    //Edit an existing note
    case "changed": {
      return notes.map((note) => {
        if (note.id === action.newNote.id) return action.newNote;
        else return note;
      });
    }

    //delete a note
    case "removed": {
      return notes.filter((n) => n.id !== action.id);
    }
    default: {
      return notes;
    }
  }
}
