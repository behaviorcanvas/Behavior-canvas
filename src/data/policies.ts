export interface PolicySection {
  heading: string;
  paragraphs: string[];
}

export interface PolicyDocument {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  introduction: string;
  sections: PolicySection[];
}

export const policiesData: Record<string, PolicyDocument> = {
  "privacy-policy": {
    id: "privacy-policy",
    slug: "privacy-policy",
    title: "Privacy Policy",
    lastUpdated: "October 2026",
    introduction:
      "The Behavior Canvas ('we', 'us', or 'our'), founded by Reema Singh, is dedicated to protecting your personal privacy. This Privacy Policy outlines our transparent practices regarding the collection, handling, storage, and protection of information when you interact with our website (behaviorcanvas.com) and utilize our educational resources or online services.",
    sections: [
      {
        heading: "1. Information We Collect",
        paragraphs: [
          "We adhere to the principle of strict data minimization. We only collect the minimal information necessary to fulfill your specific enquiry, facilitate digital product delivery, or conduct educational services.",
          "Voluntary Contact & Enquiry Information: When you submit an enquiry through our website forms or contact us via email, we collect your name, email address, preferred contact method, general category of enquiry, and any message you choose to provide.",
          "Transactional Information: When purchasing digital study resources, we collect your name and email address to fulfill digital download delivery and maintain purchase records. We do not store or process your debit/credit card numbers or banking passwords on our servers; transactions are processed securely through authorized payment gateway partners (such as Razorpay or Cashfree).",
          "Technical & Usage Information: Standard non-identifying technical metadata (browser type, device type, general regional location) may be collected automatically to maintain website security, prevent spam, and optimize site performance."
        ]
      },
      {
        heading: "2. How We Use Your Information",
        paragraphs: [
          "To respond to your service, consultation, workshop, or digital resource enquiries.",
          "To deliver purchased digital study materials and provide transaction confirmations.",
          "To provide scheduled virtual consultations, parent guidance sessions, or mentoring.",
          "To communicate essential administrative updates regarding website terms or scheduling changes.",
          "We never sell, rent, monetize, or trade your personal information to third parties for marketing purposes."
        ]
      },
      {
        heading: "3. Protection of Sensitive Child Information",
        paragraphs: [
          "We intentionally do not request detailed medical histories, formal diagnostic psychological reports, or sensitive identifying information about children through general public enquiry forms.",
          "Any contextual developmental observations shared during scheduled private consultations are treated with strict confidentiality and stored securely under applicable privacy norms."
        ]
      },
      {
        heading: "4. Data Retention & Security",
        paragraphs: [
          "We retain your enquiry and transactional details only for as long as necessary to fulfill the relevant service, resolve disputes, and comply with applicable statutory tax and accounting obligations in India.",
          "We implement industry-standard technical measures to safeguard information against unauthorized access, alteration, disclosure, or destruction."
        ]
      },
      {
        heading: "5. Grievance Redressal & Contact Information",
        paragraphs: [
          "If you have questions, concerns, or wish to exercise your rights to review, update, or request the deletion of your personal contact records, please contact our Grievance Officer at info@behaviorcanvas.com.",
          "Official domain: behaviorcanvas.com | Email: info@behaviorcanvas.com"
        ]
      }
    ]
  },
  "terms-and-conditions": {
    id: "terms-and-conditions",
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    lastUpdated: "October 2026",
    introduction:
      "Welcome to The Behavior Canvas. These Terms and Conditions govern your access to and use of behaviorcanvas.com, including all content, digital resources, educational materials, and services offered by The Behavior Canvas and Reema Singh. By accessing or using this website, you signify your agreement to these Terms.",
    sections: [
      {
        heading: "1. Scope of Website & Educational Content",
        paragraphs: [
          "The Behavior Canvas provides educational content, digital study guides, workshops, and professional consultation focused on behavior science, Applied Behavior Analysis (ABA), parent guidance, and inclusive education.",
          "All articles, guides, infographics, and general website publications are published for educational and informational purposes only. They do not constitute formal medical, psychiatric, or diagnostic advice."
        ]
      },
      {
        heading: "2. Intellectual Property Rights",
        paragraphs: [
          "All content on this website—including text, graphics, logos, brand marks, diagrams, article texts, and digital publications—is the proprietary intellectual property of The Behavior Canvas and Reema Singh, protected under Indian and international copyright laws.",
          "You may not copy, reproduce, distribute, republish, resell, publicly display, or create derivative works from our materials without explicit prior written authorization."
        ]
      },
      {
        heading: "3. User Conduct & Acceptable Use",
        paragraphs: [
          "You agree to use this website solely for lawful, non-commercial educational purposes.",
          "You agree not to transmit any unlawful, threatening, abusive, defamatory, or invasive material, nor to attempt to probe, scan, or compromise website security or infrastructure."
        ]
      },
      {
        heading: "4. Service Consultations & Rescheduling",
        paragraphs: [
          "Consultations and mentoring sessions must be scheduled in advance through mutual confirmation. If you need to reschedule a confirmed appointment, please provide at least 24 hours prior notice.",
          "Consultation availability and acceptance of new clients are subject to professional suitability and capacity."
        ]
      },
      {
        heading: "5. Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by applicable law, The Behavior Canvas and Reema Singh shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of or inability to use this website, materials, or services.",
          "These terms are governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in India."
        ]
      }
    ]
  },
  "refund-and-cancellation-policy": {
    id: "refund-and-cancellation-policy",
    slug: "refund-and-cancellation-policy",
    title: "Refund and Cancellation Policy",
    lastUpdated: "October 2026",
    introduction:
      "The Behavior Canvas is committed to clarity and fairness in all client and learner interactions. Please review our policy regarding digital product purchases, service consultations, and educational workshops.",
    sections: [
      {
        heading: "1. Digital Products (PDF Study Notes, Cheat Sheets, Workbooks, Trackers)",
        paragraphs: [
          "Due to the immediate access nature of downloadable digital files, purchases of digital educational resources (such as QASP-S study notes, practice questions, cheat sheets, and bundles) are non-refundable once the file download link has been accessed or generated.",
          "Technical Replacement Guarantee: If you experience any file corruption, defective download links, or difficulty opening a purchased PDF, please email info@behaviorcanvas.com with your order details. We will gladly re-issue a fresh working link or email the file directly to you within 24–48 hours."
        ]
      },
      {
        heading: "2. Individual Consultations & Parent Guidance Sessions",
        paragraphs: [
          "Cancellations made more than 24 hours prior to the scheduled consultation time are eligible for a full reschedule without penalty or a refund minus administrative processing fees.",
          "Cancellations made less than 24 hours prior to the session, or missed sessions ('no-shows'), are not eligible for a refund, as that dedicated professional time was reserved exclusively for you.",
          "In the unlikely event that The Behavior Canvas needs to reschedule a session due to unforeseen professional emergency or illness, you will be offered your choice of immediate rescheduling at the earliest mutually convenient slot or a 100% full refund."
        ]
      },
      {
        heading: "3. Live Workshops and Training Webinars",
        paragraphs: [
          "Participants who cancel their workshop registration at least 48 hours prior to the scheduled event will receive a full refund or session credit toward a future workshop cohort.",
          "Cancellations requested within 48 hours of the event start time are non-refundable, but session recordings and learning materials will remain accessible to registered participants where applicable."
        ]
      },
      {
        heading: "4. How to Request a Cancellation or Support",
        paragraphs: [
          "To request a rescheduling, cancellation, or file replacement, please send an email to info@behaviorcanvas.com including your full name, transaction date, and order reference."
        ]
      }
    ]
  },
  "professional-disclaimer": {
    id: "professional-disclaimer",
    slug: "professional-disclaimer",
    title: "Professional and Service Disclaimer",
    lastUpdated: "October 2026",
    introduction:
      "Please read this Professional and Service Disclaimer carefully prior to using our website, purchasing educational study guides, or booking professional consultations.",
    sections: [
      {
        heading: "1. Educational Purpose & Non-Medical Scope",
        paragraphs: [
          "The content published on behaviorcanvas.com—including articles, guides, worksheets, workshops, and general consultation discussions—is intended solely for educational, informational, and skill-building purposes.",
          "The Behavior Canvas does not provide medical, pediatric, psychiatric, or diagnostic services. Consultations and resources do not constitute, nor are they a substitute for, clinical medical assessment, formal psychological diagnosis, or psychiatric treatment."
        ]
      },
      {
        heading: "2. Crisis & Emergency Services Notice",
        paragraphs: [
          "The Behavior Canvas is NOT an emergency or crisis intervention provider. If you, your child, or a person in your care is experiencing an acute medical emergency, severe self-harm crisis, violent behavioral crisis, or imminent physical risk, please contact your nearest local hospital emergency department or regional emergency helpline immediately."
        ]
      },
      {
        heading: "3. Individualized Suitability & Limitations",
        paragraphs: [
          "Behavioral principles and strategies must always be individualized. What proves effective for one learner in one environment may not be appropriate or safe for another.",
          "General educational materials are not tailored to any specific individual case. Applying strategies from articles or study notes is done at the user's personal discretion, and parents and educators are encouraged to seek individualized guidance."
        ]
      },
      {
        heading: "4. No Guarantee of Outcomes or Exam Passage",
        paragraphs: [
          "While our resources and guidance are grounded in established behavior science and pedagogical best practices, human behavior is complex and multifactorial. The Behavior Canvas makes no warranties, express or implied, regarding guaranteed behavioral outcomes or timelines.",
          "Independent study resources (such as QASP-S study guides) are designed to aid revision and concept review. We do not guarantee that using these study materials will result in passing any credentialing board examination."
        ]
      },
      {
        heading: "5. Non-Affiliation with Third-Party Credentialing Bodies",
        paragraphs: [
          "The Behavior Canvas is an independent educational platform. Reference to credentials (such as QASP-S, ABAT, or QABA) is made strictly for descriptive educational categorization and does not imply official endorsement, partnership, or sponsorship by any credentialing organization."
        ]
      }
    ]
  },
  "copyright-policy": {
    id: "copyright-policy",
    slug: "copyright-policy",
    title: "Copyright and Digital Product Usage Policy",
    lastUpdated: "October 2026",
    introduction:
      "All digital products, study materials, cheat sheets, and publications created by The Behavior Canvas and Reema Singh are protected by copyright laws. This policy outlines your permitted usage and strict licensing restrictions.",
    sections: [
      {
        heading: "1. Personal Educational Single-User License",
        paragraphs: [
          "When you purchase or download a digital resource from The Behavior Canvas, you are granted a revocable, non-exclusive, non-transferable, single-user license strictly for your personal, individual educational use.",
          "You are permitted to download the file to your personal computer, tablet, or smartphone, and print one (1) physical copy for your personal study reference."
        ]
      },
      {
        heading: "2. Strict Prohibition Against Unauthorized Redistribution",
        paragraphs: [
          "You may NOT resell, sub-license, rent, lease, or distribute our digital files to third parties.",
          "You may NOT upload our files to public or shared cloud drives (such as Google Drive, Dropbox, Telegram channels, WhatsApp groups, Course Hero, Scribd, or torrent sites).",
          "You may NOT email or forward copies of downloaded files to colleagues, friends, or study groups. Each individual user must purchase their own legitimate copy."
        ]
      },
      {
        heading: "3. Institutional & Multi-User Licensing",
        paragraphs: [
          "If you represent a school, university, therapy center, or training institute wishing to use our study materials or toolkits with a cohort of students or staff, please contact us at info@behaviorcanvas.com to arrange an authorized institutional multi-user license."
        ]
      },
      {
        heading: "4. Copyright Infringement & Legal Enforcement",
        paragraphs: [
          "Digital resources may contain embedded, invisible digital watermarking and tracking identifiers. Unauthorized distribution or commercial piracy of our intellectual property is subject to legal action under the Indian Copyright Act, 1957 and applicable international intellectual property treaties."
        ]
      }
    ]
  }
};
