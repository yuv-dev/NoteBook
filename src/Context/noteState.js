import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState = ({ children }) => {
  const user = {
    name: "Yuvraj Singh Chauhan",
    username: "yuv",
    email: "yuvrajsingh@gmail.com",
  };

  // const [state, setState] = useState(user);

  // const update = () => {
  //   setTimeout(() => {
  //     setState({
  //       user: {
  //         name: "Yuvraaj",
  //         username: "yuv",
  //         email: "yuvrajsingh@gmail.com",
  //       },
  //     });
  //   }, 1000);
  // };

  return <NoteContext.Provider value={user}>{children}</NoteContext.Provider>;
};

export default NoteState;
