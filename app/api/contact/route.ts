import { NextResponse } from 'next/server';
import { addMessage } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (body.company) return NextResponse.json({ ok: true }); // spam trap

  const name = String(body.name ?? '').trim().slice(0, 100);
  const email = String(body.email ?? '').trim().toLowerCase().slice(0, 200);
  const message = String(body.message ?? '').trim().slice(0, 3000);

  if (name.length < 2) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  if (message.length < 5) return NextResponse.json({ error: 'Please write a message.' }, { status: 400 });

  try {
    await addMessage({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Could not send your message. Please email us instead.' }, { status: 500 });
  }
}
