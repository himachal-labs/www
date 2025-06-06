'use client'

import TrustSignals, { vastSiliconTrustSignals } from '@/components/trust/TrustSignals'

export default function HomePage() {
  const heroConfig = {
    heroTitle: 'Stop guessing. Start knowing.',
    heroSubtitle: 'We don\'t simplify your world. We make it comprehensible. Complexity isn\'t the problem—it\'s potential waiting for translation.'
  }

  return (
    <>
      
      {/* Hero Section - Philosophy Demonstration */}
      <section className="container mx-auto px-4 py-20 bg-neutral-0 dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-primary-950 dark:text-neutral-0 mb-8">
            {heroConfig.heroTitle}
          </h1>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {heroConfig.heroSubtitle}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* The Problem */}
            <div className="bg-neutral-0 dark:bg-neutral-900 rounded-lg p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-2xl font-semibold text-primary-950 dark:text-neutral-0 mb-4">The Agency Crisis</h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Modern systems generate more choices, data, and nuance than humans can process. 
                We&apos;re drowning in complexity, surrendering agency from exhaustion, not ignorance.
              </p>
            </div>
            
            {/* Our Solution */}
            <div className="bg-neutral-0 dark:bg-neutral-900 rounded-lg p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-2xl font-semibold text-primary-950 dark:text-neutral-0 mb-4">Cognitive Translation</h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We restore human agency through AI-augmented decision-making. 
                Think better, not less. Understand complexity, don&apos;t fear it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-primary-950 dark:text-neutral-0 mb-12">
                Trusted by Those Who Value Agency
              </h2>
              <TrustSignals 
                signals={vastSiliconTrustSignals} 
                layout="grid"
              />
            </div>
          </div>
        </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16 bg-neutral-0 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center text-primary-950 dark:text-neutral-0 mb-16">
            Agency Restoration in Action
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* ChoiceCheck */}
            <div className="text-center">
              <div className="bg-secondary-50 dark:bg-secondary-950/10 rounded-lg p-8 mb-6 border border-secondary-100 dark:border-secondary-900/20">
                <h3 className="text-2xl font-semibold text-primary-950 dark:text-neutral-0 mb-4">ChoiceCheck</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Restore agency in food and health decisions
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 dark:bg-success-600/20 text-success-700 dark:text-success-400">
                  Available on iOS
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300">
                Stop drowning in labels and science. Get instant comprehension of what matters for your health.
              </p>
            </div>
            
            {/* MoneyTide */}
            <div className="text-center">
              <div className="bg-success-50 dark:bg-success-950/10 rounded-lg p-8 mb-6 border border-success-100 dark:border-success-900/20">
                <h3 className="text-2xl font-semibold text-primary-950 dark:text-neutral-0 mb-4">MoneyTide</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Restore agency in financial decisions
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 dark:bg-success-600/20 text-success-700 dark:text-success-400">
                  Available on iOS
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300">
                Transform opaque financial data into clear patterns. See your money relationships with clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-primary-950 dark:bg-primary-900 text-neutral-0 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              Building Cognitive Infrastructure for the Next Century
            </h2>
            <p className="text-xl text-neutral-300 dark:text-neutral-200 leading-relaxed">
              Every domain where complexity has overwhelmed choice is an opportunity 
              to restore human agency. Food, finance, health, technology—the pattern scales. 
              Cognitive augmentation as a human right.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}