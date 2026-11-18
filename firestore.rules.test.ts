/**
 * Security Test Specification for The Behavior Canvas Firestore Rules
 * Covers the Dirty Dozen attack payloads and authorized access paths defined in security_spec.md.
 */

export interface SecurityAuditCase {
  id: string;
  actor: 'anonymous' | 'learnerA' | 'learnerB' | 'unverifiedSpoofer' | 'admin';
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  path: string;
  payload?: Record<string, unknown>;
  expectedResult: 'ALLOW' | 'PERMISSION_DENIED';
  rationale: string;
}

export const FIRESTORE_SECURITY_AUDIT_MATRIX: SecurityAuditCase[] = [
  {
    id: 'DD-01-Self-Admin-Promotion',
    actor: 'learnerA',
    operation: 'create',
    path: '/admins/learnerA',
    payload: { uid: 'learnerA', email: 'attacker@evil.com', role: 'super_admin' },
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Non-admin cannot self-register into /admins collection.',
  },
  {
    id: 'DD-02-Unverified-Email-Spoof',
    actor: 'unverifiedSpoofer',
    operation: 'list',
    path: '/enquiries',
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Requires request.auth.token.email_verified == true in addition to email match.',
  },
  {
    id: 'DD-03-Enquiry-Scraping',
    actor: 'learnerA',
    operation: 'list',
    path: '/enquiries',
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Enquiries contain PII and are write-only for public, read/list restricted to admins.',
  },
  {
    id: 'DD-04-Cross-Learner-Profile-Read',
    actor: 'learnerA',
    operation: 'get',
    path: '/learners/learnerB',
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Strict per-user ownership isolation on /learners/{userId}.',
  },
  {
    id: 'DD-05-Cross-User-Order-Scraping',
    actor: 'learnerA',
    operation: 'list',
    path: '/orders',
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Unfiltered list without resource.data.userId == request.auth.uid is denied.',
  },
  {
    id: 'DD-06-Payment-Verification-Forgery',
    actor: 'learnerA',
    operation: 'create',
    path: '/orders/ord1',
    payload: {
      orderCode: 'BC-1001',
      userId: 'learnerA',
      itemType: 'product',
      itemId: 'aba-notes',
      itemTitle: 'ABA Notes',
      customerEmail: 'learnerA@example.com',
      amount: 799,
      currency: 'INR',
      paymentStatus: 'verified',
    },
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Learners may only create pending orders; verified status is reserved for admin/verified workflow.',
  },
  {
    id: 'DD-07-Shadow-Field-Injection-Order',
    actor: 'learnerA',
    operation: 'create',
    path: '/orders/ord2',
    payload: {
      orderCode: 'BC-1002',
      userId: 'learnerA',
      itemType: 'product',
      itemId: 'aba-notes',
      itemTitle: 'ABA Notes',
      customerEmail: 'learnerA@example.com',
      amount: 799,
      currency: 'INR',
      paymentStatus: 'pending',
      isFreeOverride: true,
    },
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Strict hasOnly field allowlist rejects unapproved keys.',
  },
  {
    id: 'DD-08-Shadow-Role-Injection-Learner',
    actor: 'learnerA',
    operation: 'update',
    path: '/learners/learnerA',
    payload: {
      uid: 'learnerA',
      email: 'learnerA@example.com',
      role: 'admin',
    },
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Learners can only update displayName, background, and city.',
  },
  {
    id: 'DD-09-Order-Amount-Tampering',
    actor: 'learnerA',
    operation: 'update',
    path: '/orders/ord1',
    payload: {
      amount: 0,
    },
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Amount, currency, userId, and paymentStatus are immutable to non-admin learners.',
  },
  {
    id: 'DD-10-Draft-CMS-Exfiltration',
    actor: 'anonymous',
    operation: 'get',
    path: '/pages/about-draft',
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Public reads require resource.data.status == "published".',
  },
  {
    id: 'DD-11-Oversized-Enquiry-Payload',
    actor: 'anonymous',
    operation: 'create',
    path: '/enquiries/enq1',
    payload: {
      name: 'Test User',
      email: 'test@example.com',
      category: 'Parent Training',
      message: 'A'.repeat(50000),
      status: 'new',
    },
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'Message field length capped at 3000 characters.',
  },
  {
    id: 'DD-12-Malicious-Document-ID',
    actor: 'anonymous',
    operation: 'create',
    path: '/enquiries/' + 'x'.repeat(200),
    expectedResult: 'PERMISSION_DENIED',
    rationale: 'isValidId enforces regex ^[a-zA-Z0-9_\\-]+$ and <= 128 chars.',
  },
  {
    id: 'HP-01-Public-Enquiry-Submit',
    actor: 'anonymous',
    operation: 'create',
    path: '/enquiries/enq_valid_01',
    payload: {
      name: 'Parent User',
      email: 'parent@example.com',
      category: 'Parent Training',
      message: 'Interested in upcoming parent training cohort.',
      consentAgreed: true,
      status: 'new',
      createdAt: '2026-01-01T00:00:00Z',
    },
    expectedResult: 'ALLOW',
    rationale: 'Valid public enquiry with status="new" succeeds.',
  },
  {
    id: 'HP-02-Certificate-Exact-Lookup',
    actor: 'anonymous',
    operation: 'get',
    path: '/certificates/BC-2026-001',
    expectedResult: 'ALLOW',
    rationale: 'Public exact-ID verification lookup is permitted while list stays restricted.',
  },
  {
    id: 'HP-03-Admin-CMS-Publish',
    actor: 'admin',
    operation: 'update',
    path: '/pages/home',
    payload: {
      slug: 'home',
      title: 'Home',
      status: 'published',
    },
    expectedResult: 'ALLOW',
    rationale: 'Verified admin can update and publish CMS pages.',
  },
];
