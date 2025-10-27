import { useState } from "react";

const Lesson4Article = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(3).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question:
        "Which two countries' constitutions inspired the DPSPs in India?",
      options: ["USA and UK", "Spain and Ireland", "France and Germany"],
      answer: "Spain and Ireland",
    },
    {
      question:
        "Which DPSP focuses on promoting cottage industries and rural development?",
      options: [
        "Gandhian Principles",
        "Socialist Principles",
        "Liberal Principles",
      ],
      answer: "Gandhian Principles",
    },
    {
      question:
        "Article 50 directs the State to ensure which important separation?",
      options: [
        "Legislature from Judiciary",
        "Judiciary from Executive",
        "Executive from Legislature",
      ],
      answer: "Judiciary from Executive",
    },
    {
      question:
        "Which article emphasizes protection and improvement of environment and forests?",
      options: ["Article 48A", "Article 44", "Article 41"],
      answer: "Article 48A",
    },
    {
      question: "DPSPs primarily aim to achieve which type of democracy?",
      options: [
        "Political democracy",
        "Social and economic democracy",
        "Judicial democracy",
      ],
      answer: "Social and economic democracy",
    },
    {
      question:
        "Which landmark case emphasized the balance between Fundamental Rights and DPSPs?",
      options: [
        "Minerva Mills (1980)",
        "Indira Gandhi vs Raj Narain (1975)",
        "Golaknath (1967)",
      ],
      answer: "Minerva Mills (1980)",
    },
    {
      question: "The government implements DPSPs through which methods?",
      options: [
        "Judicial verdicts only",
        "Legislation, schemes, and welfare programs",
        "Executive orders only",
      ],
      answer: "Legislation, schemes, and welfare programs",
    },
    {
      question:
        "Which DPSP promotes international peace and respect for treaty obligations?",
      options: ["Article 51", "Article 38", "Article 40"],
      answer: "Article 51",
    },
    {
      question: "Why are DPSPs considered non-justiciable?",
      options: [
        "They are morally guiding principles, not enforceable in court",
        "They contradict Fundamental Rights",
        "They are legally vague and invalid",
      ],
      answer: "They are morally guiding principles, not enforceable in court",
    },
    {
      question:
        "Which principle emphasizes equal pay for men and women and equitable distribution of resources?",
      options: [
        "Article 39 under Socialist Principles",
        "Article 44 under Liberal Principles",
        "Article 40 under Gandhian Principles",
      ],
      answer: "Article 39 under Socialist Principles",
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
          Article: Directive Principles of State Policy
        </h1>

        <p class="text-lg leading-relaxed mb-4">
          The Directive Principles of State Policy are enshrined in{" "}
          <strong>Articles 36 to 51</strong> of Part IV of the Indian
          Constitution. They provide guidelines to the State to establish a{" "}
          <strong>welfare state</strong> by ensuring social, economic, and
          political justice, reducing inequalities, and promoting overall
          development for all citizens.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          DPSPs are inspired by the constitutions of Spain and Ireland and act
          as moral and policy instructions to the government for building a just
          society. While they are <strong>non-justiciable</strong> and cannot be
          enforced by courts, they strongly influence legislation, government
          schemes, and public policies to promote equality, social welfare, and
          economic development.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          These principles can be classified into three broad categories:{" "}
          <strong>Socialist Principles</strong> aiming at social and economic
          justice, <strong>Gandhian Principles</strong> emphasizing rural
          development, cottage industries, and prohibition of harmful practices,
          and <strong>Liberal-Intellectual Principles</strong> which focus on
          gender equality, free education, protection of environment, and
          promotion of scientific temper.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Important DPSPs include <strong>Article 38</strong> for promoting
          social, economic, and political justice, <strong>Article 39</strong>{" "}
          for equitable distribution of resources and equal pay for men and
          women, <strong>Article 41</strong> for securing work, education, and
          social security, and <strong>Article 44</strong> for establishing a
          Uniform Civil Code to maintain national integration and equality
          before law.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Other significant directives include <strong>Article 48A</strong> for
          protecting and improving forests and environment,{" "}
          <strong>Article 50</strong> for separation of judiciary from
          executive, and <strong>Article 51</strong> for promoting international
          peace and cooperation. These principles collectively aim to create a
          society that balances individual freedoms with social justice.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Governments implement DPSPs through laws, policies, and welfare
          programs such as land reforms, minimum wage laws, public health
          initiatives, environmental protection acts, and educational schemes.
          They act as a blueprint for long-term development and inclusive growth
          of all sections of society, especially marginalized groups.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Sometimes, conflicts arise between Fundamental Rights and DPSPs.
          Landmark cases like <strong>Champakam Dorairajan (1951)</strong>,{" "}
          <strong>Kesavananda Bharati (1973)</strong>, and{" "}
          <strong>Minerva Mills (1980)</strong> emphasized the need for a
          careful balance. While Fundamental Rights are generally supreme,
          Parliament can amend them to implement DPSPs, provided the
          Constitution’s basic structure is maintained.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Despite being non-justiciable and occasionally vague in their
          formulation, DPSPs remain vital to India’s constitutional vision. They
          guide the State in promoting social justice, reducing inequalities,
          fostering economic development, and ensuring the welfare of all
          citizens. By complementing Fundamental Rights, they help in achieving
          the ideal of a fair, just, and inclusive society.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          In essence, DPSPs form the moral compass of governance in India. They
          provide a vision for sustainable development, social harmony, and
          economic equality, ensuring that the objectives of the Constitution
          are realized not only legally but also ethically and socially.
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

export default Lesson4Article;
