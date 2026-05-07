'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { type AdminUser } from '@/lib/admin/admin-types'
import { StatusBadge } from '../shared/status-badge'
import { formatRelativeTime } from '@/lib/admin/admin-utils'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UsersTableProps {
  users: AdminUser[]
}

const activityColors = {
  high: 'text-income',
  medium: 'text-gold',
  low: 'text-expense',
}

const activityLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export function UsersTable({ users }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border py-12 text-center">
        <p className="text-sm text-muted-foreground">No users match your filters</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_80px_120px_32px] gap-4 px-5 py-3 border-b border-border bg-muted/30">
        <div className="text-xs font-medium text-muted-foreground">User</div>
        <div className="text-xs font-medium text-muted-foreground">Joined</div>
        <div className="text-xs font-medium text-muted-foreground">Last active</div>
        <div className="text-xs font-medium text-muted-foreground">Txns</div>
        <div className="text-xs font-medium text-muted-foreground">Status</div>
        <div />
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            <Link
              href={`/admin/users/${user.id}`}
              className="grid grid-cols-[2fr_1fr_1fr_80px_120px_32px] gap-4 px-5 py-3.5 items-center hover:bg-muted/30 transition-colors group"
            >
              {/* User */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary flex-shrink-0">
                  {user.avatar || user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.telegramUsername}</p>
                </div>
              </div>

              {/* Joined */}
              <div className="text-sm text-foreground">
                {new Date(user.joinDate).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                })}
              </div>

              {/* Last active */}
              <div className="text-sm text-muted-foreground">
                {formatRelativeTime(user.lastActive)}
              </div>

              {/* Transactions */}
              <div className="text-sm font-medium text-foreground">
                {user.transactionCount}
              </div>

              {/* Status */}
              <div>
                <StatusBadge status={user.retentionStatus} />
              </div>

              {/* Chevron */}
              <div className="flex justify-end">
                <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
