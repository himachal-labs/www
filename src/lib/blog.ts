import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPostMetadata {
  title: string
  description: string
  publishDate: string
  updatedDate?: string
  author: string
  category: 'problem-spaces' | 'case-studies' | 'philosophy' | 'insights'
  tags: string[]
  readTime: number
  featured?: boolean
  seoTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  targetKeywords?: string[]
  ogImage?: string
}

export interface BlogPost extends BlogPostMetadata {
  slug: string
  content: string
  excerpt: string
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog')

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const categories = fs.readdirSync(blogDirectory)
  const posts: BlogPost[] = []

  for (const category of categories) {
    const categoryPath = path.join(blogDirectory, category)
    
    if (!fs.statSync(categoryPath).isDirectory()) continue

    const files = fs.readdirSync(categoryPath)
    
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue

      const fullPath = path.join(categoryPath, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      const slug = `${category}/${file.replace(/\.mdx$/, '')}`
      
      posts.push({
        slug,
        content,
        excerpt: generateExcerpt(content),
        ...data.metadata,
      } as BlogPost)
    }
  }

  // Sort by publish date (newest first)
  return posts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      content,
      excerpt: generateExcerpt(content),
      ...data.metadata,
    } as BlogPost
  } catch {
    return null
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.category === category)
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.featured === true).slice(0, 3)
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.tags.includes(tag))
}

export async function getAllBlogTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts()
  const tags = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown formatting and get plain text
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italics
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/```[^`]*```/g, '') // Remove code blocks
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  // Find the last complete sentence within the limit
  const truncated = plainText.substring(0, maxLength)
  const lastPeriod = truncated.lastIndexOf('.')
  const lastExclamation = truncated.lastIndexOf('!')
  const lastQuestion = truncated.lastIndexOf('?')
  
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion)
  
  if (lastSentenceEnd > maxLength * 0.7) {
    return plainText.substring(0, lastSentenceEnd + 1)
  }
  
  // If no good sentence break, cut at last space
  const lastSpace = truncated.lastIndexOf(' ')
  return plainText.substring(0, lastSpace) + '...'
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function validateBlogPostMetadata(data: unknown): BlogPostMetadata {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid blog post metadata')
  }
  
  const metadata = data as Record<string, unknown>
  
  // Required fields validation
  if (!metadata.title || typeof metadata.title !== 'string') {
    throw new Error('Blog post must have a title')
  }
  
  if (!metadata.description || typeof metadata.description !== 'string') {
    throw new Error('Blog post must have a description')
  }
  
  if (!metadata.publishDate || typeof metadata.publishDate !== 'string') {
    throw new Error('Blog post must have a publish date')
  }
  
  if (!metadata.author || typeof metadata.author !== 'string') {
    throw new Error('Blog post must have an author')
  }
  
  if (!metadata.category || typeof metadata.category !== 'string') {
    throw new Error('Blog post must have a category')
  }
  
  if (!metadata.tags || !Array.isArray(metadata.tags)) {
    throw new Error('Blog post must have tags array')
  }
  
  return metadata as unknown as BlogPostMetadata
}