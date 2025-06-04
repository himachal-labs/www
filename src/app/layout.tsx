import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { generateOrganizationSchema } from '@/lib/schema'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'
import PlausibleScript from '@/components/analytics/PlausibleScript'
import FeatureFlagProvider from '@/components/ab-testing/ABTestProvider'
import PerformanceOptimizer, { CriticalCSS, ResourceHints } from '@/components/performance/PerformanceOptimizer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VastSilicon - Cognitive Infrastructure for Human Flourishing',
  description: 'Stop guessing. Start knowing. We build cognitive infrastructure that restores human agency in domains where complexity has overwhelmed choice.',
  keywords: ['AI decision making tools', 'cognitive augmentation apps', 'complex choice simplification', 'food label analysis AI', 'personal finance clarity', 'agency restoration', 'complexity translation'],
  authors: [{ name: 'VastSilicon' }],
  creator: 'VastSilicon',
  publisher: 'VastSilicon',
  alternates: {
    canonical: 'https://vastsilicon.com',
  },
  openGraph: {
    title: 'VastSilicon - Cognitive Infrastructure for Human Flourishing',
    description: 'Stop guessing. Start knowing. Restore human agency with AI-augmented decision-making tools.',
    type: 'website',
    locale: 'en_US',
    url: 'https://vastsilicon.com',
    siteName: 'VastSilicon',
    images: [
      {
        url: 'https://vastsilicon.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VastSilicon - Cognitive Infrastructure for Human Flourishing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VastSilicon - Cognitive Infrastructure for Human Flourishing',
    description: 'Stop guessing. Start knowing.',
    images: ['https://vastsilicon.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <ResourceHints />
        <CriticalCSS />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema, null, 2),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PlausibleScript />
        <AnalyticsProvider>
          <FeatureFlagProvider>
            <PerformanceOptimizer />
            {children}
          </FeatureFlagProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}