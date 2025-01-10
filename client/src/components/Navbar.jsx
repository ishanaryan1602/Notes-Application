import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice/authSlice";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar = () => {
  const path = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [cookieValue, setCookieValue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    setCookieValue(token);
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(logout());
      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full py-3">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        {/* logo */}
        <Link to="/">LOGO</Link>
        {/* navbar */}
        <nav className="flex gap-[10px] border-2 p-1 border-dotted rounded-full">
          <Link
            to="/"
            className={`home hover:bg-gray-100 rounded-full p-1 px-4 ${
              path.pathname === "/" && "bg-gray-100"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`about hover:bg-gray-100 rounded-full p-1 px-4 ${
              path.pathname === "/about" && "bg-gray-100"
            }`}
          >
            About
          </Link>
        </nav>
        {/* Authentication Section */}
        {cookieValue ? (
          <div className="flex items-center gap-[20px]">
            <Link
              to={`/user-profile/${user?._id}`}
              className="uppercase bg-gray-300 rounded-full h-[35px] w-[35px] overflow-hidden flex justify-center items-center"
            >
              <img
                src={`http://localhost:8000${user?.profilePicture}`}
                className="h-full w-full rounded-full"
                alt="profile"
              />
            </Link>
            {/* Logout */}
            <Link to="/login" onClick={handleLogout}>
              <div
                className={`cursor-pointer w-fit text-[15px] p-[6px] px-[15px] bg-black text-white border-[1px] border-black hover:border-black hover:text-black hover:bg-white duration-300 transition-all`}
              >
                Logout
              </div>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <div
              className={`cursor-pointer w-fit text-[15px] p-[6px] px-[15px] bg-black text-white border-[1px] border-black hover:border-black hover:text-black hover:bg-white duration-300 transition-all`}
            >
              Login
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
