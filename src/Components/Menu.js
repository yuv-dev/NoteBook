import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext  from "../Context/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import Account from "./Account";
import "./Menu.css";

const Menu = () => {
  const {user} = useContext(AuthContext);
  const [showUser, setShowUser] = useState(false);
  const Nav = () => {
    return (
      <ul className="Menu">
        <li onClick={() => setShowUser((prev) => !prev)}>
          <div className="user-account">
            <FaRegUserCircle className="user-icon" />
            <span className="username">{user?.username || "Guest"}</span>
          </div>
          {showUser && user && <Account />}
        </li>
        {/* Main menu List */}
        <li>
          <Link className="nav-link" to="/">
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
