import "../App.css";
import { React } from "react";
import logo from "../logo.svg";
import Heading from "./Heading";
import Description from "./Description";
import { useNavigate } from "react-router-dom";
import { FaRegStickyNote } from "react-icons/fa";

const Layout = () => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/home");
  };

  return (
    <div style={{overflow:"hidden"}}>
      <header className="App-header">
        <div className="App-heading">
          <Heading heading="Notebook" />
          <FaRegStickyNote />
          <img id="logoImg" src={logo} className="App-logo" alt="logo" />
        </div>
        <Description description="Create, View, Store and Update your notes whenever you want" />
        <button className="btn" onClick={handleHomeButton}>
          Enter
        </button>
      </header>
    </div>
  );
};

export default Layout;
