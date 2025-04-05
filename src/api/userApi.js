import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/users";
const user = JSON.parse(localStorage.getItem("user"));

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Update an existing note
export const updateUser = async (updatedUser) => {
  console.log(user);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${user._id}`,
      updatedUser,
      getAuthConfig()
    );
    console.log("updatedUser", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update User",
      error.response?.data || error.message
    );

    throw error;
  }
};

//  VErify Master Password
export const VerifyMasterPassword = async (oldPassword) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/verify-master-password/`,
      { password: oldPassword },
      getAuthConfig()
    );
    return response;
  } catch (error) {
    console.error("Failed to verify password:", error);
    throw error;
  }
};
