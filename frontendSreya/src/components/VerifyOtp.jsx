import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyOtp.css"; 

const VerifyOtp = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/verifySignupEmailOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Emailotp: otpString }),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert("Email verified successfully!");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during verification");
    }
  };

  return (
    <div className="verify-otp-page">
      <div className="otp-container">
        <h2>Email Verification</h2>
        <p>Enter the 6-digit OTP sent to your email</p>
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="otp-box"
              />
            ))}
          </div>
          <button type="submit" className="verify-btn">Verify OTP</button>
        </form>
        <button onClick={() => navigate("/login")} className="back-btn">
          Back to Login/Signup
        </button>
      </div>
    </div>
  );
};


export default VerifyOtp;
