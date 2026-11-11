# Going live — step by step

Everything here is **free**. You create the accounts (only you can), and you paste secret keys
**into the dashboards / your `.env.local` file yourself** — never into chat, GitHub, or WhatsApp.

Order: **Supabase → Paystack → Cloudflare → connect them**. Budget about 1–2 hours.

---

## Step 1 — Supabase (stores orders, waitlist, messages) · ~15 min

1. Go to **supabase.com** → *Start your project* → sign in with GitHub.
2. *New project*:
   - Name: `bgv`
   - Database password: click *Generate*, then save it in your phone's notes/password manager.
   - Region: **West EU (London)** — the closest to Nigeria.
   - Free plan.
3. When it's ready, open **SQL Editor** (left menu) → *New query* → open the file
   `supabase/schema.sql` from this project, copy everything, paste, click **Run**.
   You should see "Success. No rows returned".
4. Open **Project Settings → API Keys** and copy:
   - **Project URL** (looks like `https://abcd1234.supabase.co`) — may be under *Data API*
   - **Secret key** (`sb_secret_…`) — or, on the *Legacy* tab, the `service_role` key.
   ⚠️ This key can read all your customer data. Treat it like a bank PIN.
5. Open `.env.local` in this project and fill in:
   ```
   SUPABASE_URL=https://abcd1234.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
   ```
6. Restart `npm run dev`, join the waitlist on the homepage, then check Supabase →
   **Table Editor → subscribers**. Your email should be there. ✅

> Free projects pause after ~7 days with no visits. If that happens, open Supabase and click *Restore*.

## Step 2 — Paystack (payments) · ~15 min

1. Go to **paystack.com** → *Create a free account*. Fill in your business details.
   Test mode works immediately — no documents needed yet.
2. Dashboard → **Settings → API Keys & Webhooks** → copy the **Test Secret Key** (`sk_test_…`).
3. Add it to `.env.local`:
   ```
   PAYSTACK_SECRET_KEY=sk_test_...
   ```
4. Restart `npm run dev` and buy something. You'll land on Paystack's real checkout page.
   Use Paystack's test card: **4084 0840 8408 4081**, expiry any future date, CVV **408**,
   PIN **0000**, OTP **123456**. You should come back to "Thank you 🙏🏾" and see the order as
   **paid** at `/admin/orders`. ✅

> To accept real money later: complete *Activate business* in Paystack (ID/BVN, and CAC if registered),
> then swap the `sk_test_` key for the `sk_live_` key in Cloudflare.

## Step 3 — Cloudflare (hosting) · ~20 min

1. Go to **dash.cloudflare.com** → sign up (free plan).
2. **Workers & Pages → Create → Import a repository** → connect GitHub → pick `bgv-website`.
3. Settings on that screen:
   - Project name: **`bgv`** (must match `wrangler.jsonc`)
   - Build command: `npx opennextjs-cloudflare build`
   - Deploy command: `npx wrangler deploy --keep-vars`
4. Click **Deploy**. The first build takes a few minutes. When it finishes you'll get a link like
   `https://bgv.<your-name>.workers.dev` — that's your live site! Copy it.
5. Open the Worker → **Settings → Variables and Secrets** → *Add* each of these as type **Secret**:

   | Name | Value |
   |---|---|
   | `ADMIN_PASSWORD` | a NEW strong password (not the one on your computer) |
   | `ADMIN_SESSION_SECRET` | a new random string — run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
   | `PAYSTACK_SECRET_KEY` | `sk_test_…` for now |
   | `SUPABASE_URL` | from step 1 |
   | `SUPABASE_SERVICE_ROLE_KEY` | from step 1 |

6. Open **Settings → Build → Variables and secrets** (the *build* ones) and add:
   `NEXT_PUBLIC_BASE_URL` = your `https://bgv.….workers.dev` link.
7. Go to **Deployments → Retry / Redeploy** so the new settings are used.

From now on, every time code is pushed to GitHub, Cloudflare rebuilds the site automatically.

## Step 4 — Connect Paystack to the live site · 2 min

Paystack → **Settings → API Keys & Webhooks** → *Test Webhook URL*:
```
https://bgv.<your-name>.workers.dev/api/payments/webhook
```
This confirms payments even if a customer closes their browser right after paying.

## Step 5 — Final check on the live site

- [ ] Homepage, shop, product pages load on your phone
- [ ] Waitlist sign-up appears in Supabase
- [ ] Test purchase with the test card → "Thank you" page → shows as **paid** in `/admin/orders`
- [ ] `/admin/orders` asks for the password

## Later (optional)

- **Emails (Resend)**: order confirmation emails need your own domain to send to customers.
  Once you have a domain, sign up at resend.com, verify the domain, and add `RESEND_API_KEY` and
  `EMAIL_FROM` (e.g. `B&GV <orders@yourdomain.com>`) as Cloudflare secrets.
- **Own domain** (~₦15–25k/year): buy it, add it to Cloudflare, then Worker → *Settings → Domains & Routes*.
  Update `NEXT_PUBLIC_BASE_URL` and the Paystack webhook URL afterwards.
- **Free plan limit**: Cloudflare's free plan gives each request 10 ms of CPU time. Almost every page here
  is pre-built so this should be fine. If you ever see "Error 1102", the Workers Paid plan ($5/month) removes it.
