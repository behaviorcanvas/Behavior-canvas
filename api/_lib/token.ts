import crypto from 'crypto';
import type { IncomingMessage } from 'http';

export interface ApiRequest {
  method?: string;
  body?: any;
  query?: Record<string, string | string[] | undefined>;
  headers: Record<string, string | string[] | undefined>;
  [Symbol.asyncIterator]?: () => AsyncIterableIterator<Buffer | string>;
}

export interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
  send: (body: any) => void;
  redirect: (statusOrUrl: number | string, url?: string) => void;
  setHeader: (name: string, value: string | string[]) => void;
}

const DOWNLOAD_SECRET =
  process.env.DOWNLOAD_TOKEN_SECRET ||
  process.env.RAZORPAY_KEY_SECRET ||
  'behavior-canvas-dev-signing-key';

export interface DownloadTokenPayload {
  orderCode: string;
  itemId: string;
  email: string;
  exp: number;
}

export function signDownloadToken(payload: DownloadTokenPayload): string {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto
    .createHmac('sha256', DOWNLOAD_SECRET)
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifyDownloadToken(token: string): {
  valid: boolean;
  payload?: DownloadTokenPayload;
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
    const payload = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf8')
    ) as DownloadTokenPayload;
    if (!payload.exp || Date.now() > payload.exp) {
      return { valid: false };
    }
    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

export async function readRawBody(req: IncomingMessage | ApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req as AsyncIterable<Buffer | string>) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export function getHeaderValue(
  headers: Record<string, string | string[] | undefined>,
  name: string
): string | undefined {
  const val = headers[name.toLowerCase()] ?? headers[name];
  if (Array.isArray(val)) return val[0];
  return val;
}
