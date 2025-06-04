'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui'
import { cn } from '@/lib/utils'

export interface Screenshot {
  src: string
  alt: string
  caption?: string
}

export interface ScreenshotCarouselProps {
  images: Screenshot[]
  autoplay?: boolean
  navigation?: 'dots' | 'arrows' | 'both'
  title?: string
  description?: string
  className?: string
}

export const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({
  images,
  autoplay = false,
  navigation = 'both',
  title,
  description,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }, [images.length])

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }, [images.length])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  if (images.length === 0) return null

  return (
    <section className={cn('py-section bg-white', className)}>
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

        <div className="relative max-w-4xl mx-auto">
          {/* Main Image */}
          <div className="relative aspect-[4/3] mb-6">
            <Card variant="screenshot" className="w-full h-full">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                priority={currentIndex === 0}
              />
            </Card>

            {/* Arrow Navigation */}
            {(navigation === 'arrows' || navigation === 'both') && images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-card flex items-center justify-center text-vast-gray-700 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-vast-primary/20"
                  aria-label="Previous screenshot"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-card flex items-center justify-center text-vast-gray-700 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-vast-primary/20"
                  aria-label="Next screenshot"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Caption */}
          {images[currentIndex].caption && (
            <div className="text-center mb-6">
              <p className="text-body text-vast-gray-600">
                {images[currentIndex].caption}
              </p>
            </div>
          )}

          {/* Dot Navigation */}
          {(navigation === 'dots' || navigation === 'both') && images.length > 1 && (
            <div className="flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-vast-primary/20',
                    index === currentIndex 
                      ? 'bg-vast-primary' 
                      : 'bg-vast-gray-300 hover:bg-vast-gray-400'
                  )}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'relative aspect-[4/3] rounded-subtle overflow-hidden transition-all',
                    index === currentIndex 
                      ? 'ring-2 ring-vast-primary' 
                      : 'opacity-60 hover:opacity-100'
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}