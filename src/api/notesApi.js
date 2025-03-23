import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/notes";

//Fetch all Notes

export const fetchNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all/`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
};

//  Add a new note
export const createNote = async (note) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, note);
    return response.data;
  } catch (error) {
    console.error("Failed to add note:", error);
    throw error;
  }
};

// Update an existing note
export const updateNote = async (id, updatedNote) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${id}`,
      updatedNote
    );
    console.log("editedNote", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update note:", error);
    throw error;
  }
};


// Delete a note
export const deleteNote = async (id) => {
  console.log("Delete API")
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    console.log(response);
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
};
