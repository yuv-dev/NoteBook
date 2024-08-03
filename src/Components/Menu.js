import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NoteContext from "../Context/noteContext";
import { FaRegUserCircle } from "react-icons/fa";
import Account from "./Account";

const Menu = ({ iconClick }) => {
  const activeUser = useContext(NoteContext);
  const [showUser, setShowUser] = useState(false);
  const Nav = () => {
    return (
      <nav className="Navbar">
        <li onClick={() => setShowUser(!showUser)}>
          <span
            style={{
              color: "black",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <FaRegUserCircle />
            {activeUser.username}
          </span>
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
      </nav>
    );
  };

  return (
    <div className="Main-Menu">
      <Nav />
    </div>
  );
};

export default Menu;
