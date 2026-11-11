import { site } from '../../../lib/site';

export default function AnnouncementBar() {
  // Repeat the list twice so the scrolling loop is seamless.
  const items = [...site.announcements, ...site.announcements];
  return (
    <div className="bg-ink text-paper overflow-hidden" role="region" aria-label="Announcements">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((text, i) => (
              <li key={i} className="eyebrow py-2.5 px-8 whitespace-nowrap flex items-center gap-8">
                {text}
                <span className="text-clay">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
