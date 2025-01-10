import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../redux/authSlice/authSlice";
import ErrorBanner from "../components/ErrorBanner";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, error, loading, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
    profilePicture: "",
  });
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    dispatch(clearError());
  }, []);

  const handleOnChange = (e) => {
    setDataUser((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const postCallForRegistration = async () => {
      try {
        dispatch(loginStart());

        const response = await axios.post(
          "http://localhost:8000/api/auth/login",
          dataUser,
          { withCredentials: true }
        );

        const data = response.data;

        if (!data.success) {
          dispatch(loginFailure(data.message));
          return;
        }

        setDataUser({
          username: "",
          password: "",
        });

        setDataUser((prev) => ({
          ...prev,
          profilePicture: data.user.profilePicture,
        }));

        dispatch(loginSuccess(data));

        navigate("/");
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          "An error occurred. Please try again.";
        dispatch(loginFailure(errorMessage));
        setDataUser((prev) => ({
          ...prev,
          username: "",
          password: "",
        }));
      }
    };

    postCallForRegistration();
  };

  return (
    <div className="w-5/12 mx-auto text-center">
      <h1 className="text-2xl font-mono mt-10">Login</h1>
      <form
        className="flex flex-col items-center mt-10 gap-10"
        onSubmit={handleLogin}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={dataUser.username}
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
          {loading ? "Loading.." : "Login"}
        </button>
      </form>
      {error && <ErrorBanner />}
      <div className="mt-10 font-mono text-sm">
        <p>
          Don't have an account ?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
