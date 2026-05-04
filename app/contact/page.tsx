'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const socials = [
  { label: 'Instagram', handle: '@terptotz', href: 'https://instagram.com/terptotz' },
  { label: 'TikTok', handle: '@terptotz', href: 'https://tiktok.com/@terptotz' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Contact
            </p>
            <h1
              className="uppercase leading-none text-foreground"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                letterSpacing: '0.02em',
              }}
            >
              Hit us up.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16">

            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  General Inquiries
                </p>
                <a
                  href="mailto:hello@terptotz.com"
                  className="text-foreground hover:text-accent transition-colors font-mono text-sm"
                >
                  hello@terptotz.com
                </a>
              </div>

              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  Wholesale &amp; Collabs
                </p>
                <a
                  href="mailto:collab@terptotz.com"
                  className="text-foreground hover:text-accent transition-colors font-mono text-sm"
                >
                  collab@terptotz.com
                </a>
              </div>

              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  Follow the Universe
                </p>
                <div className="space-y-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-border/50 hover:border-accent/30 px-4 py-3 transition-colors group"
                    >
                      <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                        {s.label}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground/50 group-hover:text-accent transition-colors">
                        {s.handle}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-l-2 border-accent/40 pl-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tag us in your fit pics —{' '}
                  <span className="text-foreground">@terptotz</span>
                  {' '}— and you might end up in the lookbook.
                </p>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-20 gap-4 border border-border/50 bg-card">
                  <CheckCircle className="w-10 h-10 text-accent" />
                  <p
                    className="uppercase text-foreground"
                    style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif',
                      fontSize: '2rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Message received.
                  </p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    We'll get back to you. In the meantime — check the drop list if you haven't already.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                        Name
                      </label>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-card border-border/60 focus:border-accent"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-card border-border/60 focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="bg-card border-border/60 focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      required
                      rows={6}
                      className="w-full resize-none rounded-none border border-border/60 bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-destructive font-mono">{error}</p>
                  )}

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  )
}
