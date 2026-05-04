'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductBadgeComponent } from '@/components/ui/badge'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getFeaturedProducts } from '@/lib/data/products'
import { collections } from '@/lib/data/collections'

const drop = collections.find((c) => c.slug === 'season-1')!
const featuredProducts = getFeaturedProducts().slice(0, 2)

export function FeaturedDrop() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left — drop info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 space-y-6"
          >
            <div>
              {drop.badge && <ProductBadgeComponent badge={drop.badge} />}
            </div>

            <div className="space-y-1">
              <p
                className="text-muted-foreground/50 uppercase tracking-[0.2em] leading-none"
                style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1rem' }}
              >
                Current Drop
              </p>
              <h2
                className="uppercase leading-none text-foreground"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  letterSpacing: '0.02em',
                }}
              >
                {drop.name}
              </h2>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {drop.description}
            </p>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-accent">
                Drop Active — Limited Units
              </span>
            </div>

            <Button variant="accent" size="lg" asChild>
              <Link href={`/collections/${drop.slug}`}>
                Shop the Drop <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Link
              href="/shop"
              className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View All Merch →
            </Link>
          </motion.div>

          {/* Right — products */}
          <div>
            <ProductGrid columns={2}>
              {featuredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </ProductGrid>
          </div>

        </div>
      </div>
    </section>
  )
}
