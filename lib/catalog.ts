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
  /** Optional launch date/time (ISO, Lagos time). Shows a countdown when set. */
  launchDate?: string;
  description: string;
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
  description: string;
  /** Background behind the product mockup (matches the photo's own background so no bars show). */
  bg: string;
  soldOut?: boolean;
};

export const editions: Edition[] = [
  {
    id: 1,
    name: 'Edition 1',
    tagline: 'Where it all started',
    status: 'live',
    description: 'The first drop. Summer tees with the signature gold B&GV chest patch — the prototype that got the idea out of our heads and into the world.',
  },
  {
    id: 2,
    name: 'Edition 2 — Evolve',
    tagline: 'Never stay the same',
    // Flip to 'live' on launch day. Add launchDate (e.g. '2026-12-12T18:00:00+01:00') to show a countdown.
    status: 'coming-soon',
    description: 'Break the pattern. Rewrite the rules. Grow through every phase, every failure, every win. Built for those who move different.',
  },
];

const E1_BG = 'linear-gradient(#d4d4d6, #e3e3e3)';
const TEE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const ONE_SIZE = ['One Size'];

export const products: Product[] = [
  // ---- Edition 1 ----------------------------------------------------------
  { id: 'e1-summer-tee-black', bg: E1_BG, name: 'Summer Tee — Black', price: 15000, images: ['/images/products/edition1/product1.jpeg'], category: 'T-Shirt', edition: 1, color: 'black', sizes: TEE_SIZES, description: 'Classic black summer tee with the gold B&GV chest patch and barcode hem tag.' },
  { id: 'e1-summer-tee-brown', bg: E1_BG, name: 'Summer Tee — Brown', price: 15000, images: ['/images/products/edition1/product2.jpeg'], category: 'T-Shirt', edition: 1, color: 'brown', sizes: TEE_SIZES, description: 'Earth-brown summer tee with the gold B&GV chest patch and barcode hem tag.' },
  { id: 'e1-summer-tee-red', bg: E1_BG, name: 'Summer Tee — Red', price: 15000, images: ['/images/products/edition1/product3.jpeg'], category: 'T-Shirt', edition: 1, color: 'red', sizes: TEE_SIZES, description: 'Bold red summer tee with the gold B&GV chest patch and barcode hem tag.' },
  { id: 'e1-summer-tee-white', bg: E1_BG, name: 'Summer Tee — White', price: 15000, images: ['/images/products/edition1/product4.jpeg'], category: 'T-Shirt', edition: 1, color: 'white', sizes: TEE_SIZES, description: 'Clean white summer tee with the gold B&GV chest patch and barcode hem tag.' },

  // ---- Edition 2 — Evolve -------------------------------------------------
  { id: 'e2-evolve-tee-black', name: 'Evolve Tee — Black', price: 20000, images: ['/images/products/edition2/Edition2_Product1.jpeg'], bg: '#fff', category: 'T-Shirt', edition: 2, color: 'black', sizes: TEE_SIZES, description: 'Boxy tee with the & mark on the chest and the EVOLVE manifesto across the back: never stay the same.' },
  { id: 'e2-evolve-tee-white', name: 'Evolve Tee — White', price: 20000, images: ['/images/products/edition2/Edition2_Product2.jpeg'], bg: '#000', category: 'T-Shirt', edition: 2, color: 'white', sizes: TEE_SIZES, description: 'Boxy tee with the B&GV chest logo and an ornate EVOLVE crest print on the back.' },
  { id: 'e2-evolve-tee-brown', name: 'Evolve Tee — Brown', price: 20000, images: ['/images/products/edition2/Edition2_Product3.jpeg'], bg: '#000', category: 'T-Shirt', edition: 2, color: 'brown', sizes: TEE_SIZES, description: 'Clay-brown boxy tee. Front: the & mark. Back: “Beyond who you were yesterday — EVOLVE.”' },
  { id: 'e2-evolve-tank-black', name: 'Evolve Tank Top — Black', price: 10000, images: ['/images/products/edition2/Edition2_Product4.jpeg'], bg: '#000', category: 'Tank Top', edition: 2, color: 'black', sizes: TEE_SIZES, description: 'Sleeveless tank with the B&GV chest logo and the & mark repeated down the side.' },
  { id: 'e2-evolve-tank-white', name: 'Evolve Tank Top — White', price: 10000, images: ['/images/products/edition2/Edition2_Product5.jpeg'], bg: '#fff', category: 'Tank Top', edition: 2, color: 'white', sizes: TEE_SIZES, description: 'White sleeveless tank with the B&GV chest logo and the & mark repeated down the side.' },
  { id: 'e2-evolve-cap-black', name: 'Evolve Cap — Black', price: 15000, images: ['/images/products/edition2/Edition2_Product6.jpeg'], bg: '#fff', category: 'Cap', edition: 2, color: 'black', sizes: ONE_SIZE, description: 'Structured cap with the embroidered & mark.' },
  { id: 'e2-evolve-cap-brown', name: 'Evolve Cap — Brown', price: 15000, images: ['/images/products/edition2/Edition2_Product7.jpeg'], bg: '#fff', category: 'Cap', edition: 2, color: 'brown', sizes: ONE_SIZE, description: 'Structured clay-brown cap with the embroidered & mark.' },
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
