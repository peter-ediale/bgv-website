import type { MetadataRoute } from 'next';
import { products } from '@/lib/catalog';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/shop', '/shop/edition-1', '/shop/edition-2', '/about', '/contact', '/shipping-returns', '/size-guide', '/privacy'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...products.map((p) => ({ url: `${site.url}/product/${p.id}` })),
  ];
}
