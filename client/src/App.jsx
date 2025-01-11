import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import UserUpdate from "./pages/UserUpdate";
import Notes from "./pages/Notes";

const App = () => {

  return (
    <>
      <div>
        <Navbar />
        <div className="w-11/12 mx-auto my-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/user-profile/:id" element={<UserUpdate />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
