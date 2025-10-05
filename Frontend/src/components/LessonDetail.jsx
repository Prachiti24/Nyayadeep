import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function LessonDetail() {
    const { lessonId } = useParams();
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const [lesson, setLesson] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // Fetch lesson data (assuming you have a lessons API)
        // For now, using mock data
        setLesson({
            id: lessonId,
            title: "Sample Lesson",
            content: "This is the lesson content. In a real app, this would be fetched from the backend.",
            lastPosition: "Article 1"
        });

        // Fetch user progress for this lesson
        axios.get(`http://localhost:5000/progress/${userId}`)
            .then(res => {
                const userProgress = res.data;
                setProgress(userProgress);
                setCompleted(userProgress.completedLessons?.includes(lessonId));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [lessonId, userId]);

    const markAsCompleted = () => {
        axios.post("http://localhost:5000/progress/complete-lesson", { userId, lessonId })
            .then(() => {
                setCompleted(true);
                // Award XP
                axios.post("http://localhost:5000/progress/xp-update", { userId, xp: 10 })
                    .then(() => {
                        alert("Lesson completed! +10 XP");
                    });
            })
            .catch(err => console.error(err));
    };

    if (loading) return <div className="flex justify-center items-center p-4"><p>Loading lesson...</p></div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-primary">{lesson.title}</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{lesson.content}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Position: {lesson.lastPosition}</p>
            </div>
            {!completed ? (
                <button
                    onClick={markAsCompleted}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Mark as Completed
                </button>
            ) : (
                <p className="text-green-600 font-semibold">✅ Lesson Completed!</p>
            )}
        </div>
    );
}

export default LessonDetail;
