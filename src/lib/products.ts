import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ProductMetadata {
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

export interface Product extends ProductMetadata {
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
      const { data, content } = matter(fileContents)
      
      return {
        slug: name.replace(/\.mdx$/, ''),
        content,
        ...data.metadata,
      } as Product
    })
  
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const fullPath = path.join(productsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      content,
      ...data.metadata,
    } as Product
  } catch {
    return null
  }
}

export function validateProductMetadata(data: unknown): ProductMetadata {
  // Basic validation - can be enhanced with zod or similar
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid product metadata')
  }
  
  return data as ProductMetadata
}