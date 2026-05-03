'use client'

import { motion } from 'framer-motion'
import { Sparkles, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InsightCardProps {
  message: string
  type?: 'tip' | 'insight'
  className?: string
}

export function InsightCard({ message, type = 'insight', className }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      whileHover={{ y: -2 }}
      className={cn(
        'bg-card rounded-2xl p-5 border border-border/50',
        type === 'tip' && 'bg-gold/5 border-gold/20',
        className
      )}
    >
      <div className="flex gap-4">
        <div className={cn(
          'flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0',
          type === 'insight' ? 'bg-primary/10' : 'bg-gold/10'
        )}>
          {type === 'insight' ? (
            <Sparkles className="h-5 w-5 text-primary" />
          ) : (
            <Lightbulb className="h-5 w-5 text-gold" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {type === 'insight' ? 'Инсайт от ассистента' : 'Совет'}
          </p>
          <p className="text-sm text-foreground leading-relaxed">{message}</p>
        </div>
      </div>
    </motion.div>
  )
}
