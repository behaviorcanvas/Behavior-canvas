import crypto from 'crypto';
import { ApiRequest, ApiResponse, signDownloadToken } from '../_lib/token.ts';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const {
      orderCode,
      itemId,
      customerEmail,
      gateway = 'razorpay',
      mode = 'test',
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      transactionReference,
    } = (body || {}) as {
      orderCode: string;
      itemId: string;
      customerEmail: string;
      gateway?: 'razorpay' | 'stripe' | 'upi_manual';
      mode?: 'test' | 'live';
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      transactionReference?: string;
    };

    if (!orderCode || !itemId || !customerEmail) {
      return res
        .status(400)
        .json({ error: 'orderCode, itemId, and customerEmail are required.' });
    }

    const rzpKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (
      gateway === 'razorpay' &&
      razorpay_order_id &&
      razorpay_payment_id &&
      razorpay_signature &&
      rzpKeySecret
    ) {
      const expectedSig = crypto
        .createHmac('sha256', rzpKeySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      const sigBuf = Buffer.from(razorpay_signature);
      const expBuf = Buffer.from(expectedSig);

      if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
        return res
          .status(400)
          .json({ verified: false, error: 'Invalid payment signature.' });
      }

      const downloadToken = signDownloadToken({
        orderCode,
        itemId,
        email: customerEmail,
        exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        verified: true,
        paymentStatus: 'verified',
        transactionId: razorpay_payment_id,
        gatewayOrderId: razorpay_order_id,
        downloadToken,
      });
    }

    if (mode === 'test' || (transactionReference && transactionReference.trim().length >= 6)) {
      const txId =
        transactionReference?.trim() ||
        `TXN_${gateway.toUpperCase()}_${crypto.randomBytes(5).toString('hex').toUpperCase()}`;

      const downloadToken = signDownloadToken({
        orderCode,
        itemId,
        email: customerEmail,
        exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        verified: true,
        paymentStatus: gateway === 'upi_manual' ? 'pending' : 'verified',
        transactionId: txId,
        gatewayOrderId: razorpay_order_id || `${gateway}_ref_${orderCode}`,
        downloadToken,
      });
    }

    return res.status(400).json({
      verified: false,
      error: 'Payment verification signature or valid transaction reference is required.',
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Verification failed.' });
  }
}
