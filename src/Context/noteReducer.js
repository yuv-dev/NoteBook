export function noteReducer(notes, action) {
  switch (action.type) {
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
    case "changed": {
      return notes.map((note) => {
        if (note.id === action.newNote.id) return action.newNote;
        else return note;
      });
    }

    case "removed": {
      return notes.filter((n) => n.id !== action.id);
    }
    default: {
      throw Error("Unknown Action:" + action.type);
    }
  }
}
