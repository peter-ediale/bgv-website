"use client";

import { useState } from 'react';

const field = 'mt-2 w-full bg-transparent border-b border-line py-3 text-base outline-none focus:border-ink transition-colors';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    const company = new FormData(e.currentTarget).get('company');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, company }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setState('done');
    } catch (err) {
      setState('error');
      setError(err instanceof Error && err.message ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (state === 'done') {
    return (
      <div role="status">
        <p className="display text-5xl">Message received</p>
        <p className="mt-4 text-muted">Thank you, {form.name.split(' ')[0]}. We&apos;ll get back to you soon. ✨</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <label className="block eyebrow">
        Name
        <input required value={form.name} onChange={set('name')} autoComplete="name" className={`${field} normal-case tracking-normal font-normal`} />
      </label>
      <label className="block eyebrow">
        Email
        <input required type="email" value={form.email} onChange={set('email')} autoComplete="email" className={`${field} normal-case tracking-normal font-normal`} />
      </label>
      <label className="block eyebrow">
        Message
        <textarea required rows={5} value={form.message} onChange={set('message')} className={`${field} resize-none normal-case tracking-normal font-normal`} />
      </label>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state === 'error' && <p className="text-sm text-ember" role="alert">{error}</p>}
      <button type="submit" disabled={state === 'sending'} className="btn bg-ink text-paper hover:bg-clay w-full md:w-auto">
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
