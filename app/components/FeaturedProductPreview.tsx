"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { focalMap } from '../../lib/catalog';

type Props = {
  imageSrc: string;
  alt?: string;
  modelImages: string[];
};

export default function FeaturedProductPreview({ imageSrc, alt, modelImages }: Props) {
  const [hovering, setHovering] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!hovering || modelImages.length === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % modelImages.length), 1800);
    return () => clearInterval(t);
  }, [hovering, modelImages]);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setIdx(0);
      }}
      className="relative aspect-square rounded bg-[#F0ECE4] overflow-hidden"
      aria-hidden={false}
    >
      <Image
        src={imageSrc}
        alt={alt || 'product preview'}
        fill
        style={{ objectPosition: focalMap[imageSrc] || 'center' }}
        className="object-cover"
      />
      {hovering && modelImages[idx] && (
        <div className="absolute inset-0">
          <Image
            src={modelImages[idx]}
            alt={`model ${idx + 1}`}
            fill
            style={{ objectPosition: focalMap[modelImages[idx]] || 'center' }}
            className="object-cover transition-opacity duration-500"
          />
        </div>
      )}
    </div>
  );
}
