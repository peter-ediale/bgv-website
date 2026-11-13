import type { Metadata, Viewport } from 'next';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import { site } from '../lib/site';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
// While Anton downloads, show a similar tall/narrow font (not wide Arial) so headlines don't jump.
const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
  adjustFontFallback: false,
  fallback: ['Impact', 'Haettenschweiler', 'sans-serif-condensed', 'Arial Narrow', 'sans-serif'],
});
const mono = JetBrains_Mono({
  variable: '--font-jbmono',
  subsets: ['latin'],
  weight: ['400', '500'],
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'Menlo', 'Consolas', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.fullName}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: 'website',
    siteName: `${site.name} — ${site.fullName}`,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: site.fullName }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0b',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
