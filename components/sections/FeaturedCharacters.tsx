'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CharacterCard } from '@/components/common/CharacterCard'
import { getAvailableCharacters } from '@/lib/data/characters'

const season1Crew = getAvailableCharacters()

export function FeaturedCharacters() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Season 1
            </p>
            <h2
              className="uppercase leading-none text-foreground"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '0.02em',
              }}
            >
              Meet the Crew.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <Link
              href="/characters"
              className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.15em] uppercase text-accent hover:text-accent/70 transition-colors"
            >
              Full Universe <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Character grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {season1Crew.map((character, i) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <CharacterCard character={character} variant="compact" />
            </motion.div>
          ))}
        </div>

        {/* Season 2 teaser strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-10 flex items-center justify-between border border-border/50 bg-background/50 px-6 py-4"
        >
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
              Season 2 — Caryophyllene Carl &amp; more — Loading
            </span>
          </div>
          <Link
            href="/characters"
            className="text-[10px] font-mono tracking-[0.15em] uppercase text-primary hover:text-primary/70 transition-colors"
          >
            Preview →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
