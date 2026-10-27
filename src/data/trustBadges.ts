export interface TrustBadgeItem {
  id: string;
  category: 'credential' | 'supervision' | 'standards' | 'payments' | 'privacy';
  badge: string;
  title: string;
  issuer: string;
  description: string;
  highlights: string[];
  verificationUrl?: string;
  verificationLabel?: string;
  iconName: 'Award' | 'ShieldCheck' | 'Globe' | 'CreditCard' | 'FileCheck' | 'Linkedin';
}

export const trustBadgesData: TrustBadgeItem[] = [
  {
    id: 'qaba-qasps',
    category: 'credential',
    badge: 'Board Certified',
    title: 'QASP-S® Credentialed Practitioner',
    issuer: 'Qualified Applied Behavior Analysis Credentialing Board (QABA®)',
    description: 'Accredited under international standards for Applied Behavior Analysis and Autism Services, verifying advanced competency in clinical intervention design, ethical compliance, and functional assessments.',
    highlights: [
      'International Board Credential (QASP-S)',
      'Assent & Dignity-Based Intervention Protocols',
      'Continuous Continuing Education Unit (CEU) Compliance'
    ],
    verificationUrl: 'https://www.linkedin.com/in/reema-qasp-s-4402a431b/',
    verificationLabel: 'View Verified LinkedIn Profile',
    iconName: 'Award',
  },
  {
    id: 'global-tele-supervision',
    category: 'supervision',
    badge: 'International Reach',
    title: 'Registered Tele-Supervisor for ABAT & QASP-S Candidates',
    issuer: 'Worldwide Remote Supervision Program',
    description: 'Providing comprehensive, ethical supervision for behavior technician (ABAT) and practitioner (QASP-S) candidates across North America, Europe, the Middle East, India, and the Asia-Pacific region.',
    highlights: [
      'Multi-Timezone Scheduling (US, UK, UAE, India, Australia)',
      '1-on-1 Competency Sign-Offs & Mock Case Reviews',
      'Ethical Fieldwork Verification & Portfolio Prep'
    ],
    verificationUrl: '#services',
    verificationLabel: 'Explore Remote Supervision',
    iconName: 'Globe',
  },
  {
    id: 'international-ethics',
    category: 'standards',
    badge: 'Ethical Alignment',
    title: 'International Behavioral Science Standards',
    issuer: 'Professional Ethics & Affirmative Practice Framework',
    description: 'Strict adherence to international codes of ethics emphasizing client assent, functional communication training, contextual fit for multicultural families, and zero coercive procedures.',
    highlights: [
      'Neurodiversity-Affirming Lens',
      'Parent Collaboration as Equal Partners',
      'Transparent Scope & Diagnostic Boundaries'
    ],
    verificationUrl: '#about',
    verificationLabel: 'Review Ethical Commitments',
    iconName: 'FileCheck',
  },
  {
    id: 'secure-international-billing',
    category: 'payments',
    badge: 'PCI-DSS Compliant',
    title: 'Stripe & PayPal Global Payment Gateways',
    issuer: 'International Multi-Currency Processing',
    description: 'Frictionless, 256-bit SSL encrypted checkout accepting international cards, Apple Pay, Google Pay, PayPal, and regional UPI in USD ($) and INR (₹) with immediate digital file delivery.',
    highlights: [
      'Stripe & PayPal Verified Merchant',
      'Zero Stored Credit Card Details',
      'Instant Worldwide Order Confirmation & Downloads'
    ],
    verificationLabel: 'Encrypted 256-Bit Checkout',
    iconName: 'CreditCard',
  },
  {
    id: 'student-confidentiality',
    category: 'privacy',
    badge: 'Privacy Protected',
    title: 'Secure Student & Client Confidentiality',
    issuer: 'Data Protection & Educational Privacy Standards',
    description: 'All candidate supervision logs, parent consultation notes, and mock exam assessments are handled under strict educational confidentiality protocols and encrypted cloud storage.',
    highlights: [
      'Strict Non-Disclosure on Learner Portfolios',
      'End-to-End Encrypted Communication Channels',
      'Transparent Digital Licensing & Data Retention'
    ],
    verificationUrl: '#privacy-policy',
    verificationLabel: 'View Privacy Policy',
    iconName: 'ShieldCheck',
  },
  {
    id: 'reema-linkedin',
    category: 'credential',
    badge: 'Verified Identity',
    title: 'Founder LinkedIn Professional Profile',
    issuer: 'Professional Network Verification',
    description: 'Connect directly with Founder Reema Singh (QASP-S) to review endorsements, professional experience, ongoing community workshops, and academic background in psychology.',
    highlights: [
      'Direct Professional Inquiry Channel',
      'Active Behavior Science Community Updates',
      'Documented Academic & Fieldwork Background'
    ],
    verificationUrl: 'https://www.linkedin.com/in/reema-qasp-s-4402a431b/',
    verificationLabel: 'linkedin.com/in/reema-qasp-s-4402a431b',
    iconName: 'Linkedin',
  },
];
