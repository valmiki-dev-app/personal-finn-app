'use client'

import { AdminKPICard } from '../shared/admin-kpi-card'
import { type KPIMetric } from '@/lib/admin/admin-types'
import {
  Users,
  Activity,
  TrendingUp,
  CreditCard,
  Target,
  Zap,
} from 'lucide-react'

interface KPISectionProps {
  metrics: KPIMetric[]
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-6 w-6" />,
  Activity: <Activity className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  CreditCard: <CreditCard className="h-6 w-6" />,
  Target: <Target className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
}

export function KPISection({ metrics }: KPISectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => {
        const icon = metric.icon ? iconMap[metric.icon] : undefined
        const typeMap = {
          positive: 'positive' as const,
          negative: 'negative' as const,
          neutral: 'neutral' as const,
          default: 'default' as const,
        }

        return (
          <AdminKPICard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeLabel={metric.changeLabel}
            type={typeMap[metric.type || 'default']}
            icon={icon}
            delay={index * 0.05}
          />
        )
      })}
    </div>
  )
}
