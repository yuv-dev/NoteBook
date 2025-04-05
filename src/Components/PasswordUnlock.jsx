import React, { useState } from "react";
import { masterpasswordVerifyfunc } from "../Utils/passwordVerify";
import { toast } from "react-toastify";

const PasswordUnlock = ({ onSuccess }) => {
  const [password, setPassword] = useState("");

  const passwordVerify = async () => {
    const result = await masterpasswordVerifyfunc(password);
    if (result) {
      onSuccess();
      setPassword("");
    } else toast.error("Wrong Password!");
  };
  return (
    <div className="check-password">
      <h2>Enter Master password to unlock</h2>
        <form className="set-password-container"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            passwordVerify(); // Call your verification function
          }}
        >
          <input
            type="password"
            placeholder="Type Master Password here..."
            className="passwordinput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
    </div>
  );
};

export default PasswordUnlock;
