import Image from 'next/image';
import { cookies } from 'next/headers';

async function fetchOrders() {
  try {
    // Construct path at runtime and require dynamically to avoid static bundler/type checks
    const path = require('path');
    // lib/db exports functions; require using process.cwd() to ensure runtime resolution
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const db = eval("require")(path.join(process.cwd(), 'lib', 'db'));
    return db.getOrders();
  } catch (err) {
    console.error('Failed to load orders DB', err);
    return [];
  }
}

export default async function AdminOrdersPage() {
  const cookie = (await cookies()).get('admin_auth');
  if (!cookie) {
    return (
      <main className="min-h-screen bg-[#FBF8F3] p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="font-serif text-xl mb-4">Admin access required</h2>
          <a href="/admin/login" className="px-6 py-2 bg-[#1A1A1A] text-white rounded">Login</a>
        </div>
      </main>
    );
  }

  const orders = await fetchOrders();

  return (
    <main className="min-h-screen bg-[#FBF8F3] p-8">
      <h1 className="font-serif text-3xl mb-6">Orders</h1>
      <div className="space-y-4">
        {orders.map((o: any) => (
          <div key={o.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{o.id} — {o.status}</div>
                <div className="text-sm text-[#8B7A6B]">{new Date(o.createdAt).toLocaleString()}</div>
                <div className="text-sm mt-2">Customer: {o.customer?.name} — {o.customer?.email}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">₦{o.total?.toLocaleString?.()}</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
              {o.items?.map((it: any) => (
                <div key={it.id} className="flex items-center gap-2">
                  <div className="w-12 h-12 relative bg-[#F0ECE4] rounded overflow-hidden">
                    <Image src={it.image} alt={it.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{it.name} x {it.quantity}</div>
                    <div className="text-xs text-[#8B7A6B]">{it.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
