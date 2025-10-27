import { useState } from "react";

const Lesson3Article = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(2).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question:
        "Which article of the Indian Constitution lists the Fundamental Duties?",
      options: ["Article 21A", "Article 51A", "Article 19", "Article 14"],
      answer: "Article 51A",
    },
    {
      question:
        "How many Fundamental Duties are currently listed in the Constitution?",
      options: ["10", "11", "12", "9"],
      answer: "11",
    },
    {
      question: "Which amendment added Fundamental Duties to the Constitution?",
      options: [
        "42nd Amendment Act",
        "44th Amendment Act",
        "52nd Amendment Act",
        "61st Amendment Act",
      ],
      answer: "42nd Amendment Act",
    },
    {
      question:
        "Which duty requires citizens to protect and improve the natural environment?",
      options: [
        "Article 51A(g)",
        "Article 51A(d)",
        "Article 51A(e)",
        "Article 51A(k)",
      ],
      answer: "Article 51A(g)",
    },
    {
      question:
        "Which Fundamental Duty emphasizes respecting the Constitution, National Flag, and National Anthem?",
      options: [
        "Article 51A(a)",
        "Article 51A(b)",
        "Article 51A(c)",
        "Article 51A(f)",
      ],
      answer: "Article 51A(a)",
    },
    {
      question:
        "Which duty imposes the responsibility of providing free education to children aged 6-14?",
      options: [
        "Article 51A(k)",
        "Article 51A(j)",
        "Article 51A(h)",
        "Article 21A",
      ],
      answer: "Article 51A(k)",
    },
    {
      question: "Fundamental Duties are primarily of what nature?",
      options: [
        "Justiciable",
        "Non-justiciable",
        "Legally enforceable",
        "Mandatory for all citizens including foreigners",
      ],
      answer: "Non-justiciable",
    },
    {
      question:
        "Which committee recommended the inclusion of Fundamental Duties in the Constitution?",
      options: [
        "Sardar Swaran Singh Committee",
        "Ranganath Mishra Committee",
        "Justice Verma Committee",
        "Constituent Assembly Committee",
      ],
      answer: "Sardar Swaran Singh Committee",
    },
    {
      question:
        "Which Fundamental Duty encourages citizens to renounce practices derogatory to the dignity of women?",
      options: [
        "Article 51A(e)",
        "Article 51A(c)",
        "Article 51A(f)",
        "Article 51A(b)",
      ],
      answer: "Article 51A(e)",
    },
    {
      question:
        "Which of the following is a complementary aspect of Fundamental Rights and Duties?",
      options: [
        "Article 21 guarantees education; Article 51A(k) imposes duty on parents to educate children",
        "Article 14 ensures equality; Article 51A(d) protects forests",
        "Article 19 provides speech freedom; Article 51A(j) requires defense service",
        "Article 25 allows religion; Article 51A(b) requires environmental protection",
      ],
      answer:
        "Article 21 guarantees education; Article 51A(k) imposes duty on parents to educate children",
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
          Article: Fundamental Duties
        </h1>

        <p class="text-lg leading-relaxed mb-4">
          As responsible Indian citizens, we are endowed with certain rights and
          duties. Alongside our rights, it is crucial to understand our{" "}
          <strong>Fundamental Duties</strong> and fulfil them conscientiously.
          These duties require us to adhere to the laws of the land and meet our
          legal obligations. The Indian Constitution outlines 11 Fundamental
          Duties that act as guiding principles for citizens, encompassing a
          wide range of responsibilities that contribute to the betterment of
          society and the nation as a whole.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Initially, the Indian Constitution only included Fundamental Rights,
          while the duties of the State were outlined under the{" "}
          <strong>Directive Principles of State Policy</strong>. However, in
          1976, the concept of Fundamental Duties was introduced for citizens,
          inspired by the Constitution of the former USSR. This marked a shift
          towards balancing rights with responsibilities.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          During the internal emergency (1975–1977), the Congress Party
          established the <strong>Sardar Swaran Singh Committee</strong> in
          1976. The committee recommended incorporating a separate chapter on
          Fundamental Duties in the Constitution, emphasizing the importance of
          citizens recognizing their duties alongside their rights.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Accepting the committee’s recommendations, the Government enacted the{" "}
          <strong>42nd Constitutional Amendment Act</strong> in 1976. Part IV-A
          was added to the Constitution, introducing{" "}
          <strong>Article 51A</strong>, which outlined ten Fundamental Duties
          for citizens, marking their first explicit mention in the
          Constitution.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          While the Swaran Singh Committee initially suggested eight Fundamental
          Duties, the 42nd Amendment expanded the list to ten. Later, in 2002,
          an eleventh duty was added under Article 51A(k), stating that it is
          the fundamental duty of every parent or guardian to provide
          opportunities for free and compulsory education to children between 6
          and 14 years of age.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>List of 11 Fundamental Duties (Article 51A)</strong>:
        </p>

        <p class="text-lg leading-relaxed mb-4">
          (a) To abide by the Constitution and respect its ideals and
          institutions, the National Flag, and the National Anthem.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (b) To cherish and follow the noble ideals which inspired the national
          struggle for freedom.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (c) To uphold and protect the sovereignty, unity, and integrity of
          India.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (d) To defend the country and render national service when called upon
          to do so.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (e) To promote harmony and the spirit of common brotherhood among all
          the people of India, transcending religious, linguistic, and regional
          diversities; and to renounce practices derogatory to the dignity of
          women.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (f) To value and preserve the rich heritage of India’s composite
          culture.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (g) To protect and improve the natural environment, including forests,
          lakes, rivers, wildlife, and to have compassion for living creatures.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (h) To develop scientific temper, humanism, and the spirit of inquiry
          and reform.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (i) To safeguard public property and to abjure violence.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (j) To strive towards excellence in all spheres of individual and
          collective activity so that the nation constantly rises to higher
          levels of endeavour and achievement.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          (k) To provide opportunities for education to children between the
          ages of 6 and 14 years if one is a parent or guardian.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Features of Fundamental Duties:</strong>
        </p>
        <p class="text-lg leading-relaxed mb-4">
          The Fundamental Duties encompass both moral and civic obligations.
          They include responsibilities such as cherishing the ideals of the
          freedom struggle (moral duty) and respecting the Constitution,
          National Flag, and National Anthem (civic duty).
        </p>
        <p class="text-lg leading-relaxed mb-4">
          They are rooted in Indian traditions, mythology, religions, and
          practices, such as the duty to renounce practices derogatory to the
          dignity of women. Fundamental Duties are specifically applicable to
          Indian citizens and, like Directive Principles, are non-justiciable.
          However, Parliament can enforce them through legislation.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Importance of Fundamental Duties:</strong>
        </p>
        <p class="text-lg leading-relaxed mb-4">
          Fundamental Duties remind citizens of their responsibilities alongside
          their rights, warning against anti-national or antisocial activities
          such as disrespecting the National Flag or destroying public property.
          They inspire discipline, commitment, and civic consciousness, and
          assist courts in determining the reasonableness of laws concerning
          Fundamental Rights.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          They serve to balance rights and duties in a democratic state,
          encouraging citizens to actively participate in nation-building while
          respecting laws, social harmony, and public interest.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Relation with Fundamental Rights:</strong>
        </p>
        <p class="text-lg leading-relaxed mb-4">
          Fundamental Rights and Duties complement each other. For example,
          Article 21 guarantees the right to education, while Article 51A(k)
          imposes the duty on parents to ensure their children receive
          education. Ignoring duties while exercising rights, such as misusing
          free speech to incite violence, can harm societal balance. Fulfilling
          duties reinforces democracy and strengthens civic responsibility.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Important Supreme Court Judgements:</strong>
        </p>
        <p class="text-lg leading-relaxed mb-4">
          <strong>
            Chandra Bhavan Boarding and Lodging vs State of Mysore (1969)
          </strong>
          : Upheld legislation imposing minimum wages for hotel and restaurant
          employees, emphasising social welfare.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          <strong>Balaji Raghavan vs Union of India (1995)</strong>: Validated
          National Awards, recognizing merit and incentivizing citizens to
          strive for excellence.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          <strong>M.C. Mehta vs Kamal Nath II (2000)</strong>: Fined for
          environmental harm, highlighting duty to protect nature.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          <strong>Shri Ranganath Mishra vs Union Of India (2003)</strong>:
          Directed dissemination of information on Fundamental Duties, including
          voting duties.
        </p>
        <p class="text-lg leading-relaxed mb-4">
          <strong>
            In Re Ramlila Maidan Incident vs Home Secretary (2012)
          </strong>
          : Emphasised lawful obedience and safeguarding public property.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Justice Verma Committee on Fundamental Duties:</strong>
        </p>
        <p class="text-lg leading-relaxed mb-4">
          Formed in 1998, the committee aimed to promote awareness and effective
          implementation of Fundamental Duties. It identified laws such as the{" "}
          <strong>Prevention of Insults to National Honour Act, 1971</strong>,{" "}
          <strong>Protection of Civil Rights Act, 1955</strong>,{" "}
          <strong>Representation of the People Act, 1951</strong>,{" "}
          <strong>Wildlife (Protection) Act, 1972</strong>, and{" "}
          <strong>Forest (Conservation) Act, 1980</strong> for enforcing
          specific duties.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Conclusion:</strong>
        </p>
        <p class="text-lg leading-relaxed mb-4">
          Although Fundamental Duties are non-justiciable, they play a crucial
          role in a democratic state. They remind citizens of their
          responsibilities, promote social harmony, and reinforce the
          Constitution’s ideals. Upholding these duties ensures that democracy
          functions effectively, balancing individual rights with civic
          responsibilities, and fostering a sense of moral, ethical, and civic
          consciousness among all citizens.
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

export default Lesson3Article;
