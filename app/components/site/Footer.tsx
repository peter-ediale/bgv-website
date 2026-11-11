import Link from 'next/link';
import Logo from './Logo';
import SubscribeForm from './SubscribeForm';
import { site } from '../../../lib/site';

const columns = [
  {
    title: 'Shop',
    links: [
      { href: '/shop/edition-2', label: 'Edition 2 — Evolve' },
      { href: '/shop/edition-1', label: 'Edition 1' },
      { href: '/shop', label: 'Shop All' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/shipping-returns', label: 'Shipping & Returns' },
      { href: '/size-guide', label: 'Size Guide' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
  {
    title: 'B&GV',
    links: [
      { href: '/about', label: 'Our Story' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
  },
];

export default function Footer() {
  const socials = [
    { href: site.socials.instagram, label: 'Instagram' },
    { href: site.socials.tiktok, label: 'TikTok' },
    { href: site.whatsapp ? `https://wa.me/${site.whatsapp}` : '', label: 'WhatsApp' },
  ].filter((s) => s.href);

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-20 pb-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-4xl md:text-5xl">Stay in the good vibes</p>
            <p className="mt-4 text-sm text-paper/70 max-w-sm">
              New drops, restocks and early access, straight to your inbox. No spam, just blessings.
            </p>
            <div className="mt-8 max-w-md">
              <SubscribeForm source="newsletter" tone="light" />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-paper/50">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm hover:text-clay transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Logo tone="light" className="w-full h-auto" />
        </div>

        <div className="mt-10 flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between border-t border-paper/15 pt-6">
          <p className="text-xs text-paper/50">
            © {new Date().getFullYear()} {site.fullName}. Made in Nigeria 🇳🇬
          </p>
          <div className="flex gap-6">
            {socials.length === 0 ? (
              <a href={`mailto:${site.contactEmail}`} className="eyebrow hover:text-clay">
                Email us
              </a>
            ) : (
              socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="eyebrow hover:text-clay">
                  {s.label}
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
