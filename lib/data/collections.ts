import type { Collection } from '@/types'

export const collections: Collection[] = [
  {
    id: 'col-001',
    name: 'Season 1 Drop',
    slug: 'season-1',
    shortDescription: 'Where it all started. The original 8-character lineup.',
    description:
      'Season 1 introduced the world to the Terp Totz universe. Eight characters. Eight terpenes. Eight reasons to cop. Most of it is gone — but a few pieces remain. Season 2 is loading.',
    coverImage: '/images/collections/season-1.jpg',
    badge: 'limited',
    productIds: ['tt-001', 'tt-002', 'tt-003', 'tt-004', 'tt-006'],
    season: 1,
    isActive: true,
  },
  {
    id: 'col-002',
    name: 'Season 2 — Coming Soon',
    slug: 'season-2',
    shortDescription: 'New characters. New drops. Season 2 is loading.',
    description:
      'Caryophyllene Carl leads the Season 2 lineup. New characters, new silhouettes, new terpene lore. Drop date to be announced — join the waitlist to get first access.',
    coverImage: '/images/collections/season-2.jpg',
    badge: 'coming-soon',
    productIds: ['tt-005'],
    season: 2,
    dropDate: '2026-07-04',
    isActive: false,
  },
]

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getActiveCollections(): Collection[] {
  return collections.filter((c) => c.isActive)
}
