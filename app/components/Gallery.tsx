import Image from 'next/image';
import { lookbookImages } from '../../lib/catalog';

// Simple gallery grid — return to the normal look
export default function Gallery() {
  const imgs = lookbookImages.slice(4, 8);
  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-6">From The Studio</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imgs.map((src, i) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-lg bg-[#F0ECE4]">
              <Image src={src} alt={`Gallery ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
