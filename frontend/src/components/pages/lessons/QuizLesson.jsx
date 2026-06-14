import { useState } from 'react';

const QuizLesson = ({ questions, unitName }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill('')
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const host = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'https://prachiti24-nyayadeep.onrender.com';

  const handleOptionChange = (qIndex, option) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[qIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    let newScore = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) newScore += 1;
    });

    setScore(newScore);
    setSubmitted(true);

    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.warn('No userId in localStorage — user might not be logged in.');
        alert('Please sign in before submitting the quiz so your progress can be saved.');
        return;
      }

      const res = await fetch(`${host}/api/quizProgress/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          unitName,
          score: newScore,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error('Non-OK response from progress API', res.status, data);
        alert('⚠️ Failed to save progress (server error). Check console for details.');
        return;
      }

      if (data && data.success) {
        alert(`✅ Progress saved! Lesson marked as completed.\nXP Earned: ${data.progress.xp_earned}`);
      } else {
        console.error('Progress API returned success=false', data);
        alert('⚠️ Failed to save progress. Please try again.');
      }
    } catch (err) {
      console.error('Error updating progress:', err);
      alert('❌ Error saving progress. Please try again later.');
    }
  };

  return (
    <div className="p-4 border-2 border-green-500 rounded resize-y overflow-auto max-h-[400px]">
      <h2 className="text-2xl font-semibold mb-4">Quick Quiz</h2>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-6">
          <p className="mb-2 font-semibold">
            {qIndex + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((option) => (
              <label key={option} className="block">
                <input
                  type="radio"
                  value={option}
                  checked={selectedAnswers[qIndex] === option}
                  onChange={() => handleOptionChange(qIndex, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Submit Quiz
      </button>

      {submitted && (
        <div className="mt-6 text-lg font-semibold">
          Your score: {score} / {questions.length}
        </div>
      )}
    </div>
  );
};

export default QuizLesson;
