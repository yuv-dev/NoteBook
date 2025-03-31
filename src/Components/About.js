import React, { useContext } from "react";
import AuthContext  from "../Context/AuthContext";

const About = () => {
  const {user} = useContext(AuthContext);

  console.log(user);
  return (
    <div>
      <h2>About</h2>
      <p>This is About page of Notebook </p>
    </div>
  );
};

export default About;
