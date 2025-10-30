import { useNavigate } from "react-router-dom";

const Lesson5 = () => {
  const navigate = useNavigate();

  const questions = [
    {
      question:
        "Which Article of the Indian Constitution guarantees equality before the law?",
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
        "Which Article ensures maintenance to women in case of desertion or inability to support themselves?",
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
        "Which amendment reserved seats for women in Panchayats and Municipalities?",
      options: ["73rd and 74th Amendments", "42nd Amendment", "86th Amendment"],
      answer: "73rd and 74th Amendments",
    },
    {
      question:
        "Which judicial case expanded the right to privacy and dignity for women?",
      options: [
        "Neera Mathur v. LIC",
        "Minerva Mills v. Union of India",
        "Kesavananda Bharati v. State of Kerala",
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

  // Quiz is rendered by <QuizLesson /> (handles answers, submit and progress saving)

  const goToArticle = () => navigate("/lessons/lesson5/article");

  return (
    <div className="p-8 space-y-6">
      {/* Lesson Content Box */}
      <div className="p-4 border-2 border-yellow-500 rounded resize-y overflow-auto max-h-[400px]">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          Lesson 5: The Constitution and Gender Justice
        </h1>

        <p class="text-lg leading-relaxed mb-4">
          ABSTRACT: This article evaluates the constitutional developments and
          mechanisms that ensure gender justice in India. The term ‘gender
          justice’ goes beyond mere legal equality; it implies a holistic
          approach to safeguarding the rights of women, the historically
          subordinated gender, from exploitation, discrimination, and social
          denial imposed by patriarchal structures. Gender justice encompasses
          full participation of women in decision-making processes in both
          public and private spheres, ensuring that they can engage equally with
          men in shaping societal norms, family structures, and community
          policies. Although the Indian Constitution provides a strong legal
          framework supporting equality, women continue to face systemic
          disadvantages even in the 21st century, stemming from deep-rooted
          social, cultural, and economic barriers. Patriarchal interpretations
          of constitutional provisions, such as labeling women as the ‘weaker
          sex,’ often reinforce existing societal biases rather than alleviate
          them. However, the Constitution’s Preamble enshrines social, economic,
          and political justice, along with equality of opportunity and status,
          thus embedding gender justice as a core objective from its inception.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          INTRODUCTION: Women occupy a unique and vital position in societies
          worldwide. Despite their contributions across education, workforce,
          governance, and family life, they have historically faced structural
          discrimination. Access to essential resources such as quality
          education, gainful employment, political participation, and property
          rights was often denied, relegating women to subordinate roles. Even
          today, many women encounter barriers in professional and social life,
          constrained by both cultural norms and societal expectations. Gender
          justice is a framework designed to dismantle these barriers by
          recognizing women as equals, entitled to full social, economic, and
          political rights. The Constitution of India, through its Preamble and
          provisions, guarantees liberties such as freedom of thought,
          expression, belief, faith, and worship, while ensuring equality of
          status and opportunity. This legal and moral foundation empowers women
          to claim their rights and participate fully in national development,
          yet societal implementation remains a challenge.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          ISSUES PERTAINING TO GENDER IN INDIA: Gender, unlike biological sex,
          represents socially constructed roles, responsibilities, and power
          dynamics assigned to men and women. These roles influence access to
          education, employment, property, and social mobility, creating
          systemic advantages for men and disadvantages for women. Cultural
          norms, historical biases, and economic dependence perpetuate gender
          inequality, manifesting in restricted access to opportunities and
          decision-making power. India, home to approximately 15% of the world’s
          female population, exhibits vast regional, cultural, and socioeconomic
          variations in women’s status. Yet, across regions, women commonly face
          discrimination, poverty, and social marginalization. Efforts to
          address gender disparity have gained momentum in the 21st century,
          focusing on including women in development processes, policymaking,
          and socio-economic growth, but traditional patriarchal frameworks
          continue to hinder progress.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          WOMEN’S EMPOWERMENT IN SOCIAL, ECONOMIC, AND POLITICAL SPHERES:
          Empowerment is a multi-dimensional process encompassing social,
          economic, and political dimensions that mutually reinforce one
          another. Social empowerment entails reshaping cultural norms,
          challenging discriminatory ideologies, and fostering environments
          conducive to women’s equality. Economic empowerment involves granting
          women access to financial resources, property, employment
          opportunities, knowledge, and technology, thereby ensuring autonomy
          and decision-making power. Political empowerment seeks to increase
          women’s representation and influence in governance, enabling them to
          shape policies, access leadership roles, and advocate for
          gender-sensitive reforms. Legislative measures such as the 73rd and
          74th Constitutional Amendments have reserved seats for women in local
          governance, yet barriers like illiteracy, economic dependency, and
          societal constraints often limit effective participation.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          POLITICAL EMPOWERMENT: Despite equal constitutional rights, women
          remain underrepresented in politics at national and state levels.
          Their limited participation stems from social norms, lack of
          awareness, and physical and economic barriers. Increasing women’s
          representation through legislative reforms, such as reserving 33% of
          seats in Panchayats, Municipalities, and state legislatures, aims to
          rectify historical exclusion and promote inclusive governance. Active
          political participation of women ensures that policymaking reflects
          gender-sensitive concerns, from education and health to safety and
          employment, fostering a balanced socio-political environment.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          ECONOMIC EMPOWERMENT: Economic independence is crucial for achieving
          gender justice. Women’s access to employment, equitable wages,
          property ownership, financial literacy, and entrepreneurship
          strengthens their autonomy and reduces vulnerability to exploitation.
          Legislations addressing equal remuneration, maternity benefits,
          property rights, and protection against workplace discrimination have
          been enacted, yet awareness and enforcement remain inconsistent.
          Economic empowerment enables women to make informed choices,
          contribute to household and national economies, and challenge
          structural inequities, thereby transforming traditional gender
          dynamics.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          SOCIAL JUSTICE: Social justice entails equal access to opportunities,
          resources, and rights, transcending barriers of caste, religion, or
          gender. India’s constitutional framework integrates social justice
          through the Preamble, Fundamental Rights, and Directive Principles,
          emphasizing equality and human dignity. Judicial pronouncements, such
          as those in Bodhisattwa Gautam v. Subhra Chakkraborty, highlight the
          importance of protecting women from exploitation, ensuring equal
          participation in socio-cultural life, and providing mechanisms for
          redressal against violence, harassment, and discrimination. Social
          empowerment through education, awareness campaigns, and community
          participation is essential for breaking entrenched patriarchal norms.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          RIGHT TO EQUALITY: Articles 14, 15, and 16 of the Indian Constitution
          form the backbone of legal equality. While Article 14 guarantees
          equality before the law, Article 15 prohibits discrimination based on
          sex, and Article 15(3) allows positive action for women and children.
          Judicial interpretations, such as upholding the validity of Section
          497 IPC, demonstrate the application of these provisions to protect
          women while addressing historical disadvantages. Reservation policies,
          protective legislations, and affirmative action initiatives serve to
          create substantive equality, ensuring that women are not only formally
          recognized but also meaningfully empowered in legal, social, and
          economic spheres.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          RIGHT TO DIGNIFIED LIFE: Article 21 of the Constitution guarantees the
          right to life and personal liberty, including privacy, security, and
          dignity. Judicial interventions have expanded the scope of this right,
          recognizing women’s autonomy over their bodies, protection from sexual
          violence, and access to healthcare and employment without
          discriminatory practices. Landmark cases such as Neera Mathur v. LIC
          and Zahida Begum v. Mushtaque Ahamed affirm women’s right to privacy
          and dignity, ensuring legal protection against intrusive or oppressive
          actions by the State or private entities.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          RIGHT TO MAINTENANCE: Maintenance laws, including Section 125 CrPC,
          secure women’s economic sustenance in cases of desertion, divorce, or
          inability to support themselves. Judicial interpretation ensures that
          religious or personal law provisions do not override women’s
          entitlement to financial support. Courts have emphasized the social
          purpose of maintenance, preventing destitution, protecting family
          well-being, and promoting the overall dignity of women, reinforcing
          gender justice through practical legal mechanisms.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          PROCEDURAL DUE PROCESS: Judicial guidelines ensure that women’s
          privacy and dignity are protected in legal and administrative
          procedures. Cases such as Nandini Satpathy v. P.L. Dani mandate female
          officers for arrest and investigation of women, establishing
          safeguards against custodial violence, sexual harassment, and
          procedural exploitation. These measures underscore the Constitution’s
          commitment to gender-sensitive governance and justice, reflecting an
          intersection of legal rights and practical safeguards.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          DIRECTIVE PRINCIPLES OF STATE POLICY: Articles 38, 39, and 42
          emphasize equality, fair remuneration, maternity relief, and
          protection against exploitation. These principles complement
          Fundamental Rights, guiding legislative and administrative action to
          enhance women’s socio-economic status. By ensuring equitable
          opportunities, minimizing income disparities, and promoting welfare
          measures, the Directive Principles operationalize gender justice as a
          state responsibility, reinforcing the constitutional vision of
          inclusive development.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          FUNDAMENTAL DUTIES: Articles 51A(e) and 51A(f) encourage citizens to
          respect the dignity of women, uphold equality, and strive for
          excellence in all spheres. Embedding such duties reinforces societal
          responsibility toward gender justice, ensuring that the legal
          framework is complemented by ethical and civic consciousness. The
          recognition of women as equal participants in nation-building and
          social development aligns with the constitutional vision of a just and
          harmonious society.
        </p>

        <p class="text-lg leading-relaxed mb-4">
          CONCLUSION: The Constitution of India establishes a comprehensive
          framework to ensure gender justice through the harmonious integration
          of Fundamental Rights, Directive Principles, and judicial
          interpretation. By addressing historical discrimination, promoting
          social, economic, and political empowerment, and embedding legal
          safeguards, the Constitution sets the stage for equitable development
          of women. Continuous legislative reforms, judicial activism, and
          societal awareness are necessary to realize the promise of gender
          justice fully. In this way, gender justice emerges not only as a legal
          requirement but as a fundamental principle of human rights, social
          welfare, and national progress.
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

export default Lesson5;
