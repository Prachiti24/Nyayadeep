import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const HomeRedirect = () => {
  const token = localStorage.getItem("token");

  if (token) {
    // If logged in, redirect to home (LandingPage)
    return <Navigate to="/home" replace />;
  } else {
    // If not logged in, redirect to signin
    return <Navigate to="/signin" replace />;
  }
};

export default HomeRedirect;
