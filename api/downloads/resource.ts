import { ApiRequest, ApiResponse, verifyDownloadToken } from '../_lib/token';

function isAllowedResourceUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return (
      parsed.protocol === 'https:' &&
      (parsed.hostname.endsWith('firebasestorage.googleapis.com') ||
        parsed.hostname.endsWith('firebasestorage.app') ||
        parsed.hostname.endsWith('behaviorcanvas.com'))
    );
  } catch {
    return false;
  }
}

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawToken = req.query?.token;
  const rawTitle = req.query?.title;
  const rawFileUrl = req.query?.fileUrl;

  const token = String(Array.isArray(rawToken) ? rawToken[0] : rawToken || '');
  const title = String(
    Array.isArray(rawTitle) ? rawTitle[0] : rawTitle || 'The Behavior Canvas Study Resource'
  );
  const fileUrl = String(Array.isArray(rawFileUrl) ? rawFileUrl[0] : rawFileUrl || '');

  const verification = verifyDownloadToken(token);
  if (!verification.valid || !verification.payload) {
    return res.status(403).send('Invalid or expired download authorization token.');
  }

  if (fileUrl && isAllowedResourceUrl(fileUrl)) {
    return res.redirect(302, fileUrl);
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
      <div><strong>Author &amp; Director:</strong> Reema Singh — QASP-S (QABA, USA)</div>
    </div>
    <h2>Verified Resource Summary &amp; Study Ethics Note</h2>
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
  return res.status(200).send(htmlPack);
}
