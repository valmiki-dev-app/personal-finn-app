'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type ProductInsight } from '@/lib/admin/admin-types'

interface InsightCardProps {
  insight: ProductInsight
  className?: string
  delay?: number
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
}

export function InsightCard({
  insight,
  className,
  delay = 0,
}: InsightCardProps) {
  const TrendIcon = trendIcons[insight.trend || 'stable']

  const trendColors = {
    up: 'text-income',
    down: 'text-expense',
    stable: 'text-muted-foreground',
  }

  const bgColors = {
    up: 'bg-income/5',
    down: 'bg-expense/5',
    stable: 'bg-primary/5',
  }

  const trend = insight.trend || 'stable'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
      className={cn(
        'rounded-xl p-4 border border-border/50 transition-shadow hover:shadow-sm',
        bgColors[trend],
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground mb-1">{insight.title}</p>
          <p className="text-xs text-muted-foreground">{insight.description}</p>
        </div>
        <div className={cn('flex-shrink-0 ml-2', trendColors[trend])}>
          <TrendIcon className="h-4 w-4" />
        </div>
      </div>

      <p className="text-lg font-semibold text-foreground">{insight.value}</p>
    </motion.div>
  )
}
