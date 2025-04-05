import React, { useState } from "react";
import "./MasterPassword.css";
import { updateUser, VerifyMasterPassword } from "../../api/userApi";
import bcrypt from "bcryptjs";

const MasterPassword = () => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState("");

  const [storedMasterPassword, setStoredMasterPassword] = useState(
    localStorage.getItem("masterpassword")
  );

  //Save the master password on creation
  const handleSavePassword = async () => {
    console.log(password);
    if (password.trim().length === 0) {
      return;
    }

    const updateObj = {
      noteMasterPassword: password.trim(),
    };
    const updatedUser = await updateUser(updateObj);
    localStorage.setItem("user", JSON.stringify(updatedUser.data));

    if (updatedUser.noteMasterPassword === null) {
      setStoredMasterPassword(null);
      setPassword("");

      localStorage.removeItem("masterpassword");
    } else {
      setStoredMasterPassword(updatedUser.data.noteMasterPassword);
      localStorage.setItem(
        "masterpassword",
        updatedUser.data.noteMasterPassword
      );
    }
  };

  //Reset Master Password Logic
  const handleResetPassword = async () => {
    const isPasswordMatching = bcrypt.compareSync(
      oldPassword,
      storedMasterPassword
    );

    if (!isPasswordMatching) {
      const isPasswordMatchingAtServer = await VerifyMasterPassword(
        oldPassword
      );
      if (!isPasswordMatchingAtServer.data.verified) {
        console.log("wrongmatch");
        setWrongPassword(true);

        return;
      }
    }

    console.log("matched");
    if (
      window.confirm("Are you sure you want to change the master password?")
    ) {
      setWrongPassword(false);
      const updateObj = {
        noteMasterPassword: newPassword,
      };
      const updatedUser = await updateUser(updateObj);
      console.log("updatedUSer:", updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser.data));

      if (!updatedUser.data.noteMasterPassword) {
        console.log(
          "master password null",
          updatedUser.data.noteMasterPassword
        );
        setStoredMasterPassword(null);
        localStorage.removeItem("masterpassword");
      } else {
        setStoredMasterPassword(updatedUser.data.noteMasterPassword);
        localStorage.setItem(
          "masterpassword",
          updatedUser.data.noteMasterPassword
        );
      }
      // console.log("msp-change", updatedUser);
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <div className="masterpassword-body">
      {!storedMasterPassword && (
        <div className="set-password">
          <h4>Master password :</h4>

          <form
            className="set-password-container"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent page reload
              handleSavePassword(); // Call your verification function
            }}
          >
            <input
              type="password"
              placeholder="Type Master Password here..."
              className="passwordinput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Set Password</button>
          </form>
        </div>
      )}

      {/* Change Master Password */}
      {storedMasterPassword && (
        <div className="set-password">
          <h4>Change Master Password :</h4>
          <form
            className="set-password-container"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent page reload
              handleResetPassword(); // Call your verification function
            }}
          >
            <input
              type="password"
              placeholder="Old Master Password "
              className="passwordinput"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Type New Password Or Leave Empty to Remove"
              className="passwordinput"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Reset</button>

          </form>
          {wrongPassword && <p>Incorrect old password!</p>}
        </div>
      )}
    </div>
  );
};

export default MasterPassword;
