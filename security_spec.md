# Security Specification & Payload-First TDD (`security_spec.md`)

## 1. Data Invariants
1. **Admin Privilege Isolation**: Only an authenticated user with `request.auth.token.email_verified == true` AND either matching the bootstrapped owner email (`info@behaviorcanvas.com`) OR having an existing document at `/admins/{request.auth.uid}` can access private admin collections (`paymentConfigs`, `enquiries`, `auditLogs`, `media`, draft CMS pages).
2. **Self-Role Escalation Prevention**: No non-admin user can create or modify `/admins/{adminId}` or set `paymentStatus = 'verified'` on `/orders/{orderId}` via client writes.
3. **PII Isolation**:
   - `/enquiries/{enquiryId}`: Anyone can submit a validated enquiry (`create`), but ONLY verified admins can `get`, `list`, `update`, or `delete` enquiries.
   - `/learners/{userId}`: Only `request.auth.uid == userId` (with verified email) or `isAdmin()` can read/write. Zero cross-learner visibility.
   - `/orders/{orderId}` & `/enrolments/{enrolmentId}`: `list` and `get` are strictly gated to `resource.data.userId == request.auth.uid || isAdmin()`.
4. **Published vs Draft Content**:
   - Public visitors can only read `status == 'published'` documents in `pages`, `services`, `programmes`, `workshops`, `products`, `articles`, `research`, and `approved == true && visible == true` in `testimonials`. Drafts remain admin-only.
5. **Path Variable & Payload Size Hardening**: Every document ID matches `^[a-zA-Z0-9_\-]+$` (<= 128 chars), every string has explicit `.size()` bounds, and all allowed keys are strictly whitelisted via `.hasOnly(...)`.
6. **Certificate Anti-Scraping**: Public visitors can `get` a certificate by exact `certificateId` (for `/verify-certificate`), while `list` on `/certificates` is restricted to `resource.data.userId == request.auth.uid || isAdmin()`.

## 2. The "Dirty Dozen" Attack Payloads (All Must Return `PERMISSION_DENIED`)
1. **Self-Admin Promotion**: Non-admin writes `{ "uid": "attacker1", "email": "attacker@evil.com", "role": "super_admin" }` to `/admins/attacker1`.
2. **Unverified Admin Email Spoof**: User with `email: "info@behaviorcanvas.com"` and `email_verified: false` tries to read `/enquiries`.
3. **Enquiry Scraping**: Signed-in learner calls `list` on `/enquiries`.
4. **Cross-Learner Profile Read**: Learner A tries `get` on `/learners/learnerB`.
5. **Cross-User Order Scraping**: Learner A calls `list` on `/orders` without matching `userId == request.auth.uid`.
6. **Payment Verification Forgery**: Learner creates `/orders/ord1` with `"paymentStatus": "verified"`.
7. **Shadow Field Injection on Order**: Learner creates `/orders/ord1` with extra ghost field `"isFreeOverride": true`.
8. **Shadow Update on Learner Profile**: Learner updates `/learners/learnerA` injecting `"role": "admin"`.
9. **Terminal State Tampering**: Learner updates verified order `/orders/ord1` back to `"amount": 0`.
10. **Draft CMS Exfiltration**: Public visitor reads `/pages/about-draft` where `status == "draft"`.
11. **Oversized Denial-of-Wallet Enquiry**: Attacker submits `/enquiries/e1` with a 50,000-character `message`.
12. **Malicious Document ID Poisoning**: Attacker writes to `/enquiries/..%2Fadmin%2Fhack` or 500-char ID.
