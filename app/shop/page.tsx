import Link from 'next/link'
import type { Metadata } from 'next'
import { products } from '@/lib/data/products'
import { collections } from '@/lib/data/collections'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductBadgeComponent } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Shop — Terp Totz',
  description: 'All Terp Totz merch — apparel, accessories, and collectibles. Season 1 live now.',
}

const categories = [
  { slug: 'apparel', label: 'Apparel' },
  { slug: 'accessories', label: 'Accessories' },
]

export default function ShopPage() {
  const apparel = products.filter((p) => p.category === 'apparel')
  const accessories = products.filter((p) => p.category === 'accessories')

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-2">
                Terp Totz
              </p>
              <h1
                className="uppercase leading-none text-foreground"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(3rem, 7vw, 5rem)',
                  letterSpacing: '0.02em',
                }}
              >
                Shop
              </h1>
            </div>

            {/* Category nav */}
            <nav className="flex items-center gap-1 pb-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className="px-4 py-2 text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground border border-border/50 hover:border-accent/40 hover:text-foreground transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Active collections strip */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 border-b border-border/50 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 overflow-x-auto pb-1">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/50 shrink-0">
              Collections
            </span>
            {collections.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="flex items-center gap-2 shrink-0 group"
              >
                {col.badge && (
                  <span className="scale-90">
                    <ProductBadgeComponent badge={col.badge} />
                  </span>
                )}
                <span className="text-[10px] font-mono tracking-[0.1em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                  {col.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Apparel */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <span
              className="uppercase text-foreground"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: '1.4rem',
                letterSpacing: '0.05em',
              }}
            >
              Apparel
            </span>
            <div className="flex-1 h-px bg-border" />
            <Link
              href="/shop/apparel"
              className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              See All →
            </Link>
          </div>
          <ProductGrid columns={3}>
            {apparel.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </div>
      </section>

      {/* Accessories */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <span
              className="uppercase text-foreground"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: '1.4rem',
                letterSpacing: '0.05em',
              }}
            >
              Accessories
            </span>
            <div className="flex-1 h-px bg-border" />
            <Link
              href="/shop/accessories"
              className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              See All →
            </Link>
          </div>
          <ProductGrid columns={4}>
            {accessories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </div>
      </section>

    </main>
  )
}
