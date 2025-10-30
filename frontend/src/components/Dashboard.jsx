import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import ProgressTracker from "../components/ProgressTracker";
import Leaderboard from "../components/Leaderboard";
import ContinueLearning from "../components/ContinueLearning";
import axios from "axios";

function Dashboard() {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            fetchStats();
        }
    }, [userId]);

    const fetchStats = async () => {
        try {
            const progressRes = await axios.get(`http://localhost:5000/api/progress/${userId}`);
            const progress = progressRes.data;

            // Mock data for charts - in real app, fetch from backend
            const mockStats = {
                xpOverTime: [
                    { date: '2024-01-01', xp: 0 },
                    { date: '2024-01-02', xp: 50 },
                    { date: '2024-01-03', xp: 120 },
                    { date: '2024-01-04', xp: 200 },
                    { date: '2024-01-05', xp: progress.xp || 280 },
                ],
                lessonCompletion: [
                    { name: 'Completed', value: progress.completedLessons?.length || 0, color: '#10B981' },
                    { name: 'In Progress', value: 5, color: '#F59E0B' },
                    { name: 'Not Started', value: 10, color: '#EF4444' },
                ],
                weeklyActivity: [
                    { day: 'Mon', lessons: 2, quizzes: 1, games: 0 },
                    { day: 'Tue', lessons: 3, quizzes: 2, games: 1 },
                    { day: 'Wed', lessons: 1, quizzes: 0, games: 2 },
                    { day: 'Thu', lessons: 4, quizzes: 1, games: 1 },
                    { day: 'Fri', lessons: 2, quizzes: 3, games: 0 },
                    { day: 'Sat', lessons: 1, quizzes: 1, games: 1 },
                    { day: 'Sun', lessons: 0, quizzes: 0, games: 0 },
                ]
            };
            setStats(mockStats);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setLoading(false);
        }
    };

    if (!userId) {
        return (
            <div className="container mx-auto p-6">
                <p>Please log in to view your dashboard.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-primary">Welcome to your Dashboard</h2>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="font-semibold mb-2">📚 Continue Lesson</h3>
                    <p className="text-sm">Pick up where you left off</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="font-semibold mb-2">🧠 Take Quiz</h3>
                    <p className="text-sm">Test your knowledge</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="font-semibold mb-2">🎮 Play Game</h3>
                    <p className="text-sm">Have fun while learning</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="font-semibold mb-2">📖 Read E-Book</h3>
                    <p className="text-sm">Explore detailed content</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* XP Progress Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-primary">📈 XP Progress Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={stats?.xpOverTime}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="xp" stroke="#3B82F6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Lesson Completion Pie Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-primary">📊 Lesson Completion Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={stats?.lessonCompletion}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {stats?.lessonCompletion.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Weekly Activity Bar Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4 text-primary">📅 Weekly Activity</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats?.weeklyActivity}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="lessons" fill="#10B981" name="Lessons" />
                            <Bar dataKey="quizzes" fill="#F59E0B" name="Quizzes" />
                            <Bar dataKey="games" fill="#8B5CF6" name="Games" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Existing Components */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProgressTracker userId={userId} />
                <Leaderboard />
                <ContinueLearning userId={userId} />
            </div>
        </div>
    );
}

export default Dashboard;
