import { PublishStatus } from '../types';

export interface WorkshopItem {
  id: string;
  slug: string;
  title: string;
  bannerImage?: string;
  audience: string;
  shortDescription: string;
  fullDescription: string[];
  learningObjectives: string[];
  deliveryFormat: string;
  dateTime: string;
  duration: string;
  fee: string;
  feeINR?: number;
  feeUSD?: number;
  seatCapacity?: number;
  closingDate?: string;
  eventStatus?: 'Upcoming' | 'Registration Open' | 'Registration Closed' | 'Completed' | 'Archived';
  status: 'Registration Open' | 'Upcoming' | 'Registration Closed' | 'Completed' | 'Archived' | 'On-Demand / Institutional';
  publishState?: PublishStatus;
  instructor: string;
  includesCertificate: boolean;
  takeaways: string[];
}

export const workshopsData: WorkshopItem[] = [
  {
    id: 'positive-behavior-inclusive-classroom',
    slug: 'positive-behavior-inclusive-classroom',
    title: 'Positive Behavior Support in the Inclusive Classroom',
    bannerImage: '/assets/images/classroom_watercolor_inclusion_1793099874430.jpg',
    audience: 'Mainstream Teachers, Special Educators, Shadow Teachers & School Counsellors',
    shortDescription:
      'A practical, scenario-based workshop on identifying behavioural antecedents, designing visual supports, and nurturing neurodiversity-affirming classroom environments.',
    fullDescription: [
      'Inclusive classrooms flourish when educators have actionable, compassionate tools to respond to diverse behavioural and sensory needs.',
      'This live interactive workshop moves beyond reactive disciplinary responses and equips educators with Positive Behaviour Support (PBS) frameworks.',
      'Participants explore simple antecedent observations, predictable classroom transitions, visual schedules, and functional replacement skills.',
    ],
    learningObjectives: [
      'Understand the primary communicative functions of behaviour in classroom contexts',
      'Design visual schedules, first-then supports, and low-stress transitions',
      'Distinguish sensory overwhelm from escape or communication barriers',
      'Create proactive environmental supports rooted in student dignity and assent',
    ],
    deliveryFormat: 'Live Interactive Online Workshop (Includes Resource Kit)',
    dateTime: 'Schedule & Cohort Registration Open',
    duration: '3 Hours (Interactive Case Discussions & Q&A)',
    fee: '₹1,299 per participant',
    feeINR: 1299,
    feeUSD: 18,
    closingDate: 'Confirmed Upon Cohort Finalisation',
    eventStatus: 'Registration Open',
    status: 'Registration Open',
    publishState: 'published',
    instructor: 'Reema Singh — QASP-S (QABA, USA), Special Educator',
    includesCertificate: true,
    takeaways: [
      'Downloadable Classroom PBS Toolkit',
      'Antecedent Environmental Adjustment Checklist',
      'Certificate of Participation (The Behavior Canvas)',
    ],
  },
  {
    id: 'functional-communication-caregivers',
    slug: 'functional-communication-caregivers',
    title: 'Functional Communication & Co-Regulation: Practical Tools for Parents',
    bannerImage: '/assets/images/hero_watercolor_child_guide_1793099905373.jpg',
    audience: 'Parents, Family Caregivers & Early Interventionists',
    shortDescription:
      'Empathetic, parent-first strategies to recognise early overwhelm signals, scaffold functional communication at home, and support calm co-regulation.',
    fullDescription: [
      'When a child experiences intense distress or behavioural overwhelm at home, caregivers deserve clear, non-blaming guidance rather than generic advice.',
      'This parent-focused workshop introduces Functional Communication Training (FCT) and calm co-regulation principles in clear, everyday language.',
    ],
    learningObjectives: [
      'Recognise subtle early precursor cues before distress peaks',
      'Introduce functional communication across spoken, visual, gesture, or AAC tools',
      'Design predictable, low-friction morning and bedtime transitions',
      'Strengthen emotional co-regulation while safeguarding caregiver wellbeing',
    ],
    deliveryFormat: 'Live Supportive Online Parent Circle',
    dateTime: 'Upcoming Cohort — Registrations Open',
    duration: '2.5 Hours (Interactive with Dedicated Parent Q&A)',
    fee: '₹899 per family',
    feeINR: 899,
    feeUSD: 12,
    closingDate: 'Open Until Cohort Commencement',
    eventStatus: 'Registration Open',
    status: 'Registration Open',
    publishState: 'published',
    instructor: 'Reema Singh — QASP-S (QABA, USA)',
    includesCertificate: false,
    takeaways: [
      'Home Co-Regulation & Communication Guide (PDF)',
      'Starter Visual Routine Templates',
    ],
  },
  {
    id: 'applied-behavior-analysis-foundations',
    slug: 'applied-behavior-analysis-foundations',
    title: 'Foundations of Ethical Behaviour Analysis for Students & Aspiring Practitioners',
    bannerImage: '/assets/images/supervision_watercolor_growth_1793099872825.jpg',
    audience: 'Psychology Students, Special Educators & Behaviour Technicians',
    shortDescription:
      'A conceptual masterclass unpacking operant contingencies, motivating operations, and assent-centred ethical decision-making.',
    fullDescription: [
      'For students and early-career professionals strengthening theoretical clarity, this seminar bridges foundational concepts with respectful applied practice.',
    ],
    learningObjectives: [
      'Differentiate Motivating Operations (EO/AO) from Discriminative Stimuli',
      'Examine reinforcement schedules through practical vignettes',
      'Evaluate ethical dilemmas centred on assent and learner autonomy',
    ],
    deliveryFormat: 'Live Online Seminar',
    dateTime: 'Upcoming Cohort (Waitlist Open)',
    duration: '4 Hours (Two 2-Hour Sessions)',
    fee: '₹1,499 per participant',
    feeINR: 1499,
    feeUSD: 20,
    closingDate: 'Announced Upon Batch Confirmation',
    eventStatus: 'Upcoming',
    status: 'Upcoming',
    publishState: 'published',
    instructor: 'Reema Singh — QASP-S (QABA, USA)',
    includesCertificate: true,
    takeaways: [
      'Conceptual Breakdown Study Packet',
      'Certificate of Participation (Independent Educational Hours)',
    ],
  },
];
