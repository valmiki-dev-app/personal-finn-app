'use client'

import { motion } from 'framer-motion'
import { formatRelativeTime } from '@/lib/admin/admin-utils'
import { type Activity } from '@/lib/admin/admin-types'
import {
  ShoppingCart,
  BarChart3,
  Dumbbell,
  TrendingUp,
  FileText,
  Zap,
  MessageCircle,
  Heart,
  Settings,
  Download,
  Users,
} from 'lucide-react'

interface ActivityFeedProps {
  activities: Activity[]
  maxItems?: number
  className?: string
}

const iconMap: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="h-4 w-4" />,
  BarChart3: <BarChart3 className="h-4 w-4" />,
  Dumbbell: <Dumbbell className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
  Zap: <Zap className="h-4 w-4" />,
  MessageCircle: <MessageCircle className="h-4 w-4" />,
  Heart: <Heart className="h-4 w-4" />,
  Settings: <Settings className="h-4 w-4" />,
  Download: <Download className="h-4 w-4" />,
  Users: <Users className="h-4 w-4" />,
}

export function ActivityFeed({
  activities,
  maxItems = 6,
  className,
}: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems)

  return (
    <div className={className}>
      <div className="space-y-3">
        {displayActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-sm font-semibold">
              {activity.userAvatar || activity.userName.charAt(0)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground truncate">{activity.userName}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-snug">
                {activity.action}
              </p>
              <p className="text-xs text-muted-foreground/75 mt-0.5">{activity.description}</p>
            </div>

            {/* Icon */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
              {iconMap[activity.icon] || <MessageCircle className="h-4 w-4" />}
            </div>
          </motion.div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8">
          <MessageCircle className="h-8 w-8 text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">No activities yet</p>
        </div>
      )}
    </div>
  )
}
