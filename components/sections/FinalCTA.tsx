'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-card border-t border-border relative overflow-hidden">

      {/* Background ambience */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--accent)) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Coming Soon
          </p>
          <h2
            className="uppercase leading-none text-foreground mb-6"
            style={{
              fontFamily: 'var(--font-bebas), Impact, sans-serif',
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              letterSpacing: '0.02em',
            }}
          >
            Season 2{' '}
            <span className="text-primary">is</span>
            <br />
            loading.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
            New terpenes. New characters. New drops. The universe is expanding — and
            it still won&apos;t restock.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="default" size="xl" asChild>
            <Link href="/characters">
              Explore the Universe <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link href="/shop">Shop Season 1</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/50">
            Jul 2026 — Caryophyllene Carl leads the charge
          </span>
        </motion.div>

      </div>
    </section>
  )
}
