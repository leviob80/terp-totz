'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, X, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { QuantitySelector } from '@/components/product/QuantitySelector'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATE, getShippingCost } from '@/lib/stripe'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const subtotal = getTotal()
  const shippingCost = getShippingCost(subtotal)
  const total = subtotal + shippingCost
  const freeShippingRemaining = FREE_SHIPPING_THRESHOLD - subtotal

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/15" />
        <div className="text-center space-y-2">
          <p
            className="uppercase text-foreground"
            style={{
              fontFamily: 'var(--font-bebas), Impact, sans-serif',
              fontSize: '2.5rem',
              letterSpacing: '0.04em',
            }}
          >
            Your cart is empty.
          </p>
          <p className="text-sm text-muted-foreground">
            Season 1 is still live — grab something before it's gone.
          </p>
        </div>
        <Button variant="accent" size="lg" asChild>
          <Link href="/shop">Shop Now <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {items.reduce((sum, i) => sum + i.quantity, 0)} items
            </p>
            <h1
              className="uppercase leading-none text-foreground"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                letterSpacing: '0.02em',
              }}
            >
              Your Cart
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors pb-1"
          >
            ← Continue Shopping
          </Link>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* Items */}
          <div className="space-y-0 divide-y divide-border/50">
            {items.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex gap-5 py-6"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative w-24 h-24 shrink-0 bg-secondary/30 border border-border/50 overflow-hidden"
                >
                  {item.product.images[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-muted-foreground/20" />
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-foreground hover:text-accent transition-colors leading-tight uppercase tracking-[0.04em]"
                      style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.15rem' }}
                    >
                      {item.product.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label="Remove item"
                      className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {Object.keys(item.selectedVariants).length > 0 && (
                    <p className="text-[10px] font-mono tracking-[0.12em] uppercase text-muted-foreground">
                      {Object.values(item.selectedVariants).join(' / ')}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-1">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.key, qty)}
                    />
                    <span
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.2rem' }}
                    >
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 border border-border/50 bg-card p-6 space-y-5">
            <p
              className="uppercase text-foreground"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em' }}
            >
              Order Summary
            </p>

            {/* Free shipping progress */}
            {freeShippingRemaining > 0 && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono tracking-[0.1em] uppercase">
                  <span className="text-muted-foreground">Free shipping in</span>
                  <span className="text-accent">{formatPrice(freeShippingRemaining)} more</span>
                </div>
                <div className="h-1 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
            {freeShippingRemaining <= 0 && (
              <p className="text-[10px] font-mono tracking-[0.1em] uppercase text-accent">
                Free shipping unlocked
              </p>
            )}

            <div className="h-px bg-border/50" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-[10px] font-mono tracking-[0.1em] uppercase">Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-[10px] font-mono tracking-[0.1em] uppercase">Shipping</span>
                <span className="font-mono">
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-mono tracking-[0.1em] uppercase text-muted-foreground">Estimated Total</span>
                <span
                  className="text-foreground"
                  style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.4rem' }}
                >
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <Button variant="accent" size="lg" className="w-full gap-2" asChild>
              <Link href="/checkout">
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <p className="text-[9px] font-mono text-muted-foreground/40 text-center tracking-[0.1em] uppercase">
              Taxes calculated at checkout · Secure checkout via Stripe
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
