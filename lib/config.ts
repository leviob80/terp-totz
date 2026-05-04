import type { SiteConfig, NavItem } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Terp Totz',
  description:
    'Character-driven cannabis streetwear. Terpene universe. Limited drops. Collect them all.',
  url: 'https://terptotz.com',
  ogImage: 'https://terptotz.com/og.jpg',
  links: {
    instagram: 'https://instagram.com/terptotz',
    tiktok: 'https://tiktok.com/@terptotz',
  },
}

export const navItems: NavItem[] = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'All Merch', href: '/shop' },
      { label: 'Apparel', href: '/shop/apparel' },
      { label: 'Accessories', href: '/shop/accessories' },
    ],
  },
  { label: 'Characters', href: '/characters' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
]
