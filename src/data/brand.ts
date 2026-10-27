export interface BrandConfig {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  domain: string;
  email: string;
  instagram: {
    handle: string;
    url: string;
  };
  youtube: {
    handle: string;
    url: string;
  };
  linkedin: {
    handle: string;
    url: string;
  };
  logoPath: string;
  founder: {
    name: string;
    role: string;
    credentials: string[];
    bioShort: string;
    bioFull: string[];
    approachHighlights: string[];
    image: string;
  };
  mission: string;
  vision: string;
  values: {
    title: string;
    description: string;
  }[];
  commitments: {
    title: string;
    description: string;
  }[];
}

export const brandConfig: BrandConfig = {
  name: "The Behavior Canvas",
  tagline: "Crafting Behavior, Creating Change",
  heroHeadline: "Understanding Behavior. Supporting Growth. Creating Change.",
  heroSubheadline:
    "The Behavior Canvas brings together behavior science, parent education, inclusive learning, and professional development to help individuals, families, educators, and professionals build meaningful skills and understanding.",
  domain: "behaviorcanvas.com",
  email: "info@behaviorcanvas.com",
  instagram: {
    handle: "@thebehaviorcanvas",
    url: "https://instagram.com/thebehaviorcanvas",
  },
  youtube: {
    handle: "@behaviorcanvas",
    url: "https://youtube.com/@behaviorcanvas",
  },
  linkedin: {
    handle: "Reema Singh (QASP-S)",
    url: "https://www.linkedin.com/in/reema-qasp-s-4402a431b/",
  },
  logoPath: "/assets/behavior-canvas-logo.jpg",
  founder: {
    name: "Reema Singh",
    role: "Founder, QASP-S® Credentialed Specialist & International Tele-Supervisor",
    credentials: [
      "Qualified Autism Services Practitioner-Supervisor (QASP-S®, QABA® Board Credentialed)",
      "Psychology & Special Education Academic Background",
      "International Fieldwork & Tele-Supervisor (US, UK, Middle East, Australia, India)",
      "Parent Educator & Inclusive Learning Consultant",
    ],
    bioShort:
      "The Behavior Canvas was founded by Reema Singh, a behavior and special education professional with a background in psychology and a commitment to making behavior science education more accessible, practical, and meaningful.",
    bioFull: [
      "The Behavior Canvas was founded by Reema Singh, a behavior and special education professional with a background in psychology and a commitment to making behavior science education more accessible, practical, and meaningful across India.",
      "With hands-on experience guiding parents, mentoring educators, and supporting learners with diverse needs, Reema brings a respectful, neurodiversity-affirming perspective to Applied Behavior Analysis (ABA) and educational practice.",
      "Her work focuses on demystifying behavior science: transforming academic principles into compassionate, practical strategies that parents can apply at home, and that educators can embed within mainstream and inclusive classrooms.",
      "Through structured digital study resources, targeted parent guidance, and professional workshops, The Behavior Canvas provides a grounded, ethical learning environment designed to empower both families and future behavior specialists."
    ],
    approachHighlights: [
      "Emphasis on learner dignity, functional communication, and assent",
      "Context-focused analysis rather than blaming individuals or families",
      "Evidence-informed frameworks adapted to Indian home and classroom realities",
      "Collaborative approach bridging parents, educators, and multidisciplinary teams"
    ],
    image: "/assets/aistudio/IMG_3227_699f0dff.jpeg",
  },
  mission:
    "To make behavior science education more accessible and practical while encouraging respectful, individualized, and evidence-informed approaches to behavior, learning, and inclusion.",
  vision:
    "To contribute to a more informed and inclusive community in India where families, educators, and professionals can access useful behavior science knowledge and learning opportunities.",
  values: [
    {
      title: "Respect and Dignity",
      description:
        "Every learner is an individual with intrinsic worth. Behavior support must always prioritize autonomy, communication, and emotional wellbeing.",
    },
    {
      title: "Individualized Support",
      description:
        "There are no cookie-cutter solutions. Strategies must be tailored to the unique strengths, needs, family context, and goals of each person.",
    },
    {
      title: "Evidence-Informed Practice",
      description:
        "Our educational materials and guidance are rooted in peer-reviewed behavior science and effective pedagogical principles.",
    },
    {
      title: "Inclusion & Accessibility",
      description:
        "Committed to dismantling barriers in educational and social settings so that all learners can participate meaningfully.",
    },
    {
      title: "Collaboration & Empathy",
      description:
        "True progress occurs when parents, educators, and specialists work hand-in-hand with trust, transparency, and non-blaming language.",
    },
    {
      title: "Ethical Responsibility",
      description:
        "Rigorous adherence to ethical guidelines, transparent boundaries of competence, and honest communication of scope.",
    },
    {
      title: "Lifelong Learning",
      description:
        "Encouraging continuous curiosity, reflective practice, and professional growth for students, educators, and practitioners.",
    },
  ],
  commitments: [
    {
      title: "Evidence-Informed Education",
      description: "Grounded in behavioral principles validated by scientific research, translated into actionable understanding."
    },
    {
      title: "Practical, Understandable Resources",
      description: "Clarity over clinical jargon. Tools designed for immediate real-world use at home and in classrooms."
    },
    {
      title: "Respect for Individual Differences",
      description: "Affirming neurodivergence and viewing differences through a strengths-based, dignity-preserving lens."
    },
    {
      title: "Family & Educator Collaboration",
      description: "Partnering actively with caregivers and teachers as essential co-designers of supportive environments."
    },
    {
      title: "Ethical & Responsible Support",
      description: "Transparent scopes, zero unrealistic promises, and steadfast adherence to professional ethics."
    },
    {
      title: "Accessible Across India",
      description: "Delivered online to bridge geographical gaps, providing quality resources to families nationwide."
    }
  ]
};
