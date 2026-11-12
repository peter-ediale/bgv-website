"use client";

import { useEffect, useState } from 'react';

const lagosTime = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' }).format(new Date());

/** "LAGOS 14:51 · EDITION 02 · IN PRODUCTION" with a live clock and a blinking dot. */
export default function LiveStatus({ items, className = '' }: { items: string[]; className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(lagosTime());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={`meta flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      <span className="inline-flex items-center gap-2">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full rounded-full bg-ember opacity-75 animate-ping" />
          <span className="relative inline-flex size-1.5 rounded-full bg-ember" />
        </span>
        Lagos <span className="tabular-nums">{time ?? '--:--'}</span>
      </span>
      {items.map((it) => (
        <span key={it} className="flex items-center gap-3">
          <span aria-hidden>·</span>
          {it}
        </span>
      ))}
    </p>
  );
}
