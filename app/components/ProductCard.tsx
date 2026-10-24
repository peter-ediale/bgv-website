"use client";

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { focalMap } from '../../lib/catalog';

type Props = {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
    color?: string;
  };
  modelImages: string[]; // ordered list of model images for the product color
};

export default function ProductCard({ product, modelImages }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  const TILT_STRENGTH = 6; // degrees, reduced for a more subtle effect
  const CROSSFADE_MS = 400; // faster crossfade
  const THUMB_SIZE = 48; // px
  const AUTOPLAY_INTERVAL = 1800; // ms

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * TILT_STRENGTH; // degrees
    const rotateX = (0.5 - py) * TILT_STRENGTH;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
    setSelectedIdx(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hovering || modelImages.length === 0) return;
    if (e.key === 'ArrowRight') {
      setSelectedIdx((s) => (s === null ? 0 : Math.min(modelImages.length - 1, s + 1)));
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      setSelectedIdx((s) => (s === null ? modelImages.length - 1 : Math.max(0, s - 1)));
      e.preventDefault();
    }
  };

  const activeImage = selectedIdx !== null && modelImages[selectedIdx] ? modelImages[selectedIdx] : null;

  // Autoplay on hover: cycle thumbnails
  useEffect(() => {
    if (!hovering || modelImages.length === 0) {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    // start autoplay
    autoplayRef.current = window.setInterval(() => {
      setSelectedIdx((s) => {
        if (s === null) return 0;
        return (s + 1) % modelImages.length;
      });
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [hovering, modelImages]);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setHovering(true)}
      onBlur={handleMouseLeave}
      onKeyDown={handleKeyDown}
      className="group cursor-pointer"
      aria-label={`Product card: ${product.name}`}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >

      <div className="relative aspect-square overflow-hidden bg-[#F0ECE4] rounded-lg transition-transform duration-500">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectPosition: focalMap[product.image] || 'center' }}
          className="object-cover transition-opacity duration-400"
        />

        {/* crossfade model image */}
        {activeImage && (
          <div className="absolute inset-0">
            <Image
              src={activeImage}
              alt={`${product.name} model`}
              fill
              style={{ objectPosition: focalMap[activeImage] || 'center' }}
              className="object-cover opacity-90 transition-opacity duration-400"
            />
          </div>
        )}

        {/* thumbnail carousel on hover */}
        {modelImages.length > 0 && (
          <div className={`absolute left-3 right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto`}>
            <div className="flex gap-2 overflow-x-auto items-center">
              {modelImages.map((mi, i) => (
                <button
                  key={mi}
                  aria-label={`Show model ${i + 1} for ${product.name}`}
                  onMouseEnter={() => {
                    setSelectedIdx(i);
                    if (autoplayRef.current) {
                      window.clearInterval(autoplayRef.current);
                      autoplayRef.current = null;
                    }
                  }}
                  onFocus={() => setSelectedIdx(i)}
                  onMouseLeave={() => setSelectedIdx(null)}
                  onBlur={() => setSelectedIdx(null)}
                  className={`h-${THUMB_SIZE} w-${THUMB_SIZE} rounded-md overflow-hidden border ${selectedIdx === i ? 'ring-2 ring-[#C9A96E]' : 'border-transparent'}`}
                  style={{ height: THUMB_SIZE, width: THUMB_SIZE }}
                >
                  <Image src={mi} alt={`thumb-${i}`} width={THUMB_SIZE} height={THUMB_SIZE} className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm text-[#8B7A6B] uppercase tracking-wider">{product.category}</p>
        <h3 className="font-medium text-[#1A1A1A] mt-1">{product.name}</h3>
        <p className="text-[#C9A96E] font-semibold mt-1">{product.price}</p>
      </div>
    </div>
  );
}
