import "../App.css";
import { React, useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Menu from "./Menu";
import "./Layout.css";

import AuthContext from "../Context/AuthContext";

// assets
import logo from "../Assets/logo.webp";

const Layout = () => {
  const [iconClick, setIconClick] = useState(false);

  const { user } = useContext(AuthContext);

  const handleBarClick = () => {
    setIconClick(!iconClick);
  };
  return (
    <div className="body">
      <div className="Header">
        <Navbar
          logo={logo}
          iconClick={iconClick}
          handleBarClick={handleBarClick}
        />
      </div>

      {/* Main body of App */}
      <div className="core-body">
        <Outlet />
        {iconClick && <Menu handleBarClick={handleBarClick} />}
      </div>
    </div>
  );
};

export default Layout;
