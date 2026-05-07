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
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Product health and user engagement
        </p>
      </div>

      {/* KPI Cards — 2 cols on mobile, 3 on desktop */}
      <KPISection metrics={kpiMetrics} />

      {/* Retention row */}
      <RetentionOverviewSection d1={72} d7={62} d30={45} />

      {/* Middle row: Insights (2/3) + AI Health (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ProductInsightsSection insights={productInsights} />
        </div>
        <div className="lg:col-span-1">
          <AIHealthSummarySection metrics={aiMetrics} />
        </div>
      </div>

      {/* Activity Feed */}
      <ActivitySection activities={activityFeed} />
    </div>
  )
}
