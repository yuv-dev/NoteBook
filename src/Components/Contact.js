import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Contact = () => {
  const {user} = useContext(AuthContext);
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
