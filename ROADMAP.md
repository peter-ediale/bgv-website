# B&GV — Road to Production

Goal: a premium, mobile-first store for **Blessings & Good Vibes**, ready for the Edition 2 launch, running on **₦0/month**.

---

## The free stack

| Need | Choice | Free tier | Why |
|---|---|---|---|
| Hosting | **Cloudflare Workers** (via the OpenNext adapter) | 100k requests/day, commercial use allowed | Vercel's free "Hobby" plan is for non-commercial use only — a store is commercial. Netlify is the backup option. |
| Database (orders, waitlist, messages) | **Supabase** (Postgres) | 500 MB, 50k monthly users | Easy dashboard you can open to see orders. Note: free projects pause after ~7 days with no traffic — one click to resume. |
| Payments | **Paystack** | No monthly fee; per-sale fee only (1.5% + ₦100, capped at ₦2,000) | Standard in Nigeria; test mode is free. |
| Emails (order confirmations) | **Resend** | 3,000 emails/month | Simple API, no extra package needed. |
| Code | **GitHub** | Free | Already set up. |
| Domain | `bgv…workers.dev` (free) until you buy one | — | A real domain (`.com` / `.com.ng`) is the **only** thing that costs money (~₦15–25k/year). Optional at launch. |

---

## Phase 1 — Foundations (make it safe & deployable) ✅

- [x] Production build passes (`npm run build`)
- [x] Server decides prices — customer can't change what they pay
- [x] Paystack uses our order ID as the reference, checks the amount paid
- [x] Fake/mock payments only work on your computer, never in production
- [x] Cart empties after a successful payment
- [x] Orders stored in Supabase (falls back to a local file on your computer)
- [x] Secure admin login (signed cookie, can't be faked)
- [x] Catalog restructured: numeric prices, sizes, stock status, edition info
- [x] Customer data no longer tracked by git; old/broken config removed
- [ ] Scrub that customer data from the public GitHub history (needs a force-push — your call)
- [x] `.env.example` documenting every setting

## Phase 2 — Redesign (make it premium) ✅

Inspiration: Ashluxe, ASHLUXURY, High Fashion by JOL. What they all share:
- Thin **announcement bar** on top ("Edition 2 drops 12.12 — join the list")
- **Centered logo**, menu icon on the left, search / account / bag on the right — works the same on phone and desktop
- **Full-screen hero slider** of campaign photos (auto-crossfade + slow zoom), one bold line of text and one button
- **Sharp, editorial type**: uppercase, wide letter-spacing, few colors, lots of white space; no rounded "app" cards
- Product rows ("New In", "Edition 2") with **badges** (NEW, LOW STOCK, SOLD OUT) and **color swatches**
- **Newsletter / waitlist pop-up**, **WhatsApp chat** button
- Big footer: shop links, care/shipping/returns, socials, newsletter

Work items:
- [x] Brand system: one font pair, color tokens, spacing, button styles
- [x] One shared header (with mobile menu) + footer used on every page
- [x] Animated hero slider (photos or a short muted video)
- [x] Edition 2 launch page: countdown, waitlist signup (saved to Supabase)
- [x] Product detail page: gallery, size picker, size guide, fabric/care, "complete the look"
- [x] Slide-out cart drawer
- [x] Checkout: phone, state/city, delivery fee (Lagos vs. outside Lagos)
- [x] Order confirmation page + email
- [x] Contact form + "Notify me" actually saving to Supabase
- [x] Policy pages: Shipping & Returns, Size guide, Privacy
- [ ] Terms of sale page
- [x] Admin: see waitlist & messages
- [ ] Admin: mark orders shipped
- [x] Compress all photos (some are 3–5 MB → target < 300 KB)

## Phase 3 — Launch polish

- [x] SEO: titles, descriptions, social-share image, sitemap, robots, favicon
- [ ] Analytics (Cloudflare Web Analytics — free, no cookie banner needed)
- [ ] Test on real phones (Android + iPhone), slow 3G
- [ ] Real Paystack test-mode purchase end-to-end, then switch to live keys

## Phase 4 — Deploy

- [ ] Create Supabase project, run `supabase/schema.sql`
- [ ] Paystack: add live keys + webhook URL
- [ ] Deploy to Cloudflare Workers, set environment variables
- [ ] (Optional) connect your own domain

---

## Before launch — confirm these placeholders (all in `lib/site.ts` / `lib/catalog.ts`)

- [ ] Delivery fees (now ₦3,000 Lagos / ₦5,000 elsewhere) and delivery times
- [ ] Size chart measurements (now typical boxy-tee numbers — measure your real pieces)
- [ ] Exchange/returns policy wording on `/shipping-returns`
- [ ] Product descriptions, prices, sizes
- [ ] Instagram, TikTok, WhatsApp number (they appear automatically once filled in)
- [ ] Edition 2 launch date → add `launchDate` to show a countdown; flip `status` to `'live'` on the day

## What I need from you

1. **Accounts** (all free — you create them, I can't): Supabase, Paystack (test mode is fine for now), Resend, Cloudflare.
2. **Edition 2 details**: launch date, sizes per item, fabric/GSM, final prices, stock counts.
3. **Photos**: the current hero is a grey stock-style image of hangers — it doesn't show B&GV. Even a phone shoot of real people wearing Edition 2 (good daylight, plain background) will lift the site more than any code.
4. **Socials**: Instagram / TikTok handles, WhatsApp business number.
