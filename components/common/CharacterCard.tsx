'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Character } from '@/types'

interface CharacterCardProps {
  character: Character
  variant?: 'compact' | 'full'
  className?: string
}

export function CharacterCard({ character, variant = 'compact', className }: CharacterCardProps) {
  const isAvailable = character.available

  return (
    <motion.div
      whileHover={isAvailable ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.15 }}
      className={cn('group relative', className)}
    >
      <Link
        href={isAvailable ? `/characters#${character.slug}` : '/characters'}
        className="block"
      >
        {/* Card */}
        <div
          className={cn(
            'relative overflow-hidden border transition-colors duration-200',
            isAvailable
              ? 'border-border group-hover:border-[var(--char-color)]/50'
              : 'border-border/40 opacity-50'
          )}
          style={{ '--char-color': character.accentColor } as React.CSSProperties}
        >
          {/* Image / placeholder area */}
          <div
            className={cn(
              'relative flex items-center justify-center bg-secondary',
              variant === 'compact' ? 'aspect-square' : 'aspect-[3/4]'
            )}
            style={{
              background: `linear-gradient(135deg, ${character.accentColor}18 0%, transparent 60%)`,
            }}
          >
            {character.image && !character.image.includes('placeholder') ? (
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            ) : (
              /* Styled placeholder */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6">
                {/* Art placeholder frame */}
                <div
                  className="w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center"
                  style={{ borderColor: `${character.accentColor}40` }}
                >
                  <span
                    className="uppercase tracking-widest text-[10px]"
                    style={{ color: `${character.accentColor}70` }}
                  >
                    Art
                  </span>
                </div>
              </div>
            )}

            {/* Initial / large background letter */}
            <span
              className="absolute text-[120px] font-display opacity-[0.04] leading-none select-none pointer-events-none"
              style={{
                color: character.accentColor,
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
              }}
              aria-hidden
            >
              {character.name.charAt(0)}
            </span>

            {/* Season badge */}
            <div className="absolute top-3 right-3">
              <span
                className="text-[9px] font-mono tracking-[0.2em] uppercase border px-1.5 py-0.5"
                style={{
                  color: `${character.accentColor}90`,
                  borderColor: `${character.accentColor}30`,
                }}
              >
                S{character.season}
              </span>
            </div>

            {/* Sold-out / coming overlay */}
            {!isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                <span
                  className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground border border-border px-3 py-1"
                >
                  Coming S{character.season}
                </span>
              </div>
            )}
          </div>

          {/* Info bar */}
          <div className="p-4 border-t border-border bg-card space-y-0.5">
            <p
              className="text-[9px] font-mono tracking-[0.2em] uppercase"
              style={{ color: `${character.accentColor}80` }}
            >
              {character.terpene}
            </p>
            <h3
              className="uppercase leading-tight text-foreground"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: variant === 'compact' ? '1.25rem' : '1.6rem',
                letterSpacing: '0.04em',
              }}
            >
              {character.name}
            </h3>
            {variant === 'full' && (
              <p className="text-[11px] text-muted-foreground leading-relaxed pt-1 line-clamp-2">
                {character.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
