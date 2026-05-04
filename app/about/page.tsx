'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const chapters = [
  {
    num: '01',
    title: 'It started with a nug.',
    body: `A late-night conversation about terpenes and a blank piece of paper. Someone said "what if the terpene was a character?" — and the first sketch of Limonene Larry appeared. Citrus crown. Slick attitude. Undeniable vibe. The universe started there.`,
  },
  {
    num: '02',
    title: 'Chemistry as identity.',
    body: `Every Terp Tot is grounded in real cannabinoid science. Limonene lifts. Myrcene relaxes. Pinene sharpens. Linalool calms. We didn't invent these personalities — we just gave them faces, and gave those faces clothes.`,
  },
  {
    num: '03',
    title: 'Streetwear that means something.',
    body: `Most graphic tees are blank statements. Terp Totz gear carries actual information. When you're wearing Myrcene Mike, you're wearing a terpene known for its couch-lock energy and earthy depth. The people who know, know. The people who don't, ask.`,
  },
  {
    num: '04',
    title: 'Collector culture from drop one.',
    body: `We built this like a trading card set — limited runs, no restocks, seasonal characters. Season 1 is five characters. When they're gone, they're gone. Season 2 brings new terpenes, new aesthetics, new drops. Collect them all or regret it.`,
  },
  {
    num: '05',
    title: 'Season 2 is loading.',
    body: `Caryophyllene Carl leads the charge. Spicy, complex, and loaded with personality. He'll hit different from the rest — because his terpene hits different. More characters, more lore, more drops. The universe keeps expanding.`,
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-border relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[600px] h-[400px] opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
                The Story
              </p>
              <h1
                className="uppercase leading-none text-foreground"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  letterSpacing: '0.02em',
                }}
              >
                How a nug<br />got a face.
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              Terp Totz didn't start as a brand. It started as a question — what if the
              compounds in cannabis had personalities? What if terpenes had drip? What if science
              was something you could wear?
              <br /><br />
              The answer became Season 1. Five terpenes. Five characters. A universe that keeps growing.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="divide-y divide-border/50">
            {chapters.map((ch, i) => (
              <motion.div
                key={ch.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="py-10 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 items-start"
              >
                <span
                  className="text-muted-foreground/20 leading-none"
                  style={{
                    fontFamily: 'var(--font-bebas), Impact, sans-serif',
                    fontSize: '3rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {ch.num}
                </span>
                <div>
                  <h2
                    className="uppercase leading-none text-foreground mb-4"
                    style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif',
                      fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {ch.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {ch.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p
              className="uppercase leading-tight text-foreground mb-4"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                letterSpacing: '0.02em',
              }}
            >
              "Science meets streetwear.<br />
              <span className="text-accent">Terpenes meet culture.</span>"
            </p>
            <cite className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground not-italic">
              — Terp Totz
            </cite>
          </motion.blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            href="/characters"
            className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground text-[11px] font-mono tracking-[0.2em] uppercase hover:bg-accent/80 transition-colors"
          >
            Meet the Characters
          </Link>
          <Link
            href="/shop"
            className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop Season 1 →
          </Link>
        </div>
      </section>

    </main>
  )
}
