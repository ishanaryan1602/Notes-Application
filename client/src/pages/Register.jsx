import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  registrationStart,
  registrationSuccess,
  registrationFailure,
  clearError
} from "../redux/authSlice/authSlice";
import ErrorBanner from "../components/ErrorBanner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    setDataUser((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const handleRegistration = (e) => {
    e.preventDefault();

    const postCallForRegistration = async () => {
      try {
        dispatch(registrationStart());

        const response = await axios.post(
          "http://localhost:8000/api/auth/register",
          dataUser
        );

        const data = response.data;

        if (!data.success) {
          dispatch(registrationFailure(data.message));
          return;
        }


        setDataUser({
          username: "",
          email: "",
          password: "",
        });

        dispatch(registrationSuccess(data));
        navigate("/login");
      } catch (err) {
        dispatch(registrationFailure(err.response.data.message));
        setDataUser({
          username: "",
          email: "",
          password: "",
        });
      }
    };

    postCallForRegistration();
  };

  return (
    <div className="w-5/12 mx-auto text-center">
      <h1 className="text-2xl font-mono mt-10">Register</h1>
      <form
        className="flex flex-col items-center mt-10 gap-10"
        onSubmit={handleRegistration}
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
          {loading ? "Loading.." : "Register"}
          
        </button>
      </form>
      {error && <ErrorBanner />}
      <div className="mt-10 font-mono text-sm">
        <p>
          Already have an account ?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
