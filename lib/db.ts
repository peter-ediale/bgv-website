import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Order } from './orders';

/*
 * Order storage.
 * - If SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set → Supabase (production).
 * - Otherwise → a local JSON file at data/orders.json (your computer only; git-ignored).
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase: SupabaseClient | null = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
}

let warned = false;

// ---- Supabase row mapping (snake_case columns) -------------------------------

type Row = {
  id: string;
  items: Order['items'];
  subtotal: number;
  delivery_fee: number;
  total: number;
  customer: Order['customer'];
  status: Order['status'];
  created_at: string;
  paid_at: string | null;
};

const toRow = (o: Order): Row => ({
  id: o.id,
  items: o.items,
  subtotal: o.subtotal,
  delivery_fee: o.deliveryFee,
  total: o.total,
  customer: o.customer,
  status: o.status,
  created_at: o.createdAt,
  paid_at: o.paidAt,
});

const fromRow = (r: Row): Order => ({
  id: r.id,
  items: r.items,
  subtotal: r.subtotal,
  deliveryFee: r.delivery_fee,
  total: r.total,
  customer: r.customer,
  status: r.status,
  createdAt: r.created_at,
  paidAt: r.paid_at,
});

// ---- Local JSON file (development only) --------------------------------------

async function localFile() {
  if (!warned && process.env.NODE_ENV === 'production') {
    warned = true;
    console.warn('[db] Supabase is not configured — using a local file. Orders will NOT persist on a host.');
  }
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const dir = path.join(process.cwd(), 'data');
  const file = path.join(dir, 'orders.json');
  return {
    async read(): Promise<Order[]> {
      try {
        return JSON.parse(await fs.readFile(file, 'utf-8')) as Order[];
      } catch {
        return [];
      }
    },
    async write(rows: Order[]) {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(file, JSON.stringify(rows, null, 2));
    },
  };
}

// ---- Public API ---------------------------------------------------------------

export async function insertOrder(order: Order): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('orders').insert(toRow(order));
    if (error) throw new Error(`insertOrder: ${error.message}`);
    return;
  }
  const db = await localFile();
  const rows = await db.read();
  rows.unshift(order);
  await db.write(rows);
}

export async function getOrder(id: string): Promise<Order | null> {
  if (supabase) {
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).maybeSingle();
    if (error) throw new Error(`getOrder: ${error.message}`);
    return data ? fromRow(data as Row) : null;
  }
  const rows = await (await localFile()).read();
  return rows.find((r) => r.id === id) ?? null;
}

export async function getOrders(): Promise<Order[]> {
  if (supabase) {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(`getOrders: ${error.message}`);
    return (data as Row[]).map(fromRow);
  }
  return (await localFile()).read();
}

/**
 * Mark a pending order as paid. Returns true only the first time
 * (so confirmation emails are sent once, even if Paystack calls us twice).
 */
export async function markOrderPaid(id: string): Promise<boolean> {
  const paidAt = new Date().toISOString();
  if (supabase) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'paid', paid_at: paidAt })
      .eq('id', id)
      .eq('status', 'pending')
      .select('id');
    if (error) throw new Error(`markOrderPaid: ${error.message}`);
    return (data?.length ?? 0) > 0;
  }
  const db = await localFile();
  const rows = await db.read();
  const row = rows.find((r) => r.id === id);
  if (!row || row.status !== 'pending') return false;
  row.status = 'paid';
  row.paidAt = paidAt;
  await db.write(rows);
  return true;
}
