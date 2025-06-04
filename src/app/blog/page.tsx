import Link from 'next/link'
import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - VastSilicon | Cognitive Augmentation Insights',
  description: 'Explore how cognitive augmentation restores human agency in complex decisions. Case studies, philosophy, and insights on AI-human collaboration.',
  keywords: ['cognitive augmentation blog', 'AI decision making insights', 'complexity translation', 'agency restoration', 'human-AI collaboration'],
  alternates: {
    canonical: 'https://vastsilicon.com/blog',
  },
  openGraph: {
    title: 'Blog - VastSilicon | Cognitive Augmentation Insights',
    description: 'Explore how cognitive augmentation restores human agency in complex decisions.',
    type: 'website',
    url: 'https://vastsilicon.com/blog',
    siteName: 'VastSilicon',
  },
}

export default async function BlogPage() {
  const featuredPosts = await getFeaturedBlogPosts()
  const allPosts = await getAllBlogPosts()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              Insights on Cognitive Augmentation
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore how we&apos;re restoring human agency in domains where complexity has overwhelmed choice. 
              Real stories, deep philosophy, and practical insights on AI-human collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Featured Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <article key={post.slug} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryStyles(post.category)}`}>
                          {post.category.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.readTime} min read
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Latest Articles
            </h2>
            
            <div className="space-y-8">
              {recentPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryStyles(post.category)}`}>
                          {post.category.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.readTime} min read
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(post.publishDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="inline-flex px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="lg:w-48">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex w-full items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Read Article
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Explore by Category
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                href="/blog/category/problem-spaces"
                className="p-6 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Problem Spaces
                </h3>
                <p className="text-blue-700 text-sm">
                  Domains where complexity overwhelms choice
                </p>
              </Link>
              
              <Link 
                href="/blog/category/case-studies"
                className="p-6 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Case Studies
                </h3>
                <p className="text-green-700 text-sm">
                  Real agency restoration in action
                </p>
              </Link>
              
              <Link 
                href="/blog/category/philosophy"
                className="p-6 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  Philosophy
                </h3>
                <p className="text-purple-700 text-sm">
                  Core principles and deeper thinking
                </p>
              </Link>
              
              <Link 
                href="/blog/category/insights"
                className="p-6 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-orange-900 mb-2">
                  Insights
                </h3>
                <p className="text-orange-700 text-sm">
                  Practical learnings and observations
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
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