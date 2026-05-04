import { Hero } from '@/components/sections/Hero'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import { FeaturedDrop } from '@/components/sections/FeaturedDrop'
import { FeaturedCharacters } from '@/components/sections/FeaturedCharacters'
import { CharacterUniverse } from '@/components/sections/CharacterUniverse'
import { LookbookTeaser } from '@/components/sections/LookbookTeaser'
import { BrandStory } from '@/components/sections/BrandStory'
import { DropSignup } from '@/components/sections/DropSignup'
import { FinalCTA } from '@/components/sections/FinalCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terp Totz — Terpene Characters. Limited Drops.',
  description:
    'Cannabis-inspired streetwear built around real terpene science. 5 characters, seasonal drops, collector culture. Season 1 live now.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <FeaturedDrop />
      <FeaturedCharacters />
      <CharacterUniverse />
      <LookbookTeaser />
      <BrandStory />
      <DropSignup />
      <FinalCTA />
    </>
  )
}
