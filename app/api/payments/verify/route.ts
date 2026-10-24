import { NextResponse } from 'next/server';
import { updateOrderStatus, getOrder } from '../../../../lib/db';
import sendEmail from '../../../../lib/sendEmail';

export async function POST(req: Request) {
  const body = await req.json();
  const { reference, orderId } = body;

  const PAYSTACK_KEY = process.env.PAYSTACK_SECRET_KEY;

  let paid = false;

  if (PAYSTACK_KEY) {
    try {
      const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${PAYSTACK_KEY}` },
      });
      const data = await res.json();
      paid = data.status && data.data && data.data.status === 'success';
    } catch (err) {
      console.error('Paystack verify error', err);
    }
  } else {
    paid = true;
  }

  const id = reference || orderId;
  if (id && paid) {
    updateOrderStatus(id, 'paid');
    // try sending confirmation email
    try {
      const order = getOrder(id);
      if (order && order.customer && order.customer.email) {
        await sendEmail(order.customer.email, `Order ${id} Confirmation`, `Thanks for your order ${order.customer.name}. Order ${id} is confirmed.`);
      }
    } catch (err) {
      console.error('Email send error', err);
    }
  }

  return NextResponse.json({ paid });
}
