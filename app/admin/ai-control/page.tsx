'use client'

import { aiMetrics, parseEvents } from '@/lib/admin/admin-mock-data'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusConfig = {
  success: { icon: CheckCircle, color: 'text-income', label: 'Success', bg: 'bg-income/10' },
  clarification: { icon: AlertCircle, color: 'text-gold', label: 'Clarification', bg: 'bg-gold/10' },
  failed: { icon: XCircle, color: 'text-expense', label: 'Failed', bg: 'bg-expense/10' },
}

export default function AdminAIControlPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">AI Control</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Monitor AI parse performance and events</p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Parse success', value: `${aiMetrics.parseSuccessRate}%`, color: 'text-income' },
          { label: 'Clarification rate', value: `${aiMetrics.clarificationRate}%`, color: 'text-primary' },
          { label: 'Manual correction', value: `${aiMetrics.manualCorrectionRate}%`, color: 'text-gold' },
          { label: 'Avg confidence', value: `${(aiMetrics.averageConfidenceScore * 100).toFixed(0)}%`, color: 'text-foreground' },
        ].map((item) => (
          <div key={item.label} className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className={cn('text-2xl font-bold mt-1', item.color)}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Parse events */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recent Parse Events</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {aiMetrics.todayParseCount.toLocaleString()} total today &middot; {aiMetrics.todayFailedCount} failed
          </p>
        </div>
        <div className="space-y-2">
          {parseEvents.map((event) => {
            const config = statusConfig[event.status]
            const Icon = config.icon
            return (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0', config.bg)}>
                  <Icon className={cn('h-3.5 w-3.5', config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground font-mono truncate">
                      &quot;{event.originalMessage}&quot;
                    </p>
                    <span className={cn('text-xs font-medium flex-shrink-0', config.color)}>{config.label}</span>
                  </div>
                  {event.status !== 'failed' && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {event.parsedResult.category} &middot; {event.parsedResult.amount > 0 ? `₽${event.parsedResult.amount.toLocaleString()}` : 'no amount'} &middot; confidence {(event.confidenceScore * 100).toFixed(0)}%
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
