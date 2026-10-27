export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  priceINR: number;
  priceUSD: number;
  originalPriceINR?: number;
  originalPriceUSD?: number;
  format: string;
  category: 'Notes' | 'Cheat Sheet' | 'Practice' | 'Planner' | 'Bundle';
  isBundle?: boolean;
  image: string;
  badge?: string;
  shortDescription: string;
  fullDescription: string[];
  audience: string[];
  contents: string[];
  fileSpecs: {
    format: string;
    delivery: string;
    estimatedPages: string;
    access: string;
  };
  features: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  isAvailable: boolean;
}

export const productsData: ProductItem[] = [
  {
    id: "qasps-study-notes",
    slug: "qasps-study-notes",
    title: "QASP-S Comprehensive Study Notes",
    subtitle: "Structured Competency Guide for Behavior Science & Applied Principles",
    priceINR: 799,
    priceUSD: 11,
    originalPriceINR: 1099,
    originalPriceUSD: 16,
    format: "Digital PDF Document",
    category: "Notes",
    image: "/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg",
    badge: "Core Study Guide",
    shortDescription:
      "Structured study notes designed to support international QASP-S exam candidates, with organized concepts, definitions, and revision-friendly explanations.",
    fullDescription: [
      "The QASP-S Study Notes are systematically organized across core behavioral science domains, breaking down complex operant and respondent concepts into clean, accessible prose.",
      "Designed specifically for international and Indian learners who want more than raw definitions, each module pairs theoretical principles with clear practical examples from home, clinic, and classroom settings.",
      "Includes visual flowcharts for schedules of reinforcement, functional behavior assessments (FBA), stimulus control, prompting hierarchies, and differential reinforcement procedures."
    ],
    audience: [
      "International candidates preparing worldwide for the QASP-S credentialing exam",
      "Special educators, psychology graduates, and early-career behavior interventionists",
      "Therapists seeking an ethical, neurodiversity-affirming conceptual reference guide"
    ],
    contents: [
      "Module 1: Foundations of Applied Behavior Analysis & Scientific Methods",
      "Module 2: Measurement, Continuous/Discontinuous Data Collection & Graphing",
      "Module 3: Assessment, Functional Hypotheses & Preference Assessments",
      "Module 4: Skill Acquisition & Instructional Strategies (Prompting, Chaining, Shaping)",
      "Module 5: Behavior Reduction Strategies, Differential Reinforcement (DRA/DRO/DRI) & Extinction",
      "Module 6: Ethical & Professional Conduct, Dignity, Assent & Cultural Humility"
    ],
    fileSpecs: {
      format: "High-resolution PDF (Searchable, Printable & Tablet Annotation Friendly)",
      delivery: "Instant Worldwide Digital Download via Email & On-Screen Link",
      estimatedPages: "140+ Organized Pages",
      access: "Lifetime Personal Educational Access with Global Support"
    },
    features: [
      "Organized strictly by competency domain with clear terminology definitions",
      "Real-world clinical and educational scenario applications",
      "Clean margins for digital annotations on iPad, Android tablets, or print",
      "Summary recap matrices at the conclusion of every chapter"
    ],
    faq: [
      {
        question: "Can international students outside India purchase this guide?",
        answer: "Yes! We accept international cards, PayPal, and Apple Pay/Google Pay in USD, GBP, EUR, and 100+ global currencies with immediate digital delivery."
      },
      {
        question: "Is this officially endorsed by QABA?",
        answer: "No. This is an independent educational study guide authored by The Behavior Canvas to aid revision. It is neither published by nor officially affiliated with the QABA board."
      },
      {
        question: "Can I print the PDF for personal study?",
        answer: "Yes, you are welcome to print a single copy for your own personal educational use."
      }
    ],
    isAvailable: true
  },
  {
    id: "qasps-cheat-sheet",
    slug: "qasps-cheat-sheet",
    title: "QASP-S Exam Cheat Sheet & Quick Reference",
    subtitle: "Rapid-Review Formulas, Measurement Matrices & Decision Trees",
    priceINR: 299,
    priceUSD: 4.99,
    originalPriceINR: 449,
    originalPriceUSD: 7,
    format: "Digital PDF Document",
    category: "Cheat Sheet",
    image: "/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg",
    badge: "Quick Revision",
    shortDescription:
      "A high-yield, concise revision resource designed to help international learners review key formulas and definitions during final exam preparation.",
    fullDescription: [
      "When exam week approaches, carrying around extensive textbooks is overwhelming. The QASP-S Cheat Sheet distills critical formulas, measurement types, and procedural hierarchies into ultra-clean summary charts.",
      "Designed for rapid memory consolidation, this quick-reference booklet allows you to review key discriminative stimuli, schedules, prompt hierarchies, and ethics principles in minutes."
    ],
    audience: [
      "Candidates in the final 2–4 weeks of exam revision wanting high-yield memory consolidation",
      "Practicing therapists needing a quick desk reference for measurement intervals and prompt fading"
    ],
    contents: [
      "Measurement Decision Matrix (Frequency, Duration, Latency, IRT, Momentary Time Sampling, Partial/Whole Interval)",
      "Schedules of Reinforcement Quick-Reference Chart (FR, VR, FI, VI comparisons)",
      "Prompt Hierarchy Visual Ladder (Most-to-Least vs. Least-to-Most)",
      "Differential Reinforcement At-a-Glance (DRA, DRI, DRO, DRL, DRH)",
      "Core Ethical Rules & Red Flags Summary"
    ],
    fileSpecs: {
      format: "Print-Ready High-Yield PDF",
      delivery: "Instant Worldwide Digital Download",
      estimatedPages: "16 High-Yield Pages",
      access: "Lifetime Personal Access"
    },
    features: [
      "High-contrast visual tables engineered for rapid cognitive recall",
      "Easy cross-referencing between related behavioral concepts",
      "Compact format optimized for tablet screens and phone review"
    ],
    faq: [
      {
        question: "How is this different from the full Study Notes?",
        answer: "The Study Notes provide deep explanatory text, examples, and background theory. The Cheat Sheet is a high-density summary designed for rapid recall and last-minute revision."
      }
    ],
    isAvailable: true
  },
  {
    id: "qasps-practice-questions-book",
    slug: "qasps-practice-questions-book",
    title: "QASP-S Scenario Practice Questions & Rationales",
    subtitle: "150+ Scenario-Based Questions with Distractor Analysis & Test Strategies",
    priceINR: 999,
    priceUSD: 14,
    originalPriceINR: 1499,
    originalPriceUSD: 22,
    format: "Digital PDF Document",
    category: "Practice",
    image: "/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg",
    badge: "Scenario Practice",
    shortDescription:
      "A practice-focused learning resource containing scenario questions with in-depth rationales for every right and wrong choice.",
    fullDescription: [
      "Rote memorization alone is rarely enough for behavior analysis examinations. You must know how to apply behavioral theory to complex, nuanced human scenarios.",
      "This workbook presents realistic case scenarios covering assessment dilemmas, data anomalies, skill breakdown, and ethical conflicts.",
      "Crucially, every question is accompanied by an in-depth answer explanation detailing not only why the correct answer is valid, but precisely why the alternative distractors are incorrect."
    ],
    audience: [
      "QASP-S and ABAT exam candidates seeking test-taking stamina and scenario analysis practice",
      "Study groups and international candidates wanting clinical case questions to discuss"
    ],
    contents: [
      "Part 1: 150 Carefully Crafted Scenario Practice Questions across all Task List domains",
      "Part 2: Full Answer Keys with Detailed Explanatory Rationales",
      "Part 3: Question-by-Question Distractor Analysis (Learning from Wrong Choices)",
      "Part 4: Test-Taking Strategy Guide: How to Deconstruct Scenario Stems"
    ],
    fileSpecs: {
      format: "Searchable PDF with Interactive Navigation",
      delivery: "Instant Worldwide Digital Download",
      estimatedPages: "110+ Detailed Pages",
      access: "Lifetime Personal Access"
    },
    features: [
      "Authentic scenario questions written to build applied analytical reasoning",
      "Separated question sections and answer keys to enable honest self-testing",
      "Emphasis on ethical boundary reasoning, assent, and positive interventions"
    ],
    faq: [
      {
        question: "Are these actual past exam questions?",
        answer: "No. These are original, independently authored practice questions designed for educational review. No proprietary or actual past examination questions are reproduced."
      }
    ],
    isAvailable: true
  },
  {
    id: "qasps-study-tracker",
    slug: "qasps-study-tracker",
    title: "QASP-S Study Tracker & Revision Planner",
    subtitle: "Task-List Checklists, Confidence Heatmap & Study Timetables",
    priceINR: 149,
    priceUSD: 2.50,
    originalPriceINR: 249,
    originalPriceUSD: 4,
    format: "Printable PDF & Interactive Spreadsheet",
    category: "Planner",
    image: "/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg",
    badge: "Productivity",
    shortDescription:
      "A structured study-planning resource to help learners organize their preparation, track progress across timezones, and maintain a revision routine.",
    fullDescription: [
      "Preparing for a professional credential alongside work or family commitments requires disciplined time management. The QASP-S Study Tracker gives you a structured roadmap.",
      "Includes a domain-by-domain task list checklist, a self-assessment confidence tracker (rating your mastery from 1 to 5), an 8-week and 12-week revision calendar, and mock exam score tracking sheets."
    ],
    audience: [
      "Working professionals and international candidates structuring their preparation across 2 to 6 months",
      "Visual planners who benefit from checking off task list items and monitoring progress"
    ],
    contents: [
      "Complete Domain Competency Checklist with mastery checkboxes",
      "8-Week and 12-Week Customizable Study Timetables",
      "Self-Assessment Confidence Heatmap",
      "Mock Exam & Score Progression Log",
      "Terminology Flashcard Progress Tracker"
    ],
    fileSpecs: {
      format: "Fillable & Printable PDF + Google Sheets / Excel Template",
      delivery: "Instant Worldwide Digital Download",
      estimatedPages: "24 Pages + Digital Sheet",
      access: "Lifetime Personal Access"
    },
    features: [
      "Eliminates study overwhelm by organizing syllabus into manageable daily sprints",
      "Tracks both conceptual mastery and mock question accuracy over time"
    ],
    faq: [
      {
        question: "Can I use this digitally on my tablet or laptop?",
        answer: "Yes! You receive both a fillable PDF for tablet annotation apps (GoodNotes, Notability, etc.) and a digital spreadsheet version."
      }
    ],
    isAvailable: true
  },
  {
    id: "complete-qasps-study-bundle",
    slug: "complete-qasps-study-bundle",
    title: "Complete QASP-S International Study Bundle",
    subtitle: "The Complete 4-in-1 Suite: Notes, Cheat Sheets, Practice Book & Study Tracker",
    priceINR: 2000,
    priceUSD: 28,
    originalPriceINR: 2796,
    originalPriceUSD: 39,
    format: "Complete 4-Resource Digital Pack (PDFs & Templates)",
    category: "Bundle",
    isBundle: true,
    image: "/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg",
    badge: "Best Value Bundle (Save 28%)",
    shortDescription:
      "A complete revision suite bringing together selected study notes, revision cheat sheets, practice questions, and planning materials for global candidates.",
    fullDescription: [
      "The Complete QASP-S Study Bundle is the ultimate revision companion for aspiring behavior specialists worldwide. It brings together all four foundational resources in a cohesive, discounted learning suite.",
      "Step 1: Build deep conceptual mastery with the structured Study Notes.",
      "Step 2: Plan your revision sprints systematically using the Study Tracker.",
      "Step 3: Test your real-world reasoning against the Practice Questions & Rationales.",
      "Step 4: Lock in terminology during the final countdown with the high-yield Cheat Sheet."
    ],
    audience: [
      "Global candidates committed to thorough, structured preparation for the QASP-S exam",
      "Educators and interventionists wanting a complete reference library of behavioral tools"
    ],
    contents: [
      "QASP-S Study Notes (140+ pages of detailed conceptual guides)",
      "QASP-S Cheat Sheet & Formula Guide (16 high-yield summary pages)",
      "QASP-S Practice Questions Book (150 scenario questions with detailed rationales)",
      "QASP-S Study Tracker & Revision Planner (Checklists, timetables & score logs)",
      "Bonus: Essential Glossary of 100+ Applied Behavior Analysis Terms"
    ],
    fileSpecs: {
      format: "Complete Digital ZIP Bundle containing all 4 PDF resources + Tracker",
      delivery: "Instant Worldwide Secure Digital Download via Email & Confirmation Page",
      estimatedPages: "290+ Pages in Total",
      access: "Lifetime Personal Educational Access with Free Minor Updates"
    },
    features: [
      "Highest value package: saves 28% compared to purchasing items separately",
      "Integrated study workflow designed to support steady, stress-free retention",
      "Clear licensing terms for single-user personal study"
    ],
    faq: [
      {
        question: "How do international payments work?",
        answer: "We support Stripe, PayPal, Apple Pay, Google Pay, and international credit/debit cards in USD ($), EUR, GBP, AUD, and INR (₹). Your download link is generated immediately upon payment confirmation."
      },
      {
        question: "Can I share these files with colleagues or classmates?",
        answer: "No. The bundle is licensed for individual personal use only. Redistribution or public file sharing is strictly prohibited under our digital licensing terms."
      }
    ],
    isAvailable: true
  }
];
