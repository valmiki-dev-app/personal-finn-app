'use client'

import { KPISection } from '@/components/admin/dashboard/kpi-section'
import { ProductInsightsSection } from '@/components/admin/dashboard/product-insights-section'
import { ActivitySection } from '@/components/admin/dashboard/activity-section'
import { RetentionOverviewSection } from '@/components/admin/dashboard/retention-overview-section'
import { AIHealthSummarySection } from '@/components/admin/dashboard/ai-health-summary-section'
import {
  kpiMetrics,
  productInsights,
  activityFeed,
  aiMetrics,
} from '@/lib/admin/admin-mock-data'

export default function AdminDashboardPage() {
  // Calculate retention rates from activity data
  const d1Retention = 72
  const d7Retention = 62
  const d30Retention = 45

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor product health and user engagement in real-time
        </p>
      </div>

      {/* KPI Cards */}
      <KPISection metrics={kpiMetrics} />

      {/* Retention Overview */}
      <RetentionOverviewSection
        d1={d1Retention}
        d7={d7Retention}
        d30={d30Retention}
      />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Insights - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ProductInsightsSection insights={productInsights} />
        </div>

        {/* AI Health Summary - Takes 1 column */}
        <div className="lg:col-span-1">
          <AIHealthSummarySection metrics={aiMetrics} />
        </div>
      </div>

      {/* Activity Feed */}
      <ActivitySection activities={activityFeed} />
    </div>
  )
}
