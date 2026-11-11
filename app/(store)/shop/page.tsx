import type { Metadata } from 'next';
import ShopView from '../../components/shop/ShopView';

export const metadata: Metadata = {
  title: 'Shop All',
  description: 'Shop every B&GV edition.',
};

export default function ShopPage() {
  return <ShopView edition={null} />;
}
