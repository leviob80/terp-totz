'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const snap = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] },
})

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-background">
      {/* Background glow behind logo side */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 80% 50%, hsla(24,97%,46%,0.07) 0%, transparent 65%)',
        }}
      />
      {/* Purple ambient left */}
      <div
        className="absolute left-0 bottom-0 w-1/3 h-2/3 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 10% 90%, hsla(270,65%,33%,0.09) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Live badge */}
            <motion.div {...snap(0)}>
              <span className="inline-flex items-center gap-2.5 border border-accent/40 bg-accent/10 text-accent text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Season 1 — Live Now
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...snap(0.08)}
              className="uppercase leading-none text-foreground"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(4rem, 11vw, 8.5rem)',
                letterSpacing: '0.02em',
              }}
            >
              Every
              <br />
              Terpene
              <br />
              <span className="text-accent">Has&nbsp;a</span>
              <br />
              <span className="text-accent">Character.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p {...snap(0.16)} className="text-base text-muted-foreground max-w-sm leading-relaxed">
              Limited drops. Illustrated characters. Born from the terpene universe.{' '}
              <span className="text-foreground font-medium">Collect them all.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div {...snap(0.22)} className="flex flex-wrap gap-4">
              <Button variant="accent" size="xl" asChild>
                <Link href="/shop">
                  Shop Season 1 <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/characters">Meet the Crew</Link>
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...snap(0.3)}
              className="flex items-center gap-8 pt-2 border-t border-border"
            >
              {[
                { label: 'Characters', value: '5' },
                { label: 'Season', value: '01' },
                { label: 'Drops Left', value: '3' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    className="text-foreground leading-none"
                    style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif',
                      fontSize: '2rem',
                    }}
                  >
                    {value}
                  </p>
                  <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #E85D04 0%, transparent 70%)' }}
              />
              <Image
                src="/images/brand/logo.jpeg"
                alt="Terp Totz"
                width={420}
                height={420}
                priority
                className="relative rounded-full w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-border" />
    </section>
  )
}
