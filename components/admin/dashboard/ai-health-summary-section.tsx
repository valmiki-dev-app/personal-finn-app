'use client'

import { motion } from 'framer-motion'
import { ChartContainer } from '../shared/chart-container'
import { type AIMetrics } from '@/lib/admin/admin-types'
import { Zap, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react'

interface AIHealthSummarySectionProps {
  metrics: AIMetrics
}

export function AIHealthSummarySection({ metrics }: AIHealthSummarySectionProps) {
  const stats = [
    {
      label: 'Parse Success Rate',
      value: `${metrics.parseSuccessRate}%`,
      icon: CheckCircle,
      color: 'text-income',
      bgColor: 'bg-income/10',
    },
    {
      label: 'Clarification Rate',
      value: `${metrics.clarificationRate}%`,
      icon: AlertCircle,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Manual Correction',
      value: `${metrics.manualCorrectionRate}%`,
      icon: BarChart3,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
    {
      label: 'Avg Confidence',
      value: `${(metrics.averageConfidenceScore * 100).toFixed(0)}%`,
      icon: Zap,
      color: 'text-foreground',
      bgColor: 'bg-primary/10',
    },
  ]

  return (
    <ChartContainer
      title="AI Health Summary"
      description={`${metrics.todayParseCount} parses today, ${metrics.todayFailedCount} failures`}
      delay={0.6}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className="p-4 rounded-lg bg-muted/50 border border-border/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          )
        })}
      </div>
    </ChartContainer>
  )
}
