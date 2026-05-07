'use client'

import { motion } from 'framer-motion'
import { InsightCard } from '../shared/insight-card'
import { type ProductInsight } from '@/lib/admin/admin-types'
import { ChartContainer } from '../shared/chart-container'

interface ProductInsightsSectionProps {
  insights: ProductInsight[]
}

export function ProductInsightsSection({ insights }: ProductInsightsSectionProps) {
  return (
    <ChartContainer
      title="Product Insights"
      description="Key metrics and trends from your product"
      delay={0.3}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <InsightCard
            key={index}
            insight={insight}
            delay={0.3 + index * 0.05}
          />
        ))}
      </div>
    </ChartContainer>
  )
}
