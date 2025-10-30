import { useState } from "react";

const Lesson3Quiz = ({ host }) => {
  const questions = [
    {
      question: "Which of these is a Fundamental Right?",
      options: ["Right to Vote", "Right to Equality", "Right to Property"],
      answer: "Right to Equality",
    },
    {
      question: "Fundamental Rights are guaranteed to whom?",
      options: ["Only adults", "All citizens", "Government officials"],
      answer: "All citizens",
    },
    {
      question: "Which right ensures freedom of speech?",
      options: ["Right to Equality", "Right to Freedom", "Right to Education"],
      answer: "Right to Freedom",
    },
    {
      question:
        "Which Article of the Constitution protects Right to Constitutional Remedies?",
      options: ["Article 32", "Article 14", "Article 19"],
      answer: "Article 32",
    },
    {
      question: "Which Fundamental Right prohibits untouchability?",
      options: [
        "Right to Freedom",
        "Right to Equality",
        "Right Against Exploitation",
      ],
      answer: "Right to Equality",
    },
    {
      question:
        "Which right protects individuals from forced labor and child labor?",
      options: [
        "Right Against Exploitation",
        "Right to Freedom",
        "Right to Equality",
      ],
      answer: "Right Against Exploitation",
    },
    {
      question: "Which Articles provide for Cultural and Educational Rights?",
      options: ["Articles 29–30", "Articles 25–28", "Articles 19–22"],
      answer: "Articles 29–30",
    },
    {
      question:
        "Right to Freedom of Religion is guaranteed under which Articles?",
      options: ["Articles 25–28", "Articles 14–18", "Articles 32–35"],
      answer: "Articles 25–28",
    },
    {
      question:
        "Which Fundamental Right is called the 'Heart and Soul of the Constitution'?",
      options: [
        "Right to Freedom",
        "Right to Constitutional Remedies",
        "Right to Equality",
      ],
      answer: "Right to Constitutional Remedies",
    },
    {
      question:
        "Which Fundamental Right ensures the right to elementary education for children?",
      options: ["Article 21A", "Article 14", "Article 19"],
      answer: "Article 21A",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

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
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.warn("No userId in localStorage — user might not be logged in.");
        alert("Please sign in before submitting the quiz so your progress can be saved.");
        return;
      }

      const res = await fetch(`${host}/api/quizProgress/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          unitName: "lesson3",
          score: newScore,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Non-OK response from progress API", res.status, data);
        alert("⚠️ Failed to save progress (server error). Check console for details.");
        return;
      }

      if (data && data.success) {
        alert(`✅ Progress saved! Lesson marked as completed.\nXP Earned: ${data.progress.xp_earned}`);
      } else {
        console.error("Progress API returned success=false", data);
        alert("⚠️ Failed to save progress. Please try again.");
      }
    } catch (err) {
      console.error("Error updating progress:", err);
      alert("❌ Error saving progress. Please try again later.");
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

export default Lesson3Quiz;
