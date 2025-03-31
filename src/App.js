import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthState from "./Context/authState";

import About from "./Components/About";
import Contact from "./Components/Contact";
import Layout from "./Components/Layout";
import NotFound from "./Components/NotFound";
import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
