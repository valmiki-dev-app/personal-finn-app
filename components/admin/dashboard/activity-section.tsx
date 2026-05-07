'use client'

import Link from 'next/link'
import { ActivityFeed } from '../shared/activity-feed'
import { type Activity } from '@/lib/admin/admin-types'
import { ArrowRight } from 'lucide-react'

interface ActivitySectionProps {
  activities: Activity[]
}

export function ActivitySection({ activities }: ActivitySectionProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Live Activity</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Recent user interactions</p>
        </div>
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <ActivityFeed activities={activities} maxItems={8} />
    </div>
  )
}
