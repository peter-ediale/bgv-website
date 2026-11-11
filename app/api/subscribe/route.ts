import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/db';

const SOURCES = ['newsletter', 'edition-2-waitlist'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  // Bots fill the hidden "company" field — pretend it worked and drop it.
  if (body.company) return NextResponse.json({ ok: true });

  const email = String(body.email ?? '').trim().toLowerCase().slice(0, 200);
  const source = String(body.source ?? '');
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  if (!SOURCES.includes(source)) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  try {
    await addSubscriber(email, source); // already-subscribed is treated as success
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[subscribe]', err);
    return NextResponse.json({ error: 'Could not sign you up. Please try again.' }, { status: 500 });
  }
}
