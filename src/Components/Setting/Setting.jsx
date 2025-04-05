import React, { useEffect, useState } from "react";
import "./Setting.css";

import MasterPassword from "./MasterPassword";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Setting = () => {
  const { user } = useContext(AuthContext);
  // const { user } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const {gotoMasterPassword} = location.state || {};

  //state for tab selection
  const [selectedTab, setSelectedTab] = useState("user");

  //Navigate according to condition
  useEffect(() => {
    if (!user) {
      setTimeout(() => navigate("/signin"), 0);
    } else if (gotoMasterPassword) {
      setSelectedTab("masterpassword");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [user, navigate, location, gotoMasterPassword]);

  return (
    <div className="setting">
      <div className="setting-menu">
        <h3>Setting</h3>
        <ul className="setting-menu-list">
          <li
            className={selectedTab === "user" ? "active-setting-tab" : ""}
            onClick={() => {
              setSelectedTab("user");
            }}
          >
            User
          </li>
          <li
            className={
              selectedTab === "masterpassword" ? "active-setting-tab" : ""
            }
            onClick={() => {
              setSelectedTab("masterpassword");
            }}
          >
            Master Password
          </li>
        </ul>
      </div>
      <div className="setting-menu-content">
        {/* user display */}
        {selectedTab === "user" && (
          <div className="user-content">{user?.name || "Guest"}</div>
        )}

        {/* master display */}
        {selectedTab === "masterpassword" && <MasterPassword />}
      </div>
    </div>
  );
};

export default Setting;
