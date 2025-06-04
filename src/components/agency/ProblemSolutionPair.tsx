import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui'
import { cn } from '@/lib/utils'

export interface ProblemSolutionPairProps {
  problem: {
    title: string
    description: string
    visual?: string
    painPoints?: string[]
  }
  solution: {
    title: string
    description: string
    visual?: string
    benefits?: string[]
  }
  visualization?: 'screenshot' | 'diagram' | 'text'
  layout?: 'horizontal' | 'vertical'
  className?: string
}

export const ProblemSolutionPair: React.FC<ProblemSolutionPairProps> = ({
  problem,
  solution,
  visualization = 'text',
  layout = 'horizontal',
  className
}) => {
  const renderVisual = (visual: string | undefined, alt: string) => {
    if (!visual) return null
    
    if (visualization === 'screenshot') {
      return (
        <div className="relative aspect-video rounded-card overflow-hidden shadow-card">
          <Image
            src={visual}
            alt={alt}
            fill
            className="object-cover"
          />
        </div>
      )
    }
    
    if (visualization === 'diagram') {
      return (
        <div className="relative aspect-square max-w-sm mx-auto">
          <Image
            src={visual}
            alt={alt}
            fill
            className="object-contain"
          />
        </div>
      )
    }
    
    return null
  }

  const renderSection = (data: typeof problem | typeof solution, type: 'problem' | 'solution') => {
    const isProblem = type === 'problem'
    const bgColor = isProblem ? 'bg-red-50' : 'bg-green-50'
    const borderColor = isProblem ? 'border-red-200' : 'border-green-200'
    const textColor = isProblem ? 'text-red-800' : 'text-green-800'
    const listItems = isProblem ? problem.painPoints : solution.benefits

    return (
      <Card 
        variant="default" 
        className={cn(bgColor, borderColor, 'p-6')}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-white font-medium',
              isProblem ? 'bg-red-500' : 'bg-green-500'
            )}>
              {isProblem ? '!' : '✓'}
            </div>
            <div>
              <div className={cn('text-caption font-medium uppercase tracking-wide', textColor)}>
                {isProblem ? 'Problem' : 'Solution'}
              </div>
              <h3 className="text-heading-3 text-vast-gray-900">
                {data.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-body text-vast-gray-700">
            {data.description}
          </p>

          {/* Visual */}
          {data.visual && renderVisual(data.visual, `${type} illustration`)}

          {/* List Items */}
          {listItems && listItems.length > 0 && (
            <ul className="space-y-2">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className={cn(
                    'mt-1.5 w-2 h-2 rounded-full flex-shrink-0',
                    isProblem ? 'bg-red-500' : 'bg-green-500'
                  )} />
                  <span className="text-body-sm text-vast-gray-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    )
  }

  return (
    <section className={cn('py-section bg-white', className)}>
      <div className="max-w-container mx-auto px-6">
        <div className={cn(
          'grid gap-large',
          layout === 'horizontal' ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'
        )}>
          {renderSection(problem, 'problem')}
          {renderSection(solution, 'solution')}
        </div>

        {/* Transition Arrow (for horizontal layout) */}
        {layout === 'horizontal' && (
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-card items-center justify-center">
            <svg className="w-6 h-6 text-vast-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        )}
      </div>
    </section>
  )
}