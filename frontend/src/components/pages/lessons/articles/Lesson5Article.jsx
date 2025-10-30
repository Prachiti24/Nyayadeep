import { useState } from "react";

const Lesson5Article = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(3).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "Which Article guarantees equality before the law in India?",
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
        "Which provision ensures maintenance to women in case of desertion or inability to support themselves?",
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
        "Which amendments reserved seats for women in Panchayats and Municipalities?",
      options: ["73rd and 74th Amendments", "42nd Amendment", "86th Amendment"],
      answer: "73rd and 74th Amendments",
    },
    {
      question:
        "Which case expanded the right to privacy and dignity for women?",
      options: [
        "Neera Mathur v. LIC",
        "Minerva Mills v. Union of India",
        "Kesavananda Bharati v. Kerala",
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

        <p className="text-lg leading-relaxed mb-4">
          Gender justice in India is a constitutional guarantee aimed at
          achieving legal, social, economic, and political equality for women.
          Articles <strong>14, 15, and 16</strong> provide a strong legal
          framework to prevent discrimination based on sex while ensuring equal
          opportunities in education, employment, and civic participation.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Article <strong>21</strong> guarantees the right to life and personal
          liberty, encompassing dignity, privacy, and bodily integrity for
          women. Coupled with Article <strong>15</strong>, it empowers the State
          to take affirmative actions to uplift women in areas where historical
          disadvantages exist.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Women in India also have access to protective measures under criminal
          and civil law. Provisions such as{" "}
          <strong>Section 125 of the CrPC</strong> ensure maintenance to women
          in cases of desertion or inability to support themselves, providing
          economic security and reducing vulnerabilities.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Directive Principles of State Policy complement these rights. Article{" "}
          <strong>42</strong> emphasizes maternity relief and protection from
          exploitation, ensuring women receive appropriate social security and
          workplace benefits. Together, Fundamental Rights and DPSPs promote
          both legal and socio-economic empowerment.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Political empowerment of women has been strengthened through the{" "}
          <strong>73rd and 74th Constitutional Amendments</strong>, which
          reserve a minimum number of seats in Panchayats and Municipalities for
          women, encouraging their active participation in governance and
          decision-making at grassroots levels.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Landmark judicial cases, including{" "}
          <strong>Neera Mathur v. LIC</strong>, have expanded women's rights to
          privacy, dignity, and equitable treatment in the workplace and
          society. These judgments ensure that gender equality is not only
          recognized in legislation but also actively enforced through courts.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Citizens are also encouraged to uphold gender equality through
          Articles <strong>51A(e) and 51A(f)</strong>, which mandate respect for
          women’s dignity and promotion of harmony and spirit of equality. These
          principles create a culture of respect, complementing legal and policy
          measures.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Gender justice involves a holistic approach: legal equality, social
          reforms, economic empowerment, educational opportunities, and
          political participation. Through this multi-dimensional strategy,
          India aims to reduce gender disparities and ensure that women can
          contribute fully to the nation’s development.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Overall, the Indian Constitution and judiciary work together to uphold
          gender justice, providing women with rights, protections, and
          opportunities to achieve their full potential. Gender equality is not
          only a legal obligation but a social and moral imperative in building
          a fair and inclusive society.
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

export default Lesson5Article;