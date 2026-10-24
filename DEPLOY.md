Staging deployment (Vercel) — quick guide

1) Prerequisites
- Sign up for Vercel and connect your GitHub/Git provider.
- Ensure you do NOT commit secrets. Use Vercel dashboard to set env vars.

2) Recommended environment variables (set in Vercel Project Settings)
- `ADMIN_PASSWORD` — a strong password for admin login.
- `PAYSTACK_SECRET_KEY` — your Paystack secret (optional; if empty the app uses mock flow).
- `NEXT_PUBLIC_BASE_URL` — your staging URL (e.g. `https://my-site.vercel.app`).
- `SENDGRID_API_KEY` and `EMAIL_FROM` — optional, for sending order confirmations.

3) Deploy steps
- Push your branch to GitHub.
- In Vercel, import the project and select the repo.
- Set the environment variables in Project Settings > Environment Variables (Production/Preview).
- Click Deploy. Vercel will run `npm install` and `npm run build`.

4) Important notes about server-side storage
- This project currently persists orders to a local SQLite database (`data/orders.db`). On Vercel serverless functions the filesystem is ephemeral and not suitable for durable storage.
- For reliable production/staging you should switch to a hosted DB (Postgres, PlanetScale, Supabase) and update `lib/db.ts` accordingly. I can help with this migration.

5) Webhooks and Paystack
- When using Paystack in production, configure your Paystack webhook to point to `https://<your-deploy>/api/payments/webhook` and provide the secret key in `PAYSTACK_SECRET_KEY`.
- Keep the webhook secret safe and verify signatures (the project includes HMAC verification in `app/api/payments/webhook/route.ts`).

6) Quick local test before deploying
- Copy `.env.example` to `.env.local` and fill values.
- Install deps and run locally:
```bash
npm install
npm run dev
```

If you want, I can now prepare a migration to use Supabase/Postgres for orders and switch `lib/db.ts` to use that instead of SQLite. Would you like me to implement that next, or proceed with Vercel deployment instructions and helping set env vars?
