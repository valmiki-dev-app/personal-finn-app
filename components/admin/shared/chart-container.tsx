'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ChartContainerProps {
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  delay?: number
  noPadding?: boolean
}

export function ChartContainer({
  title,
  description,
  action,
  children,
  className,
  delay = 0,
  noPadding = false,
}: ChartContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className={cn('bg-card rounded-xl border border-border', className)}
    >
      <div className={cn('flex items-start justify-between', noPadding ? 'px-5 pt-5' : 'px-5 pt-5')}>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        {action && <div className="ml-4 flex-shrink-0">{action}</div>}
      </div>
      <div className={cn('mt-4', noPadding ? 'pb-0' : 'px-5 pb-5')}>
        {children}
      </div>
    </motion.div>
  )
}
