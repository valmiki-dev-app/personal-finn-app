'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ChartContainer({
  title,
  description,
  children,
  className,
  delay = 0,
}: ChartContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'bg-card rounded-2xl p-6 border border-border/50 transition-shadow hover:shadow-md',
        className
      )}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {/* Content */}
      <div className="w-full overflow-x-auto">
        {children}
      </div>
    </motion.div>
  )
}
