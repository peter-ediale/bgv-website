// Tells next/image which pre-made file to load for each screen size.
// The files are created by `node scripts/optimize-images.mjs`, so no paid
// image-resizing service is needed when hosting on Cloudflare.

const WIDTHS = [480, 960, 1600]; // keep in sync with scripts/optimize-images.mjs

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (src.startsWith('/images/') && /\.jpe?g$/i.test(src)) {
    const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
    return src.replace(/\.jpe?g$/i, `-${w}.webp`);
  }
  // Other images (logos, icons) are already small: serve as-is.
  return `${src}?w=${width}`;
}
