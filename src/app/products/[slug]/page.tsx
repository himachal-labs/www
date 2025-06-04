import { notFound } from 'next/navigation'
import { getProductBySlug, getAllProducts, productToTemplateProps } from '@/lib/products'
import { ProductTemplate } from '@/components/product'
import TrustSignals from '@/components/trust/TrustSignals'
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

  // Convert product data to template props
  const templateProps = productToTemplateProps(product)
  
  // Additional sections for trust signals and growth features
  const additionalSections = [
    // Trust Signals Section
    product.growth.trustSignals.length > 0 && (
      <section key="trust-signals" className="py-section bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-large">
            <h2 className="text-heading-1 text-vast-gray-900 mb-4">
              Trusted & Transparent
            </h2>
            <p className="text-body-lg text-vast-gray-600">
              Built with transparency and user control at the core
            </p>
          </div>
          <TrustSignals 
            signals={product.growth.trustSignals} 
            layout="grid"
          />
        </div>
      </section>
    ),
  ].filter(Boolean)
  
  return (
    <main>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": product.metadata.name,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": product.metadata.platforms.join(", "),
            "description": product.content.problemStatement,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }, null, 2),
        }}
      />
      
      {/* Use the unified ProductTemplate */}
      <ProductTemplate 
        {...templateProps} 
        additionalSections={additionalSections}
      />
    </main>
  )
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getAllProducts()
  
  return products.map((product) => ({
    slug: product.metadata.slug,
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
  
  const seoMetadata = product.growth.seoMetadata
  
  return {
    title: seoMetadata.title || `${product.metadata.name} - ${product.metadata.tagline} | VastSilicon`,
    description: seoMetadata.description || product.content.problemStatement,
    keywords: seoMetadata.keywords || [
      product.metadata.name.toLowerCase(),
      `${product.metadata.name.toLowerCase()} app`,
      'AI decision making',
      'cognitive augmentation',
      ...product.metadata.platforms
    ],
    alternates: {
      canonical: seoMetadata.canonicalUrl || `https://vastsilicon.com/products/${product.metadata.slug}`,
    },
    openGraph: {
      title: `${product.metadata.name} - ${product.metadata.tagline}`,
      description: product.content.problemStatement,
      type: 'website',
      url: `https://vastsilicon.com/products/${product.metadata.slug}`,
      siteName: 'VastSilicon',
      images: product.assets.heroImage ? [
        {
          url: `https://vastsilicon.com${product.assets.heroImage}`,
          width: 1200,
          height: 630,
          alt: `${product.metadata.name} app interface`,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.metadata.name} - ${product.metadata.tagline}`,
      description: product.content.problemStatement,
      images: product.assets.heroImage ? [`https://vastsilicon.com${product.assets.heroImage}`] : [],
    },
  }
}