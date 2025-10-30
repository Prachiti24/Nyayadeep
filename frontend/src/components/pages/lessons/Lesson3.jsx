import { useNavigate } from "react-router-dom";

const Lesson3 = () => {
  const navigate = useNavigate();

  const questions = [
    {
      question: "Which of these is a Fundamental Right?",
      options: ["Right to Vote", "Right to Equality", "Right to Property"],
      answer: "Right to Equality",
    },
    {
      question: "Fundamental Rights are guaranteed to whom?",
      options: ["Only adults", "All citizens", "Government officials"],
      answer: "All citizens",
    },
    {
      question: "Which right ensures freedom of speech?",
      options: ["Right to Equality", "Right to Freedom", "Right to Education"],
      answer: "Right to Freedom",
    },
    {
      question:
        "Which Article of the Constitution protects Right to Constitutional Remedies?",
      options: ["Article 32", "Article 14", "Article 19"],
      answer: "Article 32",
    },
    {
      question: "Which Fundamental Right prohibits untouchability?",
      options: [
        "Right to Freedom",
        "Right to Equality",
        "Right Against Exploitation",
      ],
      answer: "Right to Equality",
    },
    {
      question:
        "Which right protects individuals from forced labor and child labor?",
      options: [
        "Right Against Exploitation",
        "Right to Freedom",
        "Right to Equality",
      ],
      answer: "Right Against Exploitation",
    },
    {
      question: "Which Articles provide for Cultural and Educational Rights?",
      options: ["Articles 29–30", "Articles 25–28", "Articles 19–22"],
      answer: "Articles 29–30",
    },
    {
      question:
        "Right to Freedom of Religion is guaranteed under which Articles?",
      options: ["Articles 25–28", "Articles 14–18", "Articles 32–35"],
      answer: "Articles 25–28",
    },
    {
      question:
        "Which Fundamental Right is called the 'Heart and Soul of the Constitution'?",
      options: [
        "Right to Freedom",
        "Right to Constitutional Remedies",
        "Right to Equality",
      ],
      answer: "Right to Constitutional Remedies",
    },
    {
      question:
        "Which Fundamental Right ensures the right to elementary education for children?",
      options: ["Article 21A", "Article 14", "Article 19"],
      answer: "Article 21A",
    },
  ];

  // Quiz is rendered by <QuizLesson /> (handles answers, submit and progress saving)

  const goToArticle = () => navigate("/lessons/lesson3/article");

  return (
    <div className="p-8 space-y-6">
      {/* Lesson Content Box */}
      <div className="p-4 border-2 border-yellow-500 rounded resize-y overflow-auto max-h-[400px]">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          Lesson 3: Fundamental Rights
        </h1>

        <p class="text-lg leading-relaxed mb-4">
          Fundamental Rights are enshrined in <strong>Articles 12 to 35</strong>{" "}
          of the Indian Constitution and constitute the core of India’s
          democratic framework. They guarantee essential freedoms to every
          individual, protecting citizens from arbitrary state actions. Often
          referred to as the “<strong>Magna Carta of India</strong>,” these
          rights serve as the foundation for justice, liberty, equality, and
          personal dignity, ensuring that no individual is subjected to
          discrimination or unfair treatment.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Originally, the Constitution recognized seven Fundamental Rights.
          However, the <strong>Right to Property</strong> was removed as a
          Fundamental Right by the <strong>44th Amendment Act (1978)</strong>{" "}
          and is now treated as a legal right under{" "}
          <strong>Article 300-A</strong>. The remaining six Fundamental Rights
          continue to uphold equality, freedom, protection from exploitation,
          religious freedom, cultural and educational rights, and the right to
          constitutional remedies, forming the bedrock of democratic governance
          in India.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Right to Equality (Articles 14–18)</strong>: This right
          guarantees equality before the law and equal protection under the law.
          It prohibits discrimination based on religion, caste, sex, race, or
          place of birth, ensuring that every individual has equal access to
          public opportunities. It includes abolition of untouchability,
          equality in employment, and prohibits the conferment of titles except
          for military and academic distinctions, thus promoting a fair and
          inclusive society.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          The Right to Equality is not just limited to legal equality; it also
          ensures social and economic equality by empowering marginalized
          groups, ensuring affirmative action in public employment, and
          safeguarding the interests of socially and economically backward
          classes. This right plays a crucial role in maintaining a balanced and
          just society where all individuals can thrive.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Right to Freedom (Articles 19–22)</strong>: The Right to
          Freedom guarantees six essential freedoms for citizens: freedom of
          speech and expression, freedom of peaceful assembly, freedom to form
          associations or unions, freedom of movement throughout India, freedom
          to reside and settle anywhere, and freedom to practice any profession
          or occupation. It also protects individuals against arbitrary arrest
          and detention. Additionally, <strong>Article 21A</strong> ensures the{" "}
          <strong>Right to Elementary Education</strong> for children aged 6 to
          14 years, making education accessible and compulsory.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          This right ensures that individuals can actively participate in
          social, political, and economic life without fear of suppression. By
          protecting personal liberty, freedom of expression, and the right to
          education, it fosters innovation, critical thinking, and civic
          participation, which are essential for a vibrant democracy.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Right Against Exploitation (Articles 23–24)</strong>: This
          right strictly prohibits human trafficking, forced labor, and child
          labor in factories, mines, and other hazardous industries. It ensures
          that no person is subjected to exploitation and that children are
          protected from harmful work environments, contributing to a safe and
          humane society.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Beyond legal protection, this right underscores India’s commitment to
          social justice and human dignity. It reflects the ethical and moral
          obligation of the state to provide a secure environment for its
          citizens, particularly the vulnerable and underprivileged, and aligns
          with international conventions on human rights.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Right to Freedom of Religion (Articles 25–28)</strong>: Every
          individual in India has the freedom of conscience and the right to
          practice, profess, and propagate any religion. Religious communities
          have the authority to manage their own institutions, conduct religious
          activities, and own property. They are also exempted from taxes
          specifically for religious promotion. Individuals cannot be compelled
          to participate in religious instruction in educational institutions,
          thus preserving secularism and freedom of belief.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          This right is crucial for fostering religious tolerance, pluralism,
          and harmony in a diverse society. It ensures that India remains a
          secular state where all religions coexist peacefully and citizens can
          exercise their beliefs without interference or discrimination.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Cultural and Educational Rights (Articles 29–30)</strong>:
          These rights safeguard the cultural, linguistic, and educational
          interests of minorities. Citizens can preserve their language, script,
          and culture, and minorities have the right to establish and administer
          their own educational institutions. These provisions ensure
          inclusivity, equality, and access to quality education while
          protecting cultural heritage.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          These rights promote diversity and pluralism by encouraging citizens
          to celebrate their unique identities while contributing to the
          nation’s overall progress. They strengthen social cohesion and foster
          a sense of belonging among diverse communities.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          <strong>Right to Constitutional Remedies (Articles 32–35)</strong>:
          Known as the “<strong>heart and soul of the Constitution</strong>,”
          this right empowers citizens to approach the Supreme Court or High
          Courts in case their Fundamental Rights are violated. Courts can issue
          five types of writs: <strong>Habeas Corpus</strong> (to prevent
          illegal detention), <strong>Mandamus</strong> (to compel performance
          of duty), <strong>Prohibition</strong> (to stop lower courts from
          exceeding jurisdiction), <strong>Certiorari</strong> (to quash illegal
          orders), and <strong>Quo Warranto</strong> (to challenge authority of
          a person holding public office).
        </p>

        <p class="text-lg leading-relaxed mb-4">
          This right is essential in maintaining the supremacy of law, ensuring
          accountability of the government, and protecting citizens against
          arbitrary actions by authorities. It provides a mechanism to uphold
          justice, prevent misuse of power, and reinforce the rule of law in a
          democratic society.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Fundamental Rights are designed to apply to both{" "}
          <strong>Indian citizens</strong> and <strong>non-citizens</strong>{" "}
          (except enemy aliens), depending on the specific right. For instance,
          Articles 14, 20, 21, 21A, 22, 23, 24, 25, 26, 27, and 28 apply to
          everyone residing in India, whereas Articles 15, 16, 19, 21, and 30
          are specifically for Indian citizens. This distinction ensures that
          universal protections are available, while certain rights prioritize
          citizens’ participation in governance and society.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Fundamental Rights act as a shield against arbitrary state action,
          promoting justice, equality, and liberty. They prevent discrimination
          based on social, religious, or economic factors, encourage national
          integration, and protect the democratic framework. By balancing
          individual freedoms with societal interests, they enable inclusive
          growth and protect the dignity of every individual.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          These rights also contribute to social harmony and cohesion by
          fostering mutual respect, understanding, and cooperation among diverse
          communities. By protecting minorities, disadvantaged groups, and
          individuals, Fundamental Rights strengthen India’s commitment to
          pluralism and democracy. They ensure that citizens are empowered to
          challenge injustices, thereby upholding India’s core democratic values
          and the rule of law.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          In addition, Fundamental Rights encourage active civic engagement,
          political participation, and awareness of legal rights among citizens.
          They serve as a reminder of the state’s responsibility to act fairly
          and justly, and they underline the importance of protecting individual
          freedoms in a complex and diverse society. By embedding these rights
          within the Constitution, India ensures that its democracy remains
          vibrant, inclusive, and resilient.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          Through these provisions, the Indian Constitution not only guarantees
          legal protection but also fosters moral, social, and ethical
          responsibility among citizens and the state. Fundamental Rights remain
          the cornerstone of democracy, providing a framework where freedom,
          justice, equality, and fraternity thrive, and every individual can
          realize their potential while contributing positively to society.
        </p>

        <button
          onClick={goToArticle}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Read Article
        </button>
      </div>

      {/* (Quiz moved to Citizens pages) */}
    </div>
  );
};

export default Lesson3;