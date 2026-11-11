import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, SESSION_SECONDS, checkPassword, createSessionToken } from '../../../../lib/auth';

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 500 });
  }
  const { password } = await req.json().catch(() => ({}));
  if (typeof password !== 'string' || !(await checkPassword(password))) {
    await new Promise((r) => setTimeout(r, 800)); // slow down password guessing
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_SECONDS,
  });
  return res;
}
