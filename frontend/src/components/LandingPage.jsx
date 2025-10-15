// src/Pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from './Dashboard'; // Import Dashboard component

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      {/* Landing Section - Always visible */}
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-50 bg-light text-center p-4">
        {/* Welcome message */}
        <h1 className="display-4 mb-3">Welcome to NyayDeep</h1>
        <p className="lead mb-5">
          NyayDeep is your digital guide to understanding the Constitution of India,
          your legal rights, and civic responsibilities.
        </p>

        {!isLoggedIn && (
          <>
            {/* Login / Signup button - Only show when not logged in */}
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/signin")}
            >
              Login / Signup
            </button>

            {/* Small footer */}
            <footer className="mt-5 text-muted">
              &copy; {new Date().getFullYear()} NyayDeep. All rights reserved.
            </footer>
          </>
        )}
      </div>

      {/* Dashboard Section - Show when logged in */}
      {isLoggedIn && (
        <div className="bg-white">
          <Dashboard />
        </div>
      )}
    </div>
  );
}
