import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function LessonDetail() {
    const { lessonId } = useParams();
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const [lesson, setLesson] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [lastPosition, setLastPosition] = useState('');

    useEffect(() => {
        // Fetch lesson data
        axios.get(`https://prachiti24-nyayadeep.onrender.com/api/lessons/${lessonId}`)
            .then(res => {
                setLesson(res.data);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        // Fetch user progress for this lesson
        axios.get(`https://prachiti24-nyayadeep.onrender.com/api/progress/${userId}`)
            .then(res => {
                const userProgress = res.data;
                setProgress(userProgress);
                const lessonProgress = userProgress.completedLessons?.find(l => l.lessonId === lessonId);
                if (lessonProgress) {
                    setCompleted(lessonProgress.isCompleted);
                    setLastPosition(lessonProgress.lastPosition || '');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [lessonId, userId]);

    const updateProgress = (position, isCompleted = false) => {
        axios.post("https://prachiti24-nyayadeep.onrender.com/api/lessons/progress", {
            userId,
            lessonId,
            lastPosition: position,
            isCompleted
        })
            .then(res => {
                setProgress(res.data);
                if (isCompleted) {
                    setCompleted(true);
                    alert("Lesson completed! +10 XP");
                }
            })
            .catch(err => console.error(err));
    };

    const markAsCompleted = () => {
        updateProgress(lastPosition, true);
    };

    const handlePositionChange = (e) => {
        const newPosition = e.target.value;
        setLastPosition(newPosition);
        updateProgress(newPosition);
    };

    if (loading) return <div className="flex justify-center items-center p-4"><p>Loading lesson...</p></div>;

    if (!lesson) return <div className="flex justify-center items-center p-4"><p>Lesson not found</p></div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-primary">{lesson.lesson_title}</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{lesson.description}</p>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Position:
                    </label>
                    <input
                        type="text"
                        value={lastPosition}
                        onChange={handlePositionChange}
                        placeholder="e.g., Article 1"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    />
                </div>
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
