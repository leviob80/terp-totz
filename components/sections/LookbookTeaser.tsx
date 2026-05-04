'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const tiles = [
  { id: 1, col: 'col-span-2 row-span-2', label: 'Campaign 01', note: 'Season 1' },
  { id: 2, col: 'col-span-1 row-span-1', label: 'Detail', note: 'Limonene Larry' },
  { id: 3, col: 'col-span-1 row-span-1', label: 'Lifestyle', note: 'On location' },
  { id: 4, col: 'col-span-1 row-span-2', label: 'Editorial', note: 'Character Study' },
  { id: 5, col: 'col-span-1 row-span-1', label: 'Flat Lay', note: 'Season 1 Lineup' },
  { id: 6, col: 'col-span-1 row-span-1', label: 'Crop Shot', note: 'Apparel' },
  { id: 7, col: 'col-span-2 row-span-1', label: 'Group Shot', note: 'Full Crew' },
]

export function LookbookTeaser() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Visual Archive
            </p>
            <h2
              className="uppercase leading-none text-foreground"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '0.02em',
              }}
            >
              Lookbook
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50"
          >
            Photography dropping soon
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-4 grid-rows-4 gap-2 h-[480px] sm:h-[600px] lg:h-[680px]"
        >
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className={`${tile.col} relative border border-border/50 group hover:border-accent/30 transition-colors duration-300 flex items-center justify-center overflow-hidden bg-secondary/30`}
            >
              {/* Grid lines texture */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              {/* Center placeholder */}
              <div className="relative z-10 flex flex-col items-center gap-1 group-hover:opacity-60 transition-opacity">
                <Plus className="w-5 h-5 text-border" />
              </div>
              {/* Label overlay */}
              <div className="absolute bottom-0 inset-x-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">
                  {tile.label}
                </p>
                <p className="text-[9px] font-mono text-muted-foreground/30">{tile.note}</p>
              </div>
              {/* Corner number */}
              <span className="absolute top-2 right-2.5 text-[9px] font-mono text-muted-foreground/20">
                {String(tile.id).padStart(2, '0')}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-10"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/lookbook">View Full Lookbook</Link>
          </Button>
          <p className="text-xs text-muted-foreground/50 font-mono">
            Tag us{' '}
            <span className="text-muted-foreground">@terptotz</span>
            {' '}to be featured.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
