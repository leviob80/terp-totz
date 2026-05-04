import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductsByCategory, products } from '@/lib/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'

const VALID_CATEGORIES = ['apparel', 'accessories'] as const
type Category = (typeof VALID_CATEGORIES)[number]

const categoryLabels: Record<Category, string> = {
  apparel: 'Apparel',
  accessories: 'Accessories',
}

interface Props {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category as Category)) return {}
  const label = categoryLabels[category as Category]
  return {
    title: `${label} — Terp Totz`,
    description: `Shop all Terp Totz ${label.toLowerCase()} — Season 1 drops.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category as Category)) notFound()

  const label = categoryLabels[category as Category]
  const categoryProducts = getProductsByCategory(category)

  const otherCategories = VALID_CATEGORIES.filter((c) => c !== category)

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link
                  href="/shop"
                  className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  Shop
                </Link>
                <span className="text-muted-foreground/30 text-[10px]">/</span>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                  {label}
                </span>
              </div>
              <h1
                className="uppercase leading-none text-foreground"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(3rem, 7vw, 5rem)',
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </h1>
            </div>

            <nav className="flex items-center gap-1 pb-1">
              <Link
                href="/shop"
                className="px-4 py-2 text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground border border-border/50 hover:border-border hover:text-foreground transition-colors"
              >
                All
              </Link>
              {VALID_CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/shop/${cat}`}
                  className={`px-4 py-2 text-[10px] font-mono tracking-[0.15em] uppercase border transition-colors ${
                    cat === category
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-border/50 text-muted-foreground hover:border-accent/40 hover:text-foreground'
                  }`}
                >
                  {categoryLabels[cat]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {categoryProducts.length > 0 ? (
            <>
              <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50 mb-8">
                {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
              </p>
              <ProductGrid columns={3}>
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
            </>
          ) : (
            <div className="text-center py-20 border border-dashed border-border/30">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/50">
                No products in this category yet
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      {otherCategories.length > 0 && (
        <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/50 shrink-0">
              Also shop
            </span>
            {otherCategories.map((cat) => (
              <Link
                key={cat}
                href={`/shop/${cat}`}
                className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {categoryLabels[cat]} →
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}
