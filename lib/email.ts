import 'server-only';
import { formatNaira } from './catalog';
import type { Order } from './orders';

/*
 * Emails are sent with Resend (free: 3,000/month) using plain fetch — no extra package.
 * Needs RESEND_API_KEY and EMAIL_FROM (e.g. "B&GV <orders@yourdomain.com>").
 * Without them, emails are skipped and logged.
 */
async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    console.log(`[email] Not configured — skipped "${subject}"`);
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) console.error('[email] Resend error', res.status, await res.text());
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function sendOrderConfirmation(order: Order): Promise<void> {
  const lines = order.items
    .map((l) => `<tr><td>${esc(l.name)} (${esc(l.size)}) × ${l.quantity}</td><td align="right">${formatNaira(l.unitPrice * l.quantity)}</td></tr>`)
    .join('');
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#1A1A1A">
      <h2>Thank you, ${esc(order.customer.name)} 🙏🏾</h2>
      <p>Your B&amp;GV order <strong>${esc(order.id)}</strong> is confirmed. We'll reach out on ${esc(order.customer.phone)} when it ships.</p>
      <table width="100%" cellpadding="6" style="border-collapse:collapse">${lines}
        <tr><td><strong>Total</strong></td><td align="right"><strong>${formatNaira(order.total)}</strong></td></tr>
      </table>
      <p>Delivery to: ${esc(order.customer.address)}</p>
      <p>Blessings &amp; Good Vibes ✨</p>
    </div>`;
  await sendEmail(order.customer.email, `Your B&GV order ${order.id} is confirmed`, html);
}
