import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VastSilicon - Cognitive Infrastructure for Human Flourishing',
  description: 'Stop guessing. Start knowing. We build cognitive infrastructure that restores human agency in domains where complexity has overwhelmed choice.',
  keywords: ['AI', 'cognitive augmentation', 'decision making', 'complexity translation'],
  openGraph: {
    title: 'VastSilicon - Cognitive Infrastructure for Human Flourishing',
    description: 'Stop guessing. Start knowing.',
    type: 'website',
    locale: 'en_US',
    siteName: 'VastSilicon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VastSilicon - Cognitive Infrastructure for Human Flourishing',
    description: 'Stop guessing. Start knowing.',
  },
  robots: {
    index: true,
    follow: true,
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}