// ---------------------------------------------------------------------------
// B&GV product catalog — the single source of truth for products and prices.
// The server uses these prices at checkout, so what a customer pays always
// comes from here, never from the browser.
// ---------------------------------------------------------------------------

export type EditionId = 1 | 2;

export type Edition = {
  id: EditionId;
  name: string;
  tagline: string;
  /** 'live' = can be bought. 'coming-soon' = visible but not purchasable. */
  status: 'live' | 'coming-soon';
};

export type Product = {
  /** Stable, URL-friendly ID. Never change it once orders exist. */
  id: string;
  name: string;
  /** Price in naira (whole number). */
  price: number;
  images: string[];
  category: 'T-Shirt' | 'Tank Top' | 'Cap';
  edition: EditionId;
  color: string;
  sizes: string[];
  soldOut?: boolean;
};

export const editions: Edition[] = [
  { id: 1, name: 'Edition 1', tagline: 'Where it all started', status: 'live' },
  // Flip to 'live' on launch day.
  { id: 2, name: 'Edition 2 — Evolve', tagline: 'Still evolving, still building', status: 'coming-soon' },
];

const TEE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const ONE_SIZE = ['One Size'];

export const products: Product[] = [
  // ---- Edition 1 ----------------------------------------------------------
  { id: 'e1-summer-tee-black', name: 'Summer Tee — Black', price: 15000, images: ['/images/products/edition1/product1.jpeg'], category: 'T-Shirt', edition: 1, color: 'black', sizes: TEE_SIZES },
  { id: 'e1-summer-tee-brown', name: 'Summer Tee — Brown', price: 15000, images: ['/images/products/edition1/product2.jpeg'], category: 'T-Shirt', edition: 1, color: 'brown', sizes: TEE_SIZES },
  { id: 'e1-summer-tee-red', name: 'Summer Tee — Red', price: 15000, images: ['/images/products/edition1/product3.jpeg'], category: 'T-Shirt', edition: 1, color: 'red', sizes: TEE_SIZES },
  { id: 'e1-summer-tee-white', name: 'Summer Tee — White', price: 15000, images: ['/images/products/edition1/product4.jpeg'], category: 'T-Shirt', edition: 1, color: 'white', sizes: TEE_SIZES },

  // ---- Edition 2 — Evolve -------------------------------------------------
  { id: 'e2-evolve-tee-black', name: 'Evolve Tee — Black', price: 20000, images: ['/images/products/edition2/Edition2_Product1.jpeg'], category: 'T-Shirt', edition: 2, color: 'black', sizes: TEE_SIZES },
  { id: 'e2-evolve-tee-white', name: 'Evolve Tee — White', price: 20000, images: ['/images/products/edition2/Edition2_Product2.jpeg'], category: 'T-Shirt', edition: 2, color: 'white', sizes: TEE_SIZES },
  { id: 'e2-evolve-tee-brown', name: 'Evolve Tee — Brown', price: 20000, images: ['/images/products/edition2/Edition2_Product3.jpeg'], category: 'T-Shirt', edition: 2, color: 'brown', sizes: TEE_SIZES },
  { id: 'e2-evolve-tank-black', name: 'Evolve Tank Top — Black', price: 10000, images: ['/images/products/edition2/Edition2_Product4.jpeg'], category: 'Tank Top', edition: 2, color: 'black', sizes: TEE_SIZES },
  { id: 'e2-evolve-tank-white', name: 'Evolve Tank Top — White', price: 10000, images: ['/images/products/edition2/Edition2_Product5.jpeg'], category: 'Tank Top', edition: 2, color: 'white', sizes: TEE_SIZES },
  { id: 'e2-evolve-cap-black', name: 'Evolve Cap — Black', price: 15000, images: ['/images/products/edition2/Edition2_Product6.jpeg'], category: 'Cap', edition: 2, color: 'black', sizes: ONE_SIZE },
  { id: 'e2-evolve-cap-brown', name: 'Evolve Cap — Brown', price: 15000, images: ['/images/products/edition2/Edition2_Product7.jpeg'], category: 'Cap', edition: 2, color: 'brown', sizes: ONE_SIZE },
];

// ---- Helpers ----------------------------------------------------------------

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getEdition(id: EditionId): Edition {
  return editions.find((e) => e.id === id)!;
}

export function getProductsByEdition(edition: EditionId): Product[] {
  return products.filter((p) => p.edition === edition);
}

/** Can this product be bought right now? */
export function isPurchasable(p: Product): boolean {
  return !p.soldOut && getEdition(p.edition).status === 'live';
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

// ---- Model / lookbook photos -----------------------------------------------

export type ModelPhoto = { image: string; color: string; edition: EditionId };

export const modelPhotos: ModelPhoto[] = [
  { image: '/images/models/edition1/model1.jpeg', color: 'white', edition: 1 },
  { image: '/images/models/edition1/model2.jpeg', color: 'red', edition: 1 },
  { image: '/images/models/edition1/model3.jpeg', color: 'white', edition: 1 },
  { image: '/images/models/edition1/model4.jpeg', color: 'black', edition: 1 },
  { image: '/images/models/edition1/model5.jpeg', color: 'red', edition: 1 },
  { image: '/images/models/edition1/model7.jpeg', color: 'white', edition: 1 },
  { image: '/images/models/edition1/model8.jpeg', color: 'red', edition: 1 },
  { image: '/images/models/edition1/model9.jpeg', color: 'white', edition: 1 },
];

/** Model photos showing a product's colour from the same edition. */
export function getModelPhotos(p: Product): string[] {
  return modelPhotos.filter((m) => m.color === p.color && m.edition === p.edition).map((m) => m.image);
}

export const lookbookImages: string[] = modelPhotos.map((m) => m.image);
