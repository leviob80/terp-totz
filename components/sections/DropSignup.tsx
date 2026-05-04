'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function DropSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // fail silently — still show success to user
    } finally {
      setSubmitted(true)
      setLoading(false)
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border border-accent/20 bg-accent/5 px-8 py-14 sm:px-14 sm:py-16 relative overflow-hidden">

          {/* Background glow */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full opacity-5 pointer-events-none"
            style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent mb-4">
                Drop List
              </p>
              <h2
                className="uppercase leading-none text-foreground mb-4"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  letterSpacing: '0.02em',
                }}
              >
                Get on the<br />drop list.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Season 2 drops are limited. First on the list gets first access.
                New characters, restocks, and exclusives — all in your inbox.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                  <p className="text-sm font-mono tracking-[0.1em] uppercase text-accent">
                    You're on the list.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    We'll hit you when the next drop goes live.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-background/50 border-border/60 focus:border-accent font-mono text-sm"
                  />
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={loading}
                    className="shrink-0"
                  >
                    {loading ? 'Submitting...' : "I'm In"}
                  </Button>
                </form>
              )}

              <p className="text-[10px] font-mono text-muted-foreground/40 mt-4">
                No spam. Unsubscribe anytime. We only send when something actually drops.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
