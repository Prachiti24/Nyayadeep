import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/Home";
import ChatbotPage from "./Pages/ChatbotPage";
import VerifyOtp from "./Pages/VerifyOtp";
import ProfilePage from "./Pages/ProfilePage";
import LandingPage from "./Pages/LandingPage";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <PrivateRoute>
            <ChatbotPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
