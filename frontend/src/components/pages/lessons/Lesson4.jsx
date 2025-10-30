import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Lesson4 = () => {
  const navigate = useNavigate();

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
      options: [
        "Justiciable",
        "Non-justiciable",
        "Partially enforceable in court",
      ],
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

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) newScore += 1;
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const goToArticle = () => navigate("/lessons/lesson4/article");

  return (
    <div className="p-8 space-y-6">
      {/* Lesson Content Box */}
      <div className="p-4 border-2 border-yellow-500 rounded resize-y overflow-auto max-h-[400px]">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          Lesson 4: Directive Principles of State Policy
        </h1>

        <p class="text-lg leading-relaxed mb-4">
          The Directive Principles of State Policy (DPSP) are enshrined in{" "}
          <strong>Articles 36 to 51</strong> of Part IV of the Indian
          Constitution. These principles aim to create a{" "}
          <strong>welfare state</strong> in India and ensure social and economic
          justice for all citizens. Inspired by the Spanish and Irish
          constitutions, they were added to address problems such as pervasive
          poverty, hunger, and deep-seated socioeconomic inequalities. Although
          not justiciable or enforceable in courts, DPSPs serve as instruments
          of guidance for policy implementation by the governments of India.
          According to Granville Austin, DPSPs have helped meet the
          constitutional requirements of social, economic, and political justice
          for all.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>DPSP Articles</strong>: DPSPs resemble the “Instrument of
          Instructions” enumerated in the Government of India Act of 1935. They
          are enumerated in the Constitution from Articles 36 to 51. As
          society's needs evolved, the Parliament has added new provisions to
          DPSPs through Constitutional Amendments.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Article 36 defines 'State' as having the same meaning as in Part III
          (Article 12). Article 37 states that Directive Principles are
          non-justiciable; however, they are fundamental in governance, and the
          State must apply them in law-making.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Classification of DPSPs</strong>: For ease of understanding,
          DPSPs can be categorized as{" "}
          <strong>
            Socialist principles, Gandhian principles, and Liberal-intellectual
            principles
          </strong>
          . Successive governments have enacted laws and programs to implement
          these principles, such as Five Year Plans, Minimum Wages Act, Bonded
          Labour Abolition Act, Child Labour Prohibition Act, Maternity Benefit
          Act, and Forest Conservation Acts.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Socialist Principles</strong>: Article 38 directs the State to
          promote social, economic, and political justice, minimizing
          inequalities in income, status, and opportunities (44th Amendment Act,
          1978). Article 39 secures adequate livelihood, equitable resource
          distribution, prevention of wealth concentration, equal pay for men
          and women, protection of workers' and children's health, and
          opportunities for children's development (42nd AA, 1976). Article 39A
          ensures equal justice and free legal aid. Articles 41–43A, 46, and 47
          focus on work, education, assistance during unemployment or sickness,
          maternity relief, workers' participation, and the welfare of weaker
          sections.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Gandhian Principles</strong>: Article 40 empowers village
          panchayats and promotes local self-governance. Article 43 promotes
          cottage industries for rural self-reliance. Article 43B promotes
          cooperative societies' democratic control and professional management
          (97th AA, 2011). Articles 46 and 47 protect educational and economic
          interests of weaker sections and prohibit intoxicating drinks. Article
          48 prohibits cow slaughter and promotes improvement of cattle breeds.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Liberal Principles</strong>: Article 39 promotes gender
          equality and women's empowerment. Article 44 secures a Uniform Civil
          Code. Article 45 ensures free education for children up to 14 years
          (modified by 86th AA, 2002). Article 48 promotes modern agriculture
          and animal husbandry. Article 48A protects environment, forests, and
          wildlife (42nd AA, 1976). Article 49 preserves monuments and places of
          national importance. Article 50 separates judiciary from executive.
          Article 51 promotes international peace, respect for law, and dispute
          resolution by arbitration.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Directives outside Part IV</strong>: Article 335 ensures
          consideration of Scheduled Castes and Tribes in public services while
          maintaining administrative efficiency. Article 350-A provides mother
          tongue instruction for linguistic minority children. Article 351
          promotes Hindi language development.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Conflict with Fundamental Rights</strong>: Conflicts arise
          when implementing DPSPs infringes upon Fundamental Rights. In{" "}
          <em>Champakam Dorairajan (1951)</em>, FRs took precedence, prompting
          the 1st, 4th, and 17th Amendment Acts. <em>Golaknath (1967)</em>{" "}
          prohibited curtailing FRs. 24th Amendment empowered Parliament to
          modify FRs. 25th Amendment added Article 31C, protecting laws
          implementing Articles 39(b) and 39(c).{" "}
          <em>Kesavananda Bharati (1973)</em> declared part of Article 31C
          unconstitutional, affirming judicial review. 42nd Amendment extended
          protection of certain DPSP laws, later struck down in{" "}
          <em>Minerva Mills (1980)</em>, reaffirming balance between FRs and
          DPSPs. Today, FRs hold supremacy, though DPSPs can guide amendments
          without destroying the Constitution's basic structure.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Features and Significance</strong>: DPSPs, despite being
          non-justiciable, are crucial for constitutional guidance. They drew
          inspiration from the Irish Constitution and reflect Ambedkar's vision
          of social and economic democracy. DPSPs complement Fundamental Rights,
          promote socio-economic justice, and aim to build a welfare state. They
          set long-term goals for education, public health, environmental
          protection, and support marginalized communities, offering benchmarks
          for government performance.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Limitations</strong>: Critics point out the lack of legal
          enforceability, inconsistent arrangement, conservative orientation,
          and potential state conflicts. While DPSPs guide governance, their
          non-justiciable nature may be limited by political and economic
          pressures. Nevertheless, they remain a cornerstone for planning
          policies aimed at social justice, equality, and the welfare of
          citizens.
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

export default Lesson4;
