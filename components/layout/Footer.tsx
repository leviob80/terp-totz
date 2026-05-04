import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { Separator } from '@/components/ui/separator'
import { Instagram } from 'lucide-react'

const shopLinks = [
  { label: 'All Merch', href: '/shop' },
  { label: 'Apparel', href: '/shop/apparel' },
  { label: 'Accessories', href: '/shop/accessories' },
]

const universeLinks = [
  { label: 'Characters', href: '/characters' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-5">
            <Logo size="sm" showWordmark />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Character-driven cannabis streetwear. Terpene universe. Limited drops.
              Collect them all.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/terptotz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* TikTok icon — lucide doesn't include it, use text link */}
              <a
                href="https://tiktok.com/@terptotz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-accent transition-colors"
              >
                TikTok
              </a>
            </div>
            <div className="pt-2">
              <span
                className="text-muted-foreground/40 uppercase tracking-[0.2em]"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: '0.75rem',
                }}
              >
                Season 1 — Live Now
              </span>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/50 hover:text-foreground transition-colors uppercase tracking-[0.05em]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Universe links */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              The Universe
            </h4>
            <ul className="space-y-3">
              {universeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/50 hover:text-foreground transition-colors uppercase tracking-[0.05em]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground uppercase tracking-[0.1em]">
          © {new Date().getFullYear()} Terp Totz. All rights reserved.
        </p>
        <p className="text-[11px] text-muted-foreground">
          18+ only. Cannabis-inspired apparel. Know your local laws.
        </p>
      </div>
    </footer>
  )
}
