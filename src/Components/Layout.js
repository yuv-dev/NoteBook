import "../App.css";
import { React, useState } from "react";
import { Outlet } from "react-router-dom";
import UtilityBar from "./UtilityBar";
import Navbar from "./Navbar";
import Menu from "./Menu";
import "./Layout.css";

// assets
import logo from "../Assets/logo.webp";

const Layout = () => {
  const [iconClick, setIconClick] = useState(false);

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
        {iconClick && <Menu />}
      </div>
    </div>
  );
};

export default Layout;
