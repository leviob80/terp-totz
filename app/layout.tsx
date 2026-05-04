import type { Metadata } from 'next'
import { Inter, Bebas_Neue, Space_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Terp Totz | Cannabis Streetwear & Character Drops',
    template: '%s | Terp Totz',
  },
  description:
    'Character-driven cannabis streetwear. Terpene universe. Limited drops. Collect them all.',
  keywords: [
    'cannabis streetwear',
    'terp totz',
    'cannabis merch',
    'limited drops',
    'streetwear',
    'terpene characters',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Terp Totz',
    description: 'Character-driven cannabis streetwear. Limited drops. Collect them all.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terp Totz | Cannabis Streetwear & Character Drops',
    description: 'Character-driven cannabis streetwear. Limited drops. Collect them all.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${spaceMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <CartDrawer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
