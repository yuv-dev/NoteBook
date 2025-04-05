import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = ({ children }) => {
  // const defaultUser = {
  //   _id:"guest",
  //   name:"Guest",
  //   username:"Guest",
  //   email: 'admin@notebook.com',
  //   userType: 'ADMIN',
  //   Date: new Date(),
  //  createdAt: new Date(),
  //  updatedAt: new Date(),
  // }
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      setToken(token);
    }
  }, []);

  const login = (userData, newtoken) => {
    try {
      // console.log("authState-login", userData, token);
      localStorage.setItem("token", newtoken);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setToken(newtoken);
    } catch (error) {
      console.log("Error in login function", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("masterpassword");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
