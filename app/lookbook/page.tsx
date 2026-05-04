'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const tiles = [
  { id: 1, col: 'col-span-2 row-span-2', label: 'Campaign 01', note: 'Season 1' },
  { id: 2, col: 'col-span-1 row-span-1', label: 'Detail', note: 'Limonene Larry' },
  { id: 3, col: 'col-span-1 row-span-1', label: 'Lifestyle', note: 'On location' },
  { id: 4, col: 'col-span-1 row-span-2', label: 'Editorial', note: 'Character Study' },
  { id: 5, col: 'col-span-1 row-span-1', label: 'Flat Lay', note: 'Season 1 Lineup' },
  { id: 6, col: 'col-span-1 row-span-1', label: 'Crop Shot', note: 'Apparel' },
  { id: 7, col: 'col-span-2 row-span-1', label: 'Group Shot', note: 'Full Crew' },
  { id: 8, col: 'col-span-1 row-span-1', label: 'Detail', note: 'Myrcene Mike' },
  { id: 9, col: 'col-span-1 row-span-1', label: 'Lifestyle', note: 'Street' },
  { id: 10, col: 'col-span-2 row-span-1', label: 'Horizontal', note: 'Pinene Pete' },
  { id: 11, col: 'col-span-1 row-span-2', label: 'Portrait', note: 'Linalool Luna' },
  { id: 12, col: 'col-span-1 row-span-1', label: 'Close Up', note: 'Graphic Detail' },
  { id: 13, col: 'col-span-1 row-span-1', label: 'Overhead', note: 'Accessories' },
]

export default function LookbookPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-28 pb-14 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Visual Archive
              </p>
              <h1
                className="uppercase leading-none text-foreground"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  letterSpacing: '0.02em',
                }}
              >
                Lookbook
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50 pb-1"
            >
              Photography dropping soon
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-4 grid-rows-6 gap-2 h-[680px] sm:h-[900px] lg:h-[1100px]"
          >
            {tiles.map((tile) => (
              <div
                key={tile.id}
                className={`${tile.col} relative border border-border/50 group hover:border-accent/30 transition-colors duration-300 flex items-center justify-center overflow-hidden bg-secondary/30`}
              >
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-1 group-hover:opacity-60 transition-opacity">
                  <Plus className="w-5 h-5 text-border" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">
                    {tile.label}
                  </p>
                  <p className="text-[9px] font-mono text-muted-foreground/30">{tile.note}</p>
                </div>
                <span className="absolute top-2 right-2.5 text-[9px] font-mono text-muted-foreground/20">
                  {String(tile.id).padStart(2, '0')}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* UGC invite */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p
              className="uppercase text-foreground leading-none mb-2"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                letterSpacing: '0.03em',
              }}
            >
              Tag us to be featured.
            </p>
            <p className="text-sm text-muted-foreground">
              Show us how you wear it.{' '}
              <span className="text-foreground font-mono text-xs">@terptotz</span>
              {' '}on Instagram &amp; TikTok.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://instagram.com/terptotz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram →
            </a>
            <a
              href="https://tiktok.com/@terptotz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              TikTok →
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
