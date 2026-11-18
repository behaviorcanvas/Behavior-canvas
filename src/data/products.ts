import { PublishStatus } from '../types';

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
  category: 'Notes' | 'Cheat Sheet' | 'Practice' | 'Planner' | 'E-book' | 'Bundle';
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
  downloadPath?: string;
  isAvailable: boolean;
  status?: PublishStatus;
}

export const productsData: ProductItem[] = [
  {
    id: 'qasps-study-notes',
    slug: 'qasps-study-notes',
    title: 'ABA Notes (QASP-S & Behavioural Science Study Guide)',
    subtitle: 'Structured Competency Notes for Behaviour Science, Measurement & Ethical Practice',
    priceINR: 799,
    priceUSD: 11,
    originalPriceINR: 1099,
    originalPriceUSD: 16,
    format: 'Digital PDF Document',
    category: 'Notes',
    image: '/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg',
    badge: 'Core ABA Notes',
    shortDescription:
      'Comprehensive, systematically structured ABA & behavioural science study notes pairing conceptual accuracy with compassionate home, clinic, and school applications.',
    fullDescription: [
      'ABA Notes are systematically organised across foundational behavioural science domains—translating dense textbook definitions into clear, thoughtful prose.',
      'Designed for psychology students, special educators, and QASP-S candidates worldwide, each domain connects scientific precision with practical scenarios from inclusive classrooms and supportive family settings.',
      'Includes clear diagrams for schedules of reinforcement, functional behaviour assessments (FBA), stimulus control, prompt hierarchies, and differential reinforcement procedures.',
    ],
    audience: [
      'Psychology & special education students building conceptual fluency in ABA',
      'Candidates preparing independently for QASP-S or behavioural competency assessments',
      'Early-career therapists and educators seeking a compassionate conceptual reference guide',
    ],
    contents: [
      'Module 1: Philosophical Foundations & Dimensions of Applied Behaviour Analysis',
      'Module 2: Observation, Measurement & Visual Data Integrity',
      'Module 3: Functional Behaviour Assessment & Setting Events',
      'Module 4: Skill Acquisition, Shaping, Chaining & Prompt Fading',
      'Module 5: Positive Support, Differential Reinforcement (DRA/DRO/DRI) & FCT',
      'Module 6: Ethical Practice, Learner Dignity, Assent & Cultural Responsiveness',
    ],
    fileSpecs: {
      format: 'Searchable High-Resolution PDF (Printable & Tablet-Annotation Ready)',
      delivery: 'Unlocked in Learner Portal & Download Receipt Upon Verified Payment',
      estimatedPages: '140+ Organised Pages',
      access: 'Lifetime Personal Educational Access',
    },
    features: [
      'Domain-by-domain conceptual breakdowns with plain-language explanations',
      'Applied clinical, family, and inclusive classroom illustrations',
      'Clean annotation margins for iPad, Android tablets, or printed study binders',
      'End-of-chapter synthesis matrices',
    ],
    faq: [
      {
        question: 'Can international learners purchase this guide?',
        answer: 'Yes. Both INR (₹799 via Razorpay/UPI) and international USD cards are supported.',
      },
      {
        question: 'Is this officially endorsed or published by QABA?',
        answer:
          'No. These are independent educational study notes authored by The Behavior Canvas. They are not officially endorsed by or affiliated with QABA.',
      },
    ],
    downloadPath: 'aba-notes-v1.pdf',
    isAvailable: true,
    status: 'published',
  },
  {
    id: 'qasps-cheat-sheet',
    slug: 'qasps-cheat-sheet',
    title: 'ABA Cheat Sheet & Rapid Revision Matrix',
    subtitle: 'High-Yield Formulas, Measurement Charts, Schedules & Decision Trees',
    priceINR: 299,
    priceUSD: 5,
    originalPriceINR: 449,
    originalPriceUSD: 7,
    format: 'Digital PDF Document',
    category: 'Cheat Sheet',
    image: '/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg',
    badge: 'Quick Reference',
    shortDescription:
      'A crisp, visual rapid-revision guide summarising measurement procedures, reinforcement schedules, prompting hierarchies, and ethical safeguards.',
    fullDescription: [
      'When preparing for exams or reviewing case formulation frameworks, the ABA Cheat Sheet condenses essential formulas, measurement comparisons, and procedural trees into quick-scan visual tables.',
      'Built for effortless revision on tablet, desktop, or laminated desk printout.',
    ],
    audience: [
      'Students and QASP-S/ABAT learners consolidating key terminology before assessments',
      'Educators and interventionists wanting an ethical desk reference for measurement and prompt fading',
    ],
    contents: [
      'Measurement Comparison Matrix (Frequency, Duration, Latency, IRT, MTS, Interval)',
      'Schedules of Reinforcement Quick Chart (FR, VR, FI, VI)',
      'Prompting & Fading Visual Hierarchy',
      'Differential Reinforcement Comparison (DRA, DRI, DRO, DRL)',
      'Assent & Least-Restrictive Practice Checklist',
    ],
    fileSpecs: {
      format: 'Print-Ready High-Yield PDF',
      delivery: 'Instant Digital Access Upon Verified Payment',
      estimatedPages: '16 Concise Summary Pages',
      access: 'Lifetime Personal Access',
    },
    features: [
      'Zero-clutter typography engineered for rapid recall',
      'Side-by-side comparison grids distinguishing commonly confused terms',
      'Compact tablet & desktop optimised layout',
    ],
    faq: [
      {
        question: 'How does the ABA Cheat Sheet differ from the full ABA Notes?',
        answer:
          'ABA Notes provide full conceptual explanations and examples (140+ pages), whereas the ABA Cheat Sheet offers ultra-condensed revision matrices for fast review.',
      },
    ],
    downloadPath: 'aba-cheat-sheet-v1.pdf',
    isAvailable: true,
    status: 'published',
  },
  {
    id: 'qasps-practice-questions-book',
    slug: 'qasps-practice-questions-book',
    title: 'ABA Question Bank & Scenario Rationales',
    subtitle: '150+ Applied Scenario Questions with Detailed Right/Wrong Distractor Breakdowns',
    priceINR: 999,
    priceUSD: 14,
    originalPriceINR: 1499,
    originalPriceUSD: 22,
    format: 'Digital PDF Document',
    category: 'Practice',
    image: '/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg',
    badge: 'Applied Practice',
    shortDescription:
      'Scenario-driven applied behaviour analysis questions complete with thorough conceptual rationales explaining every correct choice and distractor.',
    fullDescription: [
      'Applying behavioural principles in nuanced human scenarios requires analytical discrimination beyond memorising definitions.',
      'This structured Question Bank presents realistic vignettes spanning functional assessment, data interpretation, instructional planning, and ethical dilemmas—paired with line-by-line rationales for why every option succeeds or fails.',
    ],
    audience: [
      'Learners developing applied reasoning for QASP-S and behavioural exams',
      'Study circles and university cohorts practising scenario deconstruction',
    ],
    contents: [
      'Part 1: 150 Original Scenario-Based Applied Questions',
      'Part 2: Complete Answer Key with Theoretical Rationales',
      'Part 3: Distractor Elimination Analysis',
      'Part 4: Step-by-Step Stem Deconstruction Guide',
    ],
    fileSpecs: {
      format: 'Searchable Interactive PDF Workbook',
      delivery: 'Instant Digital Access Upon Verified Payment',
      estimatedPages: '110+ Detailed Pages',
      access: 'Lifetime Personal Access',
    },
    features: [
      'Original ethically framed case vignettes',
      'Separated question and answer sections for authentic self-testing',
      'Assent, dignity, and contextual analysis highlighted throughout',
    ],
    faq: [
      {
        question: 'Are these actual board examination questions?',
        answer:
          'No. Every question is originally written by The Behavior Canvas strictly for independent educational practice.',
      },
    ],
    downloadPath: 'aba-question-bank-v1.pdf',
    isAvailable: true,
    status: 'published',
  },
  {
    id: 'qasps-study-tracker',
    slug: 'qasps-study-tracker',
    title: 'Behavioural Science Study Tracker & Revision Planner',
    subtitle: 'Competency Checklists, Confidence Heatmaps & Revision Timetables',
    priceINR: 149,
    priceUSD: 3,
    originalPriceINR: 249,
    originalPriceUSD: 5,
    format: 'Fillable PDF & Revision Tracker',
    category: 'Planner',
    image: '/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg',
    badge: 'Study Planner',
    shortDescription:
      'Stay calm and consistent with domain checklists, 8/12-week study timetables, confidence ratings, and mock score logs.',
    fullDescription: [
      'Structuring multi-month study alongside clinical or university responsibilities becomes effortless with a dedicated study roadmap.',
      'Track domain readiness, interleave revision blocks, and visualise mastery progress week by week.',
    ],
    audience: [
      'Students, educators, and working practitioners preparing over 2–6 months',
    ],
    contents: [
      'Complete Competency Domain Checklist',
      '8-Week & 12-Week Study Schedules',
      'Confidence Rating & Error-Log Matrix',
    ],
    fileSpecs: {
      format: 'Fillable & Printable PDF Pack',
      delivery: 'Instant Digital Access Upon Verified Payment',
      estimatedPages: '24 Structured Pages',
      access: 'Lifetime Personal Access',
    },
    features: [
      'Supports interleaved study planning',
      'Digital tablet or print friendly',
    ],
    faq: [],
    downloadPath: 'study-tracker-v1.pdf',
    isAvailable: true,
    status: 'published',
  },
  {
    id: 'ebook-compassionate-support',
    slug: 'compassionate-behaviour-support-ebook',
    title: 'E-Book: Understanding Behaviour With Compassion',
    subtitle: 'Practical Reflections for Parents, Educators & Developing Practitioners',
    priceINR: 499,
    priceUSD: 7,
    originalPriceINR: 699,
    originalPriceUSD: 10,
    format: 'Digital E-Book (PDF)',
    category: 'E-book',
    image: '/src/assets/images/research_journal_editorial_1794989153921.jpg',
    badge: 'Digital E-Book',
    shortDescription:
      'An accessible reader bridging functional understanding, emotional regulation, assent, and collaborative home-school routines without jargon.',
    fullDescription: [
      'Written for both families and educators, this e-book demystifies why behaviour occurs, how environments shape comfort and distress, and how gentle communication builds trust.',
    ],
    audience: ['Parents and family caregivers', 'Classroom educators and counsellors', 'Introductory students'],
    contents: [
      'Chapter 1: Seeing Beneath Surface Behaviour',
      'Chapter 2: Sensory Comfort, Predictability & Environment',
      'Chapter 3: Honouring Communication & Assent at Every Age',
      'Chapter 4: Home–School Partnership Checklists',
    ],
    fileSpecs: {
      format: 'High-Resolution Editorial E-Book PDF',
      delivery: 'Instant Digital Access Upon Verified Payment',
      estimatedPages: '68 Pages',
      access: 'Lifetime Personal Access',
    },
    features: ['Jargon-free reflections paired with visual worksheets', 'Warm editorial layout'],
    faq: [],
    downloadPath: 'compassionate-support-ebook-v1.pdf',
    isAvailable: true,
    status: 'published',
  },
  {
    id: 'complete-qasps-study-bundle',
    slug: 'complete-qasps-study-bundle',
    title: 'Complete ABA Study Bundle (Notes + Cheat Sheet + Question Bank + Tracker)',
    subtitle: '4-in-1 Academic & Exam Revision Suite at Bundle Savings',
    priceINR: 2000,
    priceUSD: 28,
    originalPriceINR: 2796,
    originalPriceUSD: 39,
    format: 'Complete 4-Resource Digital Pack (PDFs)',
    category: 'Bundle',
    isBundle: true,
    image: '/src/assets/images/study_bundle_watercolor_cover_1793099874549.jpg',
    badge: 'Best Value Bundle',
    shortDescription:
      'Bring together ABA Notes (₹799), ABA Cheat Sheet (₹299), ABA Question Bank (₹999), and Study Tracker (₹149) in one unified digital bundle.',
    fullDescription: [
      'Designed as an integrated learning system from initial concept mastery through final scenario testing.',
      'Combines our flagship ABA Notes, Rapid Revision Cheat Sheet, 150+ Scenario Question Bank, and Study Tracker at a generous single-bundle price.',
    ],
    audience: [
      'QASP-S and ABA students seeking a cohesive, structured library',
      'Educators and early-career clinicians building conceptual depth',
    ],
    contents: [
      'ABA Notes (140+ Pages)',
      'ABA Cheat Sheet & Matrices (16 Pages)',
      'ABA Question Bank & Rationales (150+ Scenarios)',
      'Study Tracker & Revision Planner (24 Pages)',
    ],
    fileSpecs: {
      format: 'Complete Digital PDF Suite',
      delivery: 'Unlocked Immediately Upon Verified Payment',
      estimatedPages: '290+ Pages Total',
      access: 'Lifetime Personal Access',
    },
    features: [
      'All 4 core digital resources in one coordinated study workflow',
      'Clear single-user educational licence',
    ],
    faq: [],
    downloadPath: 'complete-aba-study-bundle-v1.pdf',
    isAvailable: true,
    status: 'published',
  },
];
