import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/auth";

//  Sign up new User
export const SignupAPI = async (formdata) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup/`, formdata);
    return response.data;
  } catch (error) {
    console.error("Failed to add note:", error);
    throw error;
  }
};

//  SignIn new User
export const SignInAPI = async (formdata) => {
    try {
        console.log(formdata);
      const response = await axios.post(`${API_BASE_URL}/signin/`, formdata);
      return response.data;
    } catch (error) {
      console.error("Failed to add note:", error);
      throw error;
    }
  };
  
  