'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ActivityFeed } from '../shared/activity-feed'
import { ChartContainer } from '../shared/chart-container'
import { type Activity } from '@/lib/admin/admin-types'
import { ArrowRight } from 'lucide-react'

interface ActivitySectionProps {
  activities: Activity[]
}

export function ActivitySection({ activities }: ActivitySectionProps) {
  return (
    <ChartContainer
      title="Live Activity"
      description="Recent user interactions and events"
      delay={0.4}
    >
      <div className="flex flex-col h-full">
        <ActivityFeed activities={activities} maxItems={8} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t border-border/50"
        >
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </ChartContainer>
  )
}
