import 'server-only';
import { getOrder, markOrderPaid } from './db';
import { sendOrderConfirmation } from './email';

const PAYSTACK_API = 'https://api.paystack.co';

export const paystackKey = () => process.env.PAYSTACK_SECRET_KEY || null;

/** Fake payments are allowed only on your own computer, never on the live site. */
export const mockPaymentsAllowed = () => !paystackKey() && process.env.NODE_ENV !== 'production';

export async function initializePaystack(opts: {
  reference: string;
  email: string;
  amountNaira: number;
  callbackUrl: string;
}): Promise<string> {
  const res = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${paystackKey()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reference: opts.reference, // our order ID — lets us find the order again
      email: opts.email,
      amount: opts.amountNaira * 100, // Paystack wants kobo
      currency: 'NGN',
      callback_url: opts.callbackUrl,
      metadata: { orderId: opts.reference },
    }),
  });
  const data = await res.json();
  if (!res.ok || !data?.status || !data?.data?.authorization_url) {
    throw new Error(`Paystack initialize failed: ${data?.message ?? res.status}`);
  }
  return data.data.authorization_url as string;
}

/** Ask Paystack directly whether this reference was paid in full. */
async function verifyWithPaystack(reference: string, expectedKobo: number): Promise<boolean> {
  const res = await fetch(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${paystackKey()}` },
  });
  const data = await res.json();
  const tx = data?.data;
  return Boolean(
    res.ok && data?.status && tx?.status === 'success' && tx?.currency === 'NGN' && Number(tx?.amount) >= expectedKobo
  );
}

/**
 * Confirm an order's payment. Safe to call many times (success page + webhook).
 * Returns the order's paid state.
 */
export async function confirmPayment(reference: string, opts: { webhookAmountKobo?: number } = {}): Promise<boolean> {
  const order = await getOrder(reference);
  if (!order) return false;
  if (order.status !== 'pending') return order.status !== 'cancelled';

  const expectedKobo = order.total * 100;
  let paid = false;
  if (opts.webhookAmountKobo !== undefined) {
    paid = opts.webhookAmountKobo >= expectedKobo; // payload already signature-checked
  } else if (paystackKey()) {
    paid = await verifyWithPaystack(reference, expectedKobo);
  } else {
    paid = mockPaymentsAllowed();
  }
  if (!paid) return false;

  const firstTime = await markOrderPaid(reference);
  if (firstTime) {
    try {
      await sendOrderConfirmation({ ...order, status: 'paid' });
    } catch (err) {
      console.error('[payments] confirmation email failed', err);
    }
  }
  return true;
}
