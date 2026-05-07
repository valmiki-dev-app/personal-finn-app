'use client'

import { motion } from 'framer-motion'
import { formatRelativeTime } from '@/lib/admin/admin-utils'
import { type Activity } from '@/lib/admin/admin-types'
import {
  ShoppingCart,
  BarChart3,
  TrendingUp,
  FileText,
  Zap,
  MessageCircle,
  Download,
  Users,
  FolderOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActivityFeedProps {
  activities: Activity[]
  maxItems?: number
  className?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  BarChart3,
  TrendingUp,
  FileText,
  Zap,
  MessageCircle,
  Download,
  Users,
  Dumbbell: FolderOpen,
  Heart: TrendingUp,
  Settings: MessageCircle,
}

const iconBgMap: Record<string, string> = {
  ShoppingCart: 'bg-primary/10 text-primary',
  BarChart3: 'bg-income/10 text-income',
  TrendingUp: 'bg-income/10 text-income',
  FileText: 'bg-muted text-muted-foreground',
  Zap: 'bg-gold/10 text-gold',
  MessageCircle: 'bg-primary/10 text-primary',
  Dumbbell: 'bg-expense/10 text-expense',
}

export function ActivityFeed({ activities, maxItems = 6, className }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems)

  if (displayActivities.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8', className)}>
        <MessageCircle className="h-7 w-7 text-muted-foreground/40 mb-2" />
        <p className="text-sm text-muted-foreground">No recent activity</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-px', className)}>
      {displayActivities.map((activity, index) => {
        const Icon = iconMap[activity.icon] ?? MessageCircle
        const iconStyle = iconBgMap[activity.icon] ?? 'bg-muted text-muted-foreground'
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-xs font-semibold text-primary">
              {activity.userAvatar || activity.userName.charAt(0)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-medium text-foreground">{activity.userName}</span>
                <span className="text-xs text-muted-foreground">{formatRelativeTime(activity.timestamp)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {activity.action} — {activity.description}
              </p>
            </div>

            {/* Type Icon */}
            <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0', iconStyle)}>
              <Icon className="h-3.5 w-3.5" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
