import Image from 'next/image';
import Link from 'next/link';
import { formatNaira, getEdition, getModelPhotos, type Product } from '@/lib/catalog';

/** Product tile: image (swaps to a model photo on hover), badge, name, price. */
export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const edition = getEdition(product.edition);
  const hoverImage = product.images[1] ?? getModelPhotos(product)[0];
  const badge = product.soldOut ? 'Sold out' : edition.status === 'coming-soon' ? 'Coming soon' : product.edition === 2 ? 'New' : null;

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden" style={{ background: product.bg }}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-contain transition-all duration-700 group-hover:scale-[1.03] ${hoverImage ? 'group-hover:opacity-0' : ''}`}
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {badge && (
          <span
            className={`absolute right-3 top-3 eyebrow !text-[10px] px-2 py-1 ${
              badge === 'Sold out' ? 'bg-paper text-muted' : badge === 'New' ? 'bg-ember text-paper' : 'bg-ink text-paper'
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[13px] font-medium uppercase tracking-wide">{product.name}</h3>
          <p className="text-xs text-muted mt-1">{edition.name}</p>
        </div>
        <p className="text-[13px] whitespace-nowrap">{formatNaira(product.price)}</p>
      </div>
    </Link>
  );
}
