# B&GV — Blessings & Good Vibes

Online store for B&GV, built with Next.js, Tailwind CSS, Paystack and Supabase.
See [ROADMAP.md](ROADMAP.md) for the plan to production and [DEPLOY.md](DEPLOY.md) to put it online.

## Run it on your computer

```bash
npm install
cp .env.example .env.local   # then fill in ADMIN_PASSWORD and ADMIN_SESSION_SECRET
npm run dev
```

Open http://localhost:3000. Admin orders: http://localhost:3000/admin/orders

Without Paystack/Supabase keys the site still works locally:
payments are faked and orders are saved to `data/orders.json` (git-ignored).

## Where things live

| What | Where |
|---|---|
| Products, prices, sizes, which edition is live | `lib/catalog.ts` |
| Socials, WhatsApp, announcements, delivery fees, size chart | `lib/site.ts` |
| Colours, fonts, button styles | `app/globals.css` |
| Pages (home, shop, product, checkout…) | `app/(store)/` |
| Shared header, footer, cart drawer | `app/components/site/` |
| Checkout rules (pricing, validation) | `lib/orders.ts` |
| Paystack | `lib/payments.ts`, `app/api/payments/*` |
| Orders, waitlist, messages (Supabase / local files) | `lib/db.ts`, `supabase/schema.sql` |
| Order emails (Resend) | `lib/email.ts` |
| Admin login | `lib/auth.ts`, `app/admin/*` |

## Launching Edition 2

In `lib/catalog.ts`, change Edition 2's `status` from `'coming-soon'` to `'live'`.

## Adding new photos

Drop them in `public/images/...`, then shrink them for mobile data:

```bash
node scripts/optimize-images.mjs
```
