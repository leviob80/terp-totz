import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Characters — Terp Totz',
  description:
    'Meet the Terp Totz — a universe of terpene characters, each with their own story, energy, and merch. Season 1 live. Season 2 loading.',
}

export default function CharactersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
