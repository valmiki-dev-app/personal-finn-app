'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type ProductInsight } from '@/lib/admin/admin-types'

interface InsightCardProps {
  insight: ProductInsight
  className?: string
}

export function InsightCard({ insight, className }: InsightCardProps) {
  const trend = insight.trend ?? 'stable'

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor =
    trend === 'up' ? 'text-income' : trend === 'down' ? 'text-expense' : 'text-muted-foreground'

  return (
    <div className={cn('flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30', className)}>
      <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg bg-card flex-shrink-0', trendColor)}>
        <TrendIcon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{insight.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{insight.description}</p>
        <p className={cn('text-xs font-semibold mt-1.5', trendColor)}>{insight.value}</p>
      </div>
    </div>
  )
}
