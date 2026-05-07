'use client'

import { type AIMetrics } from '@/lib/admin/admin-types'
import { CheckCircle, AlertCircle, RefreshCw, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIHealthSummarySectionProps {
  metrics: AIMetrics
}

interface StatRowProps {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  barColor: string
  barValue: number
}

function StatRow({ label, value, icon: Icon, color, bg, barColor, barValue }: StatRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0', bg)}>
        <Icon className={cn('h-3.5 w-3.5', color)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className={cn('text-xs font-semibold', color)}>{value}</span>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-700', barColor)}
            style={{ width: `${barValue}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function AIHealthSummarySection({ metrics }: AIHealthSummarySectionProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">AI Health</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {metrics.todayParseCount.toLocaleString()} parses today &middot; {metrics.todayFailedCount} failed
        </p>
      </div>

      <div className="space-y-4">
        <StatRow
          label="Parse success"
          value={`${metrics.parseSuccessRate}%`}
          icon={CheckCircle}
          color="text-income"
          bg="bg-income/10"
          barColor="bg-income"
          barValue={metrics.parseSuccessRate}
        />
        <StatRow
          label="Clarification rate"
          value={`${metrics.clarificationRate}%`}
          icon={AlertCircle}
          color="text-primary"
          bg="bg-primary/10"
          barColor="bg-primary"
          barValue={metrics.clarificationRate * 10}
        />
        <StatRow
          label="Manual correction"
          value={`${metrics.manualCorrectionRate}%`}
          icon={RefreshCw}
          color="text-gold"
          bg="bg-gold/10"
          barColor="bg-gold"
          barValue={metrics.manualCorrectionRate * 10}
        />
        <StatRow
          label="Avg confidence"
          value={`${(metrics.averageConfidenceScore * 100).toFixed(0)}%`}
          icon={Zap}
          color="text-foreground"
          bg="bg-muted"
          barColor="bg-foreground/40"
          barValue={metrics.averageConfidenceScore * 100}
        />
      </div>
    </div>
  )
}
