import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopView from '../../../components/shop/ShopView';
import { editions } from '@/lib/catalog';

type Props = { params: Promise<{ edition: string }> };

const find = (slug: string) => editions.find((e) => `edition-${e.id}` === slug);

// Pre-build /shop/edition-1 and /shop/edition-2 so they load instantly.
export const dynamicParams = false;
export function generateStaticParams() {
  return editions.map((e) => ({ edition: `edition-${e.id}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const edition = find((await params).edition);
  return edition ? { title: edition.name, description: edition.description } : {};
}

export default async function EditionPage({ params }: Props) {
  const edition = find((await params).edition);
  if (!edition) notFound();
  return <ShopView edition={edition} />;
}
