'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  images: string[]
  alt: string
  badge?: string
}

export function ProductImageGallery({ images, alt, badge }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square bg-secondary/30 border border-border/50 overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {images[active] ? (
          <Image
            src={images[active]}
            alt={`${alt} — image ${active + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <ShoppingBag className="w-10 h-10 text-muted-foreground/20" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/30">
              Photo Coming
            </span>
          </div>
        )}

        {/* Badge */}
        {badge && badge !== 'available' && (
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                'text-[9px] font-mono tracking-[0.15em] uppercase px-2 py-1',
                badge === 'limited' && 'bg-accent/20 text-accent border border-accent/30',
                badge === 'sold-out' && 'bg-muted/40 text-muted-foreground border border-border',
                badge === 'coming-soon' && 'bg-primary/20 text-primary border border-primary/30'
              )}
            >
              {badge === 'limited' && 'Limited'}
              {badge === 'sold-out' && 'Sold Out'}
              {badge === 'coming-soon' && 'Coming Soon'}
            </span>
          </div>
        )}

        {/* Image index */}
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 text-[9px] font-mono text-muted-foreground/30">
            {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'relative w-16 h-16 border shrink-0 overflow-hidden transition-colors',
                i === active ? 'border-accent' : 'border-border/50 hover:border-border'
              )}
              aria-label={`View image ${i + 1}`}
            >
              {src ? (
                <Image
                  src={src}
                  alt={`${alt} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-muted-foreground/20" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
