import React, { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/progress/leaderboard/top") // update route if changed
      .then((res) => {
        setLeaders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center p-4">
        <p>Loading leaderboard...</p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-primary">🏆 Leaderboard</h3>

      {leaders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No users yet.</p>
      ) : (
        <div className="space-y-2">
          {leaders.map((user, i) => (
            <div
              key={user._id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                i === 0
                  ? "bg-yellow-100 dark:bg-yellow-900"
                  : i === 1
                  ? "bg-gray-100 dark:bg-gray-700"
                  : i === 2
                  ? "bg-orange-100 dark:bg-orange-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`text-lg font-bold ${
                    i === 0
                      ? "text-yellow-600"
                      : i === 1
                      ? "text-gray-600"
                      : i === 2
                      ? "text-orange-600"
                      : "text-gray-500"
                  }`}
                >
                  #{i + 1}
                </span>
                <span className="font-medium">{user.name || "Unknown User"}</span>
              </div>
              <span className="font-bold text-secondary">{user.xpTotal || 0} XP</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
