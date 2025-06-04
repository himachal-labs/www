'use client'

import { useState, useEffect } from 'react'

interface GrowthMetric {
  name: string
  value: string | number
  change: number
  target?: string | number
  status: 'good' | 'warning' | 'poor'
  description: string
}

interface ABTestResult {
  testId: string
  testName: string
  variants: {
    id: string
    name: string
    traffic: number
    conversions: number
    conversionRate: number
    confidence: number
  }[]
  status: 'running' | 'completed' | 'paused'
  winner?: string
}

export default function GrowthDashboard() {
  const [metrics, setMetrics] = useState<GrowthMetric[]>([])
  const [abTests, setABTests] = useState<ABTestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Note: Dashboard shows demo data for development purposes
    // Real analytics integration would replace these placeholder values
    setTimeout(() => {
      setMetrics([
        {
          name: 'Core Web Vitals - LCP',
          value: 'Pending',
          change: 0,
          target: '<1.0s',
          status: 'warning',
          description: 'Largest Contentful Paint - measurement needed'
        },
        {
          name: 'Core Web Vitals - FID',
          value: 'Pending',
          change: 0,
          target: '<100ms',
          status: 'warning',
          description: 'First Input Delay - measurement needed'
        },
        {
          name: 'Core Web Vitals - CLS',
          value: 'Pending',
          change: 0,
          target: '<0.1',
          status: 'warning',
          description: 'Cumulative Layout Shift - measurement needed'
        },
        {
          name: 'Lighthouse Performance',
          value: 'Pending',
          change: 0,
          target: '100/100',
          status: 'warning',
          description: 'Overall performance score - requires audit'
        }
      ])

      setABTests([])

      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Growth Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor performance, conversions, and A/B test results aligned with VastSilicon&apos;s growth strategy.
        </p>
      </div>

      {/* Core Metrics */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Core Growth Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </section>

      {/* A/B Tests */}
      {abTests.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            A/B Test Results
          </h2>
          
          <div className="space-y-6">
            {abTests.map((test, index) => (
              <ABTestCard key={index} test={test} />
            ))}
          </div>
        </section>
      )}

      {/* Growth Insights */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Growth Insights & Recommendations
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InsightCard
            type="warning"
            title="Analytics Setup Required"
            description="Performance metrics and user behavior data collection needs to be implemented."
            action="Connect real analytics tools and begin measuring actual performance"
          />
          
          <InsightCard
            type="opportunity"
            title="Growth Framework Ready"
            description="Technical infrastructure for analytics, A/B testing, and performance monitoring is in place."
            action="Begin collecting real data to validate growth hypotheses"
          />
        </div>
      </section>
    </div>
  )
}

function MetricCard({ metric }: { metric: GrowthMetric }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className={`p-6 rounded-lg border ${getStatusColor(metric.status)}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{metric.name}</h3>
        <span className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
          {metric.change > 0 ? '+' : ''}{metric.change}%
        </span>
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
        {metric.target && (
          <span className="text-sm text-gray-500 ml-2">
            Target: {metric.target}
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-600">{metric.description}</p>
    </div>
  )
}

function ABTestCard({ test }: { test: ABTestResult }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Running</span>
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
      case 'paused':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Paused</span>
      default:
        return null
    }
  }

  const winner = test.variants.reduce((prev, current) => 
    (prev.conversionRate > current.conversionRate) ? prev : current
  )

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{test.testName}</h3>
          <p className="text-sm text-gray-600">Test ID: {test.testId}</p>
        </div>
        {getStatusBadge(test.status)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {test.variants.map((variant) => (
          <div 
            key={variant.id} 
            className={`p-4 rounded-lg border ${
              variant.id === winner.id ? 'border-green-200 bg-green-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{variant.name}</h4>
              {variant.id === winner.id && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                  Winner
                </span>
              )}
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Traffic:</span>
                <span className="font-medium">{variant.traffic.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conversions:</span>
                <span className="font-medium">{variant.conversions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate:</span>
                <span className="font-medium">{variant.conversionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Confidence:</span>
                <span className="font-medium">{variant.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {test.winner && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">
            <strong>Statistical Significance Achieved:</strong> The &lsquo;{test.variants.find(v => v.id === test.winner)?.name}&rsquo; variant 
            shows a statistically significant improvement in conversion rate.
          </p>
        </div>
      )}
    </div>
  )
}

function InsightCard({ 
  type, 
  title, 
  description, 
  action 
}: { 
  type: 'success' | 'warning' | 'opportunity' | 'insight'
  title: string
  description: string
  action: string
}) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'opportunity':
        return 'border-blue-200 bg-blue-50'
      case 'insight':
        return 'border-purple-200 bg-purple-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'opportunity': return 'text-blue-600'
      case 'insight': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className={`p-6 rounded-lg border ${getTypeStyles(type)}`}>
      <div className="flex items-start gap-3">
        <div className={`w-6 h-6 ${getIconColor(type)} flex-shrink-0 mt-0.5`}>
          {type === 'success' && (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {type === 'warning' && (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )}
          {type === 'opportunity' && (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )}
          {type === 'insight' && (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700 mb-3">{description}</p>
          <p className="text-sm font-medium text-gray-900">
            <strong>Recommended Action:</strong> {action}
          </p>
        </div>
      </div>
    </div>
  )
}