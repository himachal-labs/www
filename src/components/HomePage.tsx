'use client'

import TrustSignals, { vastSiliconTrustSignals } from '@/components/trust/TrustSignals'
import { useABTest } from '@/components/ab-testing/ABTestProvider'
import { TimeOnPageTracker, PhilosophyEngagementTracker } from '@/components/ab-testing/ConversionTracker'

export default function HomePage() {
  const heroTest = useABTest('hero_message_clarity')
  const trustSignalTest = useABTest('trust_signal_placement')

  const heroConfig = heroTest.config || {
    heroTitle: 'Stop guessing. Start knowing.',
    heroSubtitle: 'We don\'t simplify your world. We make it comprehensible. Complexity isn\'t the problem—it\'s potential waiting for translation.'
  }

  return (
    <>
      <TimeOnPageTracker pageName="homepage" threshold={30000} />
      
      {/* Hero Section - Philosophy Demonstration */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            {heroConfig.heroTitle}
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {heroConfig.heroSubtitle}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* The Problem */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Agency Crisis</h3>
              <p className="text-gray-600 leading-relaxed">
                Modern systems generate more choices, data, and nuance than humans can process. 
                We&apos;re drowning in complexity, surrendering agency from exhaustion, not ignorance.
              </p>
            </div>
            
            {/* Our Solution */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cognitive Translation</h3>
              <p className="text-gray-600 leading-relaxed">
                We restore human agency through AI-augmented decision-making. 
                Think better, not less. Understand complexity, don&apos;t fear it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals - A/B test placement */}
      {trustSignalTest.config?.trustSignalPlacement === 'below_hero' && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Trusted by Those Who Value Agency
              </h2>
              <TrustSignals 
                signals={vastSiliconTrustSignals} 
                layout="grid"
              />
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Trust Signals - Alternative placement */}
          {trustSignalTest.config?.trustSignalPlacement === 'above_products' && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Trusted by Those Who Value Agency
              </h2>
              <TrustSignals 
                signals={vastSiliconTrustSignals} 
                layout="grid"
                className="mb-16"
              />
            </div>
          )}

          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Agency Restoration in Action
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* ChoiceCheck */}
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-8 mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">ChoiceCheck</h3>
                <p className="text-gray-600 mb-4">
                  Restore agency in food and health decisions
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Available on iOS
                </div>
              </div>
              <p className="text-gray-600">
                Stop drowning in labels and science. Get instant comprehension of what matters for your health.
              </p>
            </div>
            
            {/* MoneyTide */}
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-8 mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">MoneyTide</h3>
                <p className="text-gray-600 mb-4">
                  Restore agency in financial decisions
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Available on iOS
                </div>
              </div>
              <p className="text-gray-600">
                Transform opaque financial data into clear patterns. See your money relationships with clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <PhilosophyEngagementTracker>
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">
                Building Cognitive Infrastructure for the Next Century
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Every domain where complexity has overwhelmed choice is an opportunity 
                to restore human agency. Food, finance, health, technology—the pattern scales. 
                Cognitive augmentation as a human right.
              </p>
            </div>
          </div>
        </section>
      </PhilosophyEngagementTracker>
    </>
  )
}