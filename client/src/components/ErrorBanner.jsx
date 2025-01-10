import React, { useState } from "react";
import { FaCross, FaCrosshairs, FaExclamation, FaXing } from "react-icons/fa";
import { useSelector } from "react-redux";

const ErrorBanner = () => {
  const { error } = useSelector((state) => state.auth);
  return (
    error && (
      <div className="w-fit mx-auto mt-10">
        <span className="font-mono text-[14px] text-red-600 flex items-center gap-5 text-justify">
          <span className="w-fit bg-red-600 rounded-full p-1 text-[8px]">
            <FaExclamation className="text-white" />
          </span>
          {error}
        </span>
      </div>
    )
  );
};

export default ErrorBanner;
