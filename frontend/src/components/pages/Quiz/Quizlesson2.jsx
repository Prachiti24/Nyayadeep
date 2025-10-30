import { useState } from "react";

const Lesson2Quiz = ({ host }) => {
  const questions = [
    {
      question:
        "Which word was added to the Preamble by the 42nd Amendment Act (1976)?",
      options: ["Federal", "Secular", "Republic", "Democratic"],
      answer: "Secular",
    },
    {
      question: "The Preamble declares India to be which of the following?",
      options: [
        "Sovereign",
        "Socialist",
        "Democratic Republic",
        "All of the above",
      ],
      answer: "All of the above",
    },
    {
      question:
        "Which principle is NOT explicitly mentioned in the original Preamble?",
      options: ["Justice", "Liberty", "Equality", "Secularism"],
      answer: "Secularism",
    },
    {
      question: "The Preamble to the Constitution of India is:",
      options: [
        "A part of the Constitution but has no legal effect",
        "Not a part of the Constitution and has no legal effect either",
        "Part of the Constitution and has the same legal effect as any other part",
        "A part of the Constitution but has no legal effect independently of other parts",
      ],
      answer:
        "A part of the Constitution but has no legal effect independently of other parts",
    },
    {
      question:
        "Which one of the following objectives is NOT embodied in the Preamble?",
      options: [
        "Liberty of thought",
        "Economic liberty",
        "Liberty of expression",
        "Liberty of belief",
      ],
      answer: "Economic liberty",
    },
    {
      question:
        "The mind of the makers of the Constitution is reflected in which of the following?",
      options: [
        "The Preamble",
        "The Fundamental Rights",
        "The Directive Principles of State Policy",
        "The Fundamental Duties",
      ],
      answer: "The Preamble",
    },
    {
      question:
        "‘Economic Justice’ as an objective of the Constitution is provided in:",
      options: [
        "The Preamble and Fundamental Rights",
        "The Preamble and the Directive Principles of State Policy",
        "The Fundamental Rights and the Directive Principles of State Policy",
        "None of the above",
      ],
      answer: "The Preamble and the Directive Principles of State Policy",
    },
    {
      question:
        "Which phrase in the Preamble signifies that the power of the state comes from the people?",
      options: [
        "Sovereign",
        "We, the people of India",
        "Democratic Republic",
        "Socialist",
      ],
      answer: "We, the people of India",
    },
    {
      question:
        "Which of the following is NOT an aspiration mentioned in the Preamble?",
      options: ["Justice", "Liberty", "Fraternity", "Property Rights"],
      answer: "Property Rights",
    },
    {
      question:
        "The Preamble was drafted based on which resolution in the Constituent Assembly?",
      options: [
        "Directive Principles Resolution",
        "Objective Resolution",
        "Fundamental Rights Resolution",
        "State Reorganization Resolution",
      ],
      answer: "Objective Resolution",
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
          unitName: "lesson2",
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

export default Lesson2Quiz;
