/** Simple layout for text pages (shipping, size guide, privacy). */
export default function InfoPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-8 py-16 md:py-24">
      <p className="eyebrow text-muted">{eyebrow}</p>
      <h1 className="display text-6xl md:text-8xl mt-4">{title}</h1>
      {updated && <p className="mt-4 text-xs text-muted">Last updated {updated}</p>}
      <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-ink/80 [&_h2]:eyebrow [&_h2]:text-ink [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
