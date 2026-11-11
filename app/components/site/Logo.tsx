import Image from 'next/image';

/** The B&GV wordmark. `tone="light"` for dark backgrounds. */
export default function Logo({ tone = 'dark', className = 'h-6 w-auto' }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Image
      src={tone === 'light' ? '/brand/logo-white.png' : '/brand/logo-black.png'}
      alt="B&GV — Blessings & Good Vibes"
      width={458}
      height={132}
      priority
      className={className}
    />
  );
}
