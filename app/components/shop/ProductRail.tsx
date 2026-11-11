import ProductCard from './ProductCard';
import type { Product } from '@/lib/catalog';

/** Swipeable row on phones, 4-column grid on desktop. */
export default function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="-mx-4 px-4 md:mx-0 md:px-0 flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {products.map((p) => (
        <div key={p.id} className="snap-start shrink-0 w-[68%] sm:w-[42%] md:w-auto">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
