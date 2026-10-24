import { NextResponse } from 'next/server';

export function GET() {
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', `admin_auth=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`);
  return res;
}
