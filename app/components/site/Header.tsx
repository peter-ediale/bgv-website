"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { BagIcon, CloseIcon, MenuIcon } from './Icons';
import { useCartStore, cartCount } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { useHydrated } from '../useHydrated';
import { site } from '../../../lib/site';

export const NAV = [
  { href: '/shop/edition-2', label: 'Edition 2' },
  { href: '/shop/edition-1', label: 'Edition 1' },
  { href: '/shop', label: 'Shop All' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const items = useCartStore((s) => s.items);
  const hydrated = useHydrated();
  const { menuOpen, setMenu, openCart } = useUIStore();
  const count = hydrated ? cartCount(items) : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation; lock page scroll while it's open.
  useEffect(() => setMenu(false), [pathname, setMenu]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  // On the homepage the header floats over the hero until you scroll.
  const overHero = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
          overHero ? 'bg-transparent text-paper border-transparent' : 'bg-paper/95 backdrop-blur text-ink border-line'
        }`}
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          {/* Left: menu button (mobile) / nav (desktop) */}
          <button
            className="md:hidden -ml-2 p-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenu(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <nav className="hidden md:flex gap-7" aria-label="Main">
            {NAV.slice(0, 3).map((l) => (
              <Link key={l.href} href={l.href} className="eyebrow hover:opacity-60 transition-opacity">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Center: logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="B&GV home">
            <Logo tone={overHero ? 'light' : 'dark'} className="h-5 md:h-6 w-auto" />
          </Link>

          {/* Right */}
          <div className="flex items-center gap-7">
            <nav className="hidden md:flex gap-7" aria-label="Secondary">
              {NAV.slice(3).map((l) => (
                <Link key={l.href} href={l.href} className="eyebrow hover:opacity-60 transition-opacity">
                  {l.label}
                </Link>
              ))}
            </nav>
            <button onClick={openCart} className="relative -mr-2 p-2" aria-label={`Open bag, ${count} items`}>
              <BagIcon />
              {count > 0 && (
                <span className="absolute top-0.5 right-0 min-w-4 h-4 px-1 rounded-full bg-clay text-[10px] leading-4 text-paper text-center font-semibold">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-30 bg-paper pt-32 px-6 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-5" aria-label="Mobile">
          {NAV.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={menuOpen ? 0 : -1}
              className={`display text-5xl ${menuOpen ? 'animate-fade-up' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="eyebrow text-muted mt-12">{site.fullName}</p>
      </div>
    </>
  );
}
