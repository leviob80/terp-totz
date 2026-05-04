'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { CartItem } from '@/components/cart/CartItem'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, getTotal, getItemCount, clearCart } = useCartStore()
  const total = getTotal()
  const count = getItemCount()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/80"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-[70] bg-background border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2
                className="text-2xl text-foreground uppercase tracking-[0.05em]"
                style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}
              >
                Cart {count > 0 && <span className="text-muted-foreground">({count})</span>}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-16">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/15" />
                  <p
                    className="text-2xl text-muted-foreground uppercase"
                    style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}
                  >
                    Nothing here yet.
                  </p>
                  <Button variant="outline" size="sm" onClick={closeCart} asChild>
                    <Link href="/shop">Shop Now</Link>
                  </Button>
                </div>
              ) : (
                <div>
                  {items.map((item) => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    Subtotal
                  </span>
                  <span
                    className="text-2xl text-foreground uppercase"
                    style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono">
                  Shipping calculated at checkout.
                </p>
                <Separator />
                <Button variant="accent" size="xl" className="w-full" asChild>
                  <Link href="/checkout" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-[0.15em] uppercase font-mono"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
