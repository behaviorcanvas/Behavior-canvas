export interface FAQItem {
  id: string;
  category: 'General' | 'Services' | 'Digital Shop' | 'Workshops' | 'Ethics & Disclaimers';
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-what-is",
    category: "General",
    question: "What is The Behavior Canvas?",
    answer:
      "The Behavior Canvas is an educational, research-informed platform founded by Reema Singh. It brings together behavior science, Applied Behavior Analysis (ABA), parent guidance, special education, and professional development to help families, educators, and professionals build practical understanding and respectful, individualized skills."
  },
  {
    id: "faq-who-can-use",
    category: "General",
    question: "Who can benefit from The Behavior Canvas?",
    answer:
      "We support four main groups across India: (1) Parents and caregivers seeking non-blaming guidance to understand and support their child's behavior; (2) Children and diverse learners through tailored, respectful strategies; (3) Mainstream and special educators needing inclusive classroom adaptations; and (4) Psychology students and aspiring behavior specialists preparing for professional examinations or seeking conceptual mentoring."
  },
  {
    id: "faq-pan-india",
    category: "Services",
    question: "Are your services available online across India?",
    answer:
      "Yes. All consultations, parent guidance programs, mentoring sessions, and workshops are delivered remotely via secure video conferencing (Zoom/Google Meet). This enables families, schools, and professionals across all Indian states, union territories, and NRI communities to access support without geographical boundaries."
  },
  {
    id: "faq-how-enquire",
    category: "Services",
    question: "How can I enquire about a consultation or parent guidance?",
    answer:
      "You can submit an enquiry through the 'Make an Enquiry' form on this website or email us directly at info@behaviorcanvas.com. We review your enquiry, understand your primary goals, and share detailed information regarding scheduling, consultation formats, and fees before confirming an appointment."
  },
  {
    id: "faq-immediate-purchase",
    category: "Digital Shop",
    question: "Are digital study resources available for immediate access?",
    answer:
      "Yes. Our digital store provides educational resources (such as QASP-S study notes, cheat sheets, practice questions, and study trackers). When you complete an order, digital resources are made accessible immediately for download and sent directly to your registered email address."
  },
  {
    id: "faq-file-formats",
    category: "Digital Shop",
    question: "What file formats are provided for digital resources?",
    answer:
      "All study notes, cheat sheets, and question banks are provided in high-resolution, searchable PDF format, optimized for viewing on laptops, tablets (like iPad / Android tablets), and mobile phones, as well as personal printing. The Study Tracker also includes digital spreadsheet templates."
  },
  {
    id: "faq-workshops-org",
    category: "Workshops",
    question: "Can I request a custom workshop or training for my school or organization?",
    answer:
      "Absolutely. We frequently collaborate with inclusive schools, early intervention centers, NGOs, and university departments to deliver customized training on Positive Behavior Support, classroom accommodations, and functional communication. Please use our Contact page or select 'Workshop Enquiry' to share your team's specific requirements."
  },
  {
    id: "faq-mentoring-supervision",
    category: "Services",
    question: "How does professional mentoring and supervision work?",
    answer:
      "Mentoring focuses on task-list mastery, concept disambiguation, case conceptualization, and exam preparation. Please note that formal fieldwork supervision hours required for international certification boards are governed by specific written supervision contracts and applicable credentialing board rules, which are evaluated on a case-by-case basis."
  },
  {
    id: "faq-refund-policy",
    category: "Digital Shop",
    question: "What is the refund policy for digital resources?",
    answer:
      "Due to the immediate digital delivery nature of downloadable PDFs, digital product purchases are generally non-refundable once downloaded. If you encounter any technical difficulty or corruption with a file, we provide prompt replacement or support. Please review our detailed Refund and Cancellation Policy for full terms."
  },
  {
    id: "faq-guarantee-success",
    category: "Ethics & Disclaimers",
    question: "Does The Behavior Canvas guarantee examination success or specific behavioral outcomes?",
    answer:
      "No. In adherence to strict professional ethics, we do not make unsupported guarantees regarding examination pass rates or guaranteed behavioral transformations. Individual progress and test performance depend on numerous individual, environmental, and educational factors."
  },
  {
    id: "faq-substitute-medical",
    category: "Ethics & Disclaimers",
    question: "Is educational content a substitute for medical or psychological diagnosis?",
    answer:
      "No. All articles, study guides, and general website resources are strictly educational. They do not constitute formal psychological diagnosis, psychiatric assessment, or emergency crisis intervention. In case of acute behavioral crises or medical emergencies, please consult a qualified medical professional or local hospital emergency service immediately."
  }
];
