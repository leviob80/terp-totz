'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    label: '01',
    heading: 'It Started with a Nug',
    body: 'A conversation about terpenes turned into a sketch. That sketch turned into Larry — Limonene Larry — with his citrus crown and slick attitude. From there, the universe wrote itself.',
  },
  {
    label: '02',
    heading: 'Science Meets Street',
    body: 'Every Terp Tot is rooted in real chemistry. The characters are the terpenes: their moods, their effects, their vibes. We made the science wearable.',
  },
  {
    label: '03',
    heading: 'Season 1 Drops',
    body: 'Five characters. Five terpenes. Limited runs, collector culture, and a community that actually knows what myrcene does. Season 1 is live — and it will not restock.',
  },
  {
    label: '04',
    heading: 'The Universe Grows',
    body: 'Season 2 is loading. New terpenes, new characters, new drops. Every season adds to the canon. Collect them all before they\'re gone.',
  },
]

export function BrandStory() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left — sticky label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Origin
            </p>
            <h2
              className="uppercase leading-none text-foreground mb-6"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                letterSpacing: '0.02em',
              }}
            >
              How a nug<br />got a face.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Terp Totz isn't just merch. It's a universe built from the ground up —
              one terpene, one character, one drop at a time.
            </p>
          </motion.div>

          {/* Right — milestone list */}
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex gap-6 py-8 border-b border-border/50 last:border-b-0"
              >
                <span
                  className="shrink-0 text-muted-foreground/20 leading-none mt-0.5"
                  style={{
                    fontFamily: 'var(--font-bebas), Impact, sans-serif',
                    fontSize: '2rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {m.label}
                </span>
                <div>
                  <h3
                    className="uppercase leading-none text-foreground mb-3"
                    style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif',
                      fontSize: '1.4rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {m.heading}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
