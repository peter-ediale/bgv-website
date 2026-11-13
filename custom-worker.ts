// Cloudflare entry point: the normal website, plus a daily scheduled task.
// The scheduled task calls /api/health once a day so the free Supabase database
// never sees 7 quiet days in a row (which would make it pause).
// Schedule is set in wrangler.jsonc → "triggers".

// @ts-ignore `.open-next/worker.js` is generated at build time
import { default as handler } from './.open-next/worker.js';

type Env = Record<string, unknown>;
type Ctx = { waitUntil(promise: Promise<unknown>): void };

export default {
  fetch: handler.fetch,

  async scheduled(_event: unknown, env: Env, ctx: Ctx) {
    const res: Response = await handler.fetch(new Request('https://bgv.internal/api/health'), env, ctx);
    console.log('[keep-awake] health check:', res.status, await res.text());
  },
};
