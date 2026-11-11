import { NextResponse } from 'next/server';
import { insertOrder } from '../../../../lib/db';
import { newOrderId, OrderError, priceCart, validateCustomer, type Order } from '../../../../lib/orders';
import { initializePaystack, mockPaymentsAllowed, paystackKey } from '../../../../lib/payments';
import { deliveryFee } from '../../../../lib/site';


export async function POST(req: Request) {
  let body: { items?: unknown; customer?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  let order: Order;
  try {
    const { items, subtotal } = priceCart(body.items);
    const customer = validateCustomer(body.customer);
    const fee = deliveryFee(customer.state, subtotal);
    order = {
      id: newOrderId(),
      items,
      subtotal,
      deliveryFee: fee,
      total: subtotal + fee,
      customer,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paidAt: null,
    };
  } catch (err) {
    if (err instanceof OrderError) return NextResponse.json({ error: err.message }, { status: 400 });
    throw err;
  }

  if (!paystackKey() && !mockPaymentsAllowed()) {
    console.error('[checkout] PAYSTACK_SECRET_KEY is not set in production');
    return NextResponse.json({ error: 'Payments are temporarily unavailable.' }, { status: 503 });
  }

  try {
    await insertOrder(order);
  } catch (err) {
    console.error('[checkout] could not save order', err);
    return NextResponse.json({ error: 'Could not create your order. Please try again.' }, { status: 500 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
  const callbackUrl = `${baseUrl}/payments/success`;

  if (!paystackKey()) {
    // Local development only: skip Paystack and pretend the payment went through.
    return NextResponse.json({ paymentUrl: `/payments/success?reference=${order.id}&mock=1`, orderId: order.id });
  }

  try {
    const paymentUrl = await initializePaystack({
      reference: order.id,
      email: order.customer.email,
      amountNaira: order.total,
      callbackUrl,
    });
    return NextResponse.json({ paymentUrl, orderId: order.id });
  } catch (err) {
    console.error('[checkout] Paystack init failed', err);
    return NextResponse.json({ error: 'Could not start payment. Please try again.' }, { status: 502 });
  }
}
