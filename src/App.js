import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./Context/noteState";

import About from "./Components/About";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Layout from "./Components/Layout";
import NotFound from "./Components/NotFound";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NoteState>
      <Navbar />

          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NoteState>
      </div>
    </BrowserRouter>
  );
}

export default App;
