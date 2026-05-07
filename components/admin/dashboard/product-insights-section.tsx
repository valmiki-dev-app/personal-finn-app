'use client'

import { InsightCard } from '../shared/insight-card'
import { type ProductInsight } from '@/lib/admin/admin-types'

interface ProductInsightsSectionProps {
  insights: ProductInsight[]
}

export function ProductInsightsSection({ insights }: ProductInsightsSectionProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Product Insights</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Key findings from user behaviour</p>
      </div>
      <div className="space-y-2.5">
        {insights.map((insight, index) => (
          <InsightCard key={index} insight={insight} />
        ))}
      </div>
    </div>
  )
}
