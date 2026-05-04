import type { Character } from '@/types'

export const characters: Character[] = [
  {
    id: 'limonene-larry',
    name: 'Limonene Larry',
    slug: 'limonene-larry',
    terpene: 'Limonene',
    description:
      "Bringing citrus energy wherever he goes. Larry's the one you call when you need to get lifted. Associated with sativas, sunshine, and good vibes. Don't catch him on a cloudy day.",
    image: '/images/characters/limonene-larry.png',
    accentColor: '#FFD700',
    season: 1,
    available: true,
  },
  {
    id: 'myrcene-mike',
    name: 'Myrcene Mike',
    slug: 'myrcene-mike',
    terpene: 'Myrcene',
    description:
      'The most abundant terpene in the game, and Mike owns it. Earthy, mango-forward, built for body vibes. The OG of the crew. Chill, dependable, and always there when you need him.',
    image: '/images/characters/myrcene-mike.png',
    accentColor: '#228B22',
    season: 1,
    available: true,
  },
  {
    id: 'pinene-pete',
    name: 'Pinene Pete',
    slug: 'pinene-pete',
    terpene: 'Alpha-Pinene',
    description:
      "Fresh pine air, focus, and clarity. Pete's the one taking mental notes while the rest of the crew vibes out. The sharpest mind in the terpene universe. Forest green, always.",
    image: '/images/characters/pinene-pete.png',
    accentColor: '#2E5E4E',
    season: 1,
    available: true,
  },
  {
    id: 'linalool-luna',
    name: 'Linalool Luna',
    slug: 'linalool-luna',
    terpene: 'Linalool',
    description:
      'Lavender energy. Luna moves slow and feels everything. The peacemaker of the crew, the reason everyone sleeps. She shows up soft and leaves you relaxed.',
    image: '/images/characters/linalool-luna.png',
    accentColor: '#9B59B6',
    season: 1,
    available: true,
  },
  {
    id: 'caryophyllene-carl',
    name: 'Caryophyllene Carl',
    slug: 'caryophyllene-carl',
    terpene: 'Beta-Caryophyllene',
    description:
      "Spicy, peppery, and the only terpene that binds directly to CB2 receptors. Carl's different and he knows it. Season 2. Coming for everyone.",
    image: '/images/characters/caryophyllene-carl.png',
    accentColor: '#8B4513',
    season: 2,
    available: false,
  },
]

export function getCharacterBySlug(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug)
}

export function getAvailableCharacters(): Character[] {
  return characters.filter((c) => c.available)
}
