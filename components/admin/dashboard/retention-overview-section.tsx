'use client'

import { motion } from 'framer-motion'

interface RetentionOverviewSectionProps {
  d1: number
  d7: number
  d30: number
}

interface RetentionGaugeProps {
  label: string
  sublabel: string
  value: number
  color: string
  trackColor: string
  delay: number
}

function RetentionGauge({ label, sublabel, value, color, trackColor, delay }: RetentionGaugeProps) {
  // circumference of r=36: 2*pi*36 = 226.2
  const circumference = 226.2
  const dash = (value / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          {/* Track */}
          <circle cx="40" cy="40" r="36" fill="none" stroke={trackColor} strokeWidth="7" />
          {/* Progress */}
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - dash }}
            transition={{ duration: 1, delay, ease: 'easeOut' }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold text-foreground">{value}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  )
}

export function RetentionOverviewSection({ d1, d7, d30 }: RetentionOverviewSectionProps) {
  const metrics = [
    { label: 'D1', sublabel: 'Day 1 return', value: d1, color: '#6BAA75', trackColor: '#6BAA7520', delay: 0.3 },
    { label: 'D7', sublabel: 'Week 1 return', value: d7, color: '#E3807C', trackColor: '#E3807C20', delay: 0.4 },
    { label: 'D30', sublabel: 'Month 1 return', value: d30, color: '#D6A85A', trackColor: '#D6A85A20', delay: 0.5 },
  ]

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Retention</h3>
          <p className="text-xs text-muted-foreground mt-0.5">User return rates by cohort</p>
        </div>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">Last 30 days</span>
      </div>
      <div className="flex items-center justify-around">
        {metrics.map((m) => (
          <RetentionGauge key={m.label} {...m} />
        ))}
      </div>
    </div>
  )
}
