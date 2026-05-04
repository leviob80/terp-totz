'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { ShoppingBag, ArrowLeft, Lock, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATE, getShippingCost } from '@/lib/stripe'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

interface FormState {
  email: string
  firstName: string
  lastName: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
}

// ── Inner payment form (needs Stripe context) ──────────────────────────────
function PaymentForm({
  form,
  subtotal,
  shippingCost,
  onBack,
}: {
  form: FormState
  subtotal: number
  shippingCost: number
  onBack: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const { clearCart } = useCartStore()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setError(null)

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        payment_method_data: {
          billing_details: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            address: {
              line1: form.address1,
              line2: form.address2 || undefined,
              city: form.city,
              state: form.state,
              postal_code: form.zip,
              country: form.country,
            },
          },
        },
      },
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed. Please try again.')
      setSubmitting(false)
    }
    // On success, Stripe redirects to return_url — clearCart happens on confirmation page
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-border/50 bg-card p-5 space-y-4">
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
          Payment
        </p>
        <PaymentElement
          options={{
            layout: 'tabs',
            fields: { billingDetails: 'never' },
          }}
        />
      </div>

      {error && (
        <div className="border border-destructive/40 bg-destructive/5 px-4 py-3">
          <p className="text-xs text-destructive font-mono">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Shipping
        </button>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={!stripe || !elements || submitting}
          className="flex-1 gap-2"
        >
          <Lock className="w-3.5 h-3.5" />
          {submitting ? 'Processing…' : `Place Order — ${formatPrice(subtotal + shippingCost)}`}
        </Button>
      </div>

      <p className="text-[9px] font-mono text-muted-foreground/40 text-center tracking-[0.1em] uppercase">
        Payments secured by Stripe · 256-bit SSL encryption
      </p>
    </form>
  )
}

