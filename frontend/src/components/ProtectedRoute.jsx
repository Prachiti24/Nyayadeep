import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to signin page
    return <Navigate to="/signin" replace />;
  }

  return children; // Else, render the protected component
};

export default ProtectedRoute;
