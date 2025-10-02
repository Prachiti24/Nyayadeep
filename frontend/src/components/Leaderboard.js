import React, { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/progress/leaderboard/top")
        .then(res => setLeaders(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="leaderboard">
        <h3>🏆 Leaderboard</h3>
        <ul>
            {leaders.map((user, i) => (
            <li key={user._id}>
                {i + 1}. {user.userId?.name || "Unknown"} - {user.xp} XP
            </li>
            ))}
        </ul>
        </div>
    );
}

export default Leaderboard;
