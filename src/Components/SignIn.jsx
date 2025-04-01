import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInAPI } from "../api/authApi";
import AuthContext from "../Context/AuthContext";
import "./Custom.css";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";

function Signin() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const navigate = useNavigate();

  const [type, setType] = useState("password");

  const { user, login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await SignInAPI(form);
      const { data, token } = response;

      //Use context to store session data
      console.log("signin reponse", data);
      
      login(data, token);
      alert("Signin successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
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
          <h2>Sign In</h2>
          <p>
            Not registered yet!{" "}
            <span
              style={{ color: "#d85935", cursor: "pointer" }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </span>{" "}
            Now
          </p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="email"
            placeholder="Email or Username"
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <input
              name="password"
              placeholder="Password"
              type={type}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <span
              style={{ position: "absolute", marginRight: "10px" }}
              onClick={handleToggle}
            >
              {type === "password" ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button type="submit">Signin</button>
        </form>
      </div>
      <ButtonBox />
    </>
  );
}

export default Signin;
