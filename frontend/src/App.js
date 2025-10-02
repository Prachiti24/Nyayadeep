import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import ProgressTracker from "./components/ProgressTracker";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/progress" element={<ProgressTracker />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}

export default App;
