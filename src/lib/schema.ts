import { Product } from './schemas'

export interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  description: string
  logo: string
  foundingDate: string
  sameAs: string[]
}

export interface SoftwareApplicationSchema {
  '@context': string
  '@type': string
  name: string
  applicationCategory: string
  operatingSystem: string[]
  description: string
  url: string
  downloadUrl?: string
  offers: {
    '@type': string
    price: string
    priceCurrency: string
  }
  aggregateRating?: {
    '@type': string
    ratingValue: string
    ratingCount: string
  }
}

export interface ArticleSchema {
  '@context': string
  '@type': string
  headline: string
  description: string
  author: {
    '@type': string
    name: string
  }
  publisher: {
    '@type': string
    name: string
    logo: {
      '@type': string
      url: string
    }
  }
  datePublished: string
  dateModified: string
  mainEntityOfPage: string
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VastSilicon',
    url: 'https://vastsilicon.com',
    description: 'Building cognitive infrastructure for human flourishing through AI-augmented decision-making tools',
    logo: 'https://vastsilicon.com/vast_silicon_logo.png',
    foundingDate: '2024',
    sameAs: [
      'https://apps.apple.com/developer/vastsilicon',
    ]
  }
}

export function generateProductSchema(product: Product): SoftwareApplicationSchema {
  const operatingSystems = product.metadata.platforms.map(platform => {
    switch (platform.toLowerCase()) {
      case 'ios': return 'iOS'
      case 'android': return 'Android'
      case 'web': return 'Web Browser'
      default: return platform
    }
  })

  const primaryPlatform = product.links.platforms.find(p => p.available)

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.metadata.name,
    applicationCategory: getApplicationCategory(product.metadata.name),
    operatingSystem: operatingSystems,
    description: product.content.problemStatement,
    url: `https://vastsilicon.com/products/${product.metadata.slug}`,
    downloadUrl: primaryPlatform?.url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }
}

export function generateArticleSchema(
  title: string,
  description: string,
  publishDate: string,
  modifiedDate: string,
  url: string
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: 'VastSilicon'
    },
    publisher: {
      '@type': 'Organization',
      name: 'VastSilicon',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vastsilicon.com/vast_silicon_logo.png'
      }
    },
    datePublished: publishDate,
    dateModified: modifiedDate,
    mainEntityOfPage: url
  }
}

function getApplicationCategory(productName: string): string {
  switch (productName.toLowerCase()) {
    case 'choicecheck':
      return 'HealthApplication'
    case 'moneytide':
      return 'FinanceApplication'
    default:
      return 'ProductivityApplication'
  }
}

export function injectStructuredData(schema: object): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`
}