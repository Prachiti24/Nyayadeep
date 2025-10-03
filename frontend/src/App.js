import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/Home";
import ChatbotPage from "./Pages/ChatbotPage";
import VerifyOtp from "./Pages/VerifyOtp";
import SpinWheelGame from "./Components/SpinWheelGame/SpinWheelGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/spin-wheel" element={<SpinWheelGame />} />
    </Routes>
  );
}

export default App;
