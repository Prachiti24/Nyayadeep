import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
