'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

type PaymentStatus = 'loading' | 'succeeded' | 'processing' | 'failed' | 'unconfigured'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCartStore()
  const [status, setStatus] = useState<PaymentStatus>('loading')
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)

  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret')
    const redirectStatus = searchParams.get('redirect_status')
    const intentId = searchParams.get('payment_intent')

    if (intentId) setPaymentIntentId(intentId)

    if (!clientSecret) {
      // Direct navigation without Stripe redirect — check if configured
      if (!stripePromise) {
        setStatus('unconfigured')
      } else {
        setStatus('failed')
      }
      return
    }

    if (redirectStatus === 'succeeded') {
      clearCart()
      setStatus('succeeded')
      return
    }

    if (!stripePromise) {
      setStatus('unconfigured')
      return
    }

    // Verify with Stripe for pending/processing states
    stripePromise.then((stripe) => {
      if (!stripe) return
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            clearCart()
            setStatus('succeeded')
            break
          case 'processing':
            setStatus('processing')
            break
          default:
            setStatus('failed')
        }
      })
    })
  }, [searchParams, clearCart])

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center space-y-8">

        {status === 'loading' && (
          <div className="space-y-4">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground font-mono">Confirming your order…</p>
          </div>
        )}

        {status === 'succeeded' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <CheckCircle className="w-16 h-16 text-accent mx-auto" />
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent mb-3">
                Order Confirmed
              </p>
              <h1
                className="uppercase leading-none text-foreground mb-4"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  letterSpacing: '0.02em',
                }}
              >
                You're in the drop.
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your order is confirmed. A receipt has been sent to your email.
                Season 1 ships within 3–5 business days.
              </p>
            </div>
            {paymentIntentId && (
              <p className="text-[9px] font-mono text-muted-foreground/30 tracking-[0.1em]">
                Order ref: {paymentIntentId}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button variant="accent" size="lg" asChild>
                <Link href="/shop">
                  Keep Shopping <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/characters">Explore Characters</Link>
              </Button>
            </div>
          </motion.div>
        )}

        {status === 'processing' && (
          <div className="space-y-6">
            <Clock className="w-16 h-16 text-primary mx-auto" />
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-3">
                Payment Processing
              </p>
              <h1
                className="uppercase leading-none text-foreground mb-4"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: '2.5rem',
                  letterSpacing: '0.02em',
                }}
              >
                We're on it.
              </h1>
              <p className="text-sm text-muted-foreground">
                Your payment is being processed. We'll send a confirmation email once it clears — usually within a few minutes.
              </p>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-6">
            <XCircle className="w-16 h-16 text-destructive mx-auto" />
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-destructive mb-3">
                Payment Failed
              </p>
              <h1
                className="uppercase leading-none text-foreground mb-4"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: '2.5rem',
                  letterSpacing: '0.02em',
                }}
              >
                Something went wrong.
              </h1>
              <p className="text-sm text-muted-foreground">
                Your payment didn't go through. No charge was made. Check your card details and try again.
              </p>
            </div>
            <Button variant="accent" size="lg" asChild>
              <Link href="/checkout">Try Again</Link>
            </Button>
          </div>
        )}

        {status === 'unconfigured' && (
          <div className="space-y-6">
            <CheckCircle className="w-16 h-16 text-accent/50 mx-auto" />
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Development Mode
              </p>
              <h1
                className="uppercase leading-none text-foreground mb-4"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: '2.5rem',
                  letterSpacing: '0.02em',
                }}
              >
                Stripe not connected.
              </h1>
              <p className="text-sm text-muted-foreground">
                Add your Stripe keys to <code className="font-mono text-xs bg-secondary px-1 py-0.5">.env.local</code> to enable live payments.
              </p>
            </div>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        )}

      </div>
    </main>
  )
}
