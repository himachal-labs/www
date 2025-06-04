'use client'

import React, { createContext, useContext } from 'react'
import { getFeatureConfig } from '@/lib/ab-testing'

interface FeatureFlagContextType {
  getConfig: (flagId: string) => Record<string, any>
}

const FeatureFlagContext = createContext<FeatureFlagContextType | null>(null)

interface FeatureFlagProviderProps {
  children: React.ReactNode
}

export default function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const getConfig = (flagId: string): Record<string, any> => {
    return getFeatureConfig(flagId)
  }

  return (
    <FeatureFlagContext.Provider value={{ getConfig }}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

export function useFeatureFlag(flagId: string) {
  const context = useContext(FeatureFlagContext)
  if (!context) {
    throw new Error('useFeatureFlag must be used within FeatureFlagProvider')
  }
  return context.getConfig(flagId)
}

// Legacy compatibility for existing components
export function useABTest(testId: string) {
  const config = useFeatureFlag(testId)
  return { config }
}

export function useTrackConversion() {
  return () => {} // No-op for simplified version
}