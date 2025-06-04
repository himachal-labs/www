// Simple privacy-first analytics for VastSilicon
// Essential tracking only, aligned with agency restoration philosophy

import { track } from '@vercel/analytics'


export interface AnalyticsEvent {
  name: string
  properties?: Record<string, string | number>
}

// Simple analytics functions
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window !== 'undefined') {
    track(event.name, event.properties)
  }
}

// Essential tracking functions
export function trackAppStoreClick(product: string, platform: 'ios' | 'android'): void {
  trackEvent({
    name: 'app_store_click',
    properties: {
      product,
      platform
    }
  })
}

export function trackPageView(path: string): void {
  trackEvent({
    name: 'pageview',
    properties: {
      path
    }
  })
}

// Utility to check if analytics should be enabled
export function shouldTrackAnalytics(): boolean {
  if (typeof window === 'undefined') return false
  
  // Don't track in development
  if (process.env.NODE_ENV === 'development') return false
  
  // Don't track if user has Do Not Track enabled
  if (navigator.doNotTrack === '1') return false
  
  return true
}

// Simple analytics initialization
export function setupAnalytics(): void {
  // Minimal setup - Plausible handles most tracking automatically
  return
}

// Legacy compatibility exports
export function initScrollTracking(): void {}
export function trackTimeOnPage(): () => void { return () => {} }