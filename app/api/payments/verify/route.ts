import { NextResponse } from 'next/server';
import { confirmPayment } from '../../../../lib/payments';

export async function POST(req: Request) {
  const { reference } = await req.json().catch(() => ({}));
  if (typeof reference !== 'string' || !reference.startsWith('BGV-')) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }
  try {
    const paid = await confirmPayment(reference);
    return NextResponse.json({ paid, orderId: reference });
  } catch (err) {
    console.error('[verify] error', err);
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
