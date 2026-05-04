'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-destructive mb-4">
        Error
      </p>
      <h1
        className="uppercase leading-none text-foreground mb-4"
        style={{
          fontFamily: 'var(--font-bebas), Impact, sans-serif',
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          letterSpacing: '0.02em',
        }}
      >
        Something went wrong.
      </h1>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm">
        An unexpected error occurred. Try reloading the page.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="accent" size="lg" onClick={reset}>
          Try Again
        </Button>
        <Button variant="outline" size="lg" onClick={() => (window.location.href = '/')}>
          Go Home
        </Button>
      </div>
    </main>
  )
}
