import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Product, LegacyProductMetadata, validateProduct, migrateLegacyProduct, getDefaultTrustSignals } from './schemas'
import { ProductTemplateProps } from '@/components/product'

// Legacy interface for backward compatibility
export interface LegacyProduct extends LegacyProductMetadata {
  slug: string
  content: string
}

const productsDirectory = path.join(process.cwd(), 'src/content/products')

export async function getAllProducts(): Promise<Product[]> {
  if (!fs.existsSync(productsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(productsDirectory)
  
  const products = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(name => {
      const fullPath = path.join(productsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const slug = name.replace(/\.mdx$/, '')
      
      // Try new format first
      if (validateProduct(data)) {
        return data as Product
      }
      
      // Fall back to legacy format migration
      if (data.metadata && typeof data.metadata === 'object') {
        const migrated = migrateLegacyProduct(data.metadata as LegacyProductMetadata, slug)
        
        // Add default content if missing
        if (!migrated.content) {
          migrated.content = {
            problemStatement: data.metadata.description || '',
            solutionApproach: `${data.metadata.name} provides a solution.`,
            features: data.metadata.features || [],
            userScenarios: [],
            painPoints: [],
            benefits: [],
            expansionVision: `The future of ${data.metadata.name}`,
          }
        }
        
        // Add default trust signals
        if (migrated.growth && !migrated.growth.trustSignals.length) {
          migrated.growth.trustSignals = getDefaultTrustSignals(data.metadata.name)
        }
        
        return migrated as Product
      }
      
      console.warn(`Invalid product data in ${name}`)
      return null
    })
    .filter((product): product is Product => product !== null)
  
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const fullPath = path.join(productsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    // Try new format first
    if (validateProduct(data)) {
      return data as Product
    }
    
    // Fall back to legacy format migration
    if (data.metadata && typeof data.metadata === 'object') {
      const migrated = migrateLegacyProduct(data.metadata as LegacyProductMetadata, slug)
      
      // Add default content if missing
      if (!migrated.content) {
        migrated.content = {
          problemStatement: data.metadata.description || '',
          solutionApproach: `${data.metadata.name} provides a solution.`,
          features: data.metadata.features || [],
          userScenarios: [],
          painPoints: [],
          benefits: [],
          expansionVision: `The future of ${data.metadata.name}`,
        }
      }
      
      // Add default trust signals
      if (migrated.growth && !migrated.growth.trustSignals.length) {
        migrated.growth.trustSignals = getDefaultTrustSignals(data.metadata.name)
      }
      
      return migrated as Product
    }
    
    console.warn(`Invalid product data for ${slug}`)
    return null
  } catch (error) {
    console.error(`Error loading product ${slug}:`, error)
    return null
  }
}

// Convert Product schema to ProductTemplateProps
export function productToTemplateProps(product: Product): ProductTemplateProps {
  return {
    hero: {
      name: product.metadata.name,
      tagline: product.metadata.tagline,
      status: product.metadata.status,
      platforms: product.metadata.platforms,
      heroImage: product.assets.heroImage,
      demoVideo: product.assets.demoVideo,
      primaryAction: product.links.primary,
      secondaryAction: product.links.secondary,
    },
    problemSolution: {
      problem: {
        title: "The Challenge",
        description: product.content.problemStatement,
        painPoints: product.content.painPoints,
      },
      solution: {
        title: "Our Solution",
        description: product.content.solutionApproach,
        benefits: product.content.benefits,
      },
    },
    features: {
      title: "Key Features",
      description: `Discover how ${product.metadata.name} works`,
      items: product.content.features,
      layout: '3-column',
    },
    screenshots: product.assets.screenshots.length > 0 ? {
      title: `${product.metadata.name} in Action`,
      description: "See how it works in real-world scenarios",
      images: product.assets.screenshots.map((src, index) => ({
        src,
        alt: `${product.metadata.name} screenshot ${index + 1}`,
        caption: `Feature ${index + 1}`,
      })),
      navigation: 'both',
    } : undefined,
    availability: {
      title: "Get Started Today",
      description: `Experience ${product.metadata.name} for yourself`,
      platforms: product.links.platforms,
      comingSoon: product.links.comingSoon,
    },
    futureVision: product.content.roadmap ? {
      title: "What's Next",
      description: product.content.expansionVision,
      roadmap: product.content.roadmap,
    } : {
      title: "The Vision",
      description: product.content.expansionVision,
    },
  }
}

// Get all product slugs for static generation
export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getAllProducts()
  return products.map(product => product.metadata.slug)
}