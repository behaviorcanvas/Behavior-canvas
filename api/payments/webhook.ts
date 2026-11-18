import crypto from 'crypto';
import { ApiRequest, ApiResponse, getHeaderValue, readRawBody } from '../_lib/token';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rzpSignature = getHeaderValue(req.headers, 'x-razorpay-signature');
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  try {
    const rawBuf = req.body
      ? Buffer.isBuffer(req.body)
        ? req.body
        : Buffer.from(typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
      : await readRawBody(req);

    if (rzpSignature && webhookSecret && rawBuf.length > 0) {
      const expected = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBuf)
        .digest('hex');

      const a = Buffer.from(rzpSignature);
      const b = Buffer.from(expected);
      if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
        return res.status(401).json({ error: 'Invalid webhook signature.' });
      }

      let eventName = 'verified';
      try {
        const parsed = JSON.parse(rawBuf.toString('utf8'));
        if (parsed?.event) eventName = parsed.event;
      } catch {
        // ignore JSON parse errors
      }
      return res.status(200).json({ received: true, event: eventName });
    }

    return res
      .status(400)
      .json({ error: 'Missing webhook signature or secret configuration.' });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Webhook processing error.' });
  }
}
