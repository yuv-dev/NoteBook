import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupAPI } from "../api/authApi";
import AuthContext from "../Context/AuthContext";
import "./signup.css";
import { FaHome } from "react-icons/fa";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await SignupAPI(form);
      const { data, token } = response;
      console.log("signup", response.data);
      //Use Context to store session data
      login(data, token);

      alert("signup successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error during SignUp");
    }
  };

  const ButtonBox = () => {
    return (
      <div className="note-btn-box">
        {/**Close button */}
        <button
          className="utils-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          <FaHome />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-header">
          <h2>SignUp</h2>
          <p>Create a new account!</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="form-input"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            type="password"
          />
          <button type="submit">SignUp</button>
        </form>
      </div>
      <ButtonBox />
    </>
  );
};

export default Signup;
