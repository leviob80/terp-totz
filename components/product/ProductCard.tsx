'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { ProductBadgeComponent } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const hasVariants = product.variants.length > 0
  const isSoldOut = product.badge === 'sold-out'
  const isComingSoon = product.badge === 'coming-soon'
  const canQuickAdd = !hasVariants && !isSoldOut && !isComingSoon

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, 1)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary mb-0">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/15">
              <ShoppingBag className="w-12 h-12" />
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <ProductBadgeComponent badge={product.badge} />
            </div>
          )}

          {/* Character terpene tag — top right */}
          {product.character && (
            <div className="absolute top-3 right-3">
              <span
                className="text-[8px] font-mono tracking-[0.18em] uppercase border px-1.5 py-0.5 bg-background/80 backdrop-blur-sm"
                style={{
                  color: product.character.accentColor,
                  borderColor: `${product.character.accentColor}40`,
                }}
              >
                {product.character.terpene}
              </span>
            </div>
          )}

          {/* Quick add overlay */}
          {canQuickAdd && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
              <button
                onClick={handleQuickAdd}
                className="w-full bg-accent text-accent-foreground text-[10px] tracking-[0.25em] uppercase font-bold py-3.5 hover:bg-accent/85 transition-colors"
              >
                Quick Add
              </button>
            </div>
          )}
        </div>

        {/* Terpene color bar */}
        {product.character && (
          <div
            className="h-0.5 w-full transition-opacity duration-300 opacity-40 group-hover:opacity-100"
            style={{ backgroundColor: product.character.accentColor }}
          />
        )}

        {/* Info */}
        <div className="pt-3 pb-1 space-y-0.5">
          {product.character && (
            <p
              className="text-[9px] font-mono tracking-[0.2em] uppercase"
              style={{ color: `${product.character.accentColor}90` }}
            >
              {product.character.name}
            </p>
          )}
          <h3
            className="text-base text-foreground uppercase leading-tight"
            style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: '0.04em', fontSize: '1.05rem' }}
          >
            {product.name}
          </h3>
          <p className="text-[10px] text-muted-foreground/60 line-clamp-1 uppercase tracking-[0.05em]">
            {product.shortDescription}
          </p>
          <div className="flex items-center gap-2.5 pt-1.5">
            <span className="text-sm font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground/50 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {hasVariants && !isSoldOut && !isComingSoon && (
        <Button asChild variant="outline" size="sm" className="w-full mt-3 font-mono tracking-[0.1em] text-[10px] uppercase">
          <Link href={`/products/${product.slug}`}>Select Size</Link>
        </Button>
      )}
      {isSoldOut && (
        <p className="w-full mt-2 text-center text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground/40">
          Sold Out — No Restock
        </p>
      )}
      {isComingSoon && (
        <Button asChild variant="outline" size="sm" className="w-full mt-3 font-mono tracking-[0.1em] text-[10px] uppercase">
          <Link href={`/products/${product.slug}`}>Join Waitlist</Link>
        </Button>
      )}
    </motion.div>
  )
}
