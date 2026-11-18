import { CmsPageDoc, CouponDoc, PaymentGatewayConfig, SiteSettingsDoc } from '../types';
import { brandConfig } from './brand';

export const DEFAULT_SITE_SETTINGS: SiteSettingsDoc = {
  id: 'main',
  brandName: 'The Behavior Canvas',
  positioning: 'The Behavior Canvas – Academy of Behavioural Science',
  tagline: 'Crafting Behavior, Creating Change.',
  email: 'info@behaviorcanvas.com',
  instagramHandle: '@thebehaviorcanvas',
  instagramUrl: 'https://instagram.com/thebehaviorcanvas',
  youtubeHandle: '@behaviorcanvas',
  youtubeUrl: 'https://youtube.com/@behaviorcanvas',
  announcementEnabled: true,
  announcementText:
    'Welcome to The Behavior Canvas – Academy of Behavioural Science | Digital Study Guides, Parent Education & Upcoming Cohorts',
  seoTitle: 'The Behavior Canvas | Academy of Behavioural Science',
  seoDescription:
    'The Behavior Canvas – Academy of Behavioural Science, founded by Reema Singh (QASP-S). Evidence-based behavioural services, academy programmes, workshops, research, and study resources.',
  activeGateway: 'razorpay',
  gatewayMode: 'test',
  razorpayEnabled: true,
  razorpayKeyId: '',
  stripeEnabled: false,
  stripePublishableKey: '',
  upiEnabled: true,
  upiId: 'behaviorcanvas@okhdfcbank',
  payeeName: 'The Behavior Canvas',
  updatedAt: '2026-10-01T00:00:00Z',
};

export const DEFAULT_PAYMENT_CONFIGS: PaymentGatewayConfig[] = [
  {
    id: 'razorpay',
    provider: 'razorpay',
    displayName: 'Razorpay (India & International Cards, UPI, Netbanking)',
    enabled: true,
    isDefault: true,
    mode: 'test',
    publicKey: '',
    supportedMethods: ['UPI', 'Credit / Debit Cards', 'Netbanking', 'Wallets'],
    webhookStatus: 'pending',
  },
  {
    id: 'stripe',
    provider: 'stripe',
    displayName: 'Stripe (Global USD / GBP / EUR Card Payments)',
    enabled: false,
    isDefault: false,
    mode: 'test',
    publicKey: '',
    supportedMethods: ['International Cards', 'Apple Pay', 'Google Pay'],
    webhookStatus: 'inactive',
  },
  {
    id: 'upi_manual',
    provider: 'upi_manual',
    displayName: 'Direct UPI & Verification Fallback',
    enabled: true,
    isDefault: false,
    mode: 'live',
    publicKey: 'behaviorcanvas@okhdfcbank',
    supportedMethods: ['GPay', 'PhonePe', 'Paytm', 'BHIM UPI'],
    webhookStatus: 'connected',
  },
];

export const DEFAULT_COUPONS: CouponDoc[] = [
  {
    id: 'WELCOME10',
    code: 'WELCOME10',
    discountType: 'percent',
    value: 10,
    expiryDate: '2027-12-31',
    active: true,
  },
  {
    id: 'CANVAS10',
    code: 'CANVAS10',
    discountType: 'percent',
    value: 10,
    expiryDate: '2027-12-31',
    active: true,
  },
];