// ── Main checkout page ─────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, getTotal } = useCartStore()
  const subtotal = getTotal()
  const shippingCost = getShippingCost(subtotal)
  const [summaryOpen, setSummaryOpen] = useState(false)

  const [form, setForm] = useState<FormState>({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  })

  const [step, setStep] = useState<'shipping' | 'payment'>('shipping')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [apiLoading, setApiLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const shippingRequired = ['email', 'firstName', 'lastName', 'address1', 'city', 'state', 'zip'] as const
  const shippingComplete = shippingRequired.every((f) => form[f].trim().length > 0)

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    if (!shippingComplete) return
    setApiLoading(true)
    setApiError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email: form.email,
          shipping: {
            name: `${form.firstName} ${form.lastName}`,
            line1: form.address1,
            line2: form.address2 || undefined,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
          },
        }),
      })
      const data = await res.json()
      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
        setStep('payment')
      } else {
        setApiError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setApiError('Network error. Please check your connection.')
    } finally {
      setApiLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag className="w-12 h-12 text-muted-foreground/15" />
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        <Button variant="accent" size="lg" asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/50 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Cart
          </Link>
          <span
            className="uppercase text-foreground tracking-[0.05em]"
            style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.3rem' }}
          >
            Terp Totz
          </span>
          <Lock className="w-4 h-4 text-muted-foreground/40" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

        {/* Left — form */}
        <div className="space-y-8">
          {/* Step indicator */}
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.15em] uppercase">
            <span className={step === 'shipping' ? 'text-accent' : 'text-muted-foreground/50'}>
              01 Shipping
            </span>
            <div className="flex-1 h-px bg-border/50" />
            <span className={step === 'payment' ? 'text-accent' : 'text-muted-foreground/50'}>
              02 Payment
            </span>
          </div>

          {/* Shipping form */}
          {step === 'shipping' && (
            <form onSubmit={handleContinue} className="space-y-6">
              {/* Contact */}
              <div className="border border-border/50 bg-card p-5 space-y-4">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                  Contact
                </p>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  className="bg-background border-border/60 focus:border-accent font-mono text-sm"
                />
              </div>

              {/* Shipping */}
              <div className="border border-border/50 bg-card p-5 space-y-4">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                  Shipping Address
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleFormChange}
                    required
                    className="bg-background border-border/60 focus:border-accent font-mono text-sm"
                  />
                  <Input
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleFormChange}
                    required
                    className="bg-background border-border/60 focus:border-accent font-mono text-sm"
                  />
                </div>
                <Input
                  name="address1"
                  placeholder="Address"
                  value={form.address1}
                  onChange={handleFormChange}
                  required
                  className="bg-background border-border/60 focus:border-accent font-mono text-sm"
                />
                <Input
                  name="address2"
                  placeholder="Apt, suite, unit (optional)"
                  value={form.address2}
                  onChange={handleFormChange}
                  className="bg-background border-border/60 focus:border-accent font-mono text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleFormChange}
                    required
                    className="bg-background border-border/60 focus:border-accent font-mono text-sm"
                  />
                  <Input
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleFormChange}
                    required
                    className="bg-background border-border/60 focus:border-accent font-mono text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name="zip"
                    placeholder="ZIP code"
                    value={form.zip}
                    onChange={handleFormChange}
                    required
                    className="bg-background border-border/60 focus:border-accent font-mono text-sm"
                  />
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleFormChange}
                    className="h-10 w-full border border-border/60 bg-background px-3 text-sm font-mono text-foreground focus:border-accent focus:outline-none"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </div>

              {apiError && (
                <div className="border border-destructive/40 bg-destructive/5 px-4 py-3">
                  <p className="text-xs text-destructive font-mono">{apiError}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="accent"
                size="lg"
                disabled={!shippingComplete || apiLoading}
                className="w-full"
              >
                {apiLoading ? 'Loading…' : 'Continue to Payment'}
              </Button>
            </form>
          )}

          {/* Payment step */}
          {step === 'payment' && clientSecret && (
            <>
              {/* Shipping summary */}
              <div className="border border-border/50 bg-card px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-0.5">Shipping to</p>
                  <p className="text-sm text-foreground font-mono">
                    {form.firstName} {form.lastName} · {form.address1}, {form.city}, {form.state} {form.zip}
                  </p>
                </div>
                <button
                  onClick={() => setStep('shipping')}
                  className="text-[10px] font-mono tracking-[0.1em] uppercase text-accent hover:text-accent/70 transition-colors ml-4 shrink-0"
                >
                  Edit
                </button>
              </div>

              {stripePromise ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'night',
                      variables: {
                        colorPrimary: '#E85D04',
                        colorBackground: '#0A0A0A',
                        colorText: '#F5EFE6',
                        colorDanger: '#ef4444',
                        fontFamily: 'monospace',
                        borderRadius: '0px',
                      },
                    },
                  }}
                >
                  <PaymentForm
                    form={form}
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    onBack={() => setStep('shipping')}
                  />
                </Elements>
              ) : (
                <div className="border border-border/50 bg-card p-6 text-center space-y-2">
                  <Lock className="w-6 h-6 text-muted-foreground/30 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Payment not configured.
                  </p>
                  <p className="text-xs text-muted-foreground/50 font-mono">
                    Add <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to .env.local
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right — order summary */}
        <div className="lg:sticky lg:top-8 space-y-0">
          {/* Mobile toggle */}
          <button
            onClick={() => setSummaryOpen((o) => !o)}
            className="flex lg:hidden w-full items-center justify-between border border-border/50 bg-card px-4 py-3 mb-0"
          >
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
              Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{formatPrice(subtotal + shippingCost)}</span>
              {summaryOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </button>

          <div className={`border border-border/50 bg-card divide-y divide-border/50 ${!summaryOpen ? 'hidden lg:block' : ''}`}>
            {/* Items */}
            <div className="p-5 space-y-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3">
                  <div className="relative w-14 h-14 shrink-0 bg-secondary/30 border border-border/50 overflow-hidden">
                    {item.product.images[0] ? (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-muted-foreground/20" />
                      </div>
                    )}
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] font-mono flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-tight uppercase tracking-[0.04em] truncate"
                      style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '0.85rem' }}>
                      {item.product.name}
                    </p>
                    {Object.keys(item.selectedVariants).length > 0 && (
                      <p className="text-[9px] font-mono text-muted-foreground mt-0.5">
                        {Object.values(item.selectedVariants).join(' / ')}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono text-foreground shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="font-mono text-muted-foreground">Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-mono text-muted-foreground">
                  Shipping {subtotal < FREE_SHIPPING_THRESHOLD && `(free over ${formatPrice(FREE_SHIPPING_THRESHOLD)})`}
                </span>
                <span className="font-mono">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-border/50">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground">Total</span>
                <span style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.3rem' }}>
                  {formatPrice(subtotal + shippingCost)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
