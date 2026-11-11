-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

create table if not exists public.orders (
  id            text primary key,              -- e.g. BGV-M3X9K2-1A2B3C4D (also the Paystack reference)
  items         jsonb not null,
  subtotal      integer not null,              -- naira
  delivery_fee  integer not null default 0,    -- naira
  total         integer not null,              -- naira
  customer      jsonb not null,                -- { name, email, phone, address }
  status        text not null default 'pending'
                check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  created_at    timestamptz not null default now(),
  paid_at       timestamptz
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- Lock the table down: only the server (using the service-role key) can read/write.
-- The public/anon key gets no access because there are no policies.
alter table public.orders enable row level security;
