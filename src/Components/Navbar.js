import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Custom.css";
import { FaBars, FaHome } from "react-icons/fa";
import Menu from "./Menu";

function Navbar({ logo, handleSearchNote }) {
  const [iconClick, setIconClick] = useState(false);

  const navigate = useNavigate();
  const handleBarClick = () => {
    setIconClick(!iconClick);
  };
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleSignIn = () => {
    navigate("/signin");
  };
  const handleLogOut = () => {
  };

  return (
    <div className={`Topbar`}>
      <Link to="/">
        <h1 className="logo">{logo}</h1>
      </Link>
      <FaHome onClick={()=> navigate('/home')} />
        {iconClick && <Menu />}
      <div className="sign-box">
        <button className="sign-button" onClick={handleSignUp}>
          SignUp
        </button>
        <button className="sign-button" onClick={handleSignIn}>
          SignIn
        </button>
        <button className="sign-button" onClick={handleLogOut}>
          Log Out
        </button>
      <FaBars
        className={!iconClick ? "bar-icon" : "bar-icon bar-icon-click"}
        onClick={handleBarClick}
      />
      </div>
    </div>
  );
}

Navbar.propTypes = {
  logo: PropTypes.string,
};
Navbar.defaultProps = {
  logo: "Notebook",
};

export default Navbar;
