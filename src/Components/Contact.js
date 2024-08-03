import React, { useContext } from "react";
import NoteContext from "../Context/noteContext";

const Contact = () => {
  const user = useContext(NoteContext);
  console.log(user);

  return (
    <div>
      <h2>Contact Us</h2>
      <p>This is a contact page</p>
      <p>{user.name}</p>
    </div>
  );
};

export default Contact;