export const DEFAULT_CMS_PAGES: Record<string, CmsPageDoc> = {
  home: {
    id: 'home',
    slug: 'home',
    title: 'Home',
    subtitle: 'Academy of Behavioural Science',
    heroHeading: 'Understanding Behaviour. Creating Meaningful Change.',
    heroBody:
      'Welcome to The Behavior Canvas, a space dedicated to behavioural science, evidence-based learning, compassionate support and professional development. We bring together education, behavioural science and practical knowledge to support individuals, families, students and professionals.',
    heroImage: '/assets/images/hero_behaviour_canvas_calm_1794989127767.jpg',
    ctaPrimaryLabel: 'Explore Our Academy',
    ctaSecondaryLabel: 'Discover Our Services',
    status: 'published',
    seoTitle: 'The Behavior Canvas | Academy of Behavioural Science',
    seoDescription:
      'Evidence-based behavioural science education, academy programmes, workshops, research, and compassionate services led by Reema Singh (QASP-S).',
    sections: [
      {
        id: 'home-intro',
        heading: 'A Space Where Behavioural Science Meets Meaningful Learning.',
        subheading: 'Our Mission & Purpose',
        body: brandConfig.mission,
        ctaLabel:
          'Supporting parents and families, individuals requiring thoughtful support, psychology and special education students, behaviour analysts, educators, curious learners, and academic research communities.',
        visible: true,
      },
      {
        id: 'home-pillars',
        heading: 'Our Four Pillars of Work',
        subheading: 'What We Do',
        body: 'Comprehensive behavioural science pathways across clinical support, structured education, live cohorts, and curated resources.',
        items: [
          {
            title: 'Behavioural Services',
            description:
              'Individualised behaviour consultation, parent education and training, online behavioural support, and ethical educational guidance.',
            imageUrl: '/assets/images/hero_watercolor_child_guide_1793099905373.jpg',
            ctaLabel: 'Explore Services',
            link: 'services',
          },
          {
            title: 'Academy of Behavioural Science',
            description:
              'Ten structured curriculum domains spanning Applied Behaviour Analysis, FBA, PBS, Functional Communication, and ethical practice.',
            imageUrl: '/assets/images/academy_editorial_cover_1794989128289.jpg',
            ctaLabel: 'View Academy',
            link: 'academy',
          },
          {
            title: 'Workshops & Masterclasses',
            description:
              'Interactive live workshops and applied seminars designed for educators, parents, students, and practitioner cohorts.',
            imageUrl: '/assets/images/classroom_watercolor_inclusion_1793099874430.jpg',
            ctaLabel: 'Upcoming Workshops',
            link: 'workshops',
          },
          {
            title: 'Learning Resources',
            description:
              'Curated ABA notes, rapid cheat sheets, applied scenario question banks, study trackers, and accessible e-books.',
            imageUrl: '/assets/images/study_bundle_watercolor_cover_1793099874549.jpg',
            ctaLabel: 'Browse Resources',
            link: 'resources',
          },
        ],
        visible: true,
      },
      {
        id: 'home-academy-highlight',
        heading: 'The Behavior Canvas – Academy of Behavioural Science.',
        subheading: 'Academic & Applied Programmes',
        body: 'Ten core learning domains designed with academic rigour, compassionate ethics, and real-world applicability for students, educators, parents, and practitioners.',
        imageUrl: '/assets/images/academy_editorial_cover_1794989128289.jpg',
        imageAlt: 'The Behavior Canvas Academy editorial table setting',
        ctaLabel: 'Explore All Programmes',
        ctaLink: 'programmes',
        visible: true,
      },
      {
        id: 'home-workshops',
        heading: 'Workshops & Masterclasses',
        subheading: 'Live Learning & Cohorts',
        body: 'Scheduled real-time seminars and applied workshops led by Reema Singh.',
        ctaLabel: 'View All Workshops',
        ctaLink: 'workshops',
        visible: true,
      },
      {
        id: 'home-founder',
        heading: brandConfig.founder.name,
        subheading: 'Meet the Founder',
        body: brandConfig.founder.bioShort,
        imageUrl: brandConfig.founder.image,
        imageAlt: 'Reema Singh — Founder & Director, The Behavior Canvas',
        ctaLabel: 'Read Full Founder Biography',
        ctaLink: 'meet-the-founder',
        items: brandConfig.founder.approachHighlights.map((h) => ({
          title: h,
          description: '',
        })),
        visible: true,
      },
      {
        id: 'home-philosophy',
        heading: 'Behaviour Is More Than What We See.',
        subheading: 'Ethical Framework',
        body: 'Every observable action exists in context. Our work centres functional understanding before intervention, scientific integrity paired with compassion, learner dignity, autonomy, and ongoing assent.',
        items: brandConfig.philosophyPrinciples.map((p) => ({
          title: p.title,
          description: p.description,
        })),
        visible: true,
      },
      {
        id: 'home-research',
        heading: 'Research, Publications & Articles',
        subheading: 'Scholarship & Applied Knowledge',
        body: 'Current research themes, academic presentations, and educational blog essays.',
        visible: true,
      },
      {
        id: 'home-cta',
        heading: "Let's Learn, Understand and Grow Together.",
        subheading: 'Begin Your Journey',
        body: 'Whether you are seeking structured academy programmes, evidence-informed consultation, live workshops, or practical study resources, we welcome your enquiry.',
        ctaLabel: 'Explore Programmes',
        ctaLink: 'programmes',
        visible: true,
      },
    ],
  },
  about: {
    id: 'about',
    slug: 'about',
    title: 'About The Behavior Canvas',
    subtitle: 'Crafting Behavior, Creating Change.',
    heroHeading: 'Advancing Compassionate, Evidence-Based Behavioural Science.',
    heroBody:
      'The Behavior Canvas – Academy of Behavioural Science brings together academic scholarship, clinical research awareness, inclusive education, and human-centred ethical guidance.',
    heroImage: '/assets/images/academy_editorial_cover_1794989128289.jpg',
    status: 'published',
    seoTitle: 'About Us | The Behavior Canvas',
    seoDescription:
      'Learn about The Behavior Canvas mission, communities served, and ethical commitment to behavioural science education.',
    sections: [
      {
        id: 'about-mission',
        heading: 'Our Mission',
        body: brandConfig.mission,
        visible: true,
      },
      {
        id: 'about-vision',
        heading: 'Our Vision',
        body: brandConfig.vision,
        visible: true,
      },
      {
        id: 'about-who-we-serve',
        heading: 'Who Our Platform Serves',
        body: 'We thoughtfully design resources, programmes, and consultations across diverse communities.',
        items: [
          { title: 'Parents and families seeking calm, practical understanding', description: '' },
          { title: 'Children and individuals requiring respectful, individualised support', description: '' },
          { title: 'Psychology and special education students building scientific foundations', description: '' },
          { title: 'Behaviour analysts and ABA practitioners pursuing ethical growth', description: '' },
          { title: 'School educators creating inclusive learning environments', description: '' },
          { title: 'Individuals and academic communities curious about behavioural science', description: '' },
        ],
        visible: true,
      },
    ],
  },
  'meet-the-founder': {
    id: 'meet-the-founder',
    slug: 'meet-the-founder',
    title: 'Meet the Founder: Reema Singh',
    subtitle: brandConfig.founder.credentialsLine,
    heroHeading: brandConfig.founder.name,
    heroBody: `${brandConfig.founder.role} · The Behavior Canvas\n${brandConfig.founder.credentialsLine}`,
    heroImage: brandConfig.founder.image,
    status: 'published',
    seoTitle: 'Meet the Founder: Reema Singh | The Behavior Canvas',
    seoDescription:
      'Reema Singh — Founder & Director, QASP-S (QABA, USA), Behaviour Analyst, Clinical Psychology Researcher & Special Educator.',
    sections: [
      {
        id: 'founder-bio',
        heading: 'Founder Biography',
        body: brandConfig.founder.bioFull.join('\n\n'),
        visible: true,
      },
      {
        id: 'founder-commitments',
        heading: 'Guiding Practice Commitments',
        body: 'Core ethical commitments reflected in all programmes and consultations.',
        items: brandConfig.founder.approachHighlights.map((h) => ({
          title: h,
          description: '',
        })),
        visible: true,
      },
    ],
  },
  'our-philosophy': {
    id: 'our-philosophy',
    slug: 'our-philosophy',
    title: 'Our Philosophy',
    subtitle: 'Ethical & Scientific Foundations',
    heroHeading: 'Behaviour Is More Than What We See.',
    heroBody:
      'Every observable action takes place inside a biological, emotional, sensory, and relational context. These seven principles anchor every programme, consultation, resource, and research collaboration at The Behavior Canvas.',
    status: 'published',
    seoTitle: 'Our Philosophy | The Behavior Canvas',
    seoDescription:
      'Discover the ethical principles guiding The Behavior Canvas: dignity, autonomy, learner assent, science with compassion, and individualised support.',
    sections: [
      {
        id: 'philosophy-principles',
        heading: 'Seven Guiding Principles',
        body: 'Our ethical compass for every family, learner, educator, and practitioner.',
        items: brandConfig.philosophyPrinciples.map((p) => ({
          title: p.title,
          description: p.description,
        })),
        visible: true,
      },
      {
        id: 'philosophy-responsibility',
        heading: 'Ethical Responsibility & Transparency',
        body: 'We honour scope of practice boundaries, do not promise guaranteed behavioural transformations, and reject coercive compliance in favour of functional understanding and assent.',
        ctaLabel: 'Explore Programmes',
        ctaLink: 'programmes',
        visible: true,
      },
    ],
  },
};
