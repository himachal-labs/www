import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui'
import { cn } from '@/lib/utils'

export interface Feature {
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  category?: string
}

export interface FeatureGridProps {
  features: Feature[]
  layout?: 'masonry' | '3-column' | 'alternating'
  maxDisplay?: number
  title?: string
  description?: string
  className?: string
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  layout = '3-column',
  maxDisplay,
  title,
  description,
  className
}) => {
  const displayFeatures = maxDisplay ? features.slice(0, maxDisplay) : features

  const getGridClasses = () => {
    switch (layout) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6'
      case 'alternating':
        return 'space-y-large'
      case '3-column':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    }
  }

  const renderFeature = (feature: Feature, index: number) => {
    if (layout === 'alternating') {
      const isEven = index % 2 === 0
      return (
        <div 
          key={index}
          className={cn(
            'grid lg:grid-cols-2 gap-large items-center',
            !isEven && 'lg:grid-flow-col-dense'
          )}
        >
          <div className={cn('space-y-small', !isEven && 'lg:col-start-2')}>
            {feature.icon && (
              <div className="w-12 h-12 text-vast-primary">
                {feature.icon}
              </div>
            )}
            <h3 className="text-heading-3 text-vast-gray-900">
              {feature.title}
            </h3>
            <p className="text-body text-vast-gray-600 max-w-content">
              {feature.description}
            </p>
          </div>
          {feature.image && (
            <div className={cn('relative', !isEven && 'lg:col-start-1')}>
              <div className="aspect-video rounded-card overflow-hidden shadow-card">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <Card 
        key={index} 
        variant="feature"
        className={layout === 'masonry' ? 'break-inside-avoid mb-6' : ''}
      >
        {feature.icon && (
          <div className="w-12 h-12 text-vast-primary mb-4">
            {feature.icon}
          </div>
        )}
        {feature.image && (
          <div className="relative aspect-video rounded-subtle overflow-hidden mb-4">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-heading-3">
            {feature.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription className="text-body">
            {feature.description}
          </CardDescription>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className={cn('py-section bg-vast-gray-50', className)}>
      <div className="max-w-container mx-auto px-6">
        {(title || description) && (
          <div className="text-center mb-large max-w-3xl mx-auto">
            {title && (
              <h2 className="text-heading-1 text-vast-gray-900 mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-body-lg text-vast-gray-600">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className={getGridClasses()}>
          {displayFeatures.map(renderFeature)}
        </div>

        {maxDisplay && features.length > maxDisplay && (
          <div className="text-center mt-large">
            <p className="text-body text-vast-gray-600">
              And {features.length - maxDisplay} more features...
            </p>
          </div>
        )}
      </div>
    </section>
  )
}