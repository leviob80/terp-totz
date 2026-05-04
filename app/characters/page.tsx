'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CharacterCard } from '@/components/common/CharacterCard'
import { characters } from '@/lib/data/characters'

const season1 = characters.filter((c) => c.season === 1)
const season2 = characters.filter((c) => c.season === 2)

export default function CharactersPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-border relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
              The Terpene Universe
            </p>
            <h1
              className="uppercase leading-none text-foreground mb-6"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                letterSpacing: '0.02em',
              }}
            >
              Meet the crew.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              Every Terp Tot is built from a real cannabis terpene — its chemistry, its effects,
              its energy. Science meets streetwear, one character at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Season 1 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4"
          >
            <span
              className="text-foreground uppercase"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: '1.6rem',
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {season1.map((character, i) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
              >
                <CharacterCard character={character} variant="full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terpene science callout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border border-border bg-border">
            {[
              { label: 'Limonene', effect: 'Uplifting · Citrus · Energetic', color: '#F7C948' },
              { label: 'Myrcene', effect: 'Relaxing · Earthy · Mellow', color: '#4CAF82' },
              { label: 'Pinene', effect: 'Alert · Forest · Fresh', color: '#5CB3A1' },
              { label: 'Linalool', effect: 'Calming · Floral · Sleepy', color: '#A78BCA' },
              { label: 'Caryophyllene', effect: 'Spicy · Complex · Loading…', color: '#E07B54' },
            ].map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="bg-card px-6 py-5"
              >
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: t.color }} />
                <p
                  className="uppercase text-foreground leading-none mb-1"
                  style={{
                    fontFamily: 'var(--font-bebas), Impact, sans-serif',
                    fontSize: '1.2rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {t.label}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">{t.effect}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Season 2 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4"
          >
            <span
              className="text-muted-foreground uppercase"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: '1.6rem',
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {season2.map((character, i) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
              >
                <CharacterCard character={character} variant="full" />
              </motion.div>
            ))}
            {/* Mystery slots */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`mystery-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className="border border-dashed border-border/30 flex flex-col items-center justify-center gap-3 py-12"
              >
                <span
                  className="text-muted-foreground/15 leading-none"
                  style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '4rem' }}
                >
                  ?
                </span>
                <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground/30">
                  Tbd
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Season 1 — Live Now
            </p>
            <p
              className="uppercase text-foreground leading-none"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: '2rem',
                letterSpacing: '0.04em',
              }}
            >
              Shop before they're gone.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground text-[11px] font-mono tracking-[0.15em] uppercase hover:bg-accent/80 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/collections/season-1"
              className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View Collection →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
