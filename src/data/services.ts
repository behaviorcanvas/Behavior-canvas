export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string[];
  audience: string;
  whoItsFor: string[];
  whatItInvolves: {
    step: string;
    title: string;
    description: string;
  }[];
  deliveryFormat: string;
  feeNote: string;
  scopeAndLimitations: string[];
  category: 'Parents' | 'Educators' | 'Learners' | 'Professionals';
}

export const servicesData: ServiceItem[] = [
  {
    id: "behavior-consultation",
    slug: "behavior-consultation",
    title: "Behavior Consultation",
    shortDescription:
      "Collaborative assessment-informed consultations to help families and educators understand behavior patterns, identify environmental variables, and explore practical support strategies.",
    longDescription: [
      "Behavior is a form of communication. When challenging or distressing behaviors arise, they often signal unmet needs, sensory overload, communication barriers, or environmental friction.",
      "Our Behavior Consultation service provides structured, non-judgmental guidance for families and educators. Together, we analyze specific behavioral episodes to uncover the underlying functions—what the individual is seeking, avoiding, or attempting to express.",
      "Rather than focusing solely on eliminating unwanted behaviors, consultations focus on teaching functional replacement skills, rearranging environmental triggers, and building proactive routines that foster emotional safety and connection."
    ],
    audience: "Parents, caregivers, educators, and multidisciplinary team members seeking focused clarity on specific behavioral challenges.",
    whoItsFor: [
      "Caregivers managing challenging behaviors such as meltdowns, aggression, or intense avoidance at home",
      "Educators seeking practical classroom adjustments for a specific student's participation",
      "Families navigating transitions, bedtime routines, mealtime distress, or community outings",
      "Teams looking to replace punitive responses with compassionate, evidence-informed positive behavior support"
    ],
    whatItInvolves: [
      {
        step: "01",
        title: "Intake & Context Gathering",
        description: "Review of background information, daily routines, previous supports, and specific caregiver priorities via structured questionnaire."
      },
      {
        step: "02",
        title: "Antecedent-Behavior-Consequence (ABC) Analysis",
        description: "Careful examination of environmental triggers, the exact topography of the behavior, and the responding outcomes."
      },
      {
        step: "03",
        title: "Collaborative Consultation Session",
        description: "A focused 60-minute video session to discuss functional hypotheses, learner strengths, and family dynamics."
      },
      {
        step: "04",
        title: "Actionable Summary & Strategy Roadmap",
        description: "A concise, written guidance document detailing proactive antecedent modifications, replacement communication skills, and response strategies."
      }
    ],
    deliveryFormat: "Secure Online Video Consultation (Pan-India) with follow-up written summary",
    feeNote: "Consultation fees are shared upon enquiry based on session depth and documentation requirements.",
    scopeAndLimitations: [
      "Educational and behavioral guidance only; does not constitute psychiatric or medical diagnosis.",
      "Not an emergency or acute psychiatric crisis intervention service.",
      "Requires active parental/caregiver participation and accurate sharing of environmental context.",
      "Suitability is determined during initial intake review."
    ],
    category: "Parents"
  },
  {
    id: "parent-guidance-and-training",
    slug: "parent-guidance-and-training",
    title: "Parent Guidance and Training",
    shortDescription:
      "Empathetic, skill-building guidance for parents to master positive reinforcement, functional communication, and calm, predictable home routines.",
    longDescription: [
      "Parenting a neurodivergent child or a learner with unique behavioral needs can feel overwhelming in a world that often misunderstands their pace and communication.",
      "Parent Guidance and Training is designed to empower caregivers with knowledge, confidence, and practical tools. We move away from generic advice and blame, focusing on building sustainable daily rhythms that support both the child's regulation and the caregiver's emotional wellbeing.",
      "Parents learn how to observe subtle precursor signals, introduce visual schedules, scaffold communication, and provide meaningful positive reinforcement that strengthens the parent-child bond."
    ],
    audience: "Parents and primary caregivers of autistic children, ADHDers, learners with developmental delays, or children experiencing emotional dysregulation.",
    whoItsFor: [
      "Parents looking for compassionate, non-blaming education on why their child exhibits specific behaviors",
      "Caregivers wanting to teach functional communication (vocal, AAC, or visual) at home",
      "Families striving for smoother daily transitions, morning routines, and self-help skill building",
      "Parents seeking to align strategies between home and school environments"
    ],
    whatItInvolves: [
      {
        step: "01",
        title: "Needs Assessment & Priority Setting",
        description: "Identifying 2–3 high-priority daily challenges that most impact family harmony and child independence."
      },
      {
        step: "02",
        title: "Interactive Coaching Sessions",
        description: "Bi-weekly or weekly 50-minute structured learning modules covering positive reinforcement, task analysis, and emotion coaching."
      },
      {
        step: "03",
        title: "Hands-on Modeling & Video Review",
        description: "Guided practice of communication prompting and differential reinforcement with personalized real-time feedback."
      },
      {
        step: "04",
        title: "Sustainable Routine Integration",
        description: "Adapting visual schedules and reward systems to fit the authentic Indian household culture without unnecessary stress."
      }
    ],
    deliveryFormat: "Modular Online Coaching Program (Individual Caregiver or Couple Sessions via Video)",
    feeNote: "Offered in modular 4-session or 8-session packages. Transparent pricing provided on enquiry.",
    scopeAndLimitations: [
      "Educational coaching for parents; does not replace individualized occupational, speech, or medical therapy.",
      "Requires consistent follow-through and practice within home routines.",
      "Focused on skill acquisition and positive behavior support within the family system."
    ],
    category: "Parents"
  },
  {
    id: "special-education-inclusive-learning",
    slug: "special-education-inclusive-learning",
    title: "Special Education & Inclusive Learning Support",
    shortDescription:
      "Tailored educational strategies, curriculum modifications, and classroom accommodations to facilitate authentic inclusion and learning engagement.",
    longDescription: [
      "Inclusion is not just physical placement in a classroom; it is meaningful participation, genuine belonging, and equitable access to the learning curriculum.",
      "Our Special Education and Inclusive Learning Support collaborates with educators, resource teachers, shadow teachers, and parents to design supportive classroom environments.",
      "We assist in breaking down academic concepts into accessible milestones, developing individualized accommodations, utilizing assistive visual aids, and fostering peer interaction in inclusive Indian schools."
    ],
    audience: "Special educators, mainstream teachers, school administrators, and parents seeking educational adaptations for diverse learners.",
    whoItsFor: [
      "Educators needing practical adaptations for neurodivergent students in mainstream classrooms",
      "Schools designing or updating Individualized Education Plans (IEPs) and accommodation frameworks",
      "Shadow educators and remedial teachers seeking structured behavior and instructional techniques",
      "Parents advocating for evidence-based accommodations during parent-teacher meetings"
    ],
    whatItInvolves: [
      {
        step: "01",
        title: "Learner Profile & Academic Scaffolding",
        description: "Evaluating learning modalities, attentional spans, sensory preferences, and baseline academic prerequisites."
      },
      {
        step: "02",
        title: "Curriculum Adaptation & Task Analysis",
        description: "Differentiating instructional materials into bite-sized, sequential steps with visual and tactile supports."
      },
      {
        step: "03",
        title: "Classroom Accommodation Guidance",
        description: "Strategies for sensory breaks, desk arrangements, clear transition signals, and modified evaluation methods."
      },
      {
        step: "04",
        title: "Educator Collaboration & Review",
        description: "Consultation with teaching staff to ensure accommodations are feasible and seamlessly integrated into the daily timetable."
      }
    ],
    deliveryFormat: "Remote Consultation for Schools, Educators & Families across India",
    feeNote: "Custom pricing based on whether support is for an individual family or institutional school staff.",
    scopeAndLimitations: [
      "Provides pedagogical and behavioral guidance; does not issue statutory board certifications or formal school placement guarantees.",
      "Collaboration with school authorities is subject to the school's own institutional policies and parent consent."
    ],
    category: "Educators"
  },
  {
    id: "online-behavior-support",
    slug: "online-behavior-support",
    title: "Online Behavior Support",
    shortDescription:
      "Structured remote behavior guidance connecting families across India with individualized goal planning, progress tracking, and regular follow-ups.",
    longDescription: [
      "Geography should not be a barrier to high-quality, compassionate behavior science education. Families across tier-1, tier-2, and tier-3 Indian cities frequently lack access to trained behavior specialists.",
      "Online Behavior Support bridges this divide through scheduled remote video consultations, secure digital data-tracking templates, and ongoing caregiver mentorship.",
      "Through tele-consultation, we guide caregivers through functional skill building, communication prompts, and environmental adjustments from the comfort and natural context of their own homes."
    ],
    audience: "Families and caregivers residing anywhere in India or NRI families seeking culturally aligned behavioral guidance.",
    whoItsFor: [
      "Families in regions with limited local access to qualified behavior analysts and special educators",
      "Caregivers needing ongoing, flexible remote check-ins and objective progress reviews",
      "Older children and teenagers who can participate in self-monitoring and goal-setting discussions remotely",
      "Families preparing for major changes such as relocation, sibling arrival, or new school transitions"
    ],
    whatItInvolves: [
      {
        step: "01",
        title: "Initial Virtual Assessment & Goal Setting",
        description: "Comprehensive video intake to understand daily living routines and target skills."
      },
      {
        step: "02",
        title: "Digital Behavior Support Roadmap",
        description: "Provision of clear, step-by-step written intervention plans and visual cue sheets."
      },
      {
        step: "03",
        title: "Bi-Weekly Progress Reviews",
        description: "Scheduled video check-ins to review progress data, celebrate wins, and calibrate strategies."
      },
      {
        step: "04",
        title: "Asynchronous Caregiver Check-Ins",
        description: "Structured email check-ins for quick troubleshooting between formal sessions."
      }
    ],
    deliveryFormat: "Virtual / Tele-Consultation via secure video meeting",
    feeNote: "Structured monthly and per-session options available upon consultation request.",
    scopeAndLimitations: [
      "Remote delivery depends on caregiver active involvement and stable internet access.",
      "May not be suitable for cases involving severe self-injurious behavior or imminent physical danger requiring direct in-person clinical stabilization."
    ],
    category: "Parents"
  },
  {
    id: "professional-mentoring-and-supervision",
    slug: "professional-mentoring-and-supervision",
    title: "International Remote Supervision & Professional Mentoring",
    shortDescription:
      "Global remote mentoring, task-list study support, and reflective case supervision for aspiring behavior analysts, international QASP-S/ABAT candidates, and psychology professionals across all time zones.",
    longDescription: [
      "The field of behavior analysis and special education requires both rigorous conceptual mastery and deep, neurodiversity-affirming ethical sensitivity.",
      "Our International Remote Supervision and Mentoring service offers guided case conceptualization, task-list deep dives, literature exploration, and ethical dilemma analysis for candidates and interventionists worldwide.",
      "Whether you are preparing for international credentials (such as QASP-S or ABAT), completing global coursework requirements, or seeking to strengthen your applied clinical reasoning, remote mentoring provides a thoughtful, culturally responsive sounding board.",
      "Sessions are flexibly scheduled across global time zones—accommodating candidates across North America (EST/PST), Europe and the UK (GMT/CET), the Middle East (GST), the Asia-Pacific region (AEST/SGT), and India (IST)."
    ],
    audience: "International QASP-S/ABAT exam candidates, psychology graduates, special educators, and early-career behavior interventionists worldwide.",
    whoItsFor: [
      "International candidates preparing for QASP-S/ABAT examinations seeking conceptual clarity on complex task list items",
      "Practitioners needing flexible remote tele-supervision accommodated to their local country time zone",
      "Educators wanting to master functional behavior assessments, prompt fading, and data-driven goal setting",
      "Interventionists seeking ethical guidance on assent, dignity, and neurodiversity-affirming practice modifications",
      "Global trainees looking for structured, reflective case conceptualization discussions"
    ],
    whatItInvolves: [
      {
        step: "01",
        title: "Global Intake & Competency Baseline",
        description: "Mapping your professional goals and local timezone availability against core behavioral competency domains."
      },
      {
        step: "02",
        title: "Task-List & Concept Deep Dives",
        description: "Detailed breakdown of terminology (e.g., schedules of reinforcement, stimulus control, establishing operations, FCT) with practical case examples."
      },
      {
        step: "03",
        title: "Ethical Scenarios & Case Conceptualization",
        description: "Analyzing real-world dilemmas, cultural responsiveness, learner autonomy, and assent-based intervention frameworks."
      },
      {
        step: "04",
        title: "Study Strategy & Exam Mentorship",
        description: "Personalized study scheduling, scenario deconstruction techniques, and mock exam test-taking strategies."
      }
    ],
    deliveryFormat: "Virtual Tele-Supervision via Zoom (Flexible Scheduling across US, UK, Middle East, Australia & India)",
    feeNote: "Offered in individual hourly sessions or discounted monthly mentorship cohorts. Multi-currency payment accepted via Stripe & PayPal.",
    scopeAndLimitations: [
      "Educational mentoring and conceptual guidance; formal supervised fieldwork hours required for international certification boards are governed by specific written supervision contracts executed on an individual basis.",
      "No guarantee of credential examination passage or automatic certification."
    ],
    category: "Professionals"
  },
  {
    id: "workshops-and-training",
    slug: "workshops-and-training",
    title: "Workshops and Educational Training",
    shortDescription:
      "Interactive, evidence-based online workshops for schools, parent groups, therapy clinics, and psychology university departments.",
    longDescription: [
      "The Behavior Canvas organizes live, interactive educational workshops designed to demystify behavior science and deliver immediate practical value.",
      "Our workshops combine clear multimedia presentations with authentic scenario problem-solving, participatory Q&A, and downloadable takeaway resource kits.",
      "We also partner with progressive schools and non-profit organizations across India to conduct customized professional development workshops for faculty and support staff."
    ],
    audience: "Schools, educator groups, parent associations, universities, and professional development coordinators.",
    whoItsFor: [
      "Schools aiming to equip mainstream teachers with inclusive positive behavior management skills",
      "Parent support organizations seeking actionable webinars on communication and sensory regulation",
      "Psychology and education colleges hosting specialized guest seminars on applied behavior science",
      "Early childhood centers wanting to implement proactive classroom routines"
    ],
    whatItInvolves: [
      {
        step: "01",
        title: "Topic Customization",
        description: "Consultation with organizers to align workshop content with attendees' baseline knowledge and real-world challenges."
      },
      {
        step: "02",
        title: "Interactive Live Delivery",
        description: "Engaging 90-to-180 minute sessions featuring scenario breakdowns, video analysis, and active group discussions."
      },
      {
        step: "03",
        title: "Practical Toolkit & Visual Aids",
        description: "All participants receive downloadable checklists, prompt hierarchies, and implementation templates."
      },
      {
        step: "04",
        title: "Dedicated Q&A & Follow-up",
        description: "Extended question-and-answer period addressing participants' specific real-world situations."
      }
    ],
    deliveryFormat: "Live Virtual Webinar (Zoom/Google Meet) or In-Person (by prior institutional arrangement)",
    feeNote: "Workshop fees vary by participant count and institutional duration requirements.",
    scopeAndLimitations: [
      "Workshops provide general educational frameworks; they do not replace individual case assessment.",
      "Certificates of attendance verify participation hours and do not grant professional licensing."
    ],
    category: "Educators"
  }
];
