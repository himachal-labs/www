import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog'
import { generateArticleSchema } from '@/lib/schema'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{ slug: string[] }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const fullSlug = slug.join('/')
  const post = await getBlogPostBySlug(fullSlug)
  
  if (!post) {
    notFound()
  }

  const articleSchema = generateArticleSchema(
    post.title,
    post.description,
    post.publishDate,
    post.updatedDate || post.publishDate,
    `https://vastsilicon.com/blog/${post.slug}`
  )
  
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema, null, 2),
        }}
      />
      
      {/* Article Header */}
      <header className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Link 
                href="/blog"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Blog
              </Link>
              <span className="text-gray-300">|</span>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryStyles(post.category)}`}>
                {post.category.replace('-', ' ')}
              </span>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.description}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span>{post.readTime} min read</span>
            </div>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg prose-gray max-w-none
                prose-headings:text-gray-900 prose-headings:font-semibold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700
                prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                prose-strong:text-gray-900
                prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* Article Footer */}
      <footer className="border-t border-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Experience Cognitive Augmentation
              </h3>
              <p className="text-gray-600 mb-6">
                See how complexity translation works in practice with our AI-powered decision-making tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/products/choicecheck"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try ChoiceCheck
                </Link>
                <Link 
                  href="/products/moneytide"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Explore MoneyTide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const fullSlug = slug.join('/')
  const post = await getBlogPostBySlug(fullSlug)
  
  if (!post) {
    return {
      title: 'Article Not Found - VastSilicon Blog',
    }
  }
  
  const title = post.seoTitle || `${post.title} | VastSilicon Blog`
  const description = post.metaDescription || post.description
  
  return {
    title,
    description,
    keywords: post.targetKeywords || [
      ...post.tags,
      'cognitive augmentation',
      'AI decision making',
      'complexity translation',
      'agency restoration'
    ],
    authors: [{ name: post.author }],
    alternates: {
      canonical: post.canonicalUrl || `https://vastsilicon.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      url: `https://vastsilicon.com/blog/${post.slug}`,
      siteName: 'VastSilicon',
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate || post.publishDate,
      authors: [post.author],
      tags: post.tags,
      images: post.ogImage ? [
        {
          url: `https://vastsilicon.com${post.ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.ogImage ? [`https://vastsilicon.com${post.ogImage}`] : [],
    },
  }
}

function getCategoryStyles(category: string): string {
  switch (category) {
    case 'problem-spaces':
      return 'bg-blue-100 text-blue-800'
    case 'case-studies':
      return 'bg-green-100 text-green-800'
    case 'philosophy':
      return 'bg-purple-100 text-purple-800'
    case 'insights':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}