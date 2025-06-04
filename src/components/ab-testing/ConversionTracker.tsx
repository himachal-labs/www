'use client'

import { useEffect, useCallback } from 'react'
import { useTrackConversion } from './ABTestProvider'

interface ConversionTrackerProps {
  testId: string
  conversionType: string
  trigger?: 'mount' | 'click' | 'scroll' | 'time'
  delay?: number
  children?: React.ReactNode
  onClick?: () => void
}

export default function ConversionTracker({ 
  testId, 
  conversionType, 
  trigger = 'mount',
  delay = 0,
  children,
  onClick
}: ConversionTrackerProps) {
  const trackConversion = useTrackConversion()

  const handleConversion = useCallback(() => {
    if (delay > 0) {
      setTimeout(() => {
        trackConversion()
      }, delay)
    } else {
      trackConversion()
    }
  }, [delay, trackConversion])

  useEffect(() => {
    if (trigger === 'mount') {
      handleConversion()
    } else if (trigger === 'time' && delay > 0) {
      const timer = setTimeout(() => {
        trackConversion()
      }, delay)
      return () => clearTimeout(timer)
    } else if (trigger === 'scroll') {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        if (scrollPercent > 50) { // 50% scroll depth
          trackConversion()
          window.removeEventListener('scroll', handleScroll)
        }
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [trigger, delay, trackConversion, handleConversion])

  const handleClick = () => {
    if (trigger === 'click') {
      handleConversion()
    }
    if (onClick) {
      onClick()
    }
  }

  if (!children) {
    return null
  }

  if (trigger === 'click') {
    return (
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
    )
  }

  return <>{children}</>
}

// Specific conversion trackers for common actions
export function AppStoreClickTracker({ children, platform, onClick }: { 
  children: React.ReactNode
  platform: 'ios' | 'android'
  onClick?: () => void 
}) {
  return (
    <ConversionTracker
      testId="cta_button_text"
      conversionType={`app_store_click_${platform}`}
      trigger="click"
      onClick={onClick}
    >
      {children}
    </ConversionTracker>
  )
}

export function ProductPageViewTracker({ productSlug }: { productSlug: string }) {
  return (
    <ConversionTracker
      testId="hero_message_clarity"
      conversionType={`product_page_view_${productSlug}`}
      trigger="mount"
    />
  )
}

export function PhilosophyEngagementTracker({ children }: { children: React.ReactNode }) {
  return (
    <ConversionTracker
      testId="philosophy_explanation"
      conversionType="philosophy_engagement"
      trigger="scroll"
      delay={5000} // 5 seconds
    >
      {children}
    </ConversionTracker>
  )
}

export function TimeOnPageTracker({ pageName, threshold = 30000 }: { 
  pageName: string
  threshold?: number 
}) {
  return (
    <ConversionTracker
      testId="hero_message_clarity"
      conversionType={`time_on_page_${pageName}`}
      trigger="time"
      delay={threshold}
    />
  )
}