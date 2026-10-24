import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateOrderStatus } from '../../../../lib/db';
import sendEmail from '../../../../lib/sendEmail';

export async function POST(req: Request) {
  const PAYSTACK_KEY = process.env.PAYSTACK_SECRET_KEY;
  const raw = await req.text();
  const signature = req.headers.get('x-paystack-signature') || '';

  if (!PAYSTACK_KEY || !signature) {
    // Can't verify; reject
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const hmac = crypto.createHmac('sha512', PAYSTACK_KEY).update(raw).digest('hex');
  if (hmac !== signature) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const payload = JSON.parse(raw);
    const event = payload.event;
    if (event === 'charge.success' || event === 'transaction.success') {
      const reference = payload.data.reference;
      updateOrderStatus(reference, 'paid');
      const order = { id: reference, customer: payload.data.customer }; // minimal
      if (payload.data.customer && payload.data.customer.email) {
        await sendEmail(payload.data.customer.email, `Order ${reference} Confirmation`, `Thanks for your order. Order ${reference} is confirmed.`);
      }
    }
  } catch (err) {
    console.error('Webhook processing error', err);
  }

  return NextResponse.json({ ok: true });
}
