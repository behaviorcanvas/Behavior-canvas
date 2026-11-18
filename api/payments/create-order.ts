import crypto from 'crypto';
import type { ApiRequest, ApiResponse } from '../_lib/token';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const {
      orderCode,
      amount,
      currency = 'INR',
      gateway = 'razorpay',
      mode = 'test',
      itemTitle,
    } = (body || {}) as {
      orderCode: string;
      amount: number;
      currency?: 'INR' | 'USD';
      gateway?: 'razorpay' | 'stripe' | 'upi_manual';
      mode?: 'test' | 'live';
      itemTitle?: string;
    };

    if (!orderCode || typeof amount !== 'number' || amount < 0) {
      return res
        .status(400)
        .json({ error: 'Valid orderCode and non-negative amount required.' });
    }

    const rzpKeyId = process.env.RAZORPAY_KEY_ID;
    const rzpKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (gateway === 'razorpay' && rzpKeyId && rzpKeySecret && amount > 0) {
      const authHeader = Buffer.from(`${rzpKeyId}:${rzpKeySecret}`).toString('base64');
      const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authHeader}`,
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
          currency: currency || 'INR',
          receipt: orderCode.slice(0, 40),
          notes: {
            itemTitle: (itemTitle || 'The Behavior Canvas').slice(0, 120),
          },
        }),
      });

      if (!rzpResponse.ok) {
        const errBody = await rzpResponse.text();
        return res.status(502).json({
          error: `Razorpay order creation returned ${rzpResponse.status}: ${errBody}`,
        });
      }

      const rzpOrder = (await rzpResponse.json()) as {
        id: string;
        amount: number;
        currency: string;
      };
      return res.status(200).json({
        gateway: 'razorpay',
        mode,
        liveOrderCreated: true,
        gatewayOrderId: rzpOrder.id,
        razorpayKeyId: rzpKeyId,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
      });
    }

    const fallbackOrderId = `${gateway}_${mode}_${crypto.randomBytes(6).toString('hex')}`;
    return res.status(200).json({
      gateway,
      mode,
      liveOrderCreated: false,
      gatewayOrderId: fallbackOrderId,
      razorpayKeyId: rzpKeyId || null,
      amount: Math.round(amount * 100),
      currency,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error?.message || 'Failed to create payment order.' });
  }
}
