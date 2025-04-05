import bcrypt from "bcryptjs";
import { VerifyMasterPassword } from "../api/userApi";

const storedMasterPassword = localStorage.getItem("masterpassword");

export const masterpasswordVerifyfunc = async (inputpassword) => {
  const isPasswordMatching = bcrypt.compareSync(
    inputpassword,
    storedMasterPassword
  );

  if (!isPasswordMatching) {
    const isPasswordMatchingAtServer = await VerifyMasterPassword(
      inputpassword
    );
    if (!isPasswordMatchingAtServer.data.verified) {
      return false;
    }
  }
  return true;
};
