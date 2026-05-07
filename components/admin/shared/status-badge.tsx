'use client'

import { cn } from '@/lib/utils'

type StatusValue =
  | 'active'
  | 'at_risk'
  | 'churned'
  | 'operational'
  | 'degraded'
  | 'down'
  | 'free'
  | 'trial'
  | 'premium'

interface StatusBadgeProps {
  status: StatusValue
  label?: string
  className?: string
}

const statusConfig: Record<StatusValue, { label: string; dot: string; text: string; bg: string }> = {
  active: {
    label: 'Active',
    dot: 'bg-income',
    text: 'text-income',
    bg: 'bg-income/10',
  },
  at_risk: {
    label: 'At Risk',
    dot: 'bg-gold',
    text: 'text-gold',
    bg: 'bg-gold/10',
  },
  churned: {
    label: 'Churned',
    dot: 'bg-expense',
    text: 'text-expense',
    bg: 'bg-expense/10',
  },
  operational: {
    label: 'Operational',
    dot: 'bg-income',
    text: 'text-income',
    bg: 'bg-income/10',
  },
  degraded: {
    label: 'Degraded',
    dot: 'bg-gold',
    text: 'text-gold',
    bg: 'bg-gold/10',
  },
  down: {
    label: 'Down',
    dot: 'bg-expense',
    text: 'text-expense',
    bg: 'bg-expense/10',
  },
  free: {
    label: 'Free',
    dot: 'bg-muted-foreground',
    text: 'text-muted-foreground',
    bg: 'bg-muted',
  },
  trial: {
    label: 'Trial',
    dot: 'bg-primary',
    text: 'text-primary',
    bg: 'bg-primary/10',
  },
  premium: {
    label: 'Premium',
    dot: 'bg-gold',
    text: 'text-gold',
    bg: 'bg-gold/10',
  },
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium',
        config.bg,
        config.text,
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full flex-shrink-0',
          config.dot,
          // Only pulse for live statuses
          status === 'active' || status === 'operational' ? 'animate-pulse' : ''
        )}
      />
      {label ?? config.label}
    </span>
  )
}
