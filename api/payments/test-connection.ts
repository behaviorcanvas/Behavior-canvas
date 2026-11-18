import type { ApiRequest, ApiResponse } from '../_lib/token.ts';

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const razorpayConfigured = Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  );
  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

  return res.status(200).json({
    ok: true,
    providers: {
      razorpay: {
        serverKeysConfigured: razorpayConfigured,
        publicKeyId: process.env.RAZORPAY_KEY_ID || null,
        webhookSecretConfigured: Boolean(process.env.RAZORPAY_WEBHOOK_SECRET),
      },
      stripe: {
        serverKeysConfigured: stripeConfigured,
        webhookSecretConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      },
    },
  });
}
