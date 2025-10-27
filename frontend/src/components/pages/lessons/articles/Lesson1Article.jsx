import { useState } from "react";

const Lesson1Article = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(2).fill("")); // 2 questions
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "Who drafted the Constitution of India?",
      options: ["Mahatma Gandhi", "Dr. B. R. Ambedkar", "Jawaharlal Nehru"],
      answer: "Dr. B. R. Ambedkar",
    },
    {
      question: "When was the Constitution adopted?",
      options: ["26 Jan 1950", "15 Aug 1947", "26 Nov 1949"],
      answer: "26 Jan 1950",
    },
    {
      question: "Which document serves as the fundamental law of India?",
      options: [
        "Indian Penal Code",
        "Directive Principles",
        "The Constitution",
      ],
      answer: "The Constitution",
    },
    {
      question:
        "What are the three main branches of government defined by the Constitution?",
      options: [
        "Legislature, Executive, Judiciary",
        "Parliament, Prime Minister, Courts",
        "Union, States, Citizens",
      ],
      answer: "Legislature, Executive, Judiciary",
    },
    {
      question:
        "Which section of the Constitution declares India to be a sovereign, socialist, secular, and democratic republic?",
      options: ["Fundamental Rights", "Preamble", "Directive Principles"],
      answer: "Preamble",
    },
    {
      question:
        "Which provisions guide the government in promoting social welfare and economic equality?",
      options: [
        "Fundamental Rights",
        "Directive Principles of State Policy",
        "Judicial Review",
      ],
      answer: "Directive Principles of State Policy",
    },
    {
      question:
        "What mechanism allows courts to check the constitutionality of laws?",
      options: [
        "Separation of Powers",
        "Judicial Review",
        "Parliamentary Sovereignty",
      ],
      answer: "Judicial Review",
    },
    {
      question:
        "Which doctrine protects the essential principles of the Constitution from amendments?",
      options: [
        "Basic Structure Doctrine",
        "Separation of Powers",
        "Federalism Doctrine",
      ],
      answer: "Basic Structure Doctrine",
    },
    {
      question:
        "Which concept ensures powers are distributed between Union and State governments?",
      options: ["Federalism", "Judicial Review", "Directive Principles"],
      answer: "Federalism",
    },
    {
      question:
        "Which of the following is considered a fundamental duty under the Constitution?",
      options: [
        "Voting in elections",
        "Respecting the Constitution",
        "Paying taxes only",
      ],
      answer: "Respecting the Constitution",
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
          Article: Introduction to the Constitution
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          The Constitution of India is the fundamental law of the country. It
          lays down the framework for governance, defines the distribution of
          powers, and ensures the rights and responsibilities of citizens. By
          providing a legal structure, it protects democracy and guides the
          functioning of all government institutions.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          India has a <strong>written and codified constitution</strong>, which
          contains detailed provisions inspired by various sources, including
          the Government of India Act, 1935, the British parliamentary system,
          the United States Constitution, and the Irish Constitution. These
          influences help India combine federalism, democracy, and social
          justice in a unique system suited to its diverse population.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          One of the core features of the Constitution is the{" "}
          <strong>separation of powers</strong>. The legislature, executive, and
          judiciary have distinct functions: the legislature makes laws, the
          executive implements them, and the judiciary interprets them. This
          separation prevents the abuse of power and maintains checks and
          balances.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          The Constitution guarantees <strong>fundamental rights</strong> to
          citizens, including the right to equality, freedom of speech and
          expression, protection of minorities, and the right to constitutional
          remedies. These rights protect individuals against arbitrary actions
          of the state and ensure that every citizen can participate fully in
          the democratic process.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Alongside rights, the Constitution outlines{" "}
          <strong>fundamental duties</strong> for citizens, emphasizing respect
          for the Constitution, promotion of harmony, protection of public
          property, and care for the environment. These duties encourage
          responsible citizenship and active engagement in national development.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          The Constitution also establishes <strong>federalism</strong>,
          distributing powers between the Union and State governments through
          the Union List, State List, and Concurrent List. This ensures that
          local issues are handled by state governments while maintaining
          national unity on matters like defense, foreign affairs, and finance.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          The <strong>Preamble</strong> of the Constitution declares India to be
          a sovereign, socialist, secular, and democratic republic. It
          emphasizes justice, liberty, equality, and fraternity as guiding
          principles, which influence the interpretation and application of all
          laws and policies.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          The Constitution includes{" "}
          <strong>Directive Principles of State Policy</strong> to guide the
          government in promoting social welfare, economic equality, and public
          good. Although these principles are not enforceable in courts, they
          shape policy decisions and ensure that governance is oriented toward
          justice and fairness.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Judicial review allows courts to examine the constitutionality of laws
          and government actions. Landmark cases like{" "}
          <em>Kesavananda Bharati</em> have affirmed the basic structure
          doctrine, limiting Parliament’s power to amend essential principles
          and protecting the core values of the Constitution.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          The Constitution promotes <strong>social justice</strong> through
          measures like affirmative action, reservation in education and
          employment, and political representation for historically marginalized
          communities. These provisions aim to reduce inequality and create
          opportunities for all citizens.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Finally, the Constitution is a <strong>living document</strong>. It
          adapts to changing times through amendments, judicial interpretation,
          and evolving conventions. This flexibility ensures that it continues
          to address contemporary issues such as digital governance, climate
          change, and globalization while preserving democratic values.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          In conclusion, the Constitution of India is more than a set of rules;
          it is a comprehensive framework that balances authority, rights,
          responsibilities, and values. It safeguards democracy, promotes
          equality, ensures justice, and provides mechanisms for adapting to the
          needs of a complex and evolving nation.
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

export default Lesson1Article;