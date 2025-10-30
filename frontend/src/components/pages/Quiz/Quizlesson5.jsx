import { useState } from "react";

const Lesson5Quiz = ({ host }) => {
  const questions = [
    {
      question:
        "Which Article of the Indian Constitution guarantees equality before the law?",
      options: ["Article 14", "Article 15", "Article 16"],
      answer: "Article 14",
    },
    {
      question:
        "Which Article prohibits discrimination based on sex while allowing positive action for women?",
      options: ["Article 15", "Article 19", "Article 21"],
      answer: "Article 15",
    },
    {
      question:
        "Which Article guarantees the right to life and personal liberty, including dignity and privacy?",
      options: ["Article 21", "Article 22", "Article 23"],
      answer: "Article 21",
    },
    {
      question:
        "Which Article ensures maintenance to women in case of desertion or inability to support themselves?",
      options: ["Section 125 CrPC", "Article 42", "Article 41"],
      answer: "Section 125 CrPC",
    },
    {
      question: "Which Articles form the backbone of gender equality in India?",
      options: ["Articles 14, 15, 16", "Articles 19, 21, 22", "Articles 36–51"],
      answer: "Articles 14, 15, 16",
    },
    {
      question:
        "Which Directive Principle emphasizes maternity relief and protection against exploitation?",
      options: ["Article 42", "Article 38", "Article 39"],
      answer: "Article 42",
    },
    {
      question:
        "Which amendment reserved seats for women in Panchayats and Municipalities?",
      options: ["73rd and 74th Amendments", "42nd Amendment", "86th Amendment"],
      answer: "73rd and 74th Amendments",
    },
    {
      question:
        "Which judicial case expanded the right to privacy and dignity for women?",
      options: [
        "Neera Mathur v. LIC",
        "Minerva Mills v. Union of India",
        "Kesavananda Bharati v. State of Kerala",
      ],
      answer: "Neera Mathur v. LIC",
    },
    {
      question:
        "Which Article encourages citizens to respect the dignity of women and uphold equality?",
      options: ["Article 51A(e) and 51A(f)", "Article 19(1)(a)", "Article 21"],
      answer: "Article 51A(e) and 51A(f)",
    },
    {
      question: "Gender justice in India includes:",
      options: [
        "Only legal equality",
        "Legal, social, economic, and political empowerment",
        "Only economic opportunities",
      ],
      answer: "Legal, social, economic, and political empowerment",
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
          unitName: "lesson5",
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

export default Lesson5Quiz;
