import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'tt-001',
    name: 'Limonene Larry Tee',
    slug: 'limonene-larry-tee',
    price: 52,
    images: ['/images/products/limonene-larry-tee-1.jpg', '/images/products/limonene-larry-tee-2.jpg'],
    category: 'apparel',
    badge: 'available',
    featured: true,
    characterId: 'limonene-larry',
    shortDescription: 'Limonene Larry. Citrus vibes. Heavy cotton. Full print.',
    description:
      "Limonene Larry brings the citrus energy. Heavyweight oversized tee featuring original Larry artwork in a full-front print. 280gsm ringspun. Garment-dyed in Larry's signature yellow. Limited colorway — restock not guaranteed.",
    tags: ['apparel', 'tee', 'season-1', 'limonene-larry'],
    variants: [
      {
        id: 'size',
        name: 'Size',
        options: [
          { id: 's', value: 'S', inStock: true },
          { id: 'm', value: 'M', inStock: true },
          { id: 'l', value: 'L', inStock: true },
          { id: 'xl', value: 'XL', inStock: true },
          { id: 'xxl', value: 'XXL', inStock: false },
        ],
      },
    ],
  },
  {
    id: 'tt-002',
    name: 'Myrcene Mike Hoodie',
    slug: 'myrcene-mike-hoodie',
    price: 95,
    images: ['/images/products/myrcene-mike-hoodie-1.jpg', '/images/products/myrcene-mike-hoodie-2.jpg'],
    category: 'apparel',
    badge: 'limited',
    featured: true,
    characterId: 'myrcene-mike',
    shortDescription: '72-hour drop. Myrcene Mike embroidered hoodie. Limited units.',
    description:
      "Mike's on the front. The whole crew is on the back. 420gsm fleece hoodie with original Myrcene Mike embroidery on the chest and full crew print on the back. 72-hour drop window — then he's gone until Season 3.",
    tags: ['apparel', 'hoodie', 'season-1', 'myrcene-mike', 'limited'],
    variants: [
      {
        id: 'size',
        name: 'Size',
        options: [
          { id: 's', value: 'S', inStock: true },
          { id: 'm', value: 'M', inStock: true },
          { id: 'l', value: 'L', inStock: false },
          { id: 'xl', value: 'XL', inStock: false },
        ],
      },
    ],
  },
  {
    id: 'tt-003',
    name: 'Terpene Crew Tee — Vol. 1',
    slug: 'terpene-crew-tee-vol-1',
    price: 58,
    images: ['/images/products/crew-tee-vol1-1.jpg', '/images/products/crew-tee-vol1-2.jpg'],
    category: 'apparel',
    badge: 'sold-out',
    shortDescription: 'Vol. 1 is done. The one that started it all.',
    description:
      "The original. All 8 characters from the first Terp Totz drop. Full-back print, left chest hit, black-on-black colorway. Vol. 1 is officially closed. Sign up to hear about Vol. 2.",
    tags: ['apparel', 'tee', 'season-1', 'sold-out', 'collectors'],
    variants: [
      {
        id: 'size',
        name: 'Size',
        options: [
          { id: 's', value: 'S', inStock: false },
          { id: 'm', value: 'M', inStock: false },
          { id: 'l', value: 'L', inStock: false },
          { id: 'xl', value: 'XL', inStock: false },
        ],
      },
    ],
  },
  {
    id: 'tt-004',
    name: 'Pinene Pete Snapback',
    slug: 'pinene-pete-snapback',
    price: 45,
    images: ['/images/products/pinene-pete-snap-1.jpg'],
    category: 'accessories',
    badge: 'available',
    featured: true,
    characterId: 'pinene-pete',
    shortDescription: 'Pinene Pete snapback. Forest colorway. One size fits.',
    description:
      "Forest pine colorway. Embroidered Pete on the front panel, Terp Totz logo hit on the side, woven label under the brim. Snapback, one size. Rep the pine.",
    tags: ['accessories', 'cap', 'season-1', 'pinene-pete'],
    variants: [],
  },
  {
    id: 'tt-005',
    name: 'Caryophyllene Carl Zip Hoodie',
    slug: 'caryophyllene-carl-zip-hoodie',
    price: 105,
    images: ['/images/products/carl-zip-1.jpg'],
    category: 'apparel',
    badge: 'coming-soon',
    characterId: 'caryophyllene-carl',
    shortDescription: 'Carl is coming. Season 2 drop. Lock your size now.',
    description:
      "Carl's been in development since Season 2. The zip hoodie that brings the spice. Full-length zipper, Carl embroidery on the back yoke, tonal rib detail. Joining the waitlist locks your size before it goes live.",
    tags: ['apparel', 'hoodie', 'season-2', 'caryophyllene-carl', 'coming-soon'],
    variants: [
      {
        id: 'size',
        name: 'Size',
        options: [
          { id: 's', value: 'S', inStock: false },
          { id: 'm', value: 'M', inStock: false },
          { id: 'l', value: 'L', inStock: false },
          { id: 'xl', value: 'XL', inStock: false },
          { id: 'xxl', value: 'XXL', inStock: false },
        ],
      },
    ],
  },
  {
    id: 'tt-006',
    name: 'Linalool Luna Crewneck',
    slug: 'linalool-luna-crewneck',
    price: 78,
    images: ['/images/products/luna-crew-1.jpg', '/images/products/luna-crew-2.jpg'],
    category: 'apparel',
    badge: 'available',
    characterId: 'linalool-luna',
    shortDescription: 'Luna crewneck. Lavender colorway. Relaxed fit.',
    description:
      "Luna moves slow. 360gsm fleece crewneck in washed lavender. Luna artwork embroidered on the chest, tonal Terp Totz mark on the sleeve. Relaxed oversized fit. The piece you wear when you need to decompress.",
    tags: ['apparel', 'crewneck', 'season-1', 'linalool-luna'],
    variants: [
      {
        id: 'size',
        name: 'Size',
        options: [
          { id: 's', value: 'S', inStock: true },
          { id: 'm', value: 'M', inStock: true },
          { id: 'l', value: 'L', inStock: true },
          { id: 'xl', value: 'XL', inStock: false },
        ],
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByCharacter(characterId: string): Product[] {
  return products.filter((p) => p.characterId === characterId)
}
