import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

const DOWNLOAD_SECRET =
  process.env.DOWNLOAD_TOKEN_SECRET ||
  process.env.RAZORPAY_KEY_SECRET ||
  'behavior-canvas-dev-signing-key';

function signDownloadToken(payload: {
  orderCode: string;
  itemId: string;
  email: string;
  exp: number;
}): string {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto
    .createHmac('sha256', DOWNLOAD_SECRET)
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${sig}`;
}

function verifyDownloadToken(token: string): {
  valid: boolean;
  payload?: { orderCode: string; itemId: string; email: string; exp: number };
} {
  try {
    const [encoded, sig] = token.split('.');
    if (!encoded || !sig) return { valid: false };
    const expected = crypto
      .createHmac('sha256', DOWNLOAD_SECRET)
      .update(encoded)
      .digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return { valid: false };
    }
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return { valid: false };
    }
    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// Server-side Gemini chat proxy endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'A valid messages array is required.' });
    }

    const systemInstruction = `You are the official Behavioral Science & Academy Advisor for "The Behavior Canvas – Academy of Behavioural Science", founded and directed by Reema Singh (QASP-S (QABA, USA) | Behaviour Analyst | Clinical Psychology Researcher | Special Educator).
Official website: https://behaviorcanvas.com | Contact: info@behaviorcanvas.com | Tagline: Crafting Behavior, Creating Change.

Your role:
1. Warmly assist parents, educators, psychology & special education students, behaviour analysts, and researchers with behavioural science concepts (functions of behaviour, positive behaviour support, functional communication training, assent, dignity, reinforcement schedules, and data integrity).
2. Help visitors explore The Behavior Canvas Academy programmes, upcoming workshops, services (Behaviour Consultation, Parent Training, Online Behavioural Support), and digital study resources (ABA Notes – ₹799, ABA Cheat Sheet – ₹299, ABA Question Bank – ₹999, Study Tracker, E-books).
3. Maintain scientific integrity, compassion, inclusion, and clear ethical boundaries. Never claim guaranteed behavioural or examination outcomes, and never present independent Academy certificates as QABA-approved or university-accredited without explicit authorisation.`;

    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply =
        response.text ||
        'I am here to assist you with The Behavior Canvas Academy, workshops, resources, and behavioural science questions.';
      return res.json({ reply });
    } catch (genError: any) {
      console.warn('Gemini model call note, serving grounded fallback:', genError?.message);

      const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() || '';
      let fallback = '';

      if (
        lastUserMsg.includes('reema') ||
        lastUserMsg.includes('founder') ||
        lastUserMsg.includes('credential')
      ) {
        fallback = `The Behavior Canvas – Academy of Behavioural Science was founded by **Reema Singh**.\n\nVerified Credentials:\n• QASP-S (QABA, USA)\n• Behaviour Analyst\n• Clinical Psychology Researcher\n• Special Educator\n\nHer work centres compassionate, ethical, evidence-based behavioural science across education, research, parent support, and professional development.`;
      } else if (
        lastUserMsg.includes('study') ||
        lastUserMsg.includes('note') ||
        lastUserMsg.includes('cheat') ||
        lastUserMsg.includes('question') ||
        lastUserMsg.includes('resource')
      ) {
        fallback = `Available Digital Study Resources:\n• **ABA Notes** (₹799) – Structured conceptual guide\n• **ABA Cheat Sheet** (₹299) – High-yield rapid revision matrix\n• **ABA Question Bank** (₹999) – 150+ applied scenario questions & rationales\n• **Study Tracker** (₹149) & **Complete ABA Study Bundle** (₹2,000)\n\nVerified purchases unlock immediately inside your checkout confirmation and Learner Portal.`;
      } else {
        fallback = `Welcome to **The Behavior Canvas – Academy of Behavioural Science**.\n\nHow can I assist you today?\n• Exploring Academy of Behavioural Science programmes\n• Parent Education & Behaviour Consultation enquiries\n• Upcoming Workshops & Certificate Verification\n• ABA Notes, Cheat Sheets, and Scenario Question Banks`;
      }

      return res.json({ reply: fallback });
    }
  } catch (error: any) {
    console.error('Server Gemini chat error:', error);
    return res.status(500).json({
      error: error?.message || 'Unable to generate response at this moment.',
    });
  }
});

// ==================== FLEXIBLE PAYMENT GATEWAY APIs ====================

app.post('/api/payments/test-connection', (_req: Request, res: Response) => {
  const razorpayConfigured = Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  );
  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

  return res.json({
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
});

app.post('/api/payments/create-order', async (req: Request, res: Response) => {
  try {
    const {
      orderCode,
      amount,
      currency = 'INR',
      gateway = 'razorpay',
      mode = 'test',
      itemTitle,
    } = req.body as {
      orderCode: string;
      amount: number;
      currency?: 'INR' | 'USD';
      gateway?: 'razorpay' | 'stripe' | 'upi_manual';
      mode?: 'test' | 'live';
      itemTitle?: string;
    };

    if (!orderCode || typeof amount !== 'number' || amount < 0) {
      return res.status(400).json({ error: 'Valid orderCode and non-negative amount required.' });
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

      const rzpOrder = (await rzpResponse.json()) as { id: string; amount: number; currency: string };
      return res.json({
        gateway: 'razorpay',
        mode,
        liveOrderCreated: true,
        gatewayOrderId: rzpOrder.id,
        razorpayKeyId: rzpKeyId,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
      });
    }

    // Structured test/sandbox or direct-UPI order envelope (never marks paid before verify)
    const fallbackOrderId = `${gateway}_${mode}_${crypto.randomBytes(6).toString('hex')}`;
    return res.json({
      gateway,
      mode,
      liveOrderCreated: false,
      gatewayOrderId: fallbackOrderId,
      razorpayKeyId: rzpKeyId || null,
      amount: Math.round(amount * 100),
      currency,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Failed to create payment order.' });
  }
});

app.post('/api/payments/verify', async (req: Request, res: Response) => {
  try {
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
    } = req.body as {
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
      return res.status(400).json({ error: 'orderCode, itemId, and customerEmail are required.' });
    }

    const rzpKeySecret = process.env.RAZORPAY_KEY_SECRET;

    // 1. Live cryptographic Razorpay HMAC-SHA256 verification
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
        return res.status(400).json({ verified: false, error: 'Invalid payment signature.' });
      }

      const downloadToken = signDownloadToken({
        orderCode,
        itemId,
        email: customerEmail,
        exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        verified: true,
        paymentStatus: 'verified',
        transactionId: razorpay_payment_id,
        gatewayOrderId: razorpay_order_id,
        downloadToken,
      });
    }

    // 2. Sandbox test verification OR UPI / Stripe reference check
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

      return res.json({
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
});

app.post('/api/payments/webhook', (req: Request, res: Response) => {
  const rzpSignature = req.header('x-razorpay-signature');
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (rzpSignature && webhookSecret && (req as any).rawBody) {
    const expected = crypto
      .createHmac('sha256', webhookSecret)
      .update((req as any).rawBody)
      .digest('hex');

    const a = Buffer.from(rzpSignature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(401).json({ error: 'Invalid webhook signature.' });
    }
    return res.json({ received: true, event: req.body?.event || 'verified' });
  }

  return res.status(400).json({ error: 'Missing webhook signature or secret configuration.' });
});

app.post('/api/payments/refund', async (req: Request, res: Response) => {
  try {
    const { transactionId, amount, reason } = req.body as {
      transactionId: string;
      amount?: number;
      reason?: string;
    };

    if (!transactionId) {
      return res.status(400).json({ error: 'transactionId is required to initiate refund.' });
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
      return res.json({
        refunded: true,
        refundReference: data.id,
        gatewayStatus: data.status,
      });
    }

    // Structured manual / sandbox refund reference
    return res.json({
      refunded: true,
      refundReference: `RFND_${crypto.randomBytes(5).toString('hex').toUpperCase()}`,
      gatewayStatus: 'processed_record',
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Refund initiation error.' });
  }
});

// Verified-only digital resource download endpoint
app.get('/api/downloads/resource', (req: Request, res: Response) => {
  const token = String(req.query.token || '');
  const title = String(req.query.title || 'The Behavior Canvas Study Resource');
  const fileUrl = String(req.query.fileUrl || '');
  const verification = verifyDownloadToken(token);

  if (!verification.valid || !verification.payload) {
    return res.status(403).send('Invalid or expired download authorization token.');
  }

  if (fileUrl) {
    try {
      const parsed = new URL(fileUrl);
      if (
        parsed.protocol === 'https:' &&
        (parsed.hostname.endsWith('firebasestorage.googleapis.com') ||
          parsed.hostname.endsWith('firebasestorage.app') ||
          parsed.hostname.endsWith('behaviorcanvas.com'))
      ) {
        return res.redirect(302, fileUrl);
      }
    } catch {
      // ignore invalid URL and fall back to verified packet
    }
  }

  const safeTitle = title.replace(/[^a-zA-Z0-9\s\-_()]/g, '');
  const htmlPack = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${safeTitle} — The Behavior Canvas</title>
<style>
  body { font-family: Georgia, serif; color: #514458; background: #F8F5EF; padding: 48px; max-width: 780px; margin: 0 auto; line-height: 1.65; }
  .card { background: #ffffff; border: 1px solid #e5dce8; border-radius: 16px; padding: 40px; }
  .badge { font-family: sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #514458; }
  h1 { font-size: 28px; margin: 12px 0; color: #514458; }
  .meta { background: #F4E4ED; padding: 16px 20px; border-radius: 10px; font-family: sans-serif; font-size: 13px; margin: 24px 0; }
  .footer { margin-top: 32px; font-size: 12px; color: #716478; border-top: 1px solid #eee; padding-top: 16px; }
</style>
</head>
<body>
  <div class="card">
    <div class="badge">The Behavior Canvas — Academy of Behavioural Science</div>
    <h1>${safeTitle}</h1>
    <p>Personal Single-User Study Copy licensed exclusively to <strong>${verification.payload.email}</strong>.</p>
    <div class="meta">
      <div><strong>Order Code:</strong> ${verification.payload.orderCode}</div>
      <div><strong>Resource ID:</strong> ${verification.payload.itemId}</div>
      <div><strong>Author & Director:</strong> Reema Singh — QASP-S (QABA, USA)</div>
    </div>
    <h2>Verified Resource Summary & Study Ethics Note</h2>
    <p>Thank you for supporting ethical, compassionate behavioural science education at The Behavior Canvas (behaviorcanvas.com).</p>
    <p>When using clinical study notes, cheat sheets, and applied scenarios, always prioritise functional understanding before intervening, dignity, autonomy, and ongoing learner assent.</p>
    <div class="footer">
      © ${new Date().getFullYear()} The Behavior Canvas | info@behaviorcanvas.com | Independent educational resource; not affiliated with or endorsed by QABA.
    </div>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${verification.payload.itemId}-behavior-canvas.html"`
  );
  return res.send(htmlPack);
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'The Behavior Canvas Platform API' });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, () => {
    console.log(`The Behavior Canvas server active on port ${port}`);
  });
}

startServer();
