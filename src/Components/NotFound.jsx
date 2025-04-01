import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const refresh = () => {

    setTimeout(() => {
      navigate(0);
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width:"100%"
      }}
    >
      <h2>404 NotFound</h2>
      <p>
        Check the Link or{" "}
        <span
          style={{ color: "#61dafb", cursor: "pointer" }}
          onClick={() => refresh()}
        >
          Refresh
        </span>{" "}
        Again{" "}
      </p>
    </div>
  );
};

export default NotFound;
