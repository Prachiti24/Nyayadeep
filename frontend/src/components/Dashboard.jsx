import React from "react";
import ProgressTracker from "../components/ProgressTracker";
import Leaderboard from "../components/Leaderboard";
import ContinueLearning from "../components/ContinueLearning";

function Dashboard() {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    if (!userId) {
        return (
            <div className="container mx-auto p-6">
                <p>Please log in to view your dashboard.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-primary">Welcome to your Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProgressTracker userId={userId} />
                <Leaderboard />
                <ContinueLearning userId={userId} />
            </div>
        </div>
    );
}

export default Dashboard;
