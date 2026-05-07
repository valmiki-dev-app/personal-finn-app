'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminKPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  type?: 'default' | 'positive' | 'negative' | 'neutral'
  icon?: React.ReactNode
  className?: string
  delay?: number
}

export function AdminKPICard({
  title,
  value,
  change,
  changeLabel,
  type = 'default',
  icon,
  className,
  delay = 0,
}: AdminKPICardProps) {
  const isUp = typeof change === 'number' && change > 0
  const isDown = typeof change === 'number' && change < 0

  const iconBg = {
    default: 'bg-primary/10 text-primary',
    positive: 'bg-income/10 text-income',
    negative: 'bg-expense/10 text-expense',
    neutral: 'bg-muted text-muted-foreground',
  }

  const changeColor = isUp ? 'text-income' : isDown ? 'text-expense' : 'text-muted-foreground'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className={cn(
        'bg-card rounded-xl border border-border p-5',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground truncate">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1 tracking-tight">{value}</p>
          {typeof change === 'number' && (
            <div className="flex items-center gap-1 mt-2">
              {isUp ? (
                <TrendingUp className={cn('h-3.5 w-3.5', changeColor)} />
              ) : isDown ? (
                <TrendingDown className={cn('h-3.5 w-3.5', changeColor)} />
              ) : null}
              <span className={cn('text-xs font-medium', changeColor)}>
                {isUp ? '+' : ''}{change}
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0', iconBg[type])}>
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  )
}
