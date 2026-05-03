'use client'

import { motion } from 'framer-motion'
import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/mock-data'

interface MetricCardProps {
  title: string
  value: number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  type?: 'default' | 'income' | 'expense' | 'balance'
  className?: string
  delay?: number
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  type = 'default',
  className,
  delay = 0,
}: MetricCardProps) {
  const isPositiveChange = change && change > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
      className={cn(
        'bg-card rounded-2xl p-5 border border-border/50 transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className={cn(
            'text-2xl font-semibold tracking-tight',
            type === 'income' && 'text-income',
            type === 'expense' && 'text-expense',
            type === 'balance' && 'text-foreground'
          )}>
            {type === 'income' && '+'}
            {type === 'expense' && '−'}
            {formatCurrency(Math.abs(value))}
          </p>
          
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositiveChange ? (
                <TrendingUp className="h-3.5 w-3.5 text-income" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-expense" />
              )}
              <span className={cn(
                'text-xs font-medium',
                isPositiveChange ? 'text-income' : 'text-expense'
              )}>
                {isPositiveChange ? '+' : '−'}{formatCurrency(Math.abs(change))}
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            type === 'income' && 'bg-income/10',
            type === 'expense' && 'bg-expense/10',
            type === 'balance' && 'bg-primary/10',
            type === 'default' && 'bg-muted'
          )}>
            <Icon className={cn(
              'h-5 w-5',
              type === 'income' && 'text-income',
              type === 'expense' && 'text-expense',
              type === 'balance' && 'text-primary',
              type === 'default' && 'text-muted-foreground'
            )} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
