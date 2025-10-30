import { useState } from "react";

const Lesson2Article = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(3).fill("")); // 3 questions
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question:
        "Which word was added to the Preamble by the 42nd Amendment Act (1976)?",
      options: ["Federal", "Secular", "Republic", "Democratic"],
      answer: "Secular",
    },
    {
      question: "The Preamble declares India to be a:",
      options: [
        "Sovereign, Socialist, Secular, Democratic Republic",
        "Federal State",
        "Monarchy",
        "Union Territory",
      ],
      answer: "Sovereign, Socialist, Secular, Democratic Republic",
    },
    {
      question: "Is the Preamble legally enforceable on its own?",
      options: ["Yes", "No"],
      answer: "No",
    },
    {
      question:
        "Who introduced the Objective Resolution that laid the groundwork for the Preamble?",
      options: [
        "B.N. Rao",
        "Jawaharlal Nehru",
        "Dr. B.R. Ambedkar",
        "Sardar Patel",
      ],
      answer: "Jawaharlal Nehru",
    },
    {
      question:
        "What principle is emphasized by the term 'Sovereign' in the Preamble?",
      options: [
        "Supremacy of law",
        "External and internal independence",
        "Democratic elections",
        "Fraternity",
      ],
      answer: "External and internal independence",
    },
    {
      question:
        "Which term in the Preamble highlights India’s commitment to economic and social equality?",
      options: ["Socialist", "Secular", "Democratic", "Republic"],
      answer: "Socialist",
    },
    {
      question:
        "Which of the following is NOT one of the fundamental aspirations mentioned in the Preamble?",
      options: ["Justice", "Liberty", "Fraternity", "Capitalism"],
      answer: "Capitalism",
    },
    {
      question:
        "The Preamble reflects the power and sovereignty of the state deriving from:",
      options: [
        "The Parliament",
        "The President",
        "The People of India",
        "The Supreme Court",
      ],
      answer: "The People of India",
    },
    {
      question:
        "Which landmark case recognized the Preamble as an integral part of the Constitution?",
      options: [
        "Berubari Union Case",
        "Kesavananda Bharati Case",
        "Maneka Gandhi Case",
        "Indira Gandhi Case",
      ],
      answer: "Kesavananda Bharati Case",
    },
    {
      question:
        "Which principle in the Preamble promotes unity and brotherhood among citizens?",
      options: ["Justice", "Equality", "Fraternity", "Liberty"],
      answer: "Fraternity",
    },
  ];

  const handleOptionChange = (index, option) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) newScore += 1;
    });
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Article Content Box */}
      <div className="p-4 border-2 border-yellow-500 rounded resize-y overflow-auto max-h-[400px]">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          Article: The Preamble Explained
        </h1>
        <p class="text-lg leading-relaxed mb-4">
          The Preamble of the Indian Constitution serves as the philosophical
          backbone of the nation’s legal framework. It reflects the vision,
          values, and objectives that guided the framers in drafting the
          Constitution. Declaring India as a Sovereign, Socialist, Secular,
          Democratic Republic, the Preamble enshrines the principles of Justice,
          Liberty, Equality, and Fraternity. Though it does not confer
          enforceable rights, it provides critical guidance in interpreting the
          Constitution and understanding its purpose.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          The journey of the Preamble began with the Objective Resolution,
          introduced by Jawaharlal Nehru in December 1946. This resolution laid
          down the fundamental ideals that the Constitution would uphold,
          including sovereignty, democratic governance, and protection of
          individual freedoms. It envisioned India as a union of autonomous
          regions, ensuring equality, liberty, and justice for all citizens,
          along with special safeguards for minorities and marginalized groups.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Drafted by B.N. Rao, the Preamble states, “We, the people of India,
          seeking to promote the common good, do hereby enact, adopt and give to
          ourselves this Constitution.” This draft was debated extensively and
          adopted by the Constituent Assembly in January 1947. The Preamble
          highlights the source of India’s sovereignty, affirming that ultimate
          power lies with its people, and establishes the constitutional goals
          that guide the functioning of the state.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          The Preamble defines India’s core ideals. The term “Sovereign”
          emphasizes India’s independence in internal and external affairs.
          “Socialist,” added by the 42nd Amendment in 1976, underscores the
          commitment to social and economic equity. “Secular” ensures that the
          state remains neutral in religious matters, providing freedom of
          conscience to all citizens. “Democratic” reflects the government’s
          derivation of authority from the people, exercised through regular
          elections, while “Republic” signifies an elected head of state, rather
          than a hereditary monarchy.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          The Preamble also articulates the aspirations of the people. Justice,
          in all its dimensions—social, economic, and political—forms a
          cornerstone of the Constitution. Liberty guarantees freedom of
          thought, expression, belief, faith, and worship. Equality assures
          equal status and opportunities for all citizens, while Fraternity
          promotes a sense of unity and national integration. These objectives
          serve as guiding principles for governance and legislation.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          The judiciary has reinforced the importance of the Preamble through
          landmark judgments. The Kesavananda Bharati case recognized it as an
          integral part of the Constitution and a key to interpreting its
          provisions. Although not directly enforceable, it is part of the
          Constitution’s “basic structure” and cannot be amended in a way that
          destroys its essence. The Berubari Union and LIC of India cases
          further illustrate the evolving judicial understanding of the
          Preamble’s significance.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Amendments to the Preamble, most notably by the 42nd Constitutional
          Amendment, introduced the terms “Socialist” and “Secular,” emphasizing
          India’s commitment to equitable development and religious neutrality.
          The Preamble thus continues to serve as the moral and philosophical
          compass of the nation, guiding legislators, judges, and citizens alike
          in upholding the values of justice, liberty, equality, and fraternity.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          In essence, the Preamble encapsulates the soul of the Constitution. It
          reflects the historical struggles of the Indian people for freedom,
          equality, and democracy, and serves as a beacon for interpreting
          constitutional provisions. By establishing the principles of
          sovereignty, democracy, social justice, and fraternity, it not only
          defines the identity of the Indian state but also inspires its
          citizens to uphold these ideals in governance and society.
        </p>
      </div>

      {/* Quiz Box */}
      <div className="p-4 border-2 border-green-500 rounded resize-y overflow-auto max-h-[400px]">
        <h2 className="text-2xl font-bold mb-4">Quiz</h2>
        {questions.map((q, i) => (
          <div key={i} className="mb-4">
            <p className="mb-2 font-semibold">
              {i + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option) => (
                <label key={option} className="block">
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswers[i] === option}
                    onChange={() => handleOptionChange(i, option)}
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
          <div className="mt-4 text-lg font-semibold">
            Your score: {score} / {questions.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson2Article;
