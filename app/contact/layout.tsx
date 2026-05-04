import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Terp Totz',
  description: 'Get in touch with the Terp Totz team. Wholesale inquiries, collabs, and general questions.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
