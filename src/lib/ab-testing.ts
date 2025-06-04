// Simple feature flags for VastSilicon
// Basic configuration management without complex A/B testing

export interface FeatureFlag {
  id: string
  name: string
  description: string
  isEnabled: boolean
  config: Record<string, any>
}

// Get feature flag configuration
export function getFeatureConfig(flagId: string): Record<string, any> {
  const flag = featureFlags.find(f => f.id === flagId)
  return flag?.isEnabled ? flag.config : {}
}

// Check if feature is enabled
export function isFeatureEnabled(flagId: string): boolean {
  const flag = featureFlags.find(f => f.id === flagId)
  return flag?.isEnabled ?? false
}

// Feature flags configuration
export const featureFlags: FeatureFlag[] = [
  {
    id: 'hero_message_clarity',
    name: 'Hero Message Configuration',
    description: 'Configure hero section messaging',
    isEnabled: true,
    config: {
      heroTitle: 'Stop guessing. Start knowing.',
      heroSubtitle: 'We don\'t simplify your world. We make it comprehensible. Complexity isn\'t the problem—it\'s potential waiting for translation.'
    }
  },
  
  {
    id: 'trust_signal_placement',
    name: 'Trust Signal Placement',
    description: 'Configure trust signal placement on homepage',
    isEnabled: true,
    config: {
      trustSignalPlacement: 'below_hero'
    }
  },

  {
    id: 'cta_button_text',
    name: 'CTA Button Configuration',
    description: 'Configure call-to-action button text',
    isEnabled: true,
    config: {
      ctaText: 'Download for iOS'
    }
  },

  {
    id: 'philosophy_explanation',
    name: 'Philosophy Display',
    description: 'Configure how much philosophy to show',
    isEnabled: true,
    config: {
      showFullPhilosophy: true,
      philosophyDepth: 'full'
    }
  }
]

// Legacy exports for backwards compatibility
export interface ABTestVariant {
  id: string
  name: string
  weight: number
  config: Record<string, any>
}

export interface ABTest {
  id: string
  name: string
  description: string
  isActive: boolean
  variants: ABTestVariant[]
}

// Legacy compatibility functions
export const activeTests: ABTest[] = []

export function assignToVariant(test: ABTest): ABTestVariant {
  return { id: 'control', name: 'Control', weight: 1, config: {} }
}

export function trackTestExposure(): void {}
export function trackTestConversion(): void {}