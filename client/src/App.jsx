import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import UserUpdate from "./pages/UserUpdate";
import Notes from "./pages/Notes";
import UnauthorizedLogin from "./pages/UnauthorizedLogin";
import ProtectedRoute from "./pages/ProtectedRoute";

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
            <Route path="/user-profile/:id" element={<UserUpdate />} />
            <Route path="/unauthorized" element={<UnauthorizedLogin />} />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
