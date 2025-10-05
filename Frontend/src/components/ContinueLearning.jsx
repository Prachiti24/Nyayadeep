import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ContinueLearning({ userId }) {
    const [recentLessons, setRecentLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user's progress to get completed lessons
        axios.get(`http://localhost:5000/api/progress/${userId}`)
            .then(res => {
                const progress = res.data;
                // For now, we'll simulate recent lessons. In a real app, you'd fetch from lessons API
                // and filter based on progress.completedLessons
                setRecentLessons([
                    { id: 1, title: "Preamble of the Constitution", progress: 75, lastPosition: "Article 1" },
                    { id: 2, title: "Fundamental Rights", progress: 50, lastPosition: "Right to Equality" },
                    { id: 3, title: "Directive Principles", progress: 25, lastPosition: "Article 36" }
                ]);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <div className="flex justify-center items-center p-4"><p>Loading...</p></div>;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-primary">📚 Continue Learning</h3>
            {recentLessons.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No recent lessons. Start learning!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentLessons.map((lesson) => (
                        <Link key={lesson.id} to={`/lesson/${lesson.id}`} className="block">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-lg transition-shadow">
                                <h4 className="font-semibold mb-2">{lesson.title}</h4>
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
    );
}

export default ContinueLearning;
