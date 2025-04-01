import React, { useContext } from "react";
import AuthContext  from "../Context/AuthContext";

const Account = () => {
  const {user} = useContext(AuthContext);

  return <div className="account-menu">
      <h5 className="account-list">{user.name}</h5>
      <h5 className="account-list">{user.email}</h5>
  </div>;
};

export default Account;
