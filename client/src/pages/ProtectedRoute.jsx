import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const cookie = Cookies.get("token");
  if (!cookie) {
    return <Navigate to="/unauthorized" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
