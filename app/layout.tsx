import type { Metadata, Viewport } from 'next';
import { Anton, Inter } from 'next/font/google';
import { site } from '../lib/site';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const anton = Anton({ variable: '--font-anton', subsets: ['latin'], weight: '400' });

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
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
