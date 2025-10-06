import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToChatbot = () => {
    navigate("/chatbot"); // Replace with your chatbot route
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", padding: "20px" }}>
      <h1>Home</h1>
      <p>Welcome to Nyaydeep!</p>

      {/* Chatbot Button */}
      <button
        onClick={goToChatbot}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
          fontSize: "16px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
      >
        Go to Chatbot
      </button>

      {/* Profile Image at top-right */}
      <img
        src="https://t3.ftcdn.net/jpg/15/62/50/30/360_F_1562503097_O73UeZy5LK1iAoOZFlf6Ac9FpAGnoi61.jpg"
        alt="Profile"
        onClick={goToProfile}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          cursor: "pointer",
          objectFit: "cover",
          position: "fixed",
          top: "20px",
          right: "20px",
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>
  );
};

export default HomePage;
