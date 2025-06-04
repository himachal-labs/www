import React from 'react'
import { cn } from '@/lib/utils'

const cardVariants = {
  variant: {
    default: 'bg-white border border-vast-gray-200',
    elevated: 'bg-white shadow-card border border-vast-gray-100',
    interactive: 'bg-white border border-vast-gray-200 hover:shadow-card hover:border-vast-gray-300 transition-all duration-200 cursor-pointer',
    feature: 'bg-white border border-vast-gray-200 p-6',
    screenshot: 'bg-white shadow-subtle rounded-card overflow-hidden',
    testimonial: 'bg-vast-gray-50 border border-vast-gray-200 p-6'
  },
  padding: {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariants.variant
  padding?: keyof typeof cardVariants.padding
  children: React.ReactNode
  className?: string
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', className, children, ...props }, ref) => {
    const baseClasses = 'rounded-card'
    
    const variantClasses = cardVariants.variant[variant]
    const paddingClasses = variant === 'feature' || variant === 'testimonial' ? '' : cardVariants.padding[padding]
    
    return (
      <div
        className={cn(baseClasses, variantClasses, paddingClasses, className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Compound components for better composition
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-heading-3 font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-body text-vast-gray-600', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'