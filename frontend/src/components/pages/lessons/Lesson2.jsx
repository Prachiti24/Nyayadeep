import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Lesson2 = () => {
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) newScore += 1;
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const goToArticle = () => navigate("/lessons/lesson2/article");

  return (
    <div className="p-8 space-y-6">
      {/* Lesson Content Box */}
      <div className="p-4 border-2 border-yellow-500 rounded resize-y overflow-auto max-h-[400px]">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          Lesson 2: The Preamble Explained
        </h1>

        <p class="text-lg leading-relaxed mb-4">
          The Preamble to the Constitution is the reflection of the core values,
          philosophy and objectives that embody the Constitution. It declares
          India to be a{" "}
          <strong>Sovereign, Socialist, Secular, Democratic, Republic</strong>{" "}
          committed to Justice, Equality and Liberty for the people. Although it
          does not grant substantive rights to the people and neither is
          enforceable in the courts, it is a guiding light in the interpretation
          of the Constitution. It was introduced through the{" "}
          <strong>Objective Resolution</strong> by Jawaharlal Nehru and adopted
          on <strong>January 22, 1947</strong>.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          The Supreme Court through various judgements has held that the
          Preamble is a part of the Constitution. The opening and last sentences
          of the Preamble - “We, the people…adopt enact and give to ourselves
          this Constitution” imply that sovereignty lies with the people of
          India. Thus, it is the soul of the Constitution.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Evolution of Preamble:</strong> The journey of the Preamble
          began with the <strong>Objective Resolution</strong>, introduced by
          Jawaharlal Nehru on <strong>December 13, 1946</strong>, in the
          Constituent Assembly. This resolution laid the groundwork for the core
          principles and objectives that would guide the drafting of the
          Constitution.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Objective Resolutions:</strong>
          <ul class="list-disc ml-6">
            <li>
              It declared India as an independent sovereign republic governed by
              the Constitution.
            </li>
            <li>
              It stated that all territories of India, including those under
              British rule, would form the ‘Union of India’.
            </li>
            <li>
              These territories would be autonomous units with powers derived
              from the people of the sovereign.
            </li>
            <li>
              It guaranteed justice, social, economic, and political equality,
              along with freedom of thought, expression, belief, faith, worship,
              vocation, association, and action (subject to law and public
              morality).
            </li>
            <li>
              It also provided safeguards for minorities, depressed and backward
              classes, and tribal areas.
            </li>
          </ul>
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Drafting of the Preamble:</strong> B.N Rao drafted a version
          of the Preamble, stating, “We, the people of India, seeking to promote
          the common good, do hereby, through our chosen representatives, enact,
          adopt and give to ourselves this constitution”. This draft was
          presented to the Constituent Assembly on <strong>July 4, 1947</strong>{" "}
          and after extensive debates, it was adopted by the Constituent
          Assembly on <strong>January 22, 1947</strong>.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Components of the Preamble:</strong> The Preamble consists of
          several key components that collectively define the nature of the
          Indian state and the aspirations of its people:
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Source of Power/Sovereignty:</strong> The Preamble begins with
          the iconic phrase: “We, the people of India,” establishing the
          foundational principle that the power and sovereignty of the state
          derive from the will of the people. It underscores the democratic
          nature of the Indian polity, where the government is a creation of the
          people and exercises its authority on their behalf.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Ideals of the Constitution:</strong> The Preamble boldly
          declares India to be a “Sovereign, Socialist, Secular, Democratic,
          Republic.”
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Aspirations of the People:</strong> The Preamble articulates
          the key objectives and aspirations that the Constitution seeks to
          fulfil: Justice, upholding Liberty, ensuring Equality and assuring
          Fraternity.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Date of Adoption:</strong> The Preamble also specifies the
          date of adoption of the Constitution, which is November 26, 1949
          (Constitution Day), and the date of its commencement, which is January
          26, 1950 (Republic Day).
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Ideals of the state:</strong> The Preamble's declaration of
          India as a "Sovereign, Socialist, Secular, Democratic, Republic"
          encapsulates the fundamental principles that shape the nature and
          functioning of the Indian state.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Sovereignty:</strong> The term “Sovereign” signifies the
          independent and supreme authority of the Indian state. Internally, it
          means that the Indian government has the ultimate decision-making
          power within its territorial boundaries. Externally, it implies that
          India is not subject to control or interference by any external power.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Socialism:</strong> The addition of “Socialist” through the
          42nd Amendment in 1976 reflects India’s commitment to achieving social
          and economic equality. The government plays a crucial role in ensuring
          the equitable distribution of resources and providing basic amenities
          to all citizens, regardless of their social or economic status. It is
          reflected in the Directive Principles of State Policy (DPSPs) of the
          Constitution.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Secularism:</strong> The declaration of India as a “Secular”
          state in the Preamble emphasises that the state does not have an
          official religion. It ensures that all religions are treated with
          equal respect. Citizens have the freedom of conscience and the right
          to profess, practice, and propagate their religion without
          discrimination.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Democracy:</strong> The characterisation of India as a
          “Democratic” republic underscores the principle of government by the
          people, for the people, and of the people. Regular, free and fair
          elections allow citizens to actively participate in the political
          process. Every citizen has an equal right to vote and choose their
          representatives.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Republic:</strong> The term “Republic” signifies that the head
          of the state (the President) is an elected official, not a hereditary
          monarch. This form of government ensures that the power and authority
          of the state are derived from the people’s mandate.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Aspirations of the People:</strong> The Preamble articulates
          the fundamental aspirations and objectives that the Constitution seeks
          to fulfill on behalf of the Indian people: Justice, Liberty, Equality,
          and Fraternity. Justice encompasses social, economic, and political
          equality. Liberty guarantees freedom of thought, expression, belief,
          faith, and worship. Equality assures equality of status and
          opportunity. Fraternity promotes unity and the dignity of the
          individual.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Preamble as a Part of the Constitution:</strong> The Supreme
          Court has confirmed that the Preamble is an integral part of the
          Indian Constitution. In the <em>Berubari Union Case (1960)</em>, it
          was initially held that the Preamble is not part of the Constitution.
          However, in the <em>Kesavananda Bharati Case (1973)</em>, the Court
          recognized it as an integral part of the Constitution's basic
          structure, which cannot be abolished. The{" "}
          <em>LIC of India Case (1995)</em> reiterated this position while
          clarifying that the Preamble cannot be directly enforced in court.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Amendment to the Preamble:</strong> The Preamble was amended
          once by the 42nd Constitutional Amendment Act of 1976, based on the
          recommendations of the Sardar Swaran Singh Committee. It introduced
          three significant changes to the Preamble: “Socialist,” “Secular,” and
          “Integrity.”
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Significance of the Preamble:</strong> The Preamble serves as
          the moral and philosophical foundation of the Constitution. It
          provides guiding principles to interpret the law, promotes unity in
          diversity through the principle of Fraternity, and defines India’s
          constitutional identity. It reflects international ideals like
          Justice, Liberty, and Equality, and pays homage to the sacrifices and
          struggles of the Indian people during the freedom movement.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          The Preamble thus acts as a guiding beacon for lawmakers, courts, and
          citizens. It embodies the vision of India as a sovereign, socialist,
          secular, democratic republic, emphasizing that the ultimate source of
          power lies with the people, and that the Constitution is designed to
          secure justice, liberty, equality, and fraternity for all, shaping the
          nation’s legal, political, and social fabric.
        </p>

        <button
          onClick={goToArticle}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Read Article
        </button>
      </div>

      {/* Quiz Box */}
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
    </div>
  );
};

export default Lesson2;
