import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Custom.css";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";

function Navbar({ logo, iconClick, handleBarClick }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    setLoggedIn(true);
    console.log("Sign Up");
    // navigate("/signup");
  };
  const handleSignIn = () => {
    setLoggedIn(true);
    console.log("Sign In");
    // navigate("/signin");
  };
  const handleLogOut = () => {
    setLoggedIn(false);
    console.log("Log Out");
    // navigate("/"); // Redirect to home page
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="Navbar">
      <section>
        <div className="Logo-Box" onClick={handleLogoClick}>
          <img
            src={logo}
            alt="logo"
            className="logo"
            width={"30px"}
            height={"40px"}
          />
          <h2 className="logo-name">NoteBook</h2>
        </div>
      </section>

      <section>
        <div className="sign-box">
          {!loggedIn && (
            <>
              <button className="sign-button" onClick={handleSignUp}>
                SignUp
              </button>
              <button className="sign-button" onClick={handleSignIn}>
                SignIn
              </button>
            </>
          )}
          {loggedIn && (
            <button className="sign-button" onClick={handleLogOut}>
              Log Out
            </button>
          )}
          <FaBars
            className={!iconClick ? "bar-icon" : "bar-icon bar-icon-click"}
            onClick={handleBarClick}
          />
        </div>
      </section>
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
