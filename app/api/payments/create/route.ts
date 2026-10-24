import { NextResponse } from 'next/server';
import { insertOrder } from '../../../../lib/db';

export async function POST(req: Request) {
  const body = await req.json();
  const { items, total, customer } = body;

  const orderId = `ORD-${Date.now()}`;
  const order = {
    id: orderId,
    items,
    total,
    customer,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  // persist to SQLite
  try {
    insertOrder(order);
  } catch (err) {
    console.error('DB insert error', err);
  }

  const PAYSTACK_KEY = process.env.PAYSTACK_SECRET_KEY;

  if (PAYSTACK_KEY) {
    try {
      const res = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAYSTACK_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: customer.email,
          amount: Math.round(total) * 100,
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/payments/success?orderId=${orderId}`,
        }),
      });

      const data = await res.json();
      if (data.status && data.data && data.data.authorization_url) {
        return NextResponse.json({ paymentUrl: data.data.authorization_url, orderId });
      }
      return NextResponse.json({ error: 'Failed to initialize payment', details: data }, { status: 502 });
    } catch (err) {
      return NextResponse.json({ error: 'Paystack init error', details: String(err) }, { status: 502 });
    }
  }

  const mockUrl = `/payments/success?orderId=${orderId}&mock=true&reference=${orderId}`;
  return NextResponse.json({ paymentUrl: mockUrl, orderId });
}
