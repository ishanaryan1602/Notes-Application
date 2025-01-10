import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  clearError,
  logout,
} from "../redux/authSlice/authSlice";
import ErrorBanner from "../components/ErrorBanner";
import Cookies from "js-cookie";

const UserUpdate = () => {
  const [showBin, setShowBin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    setDataUser((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/${user._id}`
      );
      const data = response.data;
      setDataUser({
        username: data.user.username,
        email: data.user.email,
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    dispatch(clearError());
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const response = await axios.put(
        `http://localhost:8000/api/user/${user._id}`,
        dataUser
      );
      const data = response.data;
      if (!data.success) {
        dispatch(updateFailure(data.message));
      }
      dispatch(updateSuccess(data));
      setDataUser((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (error) {
      dispatch(updateFailure(error?.response?.data.message));
    }
  };

  const handleUserDelete = async (e) => {
    e.preventDefault();
    const userId = user._id;

    if (!userId) {
      dispatch(deleteUserFailure("User ID not found"));
      return;
    }
    try {
      dispatch(deleteUserStart());
      const response = await axios.delete(
        `http://localhost:8000/api/user/${userId}`
      );
      const data = response.data;
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
      }
      Cookies.remove("token");
      dispatch(deleteUserSuccess());
      dispatch(logout());
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      dispatch(deleteUserFailure(errorMessage));
    }
  };

  return (
    <div className="w-5/12 mx-auto text-center">
      <div className="my-[50px]">
        <img
          src={`http://localhost:8000${user?.profilePicture}`}
          className="rounded-full h-[50px] w-[50px] mx-auto"
          alt="profile"
        />
      </div>
      <form
        className="flex flex-col items-center mt-10 gap-10"
        onSubmit={handleUpdateProfile}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={dataUser.username}
          onChange={handleOnChange}
          className="outline-none border-b-[1px] font-mono tracking-wider border-gray-200 py-[5px] w-[300px] min-w-fit bg-transparent"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={dataUser.email}
          onChange={handleOnChange}
          className="outline-none border-b-[1px] font-mono tracking-wider border-gray-200 py-[5px] w-[300px] min-w-fit bg-transparent"
        />
        <div className="w-[300px] min-w-fit relative">
          <div
            onClick={handleShowPassword}
            className="absolute right-0 top-[50%] transform translate-y-[-50%]"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={dataUser.password}
            name="password"
            onChange={handleOnChange}
            placeholder="Password"
            className="outline-none border-b-[1px] font-mono tracking-wider border-gray-200 py-[5px] w-full bg-transparent"
          />
        </div>
        <button
          className={`cursor-pointer w-[300px] text-[15px] p-2 px-3 bg-black text-white border-[1px] border-black hover:border-black hover:text-black hover:bg-white duration-300 transition-all `}
          type="submit"
        >
          {loading ? "Loading..." : "Update Profile "}
        </button>
      </form>
      <button
        className={`cursor-pointer w-[300px] text-[15px] p-2 px-3 bg-black text-white border-[1px] border-black hover:border-black hover:text-black hover:bg-white duration-300 transition-all mt-5 mx-auto flex items-center justify-center gap-[5px] `}
        onMouseEnter={() => setShowBin(true)}
        onMouseLeave={() => setShowBin(false)}
        onClick={handleUserDelete}
      >
        Delete Profile
        {showBin ? <MdDelete /> : <MdDeleteOutline />}
      </button>
      {error && <ErrorBanner />}
    </div>
  );
};

export default UserUpdate;
