import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NoteContext from "../Context/noteContext";
import { FaRegUserCircle } from "react-icons/fa";
import Account from "./Account";
import "./Menu.css";

const Menu = () => {
  const activeUser = useContext(NoteContext);
  const [showUser, setShowUser] = useState(false);
  const Nav = () => {
    return (
      <ul className="Menu">
        <li onClick={() => setShowUser((prev) => !prev)}>
          <div className="user-account">
            <FaRegUserCircle className="user-icon" />
            <span className="username">{activeUser?.username || "Guest"}</span>
          </div>
          {showUser && <Account />}
        </li>
        <li>
          <Link className="nav-link" to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <div className="Main-Menu">
      <Nav />
    </div>
  );
};

export default Menu;
