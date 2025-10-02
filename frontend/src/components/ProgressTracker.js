import React, { useEffect, useState } from "react";
import axios from "axios";

function ProgressTracker({ userId }) {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/progress/${userId}`)
        .then(res => setProgress(res.data))
        .catch(err => console.error(err));
    }, [userId]);

    if (!progress) return <p>Loading progress...</p>;

    return (
        <div className="progress-tracker">
        <h3>📈 Your Progress</h3>
        <p>XP: {progress.xp}</p>
        <p>🔥 Streaks: {progress.streaks}</p>
        <p>🏆 Badges: {progress.badges.length > 0 ? progress.badges.join(", ") : "No badges yet"}</p>
        </div>
    );
}

export default ProgressTracker;
