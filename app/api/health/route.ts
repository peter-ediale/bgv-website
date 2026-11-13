import { NextResponse } from 'next/server';
import { pingDb } from '@/lib/db';

// Tiny "are you awake?" check. Called once a day by Cloudflare (see custom-worker.ts)
// so the free Supabase database never counts as inactive and pauses.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await pingDb();
    return NextResponse.json({ ok: true, db }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('[health] database check failed', err);
    return NextResponse.json({ ok: false, db: 'error' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
