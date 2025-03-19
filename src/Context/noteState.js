import NoteContext from "./noteContext";

const NoteState = ({ children }) => {
  const user = {
    name: "Yuvraj Singh Chauhan",
    username: "yuv",
    email: "yuvrajsingh@gmail.com",
  };

  return <NoteContext.Provider value={user}>{children}</NoteContext.Provider>;
};

export default NoteState;
