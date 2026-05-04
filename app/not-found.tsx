import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-4">
        404
      </p>
      <h1
        className="uppercase leading-none text-foreground mb-4"
        style={{
          fontFamily: 'var(--font-bebas), Impact, sans-serif',
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          letterSpacing: '0.02em',
        }}
      >
        Lost in the<br />
        <span className="text-accent">terpene universe.</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm">
        This page doesn't exist — or it might have sold out and left. Either way, it's gone.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="accent" size="lg" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/shop">Shop Season 1</Link>
        </Button>
      </div>
    </main>
  )
}
