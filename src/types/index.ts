export type RoutePath =
  | 'home'
  | 'about'
  | 'meet-the-founder'
  | 'our-philosophy'
  | 'services'
  | 'parent-training'
  | 'behaviour-consultation'
  | 'service-detail'
  | 'academy'
  | 'programmes'
  | 'programme-detail'
  | 'workshops'
  | 'workshop-detail'
  | 'resources'
  | 'product-detail'
  | 'research'
  | 'articles'
  | 'article-detail'
  | 'faq'
  | 'contact'
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'refund-and-cancellation-policy'
  | 'professional-disclaimer'
  | 'educational-disclaimer'
  | 'digital-product-terms'
  | 'copyright-policy'
  | 'verify-certificate'
  | 'student'
  | 'admin-login'
  | 'admin'
  | 'not-found';

export interface RouteState {
  path: RoutePath;
  param?: string;
}

export type PublishStatus = 'published' | 'draft';

export type PaymentProviderId = 'razorpay' | 'stripe' | 'upi_manual' | 'cashfree' | 'phonepe';

export interface PaymentGatewayConfig {
  id: string;
  provider: PaymentProviderId;
  displayName: string;
  enabled: boolean;
  isDefault: boolean;
  mode: 'test' | 'live';
  publicKey: string;
  supportedMethods: string[];
  webhookStatus: 'connected' | 'pending' | 'inactive';
  updatedAt?: string;
}

export interface CmsSectionSubItem {
  title: string;
  description: string;
  imageUrl?: string;
  ctaLabel?: string;
  link?: string;
}

export interface CmsSectionBlock {
  id: string;
  heading: string;
  subheading?: string;
  body: string;
  imageUrl?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaLink?: string;
  items?: CmsSectionSubItem[];
  visible: boolean;
}

export interface CmsPageDoc {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  heroHeading?: string;
  heroBody?: string;
  heroImage?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  sections: CmsSectionBlock[];
  status: PublishStatus;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
}

export interface SiteSettingsDoc {
  id: string;
  brandName: string;
  positioning: string;
  tagline: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  youtubeHandle: string;
  youtubeUrl: string;
  announcementEnabled: boolean;
  announcementText: string;
  seoTitle: string;
  seoDescription: string;
  activeGateway: 'razorpay' | 'stripe' | 'upi_manual';
  gatewayMode: 'test' | 'live';
  razorpayEnabled: boolean;
  razorpayKeyId: string;
  stripeEnabled: boolean;
  stripePublishableKey: string;
  upiEnabled: boolean;
  upiId: string;
  payeeName: string;
  updatedAt?: string;
}

export interface ProgrammeModule {
  title: string;
  summary: string;
}

export interface ProgrammeItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  description: string;
  learningObjectives: string[];
  modules: ProgrammeModule[];
  duration: string;
  eligibility: string;
  audience: string;
  faculty: string;
  teachingFormat: string;
  feeINR: number;
  feeUSD: number;
  isFree?: boolean;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  enrolmentStatus: 'Open' | 'Upcoming' | 'Closed' | 'Archived';
  certificateType: 'Certificate of Completion' | 'Certificate of Participation' | 'None';
  status: PublishStatus;
}

export interface ResearchItem {
  id: string;
  title: string;
  type: 'Interest Area' | 'Publication' | 'Conference Presentation';
  authors?: string;
  venueOrJournal?: string;
  year?: string;
  abstract: string;
  link?: string;
  status: PublishStatus;
}

export interface TestimonialDoc {
  id: string;
  name: string;
  role: string;
  context?: string;
  quote: string;
  approved: boolean;
  visible: boolean;
}

export interface CouponDoc {
  id: string;
  code: string;
  discountType: 'percent' | 'fixed_inr';
  value: number;
  expiryDate?: string;
  active: boolean;
}

export interface MediaAssetDoc {
  id: string;
  title: string;
  type: 'image' | 'pdf' | 'banner' | 'poster';
  url: string;
  altText?: string;
  uploadedBy?: string;
  createdAt?: string;
}

export interface EnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  contactMethod?: string;
  message: string;
  consentAgreed?: boolean;
  status: 'new' | 'contacted' | 'resolved' | 'archived';
  internalNotes?: string;
  createdAt: string;
}

export interface OrderRecord {
  id: string;
  orderCode: string;
  userId: string;
  itemType: 'product' | 'programme' | 'workshop';
  itemId: string;
  itemTitle: string;
  customerName?: string;
  customerEmail: string;
  amount: number;
  currency: 'INR' | 'USD';
  couponApplied?: string;
  gateway: 'razorpay' | 'stripe' | 'upi_manual';
  gatewayOrderId?: string;
  transactionId?: string;
  paymentStatus: 'pending' | 'verified' | 'failed' | 'refunded';
  refundStatus?: 'none' | 'requested' | 'processed';
  refundReference?: string;
  refundReason?: string;
  downloadToken?: string;
  createdAt: string;
}

export interface EnrolmentRecord {
  id: string;
  userId: string;
  learnerName?: string;
  learnerEmail?: string;
  itemType: 'programme' | 'workshop';
  itemId: string;
  itemTitle: string;
  orderId?: string;
  attendanceStatus: 'registered' | 'attending' | 'completed';
  completionPercent?: number;
  certificateId?: string;
  createdAt: string;
}

export interface CertificateRecord {
  id: string;
  certificateId: string;
  userId?: string;
  learnerName: string;
  programmeTitle: string;
  certificateType: 'Certificate of Completion' | 'Certificate of Participation';
  issueDate: string;
  verificationStatus: 'valid' | 'revoked';
  issuedBy?: string;
}

export interface LearnerProfileRecord {
  uid: string;
  displayName?: string;
  email: string;
  background?: string;
  city?: string;
  createdAt?: string;
}

export interface AdminUserRecord {
  uid: string;
  email: string;
  name?: string;
  role: 'super_admin' | 'editor';
  createdAt?: string;
}

export interface AuditLogRecord {
  id: string;
  actorEmail: string;
  action: string;
  targetCollection?: string;
  targetId?: string;
  timestamp: string;
}
