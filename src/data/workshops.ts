export interface WorkshopItem {
  id: string;
  slug: string;
  title: string;
  audience: string;
  shortDescription: string;
  fullDescription: string[];
  learningObjectives: string[];
  deliveryFormat: string;
  dateTime: string;
  duration: string;
  fee: string;
  status: 'Registration Open' | 'Upcoming' | 'On-Demand / Institutional';
  instructor: string;
  includesCertificate: boolean;
  takeaways: string[];
}

export const workshopsData: WorkshopItem[] = [
  {
    id: "positive-behavior-inclusive-classroom",
    slug: "positive-behavior-inclusive-classroom",
    title: "Positive Behavior Support in the Inclusive Classroom",
    audience: "Mainstream Teachers, Special Educators, Shadow Teachers & School Counselors",
    shortDescription:
      "A practical, scenario-based workshop on identifying behavioral antecedents, designing visual supports, and creating neurodiversity-affirming classroom environments.",
    fullDescription: [
      "Inclusive classrooms thrive when educators have actionable, compassionate tools to respond to diverse behavioral and sensory needs.",
      "This live interactive workshop moves away from reactive punishments (such as time-outs or scolding) and equips educators with Positive Behavior Support (PBS) frameworks.",
      "Participants will learn how to conduct simple antecedent assessments, structure predictable classroom routines, implement individualized visual schedules, and teach functional replacement behaviors that keep learners engaged."
    ],
    learningObjectives: [
      "Understand the four primary functions of behavior in classroom environments",
      "Design and implement visual schedules, first-then boards, and transition countdowns",
      "Differentiate between sensory dysregulation, communication frustration, and task avoidance",
      "Formulate proactive antecedent modifications to prevent common classroom behavioral disruptions",
      "Promote meaningful peer understanding and collaborative learning"
    ],
    deliveryFormat: "Live Interactive Webinar via Zoom (Includes recording & toolkit)",
    dateTime: "Saturday, November 21, 2026 · 10:00 AM – 1:00 PM IST",
    duration: "3 Hours (Including Live Case Study Breakouts & Q&A)",
    fee: "₹1,299 per participant (Institutional group discounts available)",
    status: "Registration Open",
    instructor: "Reema Singh (Founder, The Behavior Canvas)",
    includesCertificate: true,
    takeaways: [
      "Downloadable Classroom PBS Toolkit (Printable visual schedule templates)",
      "Antecedent Modification Checklist for daily lessons",
      "Certificate of Participation verifying 3 hours of continuing professional education"
    ]
  },
  {
    id: "functional-communication-caregivers",
    slug: "functional-communication-caregivers",
    title: "Functional Communication & De-escalation: Practical Tools for Parents",
    audience: "Parents, Family Caregivers & Early Interventionists",
    shortDescription:
      "Empathetic, parent-first strategies to recognize early escalation signs, teach functional communication at home, and navigate meltdowns with calm connection.",
    fullDescription: [
      "When a child experiences intense emotional dysregulation or engages in challenging behaviors at home, parents often feel exhausted and isolated.",
      "This parent-centered workshop teaches the principles of Functional Communication Training (FCT) and calm de-escalation in plain, non-clinical language.",
      "You will learn to identify subtle signs of distress before a full meltdown occurs, provide appropriate co-regulation, and help your child communicate their needs—whether through speech, gestures, pictures, or AAC devices."
    ],
    learningObjectives: [
      "Identify subtle early escalation triggers (precursors) before distress peaks",
      "Implement Functional Communication Training (FCT) during everyday family routines",
      "Learn calming co-regulation techniques that prioritize safety and connection",
      "Establish predictable, low-stress morning, mealtime, and bedtime transitions",
      "Practice self-compassion and emotional regulation as a caregiver"
    ],
    deliveryFormat: "Live Virtual Workshop via Zoom (Private, supportive parent circle)",
    dateTime: "Sunday, December 6, 2026 · 4:00 PM – 6:30 PM IST",
    duration: "2.5 Hours (Interactive with dedicated parent Q&A)",
    fee: "₹899 per family / caregiver pair",
    status: "Registration Open",
    instructor: "Reema Singh",
    includesCertificate: false,
    takeaways: [
      "Home De-escalation & Communication Cheat Sheet (PDF)",
      "Daily Routine Visual Schedule starter pack",
      "Lifetime access to session summary notes and reading list"
    ]
  },
  {
    id: "applied-behavior-analysis-foundations",
    slug: "applied-behavior-analysis-foundations",
    title: "Foundations of Applied Behavior Science for Aspiring Analysts",
    audience: "Psychology Graduates, Special Educators & Behavior Technicians",
    shortDescription:
      "A rigorous, conceptual masterclass breaking down operant conditioning, stimulus control, and ethical considerations for Indian practice.",
    fullDescription: [
      "For students and early-career professionals preparing for international credentials or seeking deeper theoretical clarity, this intensive seminar bridges textbook definitions with ethical practice.",
      "We unpack the nuances of motivating operations (MOs) vs. discriminative stimuli (SDs), examine schedules of reinforcement, and explore assent-based practice in neurodiversity-affirming contexts."
    ],
    learningObjectives: [
      "Differentiate between Motivating Operations (EO/AO) and Discriminative Stimuli (SD/S-delta)",
      "Analyze compound schedules of reinforcement and extinction bursts",
      "Evaluate ethical dilemmas surrounding assent, forced compliance, and learner autonomy",
      "Deconstruct complex exam scenario questions using analytical reasoning"
    ],
    deliveryFormat: "Live Online Seminar via Zoom",
    dateTime: "Upcoming Cohort · January 2027 (Enquiry & Waitlist Open)",
    duration: "4 Hours (Spread across two 2-hour weekend sessions)",
    fee: "₹1,800 (Early-bird ₹1,499)",
    status: "Upcoming",
    instructor: "Reema Singh",
    includesCertificate: true,
    takeaways: [
      "Task-list conceptual breakdown study booklet",
      "Scenario analysis workbook with sample questions",
      "Certificate of Completion for 4 Professional Development hours"
    ]
  }
];
