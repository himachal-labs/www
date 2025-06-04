'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { setupAnalytics, trackPageView } from '@/lib/analytics'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize analytics on mount
    setupAnalytics()
  }, [])

  useEffect(() => {
    // Track page views (Plausible handles most analytics automatically)
    trackPageView(pathname)
  }, [pathname])

  return <>{children}</>
}