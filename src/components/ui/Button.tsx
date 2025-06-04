import React from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = {
  variant: {
    primary: 'bg-vast-primary text-white hover:bg-blue-700 focus:ring-vast-primary/20',
    secondary: 'bg-vast-secondary text-white hover:bg-slate-600 focus:ring-vast-secondary/20',
    ghost: 'text-vast-primary hover:bg-blue-50 focus:ring-vast-primary/20',
    outline: 'border border-vast-primary text-vast-primary hover:bg-vast-primary hover:text-white focus:ring-vast-primary/20'
  },
  size: {
    sm: 'px-3 py-1.5 text-body-sm',
    md: 'px-4 py-2 text-body',
    lg: 'px-6 py-3 text-body-lg'
  }
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, asChild = false, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-button font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantClasses = buttonVariants.variant[variant]
    const sizeClasses = buttonVariants.size[size]
    
    if (asChild) {
      return (
        <span className={cn(baseClasses, variantClasses, sizeClasses, className)}>
          {children}
        </span>
      )
    }

    return (
      <button
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'