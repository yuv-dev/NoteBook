import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import Account from "./Account";
import "./Menu.css";

const Menu = ({ handleBarClick }) => {
  const { user } = useContext(AuthContext);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="Main-Menu">
      <ul className="Menu">
        <li onClick={() => setShowUser((prev) => !prev)}>
          <div className="user-account">
            <FaRegUserCircle className="user-icon" />
            <span className="username">{user?.username || "Guest"}</span>
          </div>
          {showUser && user && <Account />}
        </li>
        {/* Main menu List */}
        <li
          onClick={() => {
            handleBarClick();
            navigate("/");
          }}
        >
          Home
        </li>
        <li
          onClick={() => {
            handleBarClick();
            navigate("/about");
          }}
        >
          About
        </li>
        <li
          onClick={() => {
            handleBarClick();
            navigate("/contact");
          }}
        >
          Contact
        </li>
        <li
          onClick={() => {
            handleBarClick();
            navigate("/setting");
          }}
        >
          Setting
        </li>
      </ul>
    </div>
  );
};

export default Menu;
