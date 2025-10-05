// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // Get auth token from localStorage (or wherever you store it)
  const authToken = localStorage.getItem("token");

  // If token exists, allow access, else redirect to login
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
