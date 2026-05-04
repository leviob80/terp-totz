'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CharacterCard } from '@/components/common/CharacterCard'
import { Button } from '@/components/ui/button'
import { characters } from '@/lib/data/characters'

const season1 = characters.filter((c) => c.season === 1)
const season2 = characters.filter((c) => c.season === 2)

export function CharacterUniverse() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
            The Terpene Universe
          </p>
          <h2
            className="uppercase leading-none text-foreground mb-5"
            style={{
              fontFamily: 'var(--font-bebas), Impact, sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              letterSpacing: '0.02em',
            }}
          >
            5 terpenes.
            <br />
            5 characters.
            <br />
            <span className="text-accent">1 universe.</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            Every character in the Terp Totz universe is built around a real cannabis terpene —
            its chemical properties, its effects, its personality. Science meets streetwear.
            Each season introduces new characters. Each character gets their own drop.
          </p>
        </motion.div>

        {/* Season 1 */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <span
              className="text-foreground uppercase"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: '1.5rem',
                letterSpacing: '0.05em',
              }}
            >
              Season 1 — The Original Crew
            </span>
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-accent">
              Live Now
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {season1.map((character, i) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <CharacterCard character={character} variant="compact" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Season 2 — loading */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <span
              className="text-muted-foreground uppercase"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: '1.5rem',
                letterSpacing: '0.05em',
              }}
            >
              Season 2 — Loading
            </span>
            <div className="flex-1 h-px bg-border/40" />
            <span className="flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] uppercase text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Jul 2026
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {season2.map((character, i) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <CharacterCard character={character} variant="compact" />
              </motion.div>
            ))}
            {/* Placeholder mystery slots */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`mystery-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="aspect-square border border-dashed border-border/30 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-[28px] leading-none text-muted-foreground/15"
                  style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}>
                  ?
                </span>
                <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground/30">
                  Tbd
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <Button variant="default" size="lg" asChild>
            <Link href="/characters">Explore the Full Universe</Link>
          </Button>
          <Link
            href="/shop"
            className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop by character →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
