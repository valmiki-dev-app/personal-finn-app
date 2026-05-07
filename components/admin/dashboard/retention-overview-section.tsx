'use client'

import { motion } from 'framer-motion'
import { ChartContainer } from '../shared/chart-container'

interface RetentionOverviewSectionProps {
  d1: number
  d7: number
  d30: number
}

export function RetentionOverviewSection({
  d1,
  d7,
  d30,
}: RetentionOverviewSectionProps) {
  const retentionMetrics = [
    { label: 'D1', value: d1, color: 'bg-income' },
    { label: 'D7', value: d7, color: 'bg-primary' },
    { label: 'D30', value: d30, color: 'bg-gold' },
  ]

  return (
    <ChartContainer
      title="Retention Overview"
      description="User retention rates across time periods"
      delay={0.5}
    >
      <div className="grid grid-cols-3 gap-6">
        {retentionMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex flex-col items-center"
          >
            {/* Circular gauge */}
            <div className="relative w-24 h-24 mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  strokeWidth="8"
                  strokeDasharray={`${2.51 * metric.value} 251`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 251' }}
                  animate={{ strokeDasharray: `${2.51 * metric.value} 251` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className={`${metric.color} transition-all`}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }}
                />
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-foreground">{metric.value}%</span>
              </div>
            </div>

            {/* Label */}
            <p className="text-sm font-medium text-foreground text-center">{metric.label}</p>
            <p className="text-xs text-muted-foreground">retention</p>
          </motion.div>
        ))}
      </div>
    </ChartContainer>
  )
}
