import React from 'react'
import { ProductHero, ProductHeroProps } from './ProductHero'
import { FeatureGrid, Feature } from './FeatureGrid'
import { ScreenshotCarousel, Screenshot } from './ScreenshotCarousel'
import { ProblemSolutionPair } from '@/components/agency'
import { Button, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

export interface ProductTemplateProps {
  // Hero section
  hero: ProductHeroProps
  
  // Problem/Solution definition
  problemSolution?: {
    problem: {
      title: string
      description: string
      painPoints?: string[]
    }
    solution: {
      title: string
      description: string
      benefits?: string[]
    }
  }
  
  // Features
  features?: {
    title?: string
    description?: string
    items: Feature[]
    layout?: 'masonry' | '3-column' | 'alternating'
    maxDisplay?: number
  }
  
  // Screenshots
  screenshots?: {
    title?: string
    description?: string
    images: Screenshot[]
    autoplay?: boolean
    navigation?: 'dots' | 'arrows' | 'both'
  }
  
  // Availability and download links
  availability?: {
    title?: string
    description?: string
    platforms: {
      name: string
      url: string
      available: boolean
    }[]
    comingSoon?: string[]
  }
  
  // Future vision
  futureVision?: {
    title: string
    description: string
    roadmap?: {
      title: string
      description: string
      timeline: string
    }[]
  }
  
  // Additional sections
  additionalSections?: React.ReactNode[]
  
  className?: string
}

export const ProductTemplate: React.FC<ProductTemplateProps> = ({
  hero,
  problemSolution,
  features,
  screenshots,
  availability,
  futureVision,
  additionalSections,
  className
}) => {
  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Hero Section */}
      <ProductHero {...hero} />
      
      {/* Problem/Solution Section */}
      {problemSolution && (
        <ProblemSolutionPair
          problem={problemSolution.problem}
          solution={problemSolution.solution}
          layout="horizontal"
          className="bg-vast-gray-50"
        />
      )}
      
      {/* Screenshots Section */}
      {screenshots && (
        <ScreenshotCarousel
          title={screenshots.title}
          description={screenshots.description}
          images={screenshots.images}
          autoplay={screenshots.autoplay}
          navigation={screenshots.navigation}
          className="bg-white"
        />
      )}
      
      {/* Features Section */}
      {features && (
        <FeatureGrid
          title={features.title}
          description={features.description}
          features={features.items}
          layout={features.layout}
          maxDisplay={features.maxDisplay}
          className="bg-vast-gray-50"
        />
      )}
      
      {/* Availability Section */}
      {availability && (
        <section className="py-section bg-white">
          <div className="max-w-container mx-auto px-6">
            <div className="text-center mb-large">
              {availability.title && (
                <h2 className="text-heading-1 text-vast-gray-900 mb-4">
                  {availability.title}
                </h2>
              )}
              {availability.description && (
                <p className="text-body-lg text-vast-gray-600 max-w-content mx-auto">
                  {availability.description}
                </p>
              )}
            </div>
            
            <div className="max-w-2xl mx-auto">
              {/* Available Platforms */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {availability.platforms.map((platform) => (
                  <div key={platform.name} className="text-center">
                    {platform.available ? (
                      <Button 
                        size="lg" 
                        variant="primary" 
                        asChild 
                        className="w-full"
                      >
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          Download for {platform.name}
                        </a>
                      </Button>
                    ) : (
                      <Button 
                        size="lg" 
                        variant="outline" 
                        disabled 
                        className="w-full"
                      >
                        Coming to {platform.name}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Coming Soon */}
              {availability.comingSoon && availability.comingSoon.length > 0 && (
                <div className="text-center">
                  <p className="text-body text-vast-gray-600 mb-4">
                    Coming soon to:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {availability.comingSoon.map((platform) => (
                      <Badge key={platform} variant="coming-soon">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      
      {/* Future Vision Section */}
      {futureVision && (
        <section className="py-section bg-vast-gray-900 text-white">
          <div className="max-w-container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-heading-1 mb-6">
                {futureVision.title}
              </h2>
              <p className="text-body-lg text-vast-gray-300 mb-8 max-w-content mx-auto">
                {futureVision.description}
              </p>
              
              {futureVision.roadmap && futureVision.roadmap.length > 0 && (
                <div className="grid md:grid-cols-3 gap-8 mt-large">
                  {futureVision.roadmap.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-vast-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-heading-3 mb-2">{item.title}</h3>
                      <p className="text-body-sm text-vast-gray-400 mb-2">
                        {item.description}
                      </p>
                      <Badge variant="coming-soon" size="sm">
                        {item.timeline}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      
      {/* Additional Sections */}
      {additionalSections?.map((section, index) => (
        <React.Fragment key={index}>
          {section}
        </React.Fragment>
      ))}
    </div>
  )
}