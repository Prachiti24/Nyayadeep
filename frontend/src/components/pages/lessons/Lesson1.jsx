import { useNavigate } from "react-router-dom";

const Lesson1 = () => {
  const navigate = useNavigate();
  // host (not used in this file anymore — quizzes moved to Citizens pages)

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

  // Quiz logic removed from lesson page — moved to Citizens pages


  const goToArticle = () => navigate("/lessons/lesson1/article");

  return (
    <div className="p-8 space-y-6">
      {/* Lesson Content Box */}
      <div className="p-4 border-2 border-yellow-500 rounded resize-y overflow-auto max-h-[400px]">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          Lesson 1: Introduction to the Constitution
        </h1>

        <p className="text-lg leading-relaxed mb-4">
          Constitutional theory lies at the intersection of three major
          traditions of political thought — <strong>political theory</strong>,{" "}
          <strong>jurisprudence</strong>, and{" "}
          <strong>comparative constitutional studies</strong>. Scholars from
          these fields contribute in different ways. Political theorists analyze
          the moral and political justifications of constitutional orders,
          jurists focus on their legal coherence and interpretation, while
          comparative constitutionalists examine their institutional forms and
          variations across systems. The purpose of{" "}
          <em>The Cambridge Handbook of Constitutional Theory</em> is to bring
          together these distinct but related approaches within a single,
          comprehensive volume.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Constitutional theory can be divided into three main strands:{" "}
          <strong>normative</strong>, <strong>conceptual</strong>, and{" "}
          <strong>positive</strong>. The <strong>normative strand</strong> asks
          what ought to be — it explores questions such as what makes a
          constitution legitimate, how power should be divided, or what rights
          citizens should have. The <strong>conceptual strand</strong> seeks to
          clarify what a constitution is, what counts as constitutional
          authority, and how constitutions differ from other forms of law or
          governance. The <strong>positive strand</strong> studies what actually
          exists — how constitutions operate in practice, how they evolve, and
          how constitutional norms influence political behavior. Together, these
          perspectives enable scholars to examine constitutions both as
          moral-political ideals and as institutional realities.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          A central debate in constitutional theory concerns what counts as a
          “constitution.” Some adopt a <strong>thin definition</strong>, viewing
          it merely as a framework that organizes government powers. Others take
          a <strong>thicker view</strong>, seeing it as a moral project that
          embodies fundamental values and rights. Similarly, some scholars
          distinguish between <strong>formal constitutions</strong> (the written
          documents themselves) and <strong>material constitutions</strong> (the
          actual political and social practices that shape governance). These
          distinctions are crucial for understanding the diversity of
          constitutional forms across different political systems.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Modern constitutional theory is also shaped by empirical and
          historical developments. The rise of{" "}
          <strong>constitutional democracy</strong>, the spread of{" "}
          <strong>judicial review</strong>, and the increasing role of{" "}
          <strong>international and transnational constitutional norms</strong>{" "}
          have transformed how we understand constitutional authority.
          Constitutional theorists today not only analyze the legal text but
          also the broader ecosystem of norms, institutions, and actors that
          sustain constitutional orders.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Finally, constitutional theory is a <strong>living discipline</strong>{" "}
          that responds to contemporary challenges such as populism,
          globalization, digital governance, and climate change. By combining
          analytical rigor with normative reflection, it deepens our
          understanding of how constitutions can both limit and enable political
          power in the pursuit of justice and collective self-government.
        </p>

        <h1 className="text-3xl font-bold text-yellow-800 mb-6">
          Constitutional Theory – Key Concepts and Debates
        </h1>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          1. Written vs Unwritten Constitutions
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          The UK has many constitutional rules that are written in laws
          (statutes) but also many that are unwritten, such as the roles of the
          Prime Minister and the Cabinet. As Thomas Paine argued, a true
          constitution should come before government, created by the people
          rather than by those already in power. However, this view is only
          partly correct — most modern constitutions, including those written by
          elected governments, do not originate from an entirely separate act of
          “the people.” Even written constitutions evolve over time through
          legislation, conventions, and interpretations by courts and
          executives. King notes that what constitutions omit can often be more
          important than what they include.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          2. Missing Elements and Conventions
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          King gives examples of such omissions. The U.S. Constitution does not
          mention the first-past-the-post voting system, even though it’s
          universally used. It also doesn’t explicitly mention judicial review,
          which allows courts to strike down unconstitutional laws. Dicey
          observed that conventions (unwritten practices) can govern both what
          is written and what is not. For example, U.S. electors are legally
          free to vote as they wish, but tradition (a convention) dictates that
          they must follow the public vote. Such conventions often become so
          strong that breaking them is considered politically unacceptable.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          3. Role of Conventions and Interpretation
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Even when constitutions are written, judges and officials interpret
          them, shaping their actual meaning. Gardner and others argue that no
          constitution can ever be fully written because judicial decisions,
          customs, and conventions always fill in the gaps. Sometimes, laws or
          constitutional provisions even lose effect through disuse (a concept
          called desuetude). Revolutions can also replace old constitutional
          norms with new ones. Thus, the real constitution includes both written
          text and unwritten practices.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          4. Dicey’s View on Conventions
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Dicey famously separated the “law of the constitution” (enforceable by
          courts) from the “conventions of the constitution” (political ethics
          not legally enforced). However, modern events blur this line. For
          example, in the UK Supreme Court’s <em>Miller 2</em> case (2019), the
          court ruled that Prime Minister Boris Johnson’s attempt to suspend
          Parliament for too long was unlawful because it hindered parliamentary
          accountability — a principle based on convention. This shows that
          courts can sometimes enforce conventions when they protect key
          constitutional principles.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          5. Parliamentary Sovereignty and the British Constitution
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Sartori criticizes British scholars for describing the UK constitution
          in overly “thin” terms, implying that Parliament can do anything, even
          abolish itself. He argues that parliamentary sovereignty actually
          means the Crown’s powers are limited by Parliament, especially the
          elected House of Commons. This view shows that the UK constitution
          still contains checks and balances — even if unwritten — that restrict
          how power is exercised, just as written constitutions do.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          6. Concept of Constitutionalisms
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          The authors distinguish between the concept of a constitution (what it
          is) and the conception (what it should do). For example, authoritarian
          constitutions still meet the conceptual definition of a constitution
          but lack the normative democratic values usually associated with it.
          Thinkers like Paine and Raz argue that a true constitution should be
          written, superior law, entrenched, and derived from the people. Yet
          these features are not necessary; they are desirable choices,
          depending on values and practical needs.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          7. Constitutional Disagreements
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Constitutional ideas are “essentially contested,” as W.B. Gallie
          described. They are normative, complex, open-ended, and reflect
          different ideologies. People may agree on core values like democracy
          or liberty but differ in how to realize them — for instance, whether
          to rely on human virtue or institutional checks. These disagreements
          lead to various constitutional forms, from highly liberal to tightly
          controlled systems.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          8. Varieties of Constitutional Limitations
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Constitutionalism often means limiting government power, but scholars
          interpret this differently. Economic liberals (neoliberals) see it as
          limiting state interference and protecting property and markets.
          Ethical liberals see it as ensuring respect for individual rights,
          such as banning torture or arbitrary detention. Others view limitation
          as control, allowing citizens through democratic processes to guide
          the state’s actions rather than restrict them. In this sense,
          democracy itself is a form of constitutional control, where elections
          and participation keep the government accountable.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          9. Balancing Liberty, Equality, and Democracy
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Different contributors to the Handbook disagree about how much
          democracy should be limited by constitutional law or whether democracy
          itself is a constitutional value. Some believe constitutions should
          protect markets and rights even against majority decisions; others
          argue that democracy must remain flexible and open to change by the
          people. These debates show that constitutionalism and democracy are
          both contested concepts — but discussing them helps clarify their true
          meaning and value.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          10. Global Constitutionalism
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          The conclusion notes that the volume mainly explores a Western model
          of constitutionalism (liberal and democratic) but recognizes that
          these ideas have been adapted globally. Scholars from the Global South
          also contribute new perspectives rooted in non-Western traditions. The
          authors emphasize that constitutionalism is not owned by the West and
          continues to evolve worldwide. The aim is to understand its values,
          institutions, and challenges — and how democracies can reform them to
          meet contemporary issues like populism, crises, and inequality.
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

export default Lesson1;
