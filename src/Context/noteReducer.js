export function noteReducer(notes, action) {
  switch (action.type) {

    //initialise notes with fetched data
    case "initialize":
      return [...action.notes];

    //add a new note
    case "added": {
      return [
        action.note,
        ...notes
      ];
    }

    //Edit an existing note
    case "changed": {
      return notes.map((note) => {
        if (note._id === action.newNote._id) return action.newNote;
        else return note;
      });
    }

    //delete a note
    case "removed": {
      return notes.filter((note) => note._id !== action.id);
    }
    default: {
      return notes;
    }
  }
}
