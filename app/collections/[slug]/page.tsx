import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { getCollectionBySlug, collections } from '@/lib/data/collections'
import { products } from '@/lib/data/products'
import { ProductBadgeComponent } from '@/components/ui/badge'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)
  if (!collection) return {}
  return {
    title: `${collection.name} — Terp Totz`,
    description: collection.shortDescription,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)
  if (!collection) notFound()

  const collectionProducts = products.filter((p) => collection.productIds.includes(p.id))

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-24 pb-14 px-4 sm:px-6 lg:px-8 border-b border-border relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[400px] opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                {collection.badge && <ProductBadgeComponent badge={collection.badge} />}
                {collection.season && (
                  <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
                    Season {collection.season}
                  </span>
                )}
              </div>

              <h1
                className="uppercase leading-none text-foreground"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  letterSpacing: '0.02em',
                }}
              >
                {collection.name}
              </h1>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                {collection.description}
              </p>

              {collection.dropDate && !collection.isActive && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-primary">
                    Dropping{' '}
                    {new Date(collection.dropDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}

              {collection.isActive && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-accent">
                    Drop Active
                  </span>
                </div>
              )}
            </div>

            <div className="shrink-0">
              <Link
                href="/shop"
                className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← All Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {collectionProducts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
                  {collectionProducts.length} {collectionProducts.length === 1 ? 'piece' : 'pieces'}
                </span>
              </div>
              <ProductGrid columns={3}>
                {collectionProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
            </>
          ) : (
            <div className="text-center py-20 border border-dashed border-border/30">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/50 mb-2">
                Nothing here yet
              </p>
              <p className="text-sm text-muted-foreground">Products will appear when the drop goes live.</p>
            </div>
          )}
        </div>
      </section>

      {/* Coming soon CTA */}
      {!collection.isActive && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-2">
                Drop incoming
              </p>
              <p
                className="uppercase text-foreground leading-none"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: '1.8rem',
                  letterSpacing: '0.04em',
                }}
              >
                Get on the drop list.
              </p>
            </div>
            <Button variant="accent" size="lg" asChild>
              <Link href="/#drop-list">
                Notify Me <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

    </main>
  )
}
