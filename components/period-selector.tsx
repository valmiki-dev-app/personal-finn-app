'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type Period = 'week' | 'month' | 'year'

interface PeriodSelectorProps {
  value: Period
  onChange: (value: Period) => void
  className?: string
}

const periods: { value: Period; label: string }[] = [
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
  { value: 'year', label: 'Год' },
]

export function PeriodSelector({ value, onChange, className }: PeriodSelectorProps) {
  return (
    <div className={cn('flex bg-muted rounded-xl p-1', className)}>
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={cn(
            'relative flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
            value === period.value 
              ? 'text-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {value === period.value && (
            <motion.div
              layoutId="period-selector-active"
              className="absolute inset-0 bg-card rounded-lg shadow-sm"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">{period.label}</span>
        </button>
      ))}
    </div>
  )
}
