import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, verifySessionToken } from '../../../lib/auth';
import { getOrders } from '../../../lib/db';
import { formatNaira } from '../../../lib/catalog';
import type { Order } from '../../../lib/orders';

export const dynamic = 'force-dynamic';

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  shipped: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-200 text-gray-700',
};

export default async function AdminOrdersPage() {
  // Double-check the session here too (the proxy already checks it).
  if (!(await verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value))) redirect('/admin/login');

  let orders: Order[] = [];
  let loadError = false;
  try {
    orders = await getOrders();
  } catch (err) {
    console.error('[admin] failed to load orders', err);
    loadError = true;
  }

  const paid = orders.filter((o) => o.status === 'paid' || o.status === 'shipped');
  const revenue = paid.reduce((sum, o) => sum + (o.total ?? 0), 0);

  return (
    <main className="min-h-screen bg-[#FBF8F3] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-3xl">Orders</h1>
          <Link href="/admin/logout" className="text-sm underline">Log out</Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-white p-4 rounded shadow"><div className="text-2xl font-bold">{orders.length}</div><div className="text-xs text-[#8B7A6B]">All orders</div></div>
          <div className="bg-white p-4 rounded shadow"><div className="text-2xl font-bold">{paid.length}</div><div className="text-xs text-[#8B7A6B]">Paid</div></div>
          <div className="bg-white p-4 rounded shadow"><div className="text-2xl font-bold">{formatNaira(revenue)}</div><div className="text-xs text-[#8B7A6B]">Revenue</div></div>
        </div>

        {loadError && <p className="text-red-600 mb-4">Could not load orders. Check the server logs.</p>}
        {!loadError && orders.length === 0 && <p className="text-[#8B7A6B]">No orders yet.</p>}

        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white p-4 rounded shadow">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <div className="font-medium">
                    {o.id}{' '}
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded ${statusColor[o.status] ?? ''}`}>{o.status}</span>
                  </div>
                  <div className="text-sm text-[#8B7A6B]">{new Date(o.createdAt).toLocaleString('en-NG')}</div>
                  <div className="text-sm mt-2">
                    {o.customer?.name} · {o.customer?.email} · {o.customer?.phone ?? '—'}
                  </div>
                  <div className="text-sm text-[#8B7A6B]">{o.customer?.address}</div>
                </div>
                <div className="font-medium">{formatNaira(o.total ?? 0)}</div>
              </div>
              <ul className="mt-3 text-sm list-disc pl-5">
                {o.items?.map((it, i) => (
                  <li key={i}>
                    {it.name}{it.size ? ` (${it.size})` : ''} × {it.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
