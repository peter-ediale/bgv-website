"use client";

import { useState } from 'react';
import { ArrowIcon } from './Icons';

type Props = {
  source: 'newsletter' | 'edition-2-waitlist';
  tone?: 'dark' | 'light'; // light = on a dark background
  cta?: string;
};

export default function SubscribeForm({ source, tone = 'dark', cta = 'Subscribe' }: Props) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    const company = new FormData(e.currentTarget).get('company'); // spam trap
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, company }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setState('done');
      setMessage(
        source === 'edition-2-waitlist'
          ? 'You are on the list. We will tell you first. 🙏🏾'
          : 'You are in. Good vibes incoming. ✨'
      );
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error && err.message ? err.message : 'Something went wrong. Try again.');
    }
  };

  const light = tone === 'light';

  if (state === 'done') {
    return (
      <p className={`text-sm ${light ? 'text-paper' : 'text-ink'}`} role="status">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className={`flex border-b ${light ? 'border-paper/60' : 'border-ink'}`}>
        <label className="sr-only" htmlFor={`email-${source}`}>
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 min-w-0 bg-transparent py-3 text-sm outline-none ${
            light ? 'placeholder:text-paper/50 text-paper' : 'placeholder:text-muted'
          }`}
        />
        {/* Hidden from people; bots fill it in. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="eyebrow flex items-center gap-2 pl-4 hover:opacity-60 disabled:opacity-40 whitespace-nowrap"
        >
          {state === 'sending' ? 'Sending…' : cta} <ArrowIcon />
        </button>
      </div>
      {state === 'error' && (
        <p className="mt-2 text-xs text-ember" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
