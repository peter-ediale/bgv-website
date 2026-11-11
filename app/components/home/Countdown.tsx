"use client";

import { useEffect, useState } from 'react';

function remaining(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    mins: Math.floor(ms / 60_000) % 60,
    secs: Math.floor(ms / 1000) % 60,
  };
}

export default function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [t, setT] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const tick = () => setT(remaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: [string, number | undefined][] = [
    ['Days', t?.days],
    ['Hours', t?.hours],
    ['Mins', t?.mins],
    ['Secs', t?.secs],
  ];

  return (
    <div className="flex gap-6" role="timer" aria-label="Time until launch">
      {cells.map(([label, v]) => (
        <div key={label} className="text-center">
          <div className="display text-5xl md:text-6xl tabular-nums">{v === undefined ? '--' : String(v).padStart(2, '0')}</div>
          <div className="eyebrow mt-1 opacity-60">{label}</div>
        </div>
      ))}
    </div>
  );
}
