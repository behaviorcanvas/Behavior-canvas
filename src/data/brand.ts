export interface BrandConfig {
  name: string;
  positioning: string;
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
    credentialsLine: string;
    credentials: string[];
    bioShort: string;
    bioFull: string[];
    approachHighlights: string[];
    image: string;
  };
  mission: string;
  vision: string;
  philosophyPrinciples: {
    title: string;
    description: string;
  }[];
  values: {
    title: string;
    description: string;
  }[];
  commitments: {
    title: string;
    description: string;
  }[];
  payments: {
    upiId: string;
    payeeName: string;
    razorpayKeyId?: string;
  };
}

export const brandConfig: BrandConfig = {
  name: 'The Behavior Canvas',
  positioning: 'The Behavior Canvas – Academy of Behavioural Science',
  tagline: 'Crafting Behavior, Creating Change.',
  heroHeadline: 'Understanding Behaviour. Creating Meaningful Change.',
  heroSubheadline:
    'Welcome to The Behavior Canvas, a space dedicated to behavioural science, evidence-based learning, compassionate support and professional development. We bring together education, behavioural science and practical knowledge to support individuals, families, students and professionals.',
  domain: 'behaviorcanvas.com',
  email: 'info@behaviorcanvas.com',
  instagram: {
    handle: '@thebehaviorcanvas',
    url: 'https://instagram.com/thebehaviorcanvas',
  },
  youtube: {
    handle: '@behaviorcanvas',
    url: 'https://youtube.com/@behaviorcanvas',
  },
  linkedin: {
    handle: 'Reema Singh (QASP-S)',
    url: 'https://www.linkedin.com/in/reema-qasp-s-4402a431b/',
  },
  logoPath: '/assets/behavior-canvas-logo.jpg',
  founder: {
    name: 'Reema Singh',
    role: 'Founder & Director',
    credentialsLine:
      'QASP-S (QABA, USA) | Behaviour Analyst | Clinical Psychology Researcher | Special Educator',
    credentials: [
      'QASP-S (QABA, USA)',
      'Behaviour Analyst',
      'Clinical Psychology Researcher',
      'Special Educator',
    ],
    bioShort:
      'Reema Singh is the Founder and Director of The Behavior Canvas – Academy of Behavioural Science. With training across Applied Behaviour Analysis, clinical psychology research, and special education, her work focuses on making behavioural science rigorous, ethical, compassionate, and genuinely accessible.',
    bioFull: [
      'Reema Singh is the Founder and Director of The Behavior Canvas – Academy of Behavioural Science. She holds the Qualified Autism Services Practitioner-Supervisor (QASP-S) credential through QABA (USA) alongside academic and applied foundations in behaviour analysis, clinical psychology research, and special education.',
      'Her work bridges research-grounded behavioural science with real-world application for parents and families, psychology and special education students, behaviour analysts, educators, and wider academic communities.',
      'Guided by scientific integrity, respect for individual differences, and an unwavering commitment to assent and human dignity, Reema founded The Behavior Canvas to elevate ethical behavioural education beyond simplified therapy models into a cohesive space for structured programmes, workshops, research engagement, and practical learning tools.',
    ],
    approachHighlights: [
      'Prioritising functional understanding before introducing any behavioural intervention',
      'Centring dignity, autonomy, and ongoing learner assent across every educational context',
      'Translating behavioural research into clear, non-blaming guidance for families and educators',
      'Supporting lifelong ethical reflection among students, practitioners, and educators',
    ],
    image: '/assets/founder-reema-singh.jpeg',
  },
  mission:
    'To make behavioural science accessible, meaningful and applicable through education, ethical practice, evidence-based support, research and professional development.',
  vision:
    'An informed, compassionate ecosystem where parents, learners, educators, researchers, and practitioners engage with behavioural science with scientific integrity and respect for human dignity.',
  philosophyPrinciples: [
    {
      title: 'Understand before intervening',
      description:
        'Every behaviour communicates context, history, sensory experience, or unmet need. Careful functional understanding must always precede any support strategy.',
    },
    {
      title: 'Science with compassion',
      description:
        'Precision and data-informed methodology belong hand-in-hand with warmth, emotional safety, and genuine care for the human being.',
    },
    {
      title: 'Dignity and autonomy',
      description:
        'Support should expand personal agency, voice, and independence—never coerce conformity at the expense of individual identity.',
    },
    {
      title: 'Respect for assent',
      description:
        'Meaningful learning honours ongoing learner willingness, comfort, and communication, actively adapting whenever withdrawal or distress appears.',
    },
    {
      title: 'Evidence-based decision-making',
      description:
        'Educational frameworks, recommendations, and mentoring remain grounded in empirical research and honest appraisal of boundaries.',
    },
    {
      title: 'Individualised support',
      description:
        'No two learners, classrooms, or families are identical. Strategies are thoughtfully adapted to culture, strengths, and real environments.',
    },
    {
      title: 'Meaningful outcomes and quality of life',
      description:
        'True success is measured not by isolated compliance metrics, but by everyday wellbeing, functional communication, belonging, and joy.',
    },
  ],
  values: [
    {
      title: 'Scientific Integrity',
      description: 'Remaining faithful to empirical behavioural methodology and honest conceptual boundaries.',
    },
    {
      title: 'Professional Credibility',
      description: 'Transparent credentials, structured curricula, and responsible representation of qualifications.',
    },
    {
      title: 'Compassion & Inclusion',
      description: 'Welcoming diverse neurotypes and learning profiles without stigma or blame.',
    },
    {
      title: 'Ethical Responsibility',
      description: 'Clear scope of practice, zero guaranteed-outcome claims, and strict learner privacy.',
    },
    {
      title: 'Respect for Individual Differences',
      description: 'Strengths-focused and culturally responsive adaptation across home and school contexts.',
    },
    {
      title: 'Lifelong Learning',
      description: 'Fostering curiosity, peer dialogue, and reflective scholarship across careers.',
    },
  ],
  commitments: [
    {
      title: 'Academic Depth Meets Everyday Clarity',
      description: 'Structured courses, notes, and workshops that respect intellectual rigour while remaining practical.',
    },
    {
      title: 'Whole-Ecosystem Community',
      description: 'Serving families, educators, students, behaviour analysts, and researchers under one unified academy.',
    },
    {
      title: 'Transparent Educational Boundaries',
      description: 'Clearly distinguishing educational certificates from statutory clinical licences or external board endorsements.',
    },
    {
      title: 'Privacy & Ethical Stewardship',
      description: 'Safeguarding personal enquiry details and learner records with strict confidentiality.',
    },
  ],
  payments: {
    upiId: 'behaviorcanvas@okhdfcbank',
    payeeName: 'The Behavior Canvas',
    razorpayKeyId: '',
  },
};
