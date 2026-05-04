import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  linkDisabled?: boolean
}

const sizes = {
  sm: 44,
  md: 60,
  lg: 96,
}

export function Logo({ className, size = 'md', showWordmark = false, linkDisabled }: LogoProps) {
  const px = sizes[size]
  const content = (
    <div className="flex items-center gap-3">
      <Image
        src="/images/brand/logo.jpeg"
        alt="Terp Totz"
        width={px}
        height={px}
        priority
        className="object-contain rounded-full"
      />
      {showWordmark && (
        <span
          className="text-foreground uppercase tracking-wider leading-none"
          style={{
            fontFamily: 'var(--font-bebas), Impact, sans-serif',
            fontSize: size === 'sm' ? '1.5rem' : size === 'md' ? '2rem' : '2.8rem',
          }}
        >
          Terp Totz
        </span>
      )}
    </div>
  )

  if (linkDisabled) {
    return <div className={cn('flex items-center', className)}>{content}</div>
  }

  return (
    <Link href="/" className={cn('flex items-center', className)}>
      {content}
    </Link>
  )
}
