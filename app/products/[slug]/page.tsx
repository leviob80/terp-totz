import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { getProductBySlug, products, getProductsByCategory } from '@/lib/data/products'
import { getCharacterBySlug } from '@/lib/data/characters'
import { ProductBadgeComponent } from '@/components/ui/badge'
import { ProductImageGallery } from '@/components/product/ProductImageGallery'
import { AddToCartForm } from '@/components/product/AddToCartForm'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — Terp Totz`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const character = product.characterId ? getCharacterBySlug(product.characterId) : undefined
  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background">

      {/* Breadcrumb */}
      <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50">
          <Link href="/shop" className="hover:text-muted-foreground transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop/${product.category}`} className="hover:text-muted-foreground transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-muted-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product detail */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — gallery */}
            <div className="lg:sticky lg:top-24">
              <ProductImageGallery
                images={product.images}
                alt={product.name}
                badge={product.badge}
              />
            </div>

            {/* Right — info + form */}
            <div className="space-y-7">
              {/* Badge */}
              {product.badge && <ProductBadgeComponent badge={product.badge} />}

              {/* Character tag */}
              {character && (
                <Link
                  href={`/characters#${character.slug}`}
                  className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: character.accentColor }}
                  />
                  <span className="text-muted-foreground">{character.name}</span>
                </Link>
              )}

              {/* Name */}
              <h1
                className="uppercase leading-none text-foreground"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  letterSpacing: '0.02em',
                }}
              >
                {product.name}
              </h1>

              {/* Short description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Divider */}
              <div className="h-px bg-border/50" />

              {/* Add to cart form */}
              <AddToCartForm product={product} />

              {/* Divider */}
              <div className="h-px bg-border/50" />

              {/* Full description */}
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Details
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono tracking-[0.1em] uppercase text-muted-foreground/40 border border-border/30 px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
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
                More {product.category}
              </span>
              <div className="flex-1 h-px bg-border" />
              <Link
                href={`/shop/${product.category}`}
                className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                View All →
              </Link>
            </div>
            <ProductGrid columns={4}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductGrid>
          </div>
        </section>
      )}

    </main>
  )
}
