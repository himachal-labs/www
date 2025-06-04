import Link from 'next/link'

export interface TrustSignal {
  type: 'user_count' | 'expert_endorsement' | 'media_mention' | 'case_study' | 'transparency' | 'performance'
  data: {
    metric?: string
    source?: string
    quote?: string
    attribution?: string
    link?: string
    icon?: string
    value?: string
    description?: string
  }
}

interface TrustSignalsProps {
  signals: TrustSignal[]
  layout?: 'horizontal' | 'vertical' | 'grid'
  className?: string
}

export default function TrustSignals({ signals, layout = 'horizontal', className = '' }: TrustSignalsProps) {
  const containerClasses = {
    horizontal: 'flex flex-wrap gap-6 justify-center',
    vertical: 'space-y-4',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
  }

  return (
    <div className={`${containerClasses[layout]} ${className}`}>
      {signals.map((signal, index) => (
        <TrustSignalCard key={index} signal={signal} />
      ))}
    </div>
  )
}

function TrustSignalCard({ signal }: { signal: TrustSignal }) {
  const { type, data } = signal

  const cardContent = (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {renderSignalContent(type, data)}
    </div>
  )

  if (data.link) {
    return (
      <Link 
        href={data.link}
        className="block hover:scale-105 transition-transform"
        target={data.link.startsWith('http') ? '_blank' : '_self'}
        rel={data.link.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

function renderSignalContent(type: string, data: TrustSignal['data']) {
  switch (type) {
    case 'user_count':
      return (
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {data.metric}
          </div>
          <div className="text-sm text-gray-600">
            {data.description || 'Active users'}
          </div>
        </div>
      )

    case 'expert_endorsement':
      return (
        <div>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <blockquote className="text-gray-700 italic">
              &ldquo;{data.quote}&rdquo;
            </blockquote>
          </div>
          <div className="text-sm text-gray-600 font-medium">
            — {data.attribution}
          </div>
          {data.source && (
            <div className="text-xs text-gray-500 mt-1">
              {data.source}
            </div>
          )}
        </div>
      )

    case 'media_mention':
      return (
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 mb-2">
            Featured in
          </div>
          <div className="text-blue-600 font-medium">
            {data.source}
          </div>
          {data.quote && (
            <div className="text-sm text-gray-600 mt-2 italic">
              &ldquo;{data.quote}&rdquo;
            </div>
          )}
        </div>
      )

    case 'case_study':
      return (
        <div>
          <div className="text-lg font-semibold text-gray-900 mb-2">
            {data.source}
          </div>
          <div className="text-sm text-gray-600 mb-3">
            {data.description}
          </div>
          <div className="text-blue-600 font-medium text-sm">
            Read case study →
          </div>
        </div>
      )

    case 'transparency':
      return (
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-2">
            {data.source}
          </div>
          <div className="text-sm text-gray-600">
            {data.description}
          </div>
        </div>
      )

    case 'performance':
      return (
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {data.value}
          </div>
          <div className="text-sm font-medium text-gray-900">
            {data.metric}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {data.description}
          </div>
        </div>
      )

    default:
      return (
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 mb-2">
            {data.source}
          </div>
          <div className="text-sm text-gray-600">
            {data.description}
          </div>
        </div>
      )
  }
}

// Pre-configured trust signals for VastSilicon
export const vastSiliconTrustSignals: TrustSignal[] = [
  {
    type: 'transparency',
    data: {
      source: 'Open Methodology',
      description: 'All reasoning and data sources available',
      link: '/transparency'
    }
  },
  {
    type: 'transparency',
    data: {
      source: 'Privacy First',
      description: 'Minimal data collection, local processing',
      link: '/privacy'
    }
  }
]

export const productTrustSignals = {
  choicecheck: [
    {
      type: 'transparency',
      data: {
        source: 'USDA Data Sources',
        description: 'All nutritional analysis based on verified databases',
        link: '/products/choicecheck/methodology'
      }
    }
  ] as TrustSignal[],
  
  moneytide: [
    {
      type: 'transparency',
      data: {
        source: 'Bank-Level Security',
        description: 'Your financial data never leaves your device',
        link: '/products/moneytide/security'
      }
    }
  ] as TrustSignal[]
}