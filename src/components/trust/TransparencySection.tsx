import Link from 'next/link'

interface TransparencyItem {
  title: string
  description: string
  details?: string[]
  link?: string
  icon?: 'methodology' | 'data' | 'privacy' | 'research' | 'limitations'
}

interface TransparencySectionProps {
  title: string
  subtitle?: string
  items: TransparencyItem[]
  className?: string
}

export default function TransparencySection({ title, subtitle, items, className = '' }: TransparencySectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <TransparencyCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TransparencyCard({ item }: { item: TransparencyItem }) {
  const cardContent = (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <IconComponent type={item.icon} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {item.title}
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {item.description}
          </p>
          
          {item.details && item.details.length > 0 && (
            <ul className="space-y-2 mb-4">
              {item.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
          
          {item.link && (
            <div className="text-blue-600 font-medium text-sm">
              Learn more →
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (item.link) {
    return (
      <Link 
        href={item.link}
        className="block h-full hover:scale-105 transition-transform"
      >
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

function IconComponent({ type }: { type?: TransparencyItem['icon'] }) {
  const iconClasses = "w-8 h-8"
  
  switch (type) {
    case 'methodology':
      return (
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg className={`${iconClasses} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
      )
    
    case 'data':
      return (
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className={`${iconClasses} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
      )
    
    case 'privacy':
      return (
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className={`${iconClasses} text-purple-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      )
    
    case 'research':
      return (
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg className={`${iconClasses} text-orange-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      )
    
    case 'limitations':
      return (
        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <svg className={`${iconClasses} text-yellow-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      )
    
    default:
      return (
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg className={`${iconClasses} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
  }
}

// Pre-configured transparency sections
export const choiceCheckTransparency: TransparencyItem[] = [
  {
    title: 'Methodology',
    description: 'How we analyze nutrition and provide recommendations',
    icon: 'methodology',
    details: [
      'Real-time nutrition database analysis',
      'Personalized health goal mapping',
      'Evidence-based ingredient evaluation',
      'Context-aware recommendation engine'
    ],
    link: '/products/choicecheck/methodology'
  },
  {
    title: 'Data Sources',
    description: 'The verified databases and research we rely on',
    icon: 'data',
    details: [
      'USDA Food Data Central',
      'Peer-reviewed nutrition research',
      'FDA ingredient safety database',
      'WHO dietary guidelines'
    ],
    link: '/products/choicecheck/data-sources'
  },
  {
    title: 'Limitations',
    description: 'What we can and cannot do, stated honestly',
    icon: 'limitations',
    details: [
      'Cannot replace professional medical advice',
      'Accuracy depends on product label completeness',
      'Personalization improves with usage over time',
      'Some rare ingredients may not be fully analyzed'
    ],
    link: '/products/choicecheck/limitations'
  },
  {
    title: 'Privacy Approach',
    description: 'How we protect your personal health information',
    icon: 'privacy',
    details: [
      'Local processing - data stays on your device',
      'No personal information sold or shared',
      'Minimal data collection for core functionality',
      'User-controlled data deletion'
    ],
    link: '/products/choicecheck/privacy'
  }
]

export const moneyTideTransparency: TransparencyItem[] = [
  {
    title: 'Security Model',
    description: 'Bank-level security for your financial data',
    icon: 'privacy',
    details: [
      'End-to-end encryption',
      'Local data processing',
      'No financial data stored on servers',
      'Read-only access to transaction data'
    ],
    link: '/products/moneytide/security'
  },
  {
    title: 'Analysis Methods',
    description: 'How we identify patterns and insights',
    icon: 'methodology',
    details: [
      'Machine learning pattern recognition',
      'Category classification algorithms',
      'Spending trend analysis',
      'Predictive cash flow modeling'
    ],
    link: '/products/moneytide/methodology'
  },
  {
    title: 'Data Handling',
    description: 'What we do and don\'t do with your financial information',
    icon: 'data',
    details: [
      'Transaction data processed locally only',
      'No sharing with financial institutions',
      'Aggregated insights only (never personal)',
      'User-controlled data retention'
    ],
    link: '/products/moneytide/data-handling'
  },
  {
    title: 'Limitations',
    description: 'The boundaries of our financial analysis',
    icon: 'limitations',
    details: [
      'Cannot provide investment advice',
      'Analysis quality depends on transaction completeness',
      'Some financial institutions not yet supported',
      'Predictive insights are estimates, not guarantees'
    ],
    link: '/products/moneytide/limitations'
  }
]