import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Story — Terp Totz',
  description:
    'How a nug got a face. Terp Totz started as a love letter to terpene culture — characters born from chemistry, streetwear born from passion.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
