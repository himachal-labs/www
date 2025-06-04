import { Metadata } from 'next'
import GrowthDashboard from '@/components/dashboard/GrowthDashboard'

export const metadata: Metadata = {
  title: 'Growth Dashboard - VastSilicon',
  description: 'Monitor growth metrics, A/B test results, and performance analytics for VastSilicon website.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GrowthDashboard />
    </div>
  )
}