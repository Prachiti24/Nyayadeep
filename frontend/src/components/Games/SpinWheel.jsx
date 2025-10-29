import React from "react";
import { SpinWheel, ISpinWheelProps } from "spin-wheel-game";

const SpinWheelGame = () => {
  // You can also fetch this from your backend API later (e.g., /api/wheel)
  const segments = [
    { segmentText: "Fundamental Rights", segColor: "#ff6666" },
    { segmentText: "Directive Principles", segColor: "#66b3ff" },
    { segmentText: "Preamble", segColor: "#99ff99" },
    { segmentText: "Amendments", segColor: "#ffcc66" },
    { segmentText: "Schedules", segColor: "#c299ff" },
    { segmentText: "Union Government", segColor: "#ff99cc" },
    { segmentText: "State Government", segColor: "#66ffcc" },
    { segmentText: "Judiciary", segColor: "#ffb366" },
  ];

  const handleSpinFinish = (result) => {
    console.log("Spun to:", result);
    alert(`You landed on: ${result}`);
    // If needed, send this to backend (MongoDB) for tracking
    // fetch("/api/save-spin", { method: "POST", body: JSON.stringify({ result }) });
  };

  const spinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: "black",
    contrastColor: "white",
    buttonText: "Spin 🎉",
    isOnlyOnce: false,
    size: 320,
    upDuration: 200,
    downDuration: 800,
    fontFamily: "Arial",
    arrowLocation: "top",
    showTextOnSpin: true,
    isSpinSound: true,
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🇮🇳 Constitution Spin Wheel</h1>
      <SpinWheel {...spinWheelProps} />
    </div>
  );
};

export default SpinWheelGame;