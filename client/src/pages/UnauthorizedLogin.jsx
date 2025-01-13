import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedLogin = () => {
  return (
    <div className="w-full h-fit p-5 bg-white overflow-hidden flex justify-center items-center relative">
      <div className="w-8/12 flex justify-center items-center">
        <img
          src="/blur-notes-page.png"
          alt=""
          className="w-full h-[85vh] object-cover"
          style={{
            objectPosition: "left center",
          }}
        />
      </div>
      <div className="w-full h-screen bg-[rgba(255,255,255,0.2)] absolute inset-0 backdrop-blur-md flex justify-center items-center">
        <div className="flex flex-col items-center gap-[15px] pb-[200px]">
          <p className="text-[20px]">
            To access this page you need to be signed in.
          </p>
          <p className="text-[18px]">
            Go to{" "}
            <Link to="/login" className="underline">
              Login
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedLogin;
