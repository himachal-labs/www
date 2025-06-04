import React from 'react'
import Image from 'next/image'
import { Button, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

export interface ProductHeroProps {
  name: string
  tagline: string
  status: 'available' | 'coming-soon' | 'in-development'
  platforms?: ('ios' | 'android' | 'web')[]
  heroImage?: string
  demoVideo?: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  className?: string
}

const statusLabels = {
  'available': 'Available Now',
  'coming-soon': 'Coming Soon',
  'in-development': 'In Development'
}

const platformLabels = {
  'ios': 'iOS',
  'android': 'Android',
  'web': 'Web'
}

export const ProductHero: React.FC<ProductHeroProps> = ({
  name,
  tagline,
  status,
  platforms = [],
  heroImage,
  demoVideo,
  primaryAction,
  secondaryAction,
  className
}) => {
  return (
    <section className={cn('py-section bg-white', className)}>
      <div className="max-w-container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-large items-center">
          {/* Content */}
          <div className="space-y-medium">
            {/* Status Badge */}
            <div className="flex items-center gap-small">
              <Badge variant={status} size="md">
                {statusLabels[status]}
              </Badge>
              {platforms.length > 0 && (
                <div className="flex items-center gap-2">
                  {platforms.map((platform) => (
                    <Badge key={platform} variant="platform" size="sm">
                      {platformLabels[platform]}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-hero text-vast-gray-900 tracking-tight">
              {name}
            </h1>

            {/* Tagline */}
            <p className="text-body-lg text-vast-gray-600 max-w-content">
              {tagline}
            </p>

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col sm:flex-row gap-4 pt-small">
                {primaryAction && (
                  <Button 
                    size="lg" 
                    variant="primary"
                    asChild={true}
                  >
                    <a 
                      href={primaryAction.href}
                      className="inline-flex items-center justify-center"
                    >
                      {primaryAction.label}
                    </a>
                  </Button>
                )}
                {secondaryAction && (
                  <Button 
                    size="lg" 
                    variant="outline"
                    asChild={true}
                  >
                    <a 
                      href={secondaryAction.href}
                      className="inline-flex items-center justify-center"
                    >
                      {secondaryAction.label}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Visual */}
          <div className="relative">
            {demoVideo ? (
              <div className="relative aspect-video rounded-card overflow-hidden shadow-elevated">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={demoVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : heroImage ? (
              <div className="relative aspect-video rounded-card overflow-hidden shadow-elevated">
                <Image
                  src={heroImage}
                  alt={`${name} hero image`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-video rounded-card bg-vast-gray-100 flex items-center justify-center">
                <div className="text-center text-vast-gray-500">
                  <div className="text-heading-2 mb-2">{name}</div>
                  <div className="text-body">Preview coming soon</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}