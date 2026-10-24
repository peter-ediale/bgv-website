export type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  edition: string;
  color?: string;
};

export type ModelFile = {
  id: number;
  image: string;
  color?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Black Summer Tee - Edition 1",
    price: "₦15,000",
    image: "/images/products/edition1/product1.jpeg",
    category: "Short Sleeve",
    edition: '1',
    color: 'black'
  },
  {
    id: 2,
    name: "Brown Summer Tee - Edition 1",
    price: "₦15,000",
    image: "/images/products/edition1/product2.jpeg",
    category: "Short Sleeve",
    edition: '1',
    color: 'brown'
  },
  {
    id: 3,
    name: "Red Summer Tee - Edition 1",
    price: "₦15,000",
    image: "/images/products/edition1/product3.jpeg",
    category: "Short Sleeve",
    edition: '1',
    color: 'red'
  },
  {
    id: 4,
    name: "White Summer Tee - Edition 1",
    price: "₦15,000",
    image: "/images/products/edition1/product4.jpeg",
    category: "Short Sleeve",
    edition: '1',
    color: 'white'
  }
];

// Edition 2 products — added from user's Downloads
export const productsEdition2: Product[] = [
  { id: 101, name: 'Edition 2 — Evolve Tee (Black)', price: '₦20,000', image: '/images/products/edition2/Edition2_Product1.jpeg', category: 'Short Sleeve', edition: '2' },
  { id: 102, name: 'Edition 2 — Evolve Tee (White)', price: '₦20,000', image: '/images/products/edition2/Edition2_Product2.jpeg', category: 'Short Sleeve', edition: '2' },
  { id: 103, name: 'Edition 2 — Evolve Tee (Brown)', price: '₦20,000', image: '/images/products/edition2/Edition2_Product3.jpeg', category: 'Short Sleeve', edition: '2' },
  { id: 104, name: 'Edition 2 — Evolve TankTop (Black)', price: '₦10,000', image: '/images/products/edition2/Edition2_Product4.jpeg', category: 'Tank Top', edition: '2' },
  { id: 105, name: 'Edition 2 — Evolve TankTop (White)', price: '₦10,000', image: '/images/products/edition2/Edition2_Product5.jpeg', category: 'Tank Top', edition: '2' },
  { id: 106, name: 'Edition 2 — Evolve Cap (Black)', price: '₦15,000', image: '/images/products/edition2/Edition2_Product6.jpeg', category: 'Cap', edition: '2' },
  { id: 107, name: 'Edition 2 — Evolve Cap (Brown)', price: '₦15,000', image: '/images/products/edition2/Edition2_Product7.jpeg', category: 'Cap', edition: '2' },
];

// Merge edition 1 and edition 2 for consumption by the shop
export const allProducts: Product[] = [...products, ...productsEdition2];

export const modelFiles: ModelFile[] = [
  { id: 1, image: "/images/models/edition1/model1.jpeg", color: 'white' },
  { id: 2, image: "/images/models/edition1/model2.jpeg", color: 'red' },
  { id: 3, image: "/images/models/edition1/model3.jpeg", color: 'white' },
  { id: 4, image: "/images/models/edition1/model4.jpeg", color: 'black' },
  { id: 5, image: "/images/models/edition1/model5.jpeg", color: 'red' },
  { id: 6, image: "/images/models/edition1/model6.jpeg", color: 'red' },
  { id: 7, image: "/images/models/edition1/model7.jpeg", color: 'white' },
  { id: 8, image: "/images/models/edition1/model8.jpeg", color: 'red' },
  { id: 9, image: "/images/models/edition1/model9.jpeg", color: 'white' }
];

export function getModelsByColor(color?: string | null): string[] {
  if (!color) return [];
  return modelFiles.filter((m) => m.color === color).map((m) => m.image);
}

// Unique model images (preserve order)
export const uniqueModelImages: string[] = Array.from(new Set(modelFiles.map((m) => m.image)));

// Optional per-image focal positions (CSS object-position values).
// Adjust these per-image if faces are off-center. Defaults to 'center'.
export const focalMap: Record<string, string> = {
  '/images/models/edition1/model1.jpeg': 'center',
  '/images/models/edition1/model2.jpeg': 'center',
  '/images/models/edition1/model3.jpeg': 'center',
  '/images/models/edition1/model4.jpeg': 'center',
  '/images/models/edition1/model5.jpeg': 'center',
  '/images/models/edition1/model6.jpeg': 'center',
  '/images/models/edition1/model7.jpeg': 'center',
  '/images/models/edition1/model8.jpeg': 'center',
  '/images/models/edition1/model9.jpeg': 'center',
};
