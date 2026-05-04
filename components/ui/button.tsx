import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 uppercase tracking-[0.08em] text-xs',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/85 active:scale-[0.97]',
        outline:
          'border border-foreground/40 text-foreground bg-transparent hover:border-foreground hover:bg-foreground/5',
        ghost:
          'bg-transparent hover:bg-muted text-foreground/60 hover:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        accent:
          'bg-accent text-accent-foreground hover:bg-accent/85 active:scale-[0.97]',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto normal-case tracking-normal',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 text-[10px]',
        lg: 'h-12 px-8',
        xl: 'h-14 px-12 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
