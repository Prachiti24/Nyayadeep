import { useState } from "react";

const Lesson4Quiz = ({ host }) => {
  const questions = [
    {
      question: "In which part of the Indian Constitution are DPSPs enshrined?",
      options: ["Part III", "Part IV", "Part V"],
      answer: "Part IV",
    },
    {
      question:
        "Which Articles cover the Directive Principles of State Policy?",
      options: ["Articles 12–35", "Articles 36–51", "Articles 52–75"],
      answer: "Articles 36–51",
    },
    {
      question:
        "Which Directive Principle aims to promote social, economic, and political justice?",
      options: ["Article 38", "Article 39A", "Article 44"],
      answer: "Article 38",
    },
    {
      question: "Which article ensures free legal aid to citizens?",
      options: ["Article 39A", "Article 41", "Article 45"],
      answer: "Article 39A",
    },
    {
      question:
        "Which Directive Principle focuses on the organisation of village panchayats?",
      options: ["Article 40", "Article 43B", "Article 48A"],
      answer: "Article 40",
    },
    {
      question: "Which DPSP promotes the Uniform Civil Code for citizens?",
      options: ["Article 44", "Article 48", "Article 51"],
      answer: "Article 44",
    },
    {
      question:
        "Which case declared that Fundamental Rights hold supremacy over DPSPs?",
      options: [
        "Minerva Mills (1980)",
        "Kesavananda Bharati (1973)",
        "Champakam Dorairajan (1951)",
      ],
      answer: "Minerva Mills (1980)",
    },
    {
      question: "DPSPs are considered:",
      options: ["Justiciable", "Non-justiciable", "Partially enforceable in court"],
      answer: "Non-justiciable",
    },
    {
      question:
        "Which DPSP protects monuments and places of national importance?",
      options: ["Article 49", "Article 48A", "Article 47"],
      answer: "Article 49",
    },
    {
      question:
        "The Directive Principles aim to establish which type of state?",
      options: ["Welfare State", "Police State", "Socialist Republic"],
      answer: "Welfare State",
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
          unitName: "lesson4",
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

export default Lesson4Quiz;
