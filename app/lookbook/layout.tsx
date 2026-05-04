import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lookbook — Terp Totz',
  description: 'The Terp Totz visual archive. Photography, editorial, and campaign shots from Season 1.',
}

export default function LookbookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
