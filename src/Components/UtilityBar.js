import React from "react";
import Search from "./Search";

const UtilityBar = () => {
  const handleSearchNote = () => {};
  return (
    <div className="utility-bar">
      <Search handleSearchNote={handleSearchNote} />
    </div>
  );
};

export default UtilityBar;
