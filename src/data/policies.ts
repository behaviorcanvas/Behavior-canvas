export interface PolicySection {
  heading: string;
  paragraphs: string[];
}

export interface PolicyDocument {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  draftNotice: string;
  introduction: string;
  sections: PolicySection[];
}

export const policiesData: Record<string, PolicyDocument> = {
  'privacy-policy': {
    id: 'privacy-policy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: 'November 2026',
    draftNotice:
      'Published policy template for The Behavior Canvas (behaviorcanvas.com). Recommended for periodic review by qualified legal counsel in your jurisdiction.',
    introduction:
      "The Behavior Canvas – Academy of Behavioural Science ('we', 'us', or 'our'), founded and directed by Reema Singh, respects your privacy and handles personal data with ethical care. This Privacy Policy describes how information is collected, used, and safeguarded when you visit behaviorcanvas.com, enrol in Academy programmes, register for workshops, purchase digital study resources, or submit an enquiry.",
    sections: [
      {
        heading: '1. Information We Collect (Data Minimisation)',
        paragraphs: [
          'Contact & Enquiry Details: Name, email address, phone number (optional), preferred contact method, category of interest, and the enquiry details you voluntarily submit.',
          'Learner Account & Enrolment Details: When signing in to the Student & Learner Portal via Google Sign-In, we store your name, verified email address, optional academic background, city, and course/workshop enrolment records.',
          'Payment & Order Metadata: When purchasing digital resources, programmes, or workshop seats, transactions are processed through external payment providers (such as Razorpay or Stripe) or verified UPI transfers. We store order identifiers, item titles, verification status, and delivery receipts—never raw credit/debit card numbers or banking credentials.',
        ],
      },
      {
        heading: '2. Protection of Child & Sensitive Information',
        paragraphs: [
          'Public website forms must not be used to upload detailed medical diagnoses, psychiatric records, or identifiable clinical files about children.',
          'Any developmental context shared within private booked consultations is handled confidentially and used solely for educational and behavioural guidance.',
        ],
      },
      {
        heading: '3. How Information Is Used & Stored',
        paragraphs: [
          'To respond accurately to enquiries, deliver verified digital downloads, manage student enrolments, issue verifiable participation or completion certificates, and maintain statutory accounting records.',
          'We never sell, rent, or trade personal information with third-party data brokers or advertisers.',
        ],
      },
      {
        heading: '4. Your Rights & Contact',
        paragraphs: [
          'To request review, correction, or deletion of your enquiry or learner account records, email info@behaviorcanvas.com.',
        ],
      },
    ],
  },
  'terms-and-conditions': {
    id: 'terms-and-conditions',
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    lastUpdated: 'November 2026',
    draftNotice:
      'Platform Terms and Conditions for behaviorcanvas.com. Recommended for periodic review by qualified legal counsel.',
    introduction:
      'These Terms and Conditions govern your use of behaviorcanvas.com, the Academy of Behavioural Science, workshops, digital resources, and consultation services offered by The Behavior Canvas.',
    sections: [
      {
        heading: '1. Educational Purpose & Scope',
        paragraphs: [
          'All website pages, Academy syllabi, workshops, articles, and study resources are provided for educational, professional development, and informational purposes.',
          'Enrolling in an Academy programme or purchasing study notes creates an educational relationship—not a doctor-patient or emergency clinical care relationship.',
        ],
      },
      {
        heading: '2. Intellectual Property',
        paragraphs: [
          'All text, editorial visuals, watercolours, curriculum outlines, ABA notes, cheat sheets, question banks, and recordings remain the intellectual property of The Behavior Canvas and Reema Singh.',
        ],
      },
      {
        heading: '3. Scheduling, Enrolments & Rescheduling',
        paragraphs: [
          'Confirmed consultation sessions require at least 24 hours advance notice for rescheduling. Academy cohort dates and workshop seats are governed by published schedules and confirmation emails.',
        ],
      },
      {
        heading: '4. Governing Law',
        paragraphs: [
          'These terms are governed by applicable laws in India, with disputes subject to competent courts in India.',
        ],
      },
    ],
  },
  'refund-and-cancellation-policy': {
    id: 'refund-and-cancellation-policy',
    slug: 'refund-and-cancellation-policy',
    title: 'Cancellation and Refund Policy',
    lastUpdated: 'November 2026',
    draftNotice:
      'Commercial Cancellation & Refund Policy for digital products, workshops, academy programmes, and consultations.',
    introduction:
      'The Behavior Canvas strives for fairness and clarity across all digital study materials, workshops, Academy programmes, and individual consultations.',
    sections: [
      {
        heading: '1. Digital Learning Resources (PDF Notes, Cheat Sheets, Question Banks, E-books)',
        paragraphs: [
          'Due to instant digital access upon verified payment, digital PDF downloads are non-refundable once accessed or unlocked.',
          'Technical Support Guarantee: If you experience a corrupted file, broken link, or accidental duplicate payment, contact info@behaviorcanvas.com with your Order ID for prompt replacement or reconciliation.',
        ],
      },
      {
        heading: '2. Workshops & Live Events',
        paragraphs: [
          'Cancellations requested 48 hours or more before a scheduled live workshop are eligible for a full refund or cohort credit.',
          'Requests within 48 hours of workshop start are ordinarily non-refundable, though accessible takeaways or recordings (where provided for that cohort) remain available.',
        ],
      },
      {
        heading: '3. Academy Programmes & Consultations',
        paragraphs: [
          'Consultation cancellations made more than 24 hours ahead may be rescheduled once without penalty. Programme withdrawal timelines prior to cohort commencement will be specified in each cohort welcome letter.',
        ],
      },
    ],
  },
  'professional-disclaimer': {
    id: 'professional-disclaimer',
    slug: 'professional-disclaimer',
    title: 'Professional Disclaimer',
    lastUpdated: 'November 2026',
    draftNotice: 'Ethical Practice & Scope Disclaimer for behavioural services and public content.',
    introduction:
      'Please review this Professional Disclaimer carefully prior to relying on any educational articles, resources, or requesting behavioural services.',
    sections: [
      {
        heading: '1. Not Medical, Psychiatric, or Emergency Care',
        paragraphs: [
          'Content on The Behavior Canvas does not constitute medical diagnosis, psychiatric treatment, speech/occupational therapy, or acute crisis intervention.',
          'In case of acute medical emergency, severe self-harm risk, or immediate safety crisis, please contact local emergency medical services or your nearest hospital immediately.',
        ],
      },
      {
        heading: '2. No Guaranteed Outcomes',
        paragraphs: [
          'Behavioural support and skill development depend on complex individual, ecological, and family variables. The Behavior Canvas does not promise guaranteed behavioural outcomes or credential exam passage.',
        ],
      },
      {
        heading: '3. Scope of Practice & Credential Transparency',
        paragraphs: [
          'Reema Singh practises and teaches within ethical boundaries consistent with QASP-S (QABA, USA) training, clinical psychology research, and special education expertise.',
        ],
      },
    ],
  },
  'educational-disclaimer': {
    id: 'educational-disclaimer',
    slug: 'educational-disclaimer',
    title: 'Educational Programme Disclaimer',
    lastUpdated: 'November 2026',
    draftNotice: 'Clarity regarding Academy certificates and independent credentialing boards.',
    introduction:
      'The Behavior Canvas – Academy of Behavioural Science maintains strict transparency regarding certificate types and academic standing.',
    sections: [
      {
        heading: '1. Distinction Between Certificate Types',
        paragraphs: [
          'Certificate of Participation: Issued for attending live workshops, seminars, or orientations.',
          'Certificate of Completion: Issued upon fulfilling attendance, readings, or applied coursework within an independent Academy programme.',
        ],
      },
      {
        heading: '2. Non-Licensure & Non-Accreditation Statement',
        paragraphs: [
          'Independent educational programmes and certificates issued by The Behavior Canvas do NOT constitute university degrees, government clinical licences, or QABA-approved coursework/continuing education credits unless explicitly and formally authorised in writing.',
          'Reference to credentials such as QASP-S or ABA terminology in study guides is strictly descriptive for learner preparation.',
        ],
      },
    ],
  },
  'digital-product-terms': {
    id: 'digital-product-terms',
    slug: 'digital-product-terms',
    title: 'Digital Product Terms & Copyright',
    lastUpdated: 'November 2026',
    draftNotice: 'Single-user licensing & intellectual property terms for digital store items.',
    introduction:
      'All digital study notes, cheat sheets, scenario question banks, trackers, and e-books from The Behavior Canvas are licensed—not sold outright—for individual study use.',
    sections: [
      {
        heading: '1. Single-User Educational Licence',
        paragraphs: [
          'Verified buyers receive a personal, non-transferable, non-exclusive licence to download materials onto personal devices and print one copy for personal revision.',
        ],
      },
      {
        heading: '2. Strictly Prohibited Actions',
        paragraphs: [
          'Forwarding PDFs via WhatsApp/Telegram groups, uploading to shared drives, Scribd, Course Hero, commercial redistribution, or institutional bulk sharing without a written Institutional Licence is strictly prohibited.',
        ],
      },
    ],
  },
  'copyright-policy': {
    id: 'copyright-policy',
    slug: 'copyright-policy',
    title: 'Copyright and Intellectual Property Policy',
    lastUpdated: 'November 2026',
    draftNotice: 'Brand & material copyright notice for behaviorcanvas.com.',
    introduction:
      'All branding, Academy curricula, digital PDF study guides, editorial articles, and bespoke illustrations on behaviorcanvas.com are protected under applicable copyright laws.',
    sections: [
      {
        heading: '1. Institutional & Bulk Licensing',
        paragraphs: [
          'Universities, clinics, NGOs, and schools interested in licensing study materials or hosting institutional workshops should contact info@behaviorcanvas.com for an authorised multi-seat agreement.',
        ],
      },
    ],
  },
};
