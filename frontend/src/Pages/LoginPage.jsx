import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate();
  const host = "http://localhost:5000";

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", username: "", password: "" });

  // Handle input changes
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const json = await response.json();
      console.log(json);

      if (json.token) {
        localStorage.setItem("token", json.token); // Save token
        navigate("/"); // Redirect to homepage
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong while logging in");
    }
  };

  // Signup submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const json = await response.json();
      console.log(json);

      if (json.token) {
        localStorage.setItem("token", json.token); // Save token
        alert("Registration successful! Please log in.");
        setIsRightPanelActive(false); // Switch to login panel
      } else {
        alert("Email already exists or input is invalid");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Something went wrong while signing up");
    }
  };

  return (
    <div id="first-login">
      <h2>Nyaydeep</h2>
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">

        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignupSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" value={signupData.name} onChange={handleSignupChange} required />
            <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
            <input type="text" name="username" placeholder="Username" value={signupData.username} onChange={handleSignupChange} required />
            <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
