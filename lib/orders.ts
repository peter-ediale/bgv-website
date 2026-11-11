import 'server-only';
import { getProduct, isPurchasable } from './catalog';
import { NIGERIAN_STATES } from './site';

export type OrderLine = {
  productId: string;
  name: string;
  size: string;
  quantity: number;
  unitPrice: number; // naira, from the catalog
  image: string;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  state: string;
};

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled';

export type Order = {
  id: string; // also used as the Paystack reference
  items: OrderLine[];
  subtotal: number;
  deliveryFee: number;
  total: number; // naira
  customer: Customer;
  status: OrderStatus;
  createdAt: string;
  paidAt: string | null;
};

export class OrderError extends Error {}

const MAX_QTY = 10;

/** Build trusted order lines from what the browser sent. Prices come only from the catalog. */
export function priceCart(raw: unknown): { items: OrderLine[]; subtotal: number } {
  if (!Array.isArray(raw) || raw.length === 0) throw new OrderError('Your cart is empty.');
  if (raw.length > 50) throw new OrderError('Too many items in cart.');

  const items: OrderLine[] = raw.map((r) => {
    const productId = String(r?.productId ?? '');
    const size = String(r?.size ?? '');
    const quantity = Number(r?.quantity);
    const product = getProduct(productId);

    if (!product) throw new OrderError('An item in your cart is no longer available. Please refresh your cart.');
    if (!isPurchasable(product)) throw new OrderError(`${product.name} can't be bought right now.`);
    if (!product.sizes.includes(size)) throw new OrderError(`Please choose a valid size for ${product.name}.`);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
      throw new OrderError(`Quantity for ${product.name} must be between 1 and ${MAX_QTY}.`);
    }

    return { productId, name: product.name, size, quantity, unitPrice: product.price, image: product.images[0] };
  });

  const subtotal = items.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  return { items, subtotal };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s-]{10,16}$/;

export function validateCustomer(raw: unknown): Customer {
  const r = (raw ?? {}) as Record<string, unknown>;
  const c: Customer = {
    name: String(r.name ?? '').trim().slice(0, 100),
    email: String(r.email ?? '').trim().toLowerCase().slice(0, 200),
    phone: String(r.phone ?? '').trim().slice(0, 20),
    address: String(r.address ?? '').trim().slice(0, 500),
    state: String(r.state ?? '').trim(),
  };
  if (c.name.length < 2) throw new OrderError('Please enter your full name.');
  if (!EMAIL_RE.test(c.email)) throw new OrderError('Please enter a valid email address.');
  if (!PHONE_RE.test(c.phone)) throw new OrderError('Please enter a valid phone number.');
  if (c.address.length < 10) throw new OrderError('Please enter your full delivery address.');
  if (!(NIGERIAN_STATES as readonly string[]).includes(c.state)) throw new OrderError('Please choose your state.');
  return c;
}

export function newOrderId(): string {
  const rand = crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase();
  return `BGV-${Date.now().toString(36).toUpperCase()}-${rand}`;
}
