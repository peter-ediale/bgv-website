// ---------------------------------------------------------------------------
// Site-wide settings. Edit these instead of hunting through pages.
// ---------------------------------------------------------------------------

export const site = {
  name: 'B&GV',
  fullName: 'Blessings & Good Vibes',
  tagline: 'Premium streetwear. Built for those who move different.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',

  /** Messages that scroll in the thin bar at the very top. */
  announcements: [
    'Edition 2 — Evolve — coming soon. Join the waitlist',
    'Nationwide delivery across Nigeria',
    'Secure payments with Paystack',
  ],

  contactEmail: 'peterediale2@gmail.com',
  /** Leave empty to hide. Format: international, digits only, e.g. 2348012345678 */
  whatsapp: '2349066861013',
  socials: {
    instagram: 'https://www.instagram.com/bgv.global',
    tiktok: '',
  },
};

/**
 * Delivery fees in naira, charged on top of the order.
 * ⚠️ PLACEHOLDER VALUES — confirm with your courier before launch.
 */
export const delivery = {
  lagos: 3000,
  otherStates: 5000,
  freeOver: 0, // e.g. 100000 for free delivery over ₦100k; 0 = never free
  lagosDays: '1–3 business days',
  otherDays: '3–7 business days',
};

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
] as const;

export function deliveryFee(state: string, subtotal: number): number {
  if (delivery.freeOver > 0 && subtotal >= delivery.freeOver) return 0;
  return state === 'Lagos' ? delivery.lagos : delivery.otherStates;
}

/**
 * Garment measurements in inches (laid flat).
 * ⚠️ PLACEHOLDER — typical boxy-tee numbers. Measure your actual pieces and replace before launch.
 */
export const sizeChart = [
  { size: 'S', chest: 21, length: 27 },
  { size: 'M', chest: 22, length: 28 },
  { size: 'L', chest: 23, length: 29 },
  { size: 'XL', chest: 24, length: 30 },
  { size: 'XXL', chest: 25, length: 31 },
];
