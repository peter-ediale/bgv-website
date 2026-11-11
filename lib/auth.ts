/*
 * Admin sessions: the cookie holds "<expiry>.<signature>", where the signature is an
 * HMAC made with a server-only secret. Without the secret nobody can forge a valid cookie.
 * Uses Web Crypto so it works everywhere (Node, Cloudflare, proxy).
 */

export const ADMIN_COOKIE = 'bgv_admin';
export const SESSION_SECONDS = 60 * 60 * 12; // 12 hours

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

async function hmac(data: string, key: string): Promise<string> {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', k, enc.encode(data));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Constant-time string comparison (avoids leaking info through timing). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function checkPassword(input: string): Promise<boolean> {
  const pw = process.env.ADMIN_PASSWORD;
  const key = secret();
  if (!pw || !key) return false;
  // Compare HMACs so lengths always match and timing reveals nothing.
  return safeEqual(await hmac(input, key), await hmac(pw, key));
}

export async function createSessionToken(): Promise<string> {
  const key = secret();
  if (!key) throw new Error('ADMIN_SESSION_SECRET is not set');
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${expires}.${await hmac(expires, key)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const key = secret();
  if (!token || !key) return false;
  const [expires, sig] = token.split('.');
  if (!expires || !sig || Number(expires) < Date.now() / 1000) return false;
  return safeEqual(sig, await hmac(expires, key));
}
