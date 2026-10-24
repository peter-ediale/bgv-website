import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const ADMIN_PW = process.env.ADMIN_PASSWORD;
    if (!ADMIN_PW) {
      return NextResponse.json({ ok: false, error: 'Admin password not configured' }, { status: 500 });
    }

    if (password === ADMIN_PW) {
      const res = NextResponse.json({ ok: true });
      // set a simple auth cookie (HttpOnly)
      res.headers.set('Set-Cookie', `admin_auth=1; Path=/; HttpOnly; Max-Age=86400; SameSite=Lax`);
      return res;
    }

    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 400 });
  }
}
