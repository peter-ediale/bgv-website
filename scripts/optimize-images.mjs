// Prepares photos in public/images for fast loading on mobile data.
//  1. Shrinks each original JPEG to max 1600px.
//  2. Creates small/medium/large WebP copies (name-480.webp, name-960.webp, name-1600.webp)
//     that image-loader.ts serves depending on screen size.
// Usage: node scripts/optimize-images.mjs   (safe to re-run; run it after adding new photos)
import sharp from 'sharp';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

sharp.cache(false); // don't keep files open (Windows locks them)

const ROOT = 'public/images';
const MAX = 1600;
export const WIDTHS = [480, 960, 1600]; // keep in sync with image-loader.ts

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g)$/i.test(e.name)) yield p;
  }
}

const exists = (p) => stat(p).then((s) => s, () => null);

for await (const file of walk(ROOT)) {
  const before = (await stat(file)).size;
  const original = await readFile(file);
  const meta = await sharp(original).metadata();
  // Only re-compress big originals; re-saving a JPEG every run would slowly lose quality.
  const needsShrink = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX || before > 500 * 1024 || (meta.orientation ?? 1) > 1;
  const shrunk = !needsShrink ? original : await sharp(original)
    .rotate() // apply phone orientation
    .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
  const source = shrunk.length < before ? shrunk : original;
  if (needsShrink && source === shrunk) {
    await writeFile(file, shrunk);
    console.log(`${file}: ${(before / 1024).toFixed(0)} KB → ${(shrunk.length / 1024).toFixed(0)} KB`);
  }

  const srcTime = (await stat(file)).mtimeMs;
  for (const w of WIDTHS) {
    const out = file.replace(/\.jpe?g$/i, `-${w}.webp`);
    const existing = await exists(out);
    if (existing && existing.mtimeMs >= srcTime) continue;
    const webp = await sharp(source)
      .rotate()
      .resize(w, w, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78 })
      .toBuffer();
    await writeFile(out, webp);
    console.log(`  + ${out} (${(webp.length / 1024).toFixed(0)} KB)`);
  }
}
