import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./Context/noteState";

import About from "./Components/About";
import Contact from "./Components/Contact";
import Layout from "./Components/Layout";
import NotFound from "./Components/NotFound";
import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
import AddNote from "./Components/AddNote";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NoteState>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/add" element={<AddNote />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </NoteState>
      </div>
    </BrowserRouter>
  );
}

export default App;
