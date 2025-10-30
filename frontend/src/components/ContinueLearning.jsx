import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ContinueLearning({ userId }) {
    const [recentLessons, setRecentLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pendingQuizzes, setPendingQuizzes] = useState([]);
    const [pendingGames, setPendingGames] = useState([]);

    useEffect(() => {
        fetchContinueData();
    }, [userId]);

    const fetchContinueData = async () => {
        try {
            // Fetch user's progress to get completed lessons
            const progressRes = await axios.get(`http://localhost:5000/api/progress/${userId}`);
            const progress = progressRes.data;
            const completedLessons = progress.completedLessons || [];

            // Fetch lesson details for completed lessons
            const lessonPromises = completedLessons.map(async (lessonProgress) => {
                try {
                    const lessonRes = await axios.get(`http://localhost:5000/api/lessons/${lessonProgress.lessonId}`);
                    return {
                        ...lessonRes.data,
                        progress: lessonProgress.isCompleted ? 100 : 50, // Simple progress calculation
                        lastPosition: lessonProgress.lastPosition || 'Not started'
                    };
                } catch (err) {
                    console.error(`Error fetching lesson ${lessonProgress.lessonId}:`, err);
                    return null;
                }
            });

            const lessons = await Promise.all(lessonPromises);
            const validLessons = lessons.filter(l => l !== null);
            setRecentLessons(validLessons);

            // Mock pending quizzes and games - in real app, fetch from backend
            setPendingQuizzes([
                { id: 1, title: "Constitution Basics Quiz", progress: 75, lastAttempt: "2 days ago" },
                { id: 2, title: "Fundamental Rights Test", progress: 0, lastAttempt: "Not started" }
            ]);

            setPendingGames([
                { id: 1, title: "Article Hunt Game", progress: 60, lastAttempt: "1 day ago" },
                { id: 2, title: "Rights Matching Puzzle", progress: 0, lastAttempt: "Not started" }
            ]);

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center p-4"><p>Loading...</p></div>;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-primary">📚 Continue Learning</h3>

            {/* Lessons */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Recent Lessons</h4>
                {recentLessons.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No recent lessons. Start learning!</p>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {recentLessons.slice(0, 3).map((lesson) => (
                            <Link key={lesson._id} to={`/lesson/${lesson._id}`} className="block">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-lg transition-shadow">
                                    <h4 className="font-semibold mb-2">{lesson.lesson_title}</h4>
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{ width: `${lesson.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Progress: {lesson.progress}% | Last: {lesson.lastPosition}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Pending Quizzes */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">🧠 Pending Quizzes</h4>
                {pendingQuizzes.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No pending quizzes.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {pendingQuizzes.map((quiz) => (
                            <Link key={quiz.id} to={`/quiz/${quiz.id}`} className="block">
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg hover:shadow-lg transition-shadow border-l-4 border-yellow-400">
                                    <h4 className="font-semibold mb-2">{quiz.title}</h4>
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                                        <div
                                            className="bg-yellow-500 h-2 rounded-full"
                                            style={{ width: `${quiz.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Progress: {quiz.progress}% | Last: {quiz.lastAttempt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Pending Games */}
            <div>
                <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">🎮 Pending Games</h4>
                {pendingGames.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No pending games.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {pendingGames.map((game) => (
                            <Link key={game.id} to={`/game/${game.id}`} className="block">
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg hover:shadow-lg transition-shadow border-l-4 border-purple-400">
                                    <h4 className="font-semibold mb-2">{game.title}</h4>
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                                        <div
                                            className="bg-purple-500 h-2 rounded-full"
                                            style={{ width: `${game.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Progress: {game.progress}% | Last: {game.lastAttempt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContinueLearning;
