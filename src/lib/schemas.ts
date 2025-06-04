// Enhanced product schemas combining design system with growth optimization

import { TrustSignal } from '@/components/trust/TrustSignals'

export interface ProductMetadata {
  name: string
  slug: string
  tagline: string
  status: 'available' | 'coming-soon' | 'in-development'
  platforms: ('ios' | 'android' | 'web')[]
  primaryColor?: string
  launchDate?: string
  lastUpdated: string
}

export interface ProductAssets {
  heroImage?: string
  demoVideo?: string
  appIcon: string
  screenshots: string[]
  featureImages?: { [key: string]: string }
}

export interface ProductContent {
  // Problem/Solution definition
  problemStatement: string
  solutionApproach: string
  
  // Key features
  features: {
    title: string
    description: string
    icon?: string
    image?: string
    category?: string
  }[]
  
  // User scenarios
  userScenarios: {
    title: string
    description: string
    userType: string
  }[]
  
  // Pain points this product addresses
  painPoints: string[]
  
  // Benefits users get
  benefits: string[]
  
  // Expansion vision
  expansionVision: string
  
  // Future roadmap
  roadmap?: {
    title: string
    description: string
    timeline: string
  }[]
}

export interface ProductLinks {
  primary?: {
    label: string
    href: string
  }
  secondary?: {
    label: string
    href: string
  }
  platforms: {
    name: string
    url: string
    available: boolean
  }[]
  comingSoon?: string[]
}

// Growth optimization configuration
export interface ProductGrowthConfig {
  // Analytics and tracking
  conversionGoals: string[]
  keyMetrics: string[]
  
  // Trust building
  trustSignals: TrustSignal[]
  
  // SEO optimization
  seoMetadata: {
    title?: string
    description?: string
    keywords?: string[]
    canonicalUrl?: string
  }
  
  // A/B testing
  abTests?: {
    name: string
    variants: string[]
    component: string
  }[]
}

// Main product interface combining all aspects
export interface Product {
  metadata: ProductMetadata
  content: ProductContent
  assets: ProductAssets
  links: ProductLinks
  
  // Growth optimization features
  growth: ProductGrowthConfig
}

// Legacy support for existing products
export interface LegacyProductMetadata {
  name: string
  tagline: string
  description: string
  status: 'available' | 'coming-soon' | 'beta'
  platforms: string[]
  primaryColor: string
  hero: {
    image?: string
    video?: string
  }
  features?: {
    title: string
    description: string
    icon: string
  }[]
  screenshots?: string[]
  appStore?: {
    ios?: string
    android?: string
  }
}

// Validation functions
export function validateProductMetadata(metadata: unknown): metadata is ProductMetadata {
  if (typeof metadata !== 'object' || metadata === null) return false
  
  const m = metadata as Record<string, unknown>
  
  return (
    typeof m.name === 'string' &&
    typeof m.slug === 'string' &&
    typeof m.tagline === 'string' &&
    ['available', 'coming-soon', 'in-development'].includes(m.status as string) &&
    Array.isArray(m.platforms) &&
    m.platforms.every(p => ['ios', 'android', 'web'].includes(p as string)) &&
    typeof m.lastUpdated === 'string'
  )
}

export function validateProductContent(content: unknown): content is ProductContent {
  if (typeof content !== 'object' || content === null) return false
  
  const c = content as Record<string, unknown>
  
  return (
    typeof c.problemStatement === 'string' &&
    typeof c.solutionApproach === 'string' &&
    Array.isArray(c.features) &&
    Array.isArray(c.userScenarios) &&
    Array.isArray(c.painPoints) &&
    Array.isArray(c.benefits) &&
    typeof c.expansionVision === 'string'
  )
}

export function validateProduct(product: unknown): product is Product {
  if (typeof product !== 'object' || product === null) return false
  
  const p = product as Record<string, unknown>
  
  return (
    validateProductMetadata(p.metadata) &&
    validateProductContent(p.content) &&
    typeof p.assets === 'object' && p.assets !== null &&
    typeof p.links === 'object' && p.links !== null &&
    typeof p.growth === 'object' && p.growth !== null
  )
}

// Migration helper for legacy products
export function migrateLegacyProduct(legacy: LegacyProductMetadata, slug: string): Partial<Product> {
  return {
    metadata: {
      name: legacy.name,
      slug,
      tagline: legacy.tagline,
      status: legacy.status === 'beta' ? 'coming-soon' : legacy.status,
      platforms: legacy.platforms.map(p => p.toLowerCase()) as ('ios' | 'android' | 'web')[],
      primaryColor: legacy.primaryColor,
      lastUpdated: new Date().toISOString(),
    },
    assets: {
      heroImage: legacy.hero.image,
      demoVideo: legacy.hero.video,
      appIcon: `/images/${slug}/icon.png`,
      screenshots: legacy.screenshots || [],
    },
    links: {
      platforms: [
        ...(legacy.appStore?.ios ? [{
          name: 'iOS',
          url: legacy.appStore.ios,
          available: legacy.status === 'available'
        }] : []),
        ...(legacy.appStore?.android ? [{
          name: 'Android', 
          url: legacy.appStore.android,
          available: legacy.status === 'available'
        }] : []),
      ],
    },
    growth: {
      conversionGoals: ['app_store_click', 'feature_engagement'],
      keyMetrics: ['page_views', 'app_downloads', 'user_engagement'],
      trustSignals: [],
      seoMetadata: {
        title: `${legacy.name} - ${legacy.tagline}`,
        description: legacy.description,
        keywords: [legacy.name.toLowerCase(), 'app', ...legacy.platforms],
      },
    },
  }
}

// Helper functions
export function getStatusVariant(status: ProductMetadata['status']): 'available' | 'coming-soon' | 'in-development' {
  return status
}

export function formatPlatformName(platform: string): string {
  const platformNames: { [key: string]: string } = {
    'ios': 'iOS',
    'android': 'Android',
    'web': 'Web'
  }
  return platformNames[platform] || platform
}

export function getDefaultTrustSignals(productName: string): TrustSignal[] {
  return [
    {
      type: 'transparency',
      data: {
        source: 'Open Methodology',
        description: `See exactly how ${productName} works`,
        link: `/products/${productName.toLowerCase()}/methodology`
      }
    },
    {
      type: 'transparency',
      data: {
        source: 'Privacy First',
        description: 'Your data stays on your device',
        link: `/products/${productName.toLowerCase()}/privacy`
      }
    }
  ]
}