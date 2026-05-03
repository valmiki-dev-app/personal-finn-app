'use client'

import { motion } from 'framer-motion'
import { getCategoryById, formatCurrency } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface CategoryProgressProps {
  categoryId: string
  total: number
  percentage: number
  index?: number
}

export function CategoryProgress({ 
  categoryId, 
  total, 
  percentage,
  index = 0,
}: CategoryProgressProps) {
  const category = getCategoryById(categoryId)
  const Icon = category?.icon

  if (!category) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center gap-3"
    >
      {/* Icon */}
      <div 
        className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
        style={{ backgroundColor: `${category.color}15` }}
      >
        {Icon && <Icon className="h-4 w-4" style={{ color: category.color }} />}
      </div>
      
      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-sm font-medium text-foreground">{category.name}</p>
          <p className="text-sm font-semibold text-foreground">{formatCurrency(total)}</p>
        </div>
        
        {/* Progress bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="h-full rounded-full"
            style={{ backgroundColor: category.color }}
          />
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">{percentage}% от расходов</p>
      </div>
    </motion.div>
  )
}
