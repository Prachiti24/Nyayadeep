import { useState } from "react";

const Lesson1Quiz = ({ host }) => {
  const questions = [
    {
      question: "What is the main focus of constitutional theory?",
      options: [
        "Explaining and justifying constitutional arrangements",
        "Describing economic systems",
        "Analyzing military strategies",
      ],
      answer: "Explaining and justifying constitutional arrangements",
    },
    {
      question:
        "Which of the following is NOT a dimension of constitutional theory?",
      options: ["Normative", "Conceptual", "Positive", "Historical"],
      answer: "Historical",
    },
    {
      question:
        "What does 'normative constitutional theory' primarily address?",
      options: [
        "How constitutions should be designed and justified",
        "How constitutions are structured linguistically",
        "How political parties are formed",
      ],
      answer: "How constitutions should be designed and justified",
    },
    {
      question: "What does 'positive constitutional theory' seek to explain?",
      options: [
        "The moral basis of constitutional rules",
        "Empirical reasons for the existence and endurance of constitutions",
        "How judges interpret fundamental rights",
      ],
      answer:
        "Empirical reasons for the existence and endurance of constitutions",
    },
    {
      question: "What does a 'thick constitution' refer to?",
      options: [
        "A constitution that covers both procedural and substantive principles",
        "A constitution that is short and procedural only",
        "A constitution limited to government formation rules",
      ],
      answer:
        "A constitution that covers both procedural and substantive principles",
    },
    {
      question:
        "What is the distinction between a 'formal' and 'material' constitution based on?",
      options: ["Its content and scope", "Its physical form", "Its authorship"],
      answer: "Its content and scope",
    },
    {
      question:
        "Which perspective connects constitutional theory closely with political philosophy?",
      options: [
        "Normative constitutional theory",
        "Conceptual constitutional theory",
        "Positive constitutional theory",
      ],
      answer: "Normative constitutional theory",
    },
    {
      question:
        "What is the ultimate aim of constitutional theory according to the text?",
      options: [
        "To integrate moral justification, conceptual analysis, and empirical explanation",
        "To establish a single legal code for all nations",
        "To describe the constitution as a historical document only",
      ],
      answer:
        "To integrate moral justification, conceptual analysis, and empirical explanation",
    },
    {
      question:
        "Who are the editors of 'The Cambridge Handbook of Constitutional Theory'?",
      options: [
        "Richard Bellamy and Jeff King",
        "A.V. Dicey and H.L.A. Hart",
        "John Rawls and Ronald Dworkin",
      ],
      answer: "Richard Bellamy and Jeff King",
    },
    {
      question:
        "Which term best describes a constitution that includes both legal procedures and value-based principles?",
      options: [
        "Thick constitution",
        "Thin constitution",
        "Flexible constitution",
      ],
      answer: "Thick constitution",
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
          unitName: "lesson1",
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

export default Lesson1Quiz;
