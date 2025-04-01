import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/notes";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

//Fetch Notes
export const fetchNotes = async (user) => {
  try {
    const API_END_POINT =
      user?.userType === "ADMIN" ? `${API_BASE_URL}/all/` : `${API_BASE_URL}/`; //ADMIN has different endpoint to access all notes

    const response = await axios.get(`${API_END_POINT}`, getAuthConfig());
    return response.data.data;
  } catch (error) {
    console.error(
      "Failed to fetch notes:",
      error.response?.data || error.message
    );

    throw error;
  }
};

//  Add a new note
export const createNote = async (note) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/`,
      note,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch notes:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// Update an existing note
export const updateNote = async (id, updatedNote) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${id}`,
      updatedNote,
      getAuthConfig()
    );
    console.log("editedNote", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch notes:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${id}`,
      getAuthConfig()
    );
    console.log("deleted", response);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch notes:",
      error.response?.data || error.message
    );
    throw error;
  }
};
