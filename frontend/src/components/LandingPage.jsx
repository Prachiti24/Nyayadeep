// src/Pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center p-4">
      {/* Welcome message */}
      <h1 className="display-4 mb-3">Welcome to NyayDeep</h1>
      <p className="lead mb-5">
        NyayDeep is your digital guide to understanding the Constitution of India,
        your legal rights, and civic responsibilities.
      </p>

      {/* Login / Signup button */}
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
    </div>
  );
}
