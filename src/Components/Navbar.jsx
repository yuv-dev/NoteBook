import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./Custom.css";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import AuthContext from "../Context/AuthContext";

function Navbar({ logo, iconClick, handleBarClick }) {
  const { user, logout } = useContext(AuthContext);
  // if (!user) navigate("/signin");
  const navigate = useNavigate();
  return (
    <div className="Navbar">
      {/* Logo section    */}
      <section>
        <Link to="/" className="Logo-Box">
          <img
            src={logo}
            alt="logo"
            className="logo"
            width={"30px"}
            height={"40px"}
          />
          <h2 className="logo-name">NoteBook</h2>
        </Link>
      </section>

      {/* sign box */}
      <section>
        <div className="sign-box">
          {user ? (
            <>
              <button
                className="sign-button"
                onClick={() => {
                  logout();
                  navigate("/signin");
                }}
              >
                Log Out
              </button>

              <FaBars
                className={!iconClick ? "bar-icon" : "bar-icon bar-icon-click"}
                onClick={handleBarClick}
              />
            </>
          ) : (
            <>
              <Link to="/signup" className="sign-button">
                SignUp
              </Link>
              <Link to="/signin" className="sign-button">
                SignIn
              </Link>
            </>
          )}
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
