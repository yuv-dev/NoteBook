import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/notes";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const config = {
  headers: {
    Authorization: token || "",
  },
};

//Fetch Notes
export const fetchNotes = async () => {
  try {
    const API_END_POINT = user?.userType === "ADMIN" ? "/all/" : "/"; //ADMIN has different endpoint to access all notes
    
    const response = await axios.get(`${API_BASE_URL}${API_END_POINT}`, config);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
};

//  Add a new note
export const createNote = async (note) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, note, config);
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
      updatedNote,
      config
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
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, config);
    console.log("deleted",response);
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
};
