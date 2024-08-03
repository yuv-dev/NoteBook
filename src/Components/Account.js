import React, { useContext } from "react";
import NoteContext from "../Context/noteContext";

const Account = () => {
  const activeUser = useContext(NoteContext);

  return (
    <div>
      <ul className="account-menu">
        {Object.keys(activeUser).map(
          (item, index) =>
            item !== "username" && (
              <li className="account-list" key={index}>
                <span>{activeUser[item]}</span>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Account;
