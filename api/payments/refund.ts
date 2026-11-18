import crypto from 'crypto';
import type { ApiRequest, ApiResponse } from '../_lib/token.ts';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { transactionId, amount, reason } = (body || {}) as {
      transactionId: string;
      amount?: number;
      reason?: string;
    };

    if (!transactionId) {
      return res
        .status(400)
        .json({ error: 'transactionId is required to initiate refund.' });
    }

    const rzpKeyId = process.env.RAZORPAY_KEY_ID;
    const rzpKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (rzpKeyId && rzpKeySecret && transactionId.startsWith('pay_')) {
      const authHeader = Buffer.from(`${rzpKeyId}:${rzpKeySecret}`).toString('base64');
      const rzpRes = await fetch(
        `https://api.razorpay.com/v1/payments/${encodeURIComponent(transactionId)}/refund`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${authHeader}`,
          },
          body: JSON.stringify({
            ...(amount ? { amount: Math.round(amount * 100) } : {}),
            notes: { reason: (reason || 'Admin initiated refund').slice(0, 200) },
          }),
        }
      );

      if (!rzpRes.ok) {
        const errText = await rzpRes.text();
        return res.status(502).json({ error: `Gateway refund failed: ${errText}` });
      }
      const data = (await rzpRes.json()) as { id: string; status: string };
      return res.status(200).json({
        refunded: true,
        refundReference: data.id,
        gatewayStatus: data.status,
      });
    }

    return res.status(200).json({
      refunded: true,
      refundReference: `RFND_${crypto.randomBytes(5).toString('hex').toUpperCase()}`,
      gatewayStatus: 'processed_record',
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Refund initiation error.' });
  }
}
