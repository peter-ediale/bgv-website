import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="eyebrow text-muted">404</p>
      <h1 className="display text-6xl md:text-8xl mt-4">Lost the vibe?</h1>
      <p className="mt-6 text-muted">This page doesn&apos;t exist, but good things are still waiting.</p>
      <Link href="/shop" className="btn mt-10 bg-ink text-paper hover:bg-clay">Back to the shop</Link>
    </div>
  );
}
