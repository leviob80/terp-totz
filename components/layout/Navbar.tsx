'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { useCartStore } from '@/lib/store/cart'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Characters', href: '/characters' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { getItemCount, openCart } = useCartStore()
  const itemCount = getItemCount()

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo + wordmark */}
          <Logo size="sm" showWordmark />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors duration-150 uppercase tracking-[0.18em]',
                  'font-sans text-[11px]',
                  pathname.startsWith(link.href)
                    ? 'text-accent'
                    : 'text-foreground/50 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              aria-label={`Cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
              className="relative p-2 text-foreground/50 hover:text-foreground transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[9px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-foreground/50 hover:text-foreground transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'py-4 uppercase tracking-[0.18em] text-[11px] font-sans border-b border-border/30 transition-colors',
                    pathname.startsWith(link.href) ? 'text-accent' : 'text-foreground/50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                className="py-4 uppercase tracking-[0.18em] text-[11px] font-sans text-foreground/50"
              >
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
