import React from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = {
  variant: {
    available: 'bg-vast-available text-white',
    'coming-soon': 'bg-vast-coming-soon text-white',
    'in-development': 'bg-vast-in-development text-white',
    platform: 'bg-vast-gray-100 text-vast-gray-800',
    feature: 'bg-vast-gray-100 text-vast-gray-700',
    status: 'bg-semantic-info text-white'
  },
  size: {
    sm: 'px-2 py-0.5 text-caption',
    md: 'px-2.5 py-1 text-body-sm',
    lg: 'px-3 py-1.5 text-body'
  }
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants.variant
  size?: keyof typeof badgeVariants.size
  children: React.ReactNode
  className?: string
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'status', size = 'md', className, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium'
    
    const variantClasses = badgeVariants.variant[variant]
    const sizeClasses = badgeVariants.size[size]
    
    return (
      <span
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'