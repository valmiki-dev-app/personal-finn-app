'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SettingsSection({ 
  title, 
  description, 
  children, 
  className,
  delay = 0,
}: SettingsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'bg-card rounded-2xl border border-border/50 overflow-hidden',
        className
      )}
    >
      <div className="p-5 border-b border-border/50">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="p-5">
        {children}
      </div>
    </motion.div>
  )
}
