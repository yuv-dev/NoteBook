import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthState from "./Context/authState";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import About from "./Components/About";
import Contact from "./Components/Contact";
import Layout from "./Components/Layout";
import NotFound from "./Components/NotFound";
import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import Setting from "./Components/Setting/Setting";

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <div className="App">
        <ToastContainer position="bottom-right" autoClose={3000} />

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
