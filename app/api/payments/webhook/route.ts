import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { confirmPayment, paystackKey } from '../../../../lib/payments';

// Paystack calls this after a payment, even if the customer closes their browser.
// Set it in Paystack: Settings → API Keys & Webhooks → https://<your-site>/api/payments/webhook
export async function POST(req: Request) {
  const key = paystackKey();
  const raw = await req.text();
  const signature = req.headers.get('x-paystack-signature') || '';
  if (!key || !signature) return NextResponse.json({ ok: false }, { status: 400 });

  const expected = crypto.createHmac('sha512', key).update(raw).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const payload = JSON.parse(raw);
    if (payload.event === 'charge.success' && payload.data?.currency === 'NGN') {
      await confirmPayment(String(payload.data.reference), { webhookAmountKobo: Number(payload.data.amount) });
    }
  } catch (err) {
    console.error('[webhook] processing error', err);
    return NextResponse.json({ ok: false }, { status: 500 }); // Paystack will retry
  }
  return NextResponse.json({ ok: true });
}
