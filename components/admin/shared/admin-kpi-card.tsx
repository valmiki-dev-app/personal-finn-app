'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getChangeColor } from '@/lib/admin/admin-utils'

interface AdminKPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  type?: 'default' | 'positive' | 'negative' | 'neutral'
  icon?: React.ReactNode
  className?: string
  delay?: number
  trend?: 'up' | 'down' | 'neutral'
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
  trend,
}: AdminKPICardProps) {
  const isPositiveChange = change && change > 0

  const typeStyles = {
    default: 'text-foreground',
    positive: 'text-income',
    negative: 'text-expense',
    neutral: 'text-muted-foreground',
  }

  const iconBgStyles = {
    default: 'bg-primary/10',
    positive: 'bg-income/10',
    negative: 'bg-expense/10',
    neutral: 'bg-muted',
  }

  const iconColorStyles = {
    default: 'text-primary',
    positive: 'text-income',
    negative: 'text-expense',
    neutral: 'text-muted-foreground',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className={cn(
        'bg-card rounded-2xl p-6 border border-border/50 transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <p className={cn('text-3xl font-bold tracking-tight', typeStyles[type])}>
            {value}
          </p>

          {change !== undefined && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {isPositiveChange ? (
                  <TrendingUp className="h-4 w-4 text-income" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-expense" />
                )}
                <span className={cn('text-sm font-semibold', getChangeColor(change))}>
                  {isPositiveChange ? '+' : '−'}
                  {Math.abs(change)}
                  {typeof value === 'string' && value.includes('%') ? '%' : ''}
                </span>
              </div>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {icon && (
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0',
              iconBgStyles[type]
            )}
          >
            <div className={cn(iconColorStyles[type])}>{icon}</div>
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{
              width: trend === 'up' ? '100%' : trend === 'down' ? '40%' : '70%',
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn(
              'h-full rounded-full',
              trend === 'up' ? 'bg-income' : trend === 'down' ? 'bg-expense' : 'bg-primary'
            )}
          />
        </div>
      )}
    </motion.div>
  )
}
