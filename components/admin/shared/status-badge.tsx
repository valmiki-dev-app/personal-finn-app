'use client'

import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'active' | 'at_risk' | 'churned' | 'operational' | 'degraded' | 'down' | 'free' | 'trial' | 'premium'
  label?: string
  className?: string
}

const statusConfig = {
  // Retention statuses
  active: {
    label: 'Active',
    className: 'bg-income/10 text-income border border-income/20',
  },
  at_risk: {
    label: 'At Risk',
    className: 'bg-gold/10 text-gold border border-gold/20',
  },
  churned: {
    label: 'Churned',
    className: 'bg-expense/10 text-expense border border-expense/20',
  },
  // System statuses
  operational: {
    label: 'Operational',
    className: 'bg-income/10 text-income border border-income/20',
  },
  degraded: {
    label: 'Degraded',
    className: 'bg-gold/10 text-gold border border-gold/20',
  },
  down: {
    label: 'Down',
    className: 'bg-expense/10 text-expense border border-expense/20',
  },
  // Subscription statuses
  free: {
    label: 'Free',
    className: 'bg-muted text-muted-foreground border border-border',
  },
  trial: {
    label: 'Trial',
    className: 'bg-primary/10 text-primary border border-primary/20',
  },
  premium: {
    label: 'Premium',
    className: 'bg-income/10 text-income border border-income/20',
  },
}

export function StatusBadge({
  status,
  label,
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
        config.className,
        className
      )}
    >
      <span className="w-2 h-2 rounded-full mr-2 animate-pulse" />
      {label || config.label}
    </span>
  )
}
