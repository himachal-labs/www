import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProductBySlug, getAllProducts } from '@/lib/products'
import { generateProductSchema } from '@/lib/schema'
import TrustSignals, { productTrustSignals } from '@/components/trust/TrustSignals'
import TransparencySection, { choiceCheckTransparency, moneyTideTransparency } from '@/components/trust/TransparencySection'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }

  const productSchema = generateProductSchema(product)
  const trustSignals = productTrustSignals[product.slug as keyof typeof productTrustSignals] || []
  const transparencyItems = product.slug === 'choicecheck' ? choiceCheckTransparency : 
                           product.slug === 'moneytide' ? moneyTideTransparency : []
  
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema, null, 2),
        }}
      />
      {/* Product Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {product.tagline}
                </p>
                
                {/* Status Badge */}
                <div className="flex items-center gap-4 mb-8">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                    product.status === 'available' ? 'bg-green-100 text-green-800' :
                    product.status === 'beta' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status === 'available' ? 'Available Now' :
                     product.status === 'beta' ? 'Beta' : 'Coming Soon'}
                  </span>
                  
                  {/* Platform Badges */}
                  {product.platforms.map(platform => (
                    <span 
                      key={platform}
                      className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800"
                    >
                      {platform.toUpperCase()}
                    </span>
                  ))}
                </div>
                
                {/* App Store Links */}
                {product.appStore && (
                  <div className="flex gap-4">
                    {product.appStore.ios && (
                      <a 
                        href={product.appStore.ios}
                        className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download for iOS
                      </a>
                    )}
                    {product.appStore.android && (
                      <a 
                        href={product.appStore.android}
                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get on Android
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                {product.hero.image && (
                  <div className="max-w-md w-full">
                    <Image 
                      src={product.hero.image} 
                      alt={`${product.name} app interface`}
                      width={400}
                      height={300}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Key Features
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {product.features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gray-50 rounded-lg p-6 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Screenshots */}
      {product.screenshots && product.screenshots.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                See It In Action
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {product.screenshots.map((screenshot, index) => (
                  <Image 
                    key={index}
                    src={screenshot} 
                    alt={`${product.name} screenshot ${index + 1}`}
                    width={300}
                    height={600}
                    className="w-full rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Signals */}
      {trustSignals.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Trusted & Transparent
              </h2>
              <TrustSignals 
                signals={trustSignals} 
                layout="grid"
              />
            </div>
          </div>
        </section>
      )}

      {/* Transparency Section */}
      {transparencyItems.length > 0 && (
        <TransparencySection
          title="How It Works"
          subtitle="Complete transparency in our methodology, data sources, and limitations."
          items={transparencyItems}
          className="bg-gray-50"
        />
      )}

      {/* Back to Home */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getAllProducts()
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found - VastSilicon',
    }
  }
  
  return {
    title: `${product.name} - ${product.tagline} | VastSilicon`,
    description: product.description,
    keywords: [
      product.name.toLowerCase(),
      `${product.name.toLowerCase()} app`,
      'AI decision making',
      'cognitive augmentation',
      ...(product.name.toLowerCase() === 'choicecheck' ? ['food analysis', 'nutrition AI', 'healthy eating'] : []),
      ...(product.name.toLowerCase() === 'moneytide' ? ['personal finance', 'money management', 'financial clarity'] : [])
    ],
    alternates: {
      canonical: `https://vastsilicon.com/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} - ${product.tagline}`,
      description: product.description,
      type: 'website',
      url: `https://vastsilicon.com/products/${product.slug}`,
      siteName: 'VastSilicon',
      images: product.hero.image ? [
        {
          url: `https://vastsilicon.com${product.hero.image}`,
          width: 1200,
          height: 630,
          alt: `${product.name} app interface`,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${product.tagline}`,
      description: product.description,
      images: product.hero.image ? [`https://vastsilicon.com${product.hero.image}`] : [],
    },
  }
}