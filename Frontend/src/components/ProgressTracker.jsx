import React, { useEffect, useState } from "react";
import axios from "axios";

function ProgressTracker({ userId }) {
    const [progress, setProgress] = useState(null);
    const [streakUpdated, setStreakUpdated] = useState(false);

    useEffect(() => {
        fetchProgress();
        // Check streak on component mount
        if (!streakUpdated) {
            axios.post("http://localhost:5000/api/progress/streak-check", { userId })
                .then(() => {
                    setStreakUpdated(true);
                    fetchProgress();
                })
                .catch(err => console.error(err));
        }
    }, [userId, streakUpdated]);

    const fetchProgress = () => {
        axios.get(`http://localhost:5000/api/progress/${userId}`)
            .then(res => setProgress(res.data))
            .catch(err => console.error(err));
    };

    if (!progress) return <div className="flex justify-center items-center p-4"><p>Loading progress...</p></div>;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-primary">📈 Your Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                    <p className="text-3xl font-bold text-secondary">{progress.xp || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">XP Points</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-red-500">🔥 {progress.streaks || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-500">🏆 {progress.badges?.length || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Badges</p>
                </div>
            </div>
            {progress.badges && progress.badges.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Badges Earned:</h4>
                    <div className="flex flex-wrap gap-2">
                        {progress.badges.map((badge, index) => (
                            <span key={index} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-4">
                <h4 className="font-semibold mb-2">Completed Lessons: {progress.completedLessons?.length || 0}</h4>
            </div>
        </div>
    );
}

export default ProgressTracker;
