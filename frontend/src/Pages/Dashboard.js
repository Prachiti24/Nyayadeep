import React from "react";
import ProgressTracker from "../components/ProgressTracker";
import Leaderboard from "../components/Leaderboard";

function Dashboard({ userId }) {
    return (
        <div className="dashboard">
        <h2>Welcome to your Dashboard</h2>
        <ProgressTracker userId={userId} />
        <Leaderboard />
        </div>
    );
}

export default Dashboard;
