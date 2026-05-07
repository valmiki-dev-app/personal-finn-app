'use client'

import { eventsStream } from '@/lib/admin/admin-mock-data'
import { formatRelativeTime } from '@/lib/admin/admin-utils'
import { ShoppingCart, BarChart3, FolderOpen, FileText, MessageCircle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const typeConfig = {
  transaction: { icon: ShoppingCart, color: 'text-primary', bg: 'bg-primary/10', label: 'Transaction' },
  analytics_opened: { icon: BarChart3, color: 'text-income', bg: 'bg-income/10', label: 'Analytics' },
  category_added: { icon: FolderOpen, color: 'text-gold', bg: 'bg-gold/10', label: 'Category' },
  report_viewed: { icon: FileText, color: 'text-foreground', bg: 'bg-muted', label: 'Report' },
  clarification: { icon: Zap, color: 'text-expense', bg: 'bg-expense/10', label: 'AI Clarification' },
  miniapp_opened: { icon: MessageCircle, color: 'text-primary', bg: 'bg-primary/10', label: 'Mini App' },
}

export default function AdminEventsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Events</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Live stream of all user events</p>
      </div>

      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {eventsStream.map((event) => {
          const config = typeConfig[event.type] ?? typeConfig.transaction
          const Icon = config.icon
          return (
            <div key={event.id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
              <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0', config.bg)}>
                <Icon className={cn('h-4 w-4', config.color)} />
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {event.userAvatar || event.userName.charAt(0)}
                </div>
                <span className="text-sm font-medium text-foreground">{event.userName}</span>
              </div>
              <p className="flex-1 text-sm text-muted-foreground min-w-0 truncate">{event.description}</p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={cn('text-xs font-medium px-2 py-0.5 rounded-md', config.bg, config.color)}>
                  {config.label}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatRelativeTime(event.timestamp)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
