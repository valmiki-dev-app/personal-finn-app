'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { type AdminUser } from '@/lib/admin/admin-types'
import { StatusBadge } from '../shared/status-badge'
import { formatRelativeTime } from '@/lib/admin/admin-utils'
import { ArrowRight, Mail, Calendar, Activity } from 'lucide-react'

interface UsersTableProps {
  users: AdminUser[]
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-2xl border border-border/50 overflow-hidden"
    >
      {/* Table Header */}
      <div className="sticky top-0 bg-muted/50 border-b border-border/50">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-muted-foreground">
          <div className="col-span-3">User</div>
          <div className="col-span-2">Joined</div>
          <div className="col-span-2">Last Active</div>
          <div className="col-span-2">Transactions</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border/50">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="hover:bg-muted/30 transition-colors group"
          >
            <Link
              href={`/admin/users/${user.id}`}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
            >
              {/* User Info */}
              <div className="col-span-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold flex-shrink-0">
                  {user.avatar || user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.telegramUsername}</p>
                </div>
              </div>

              {/* Join Date */}
              <div className="col-span-2 text-sm text-foreground">
                {new Date(user.joinDate).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                })}
              </div>

              {/* Last Active */}
              <div className="col-span-2 text-sm text-muted-foreground">
                {formatRelativeTime(user.lastActive)}
              </div>

              {/* Transaction Count */}
              <div className="col-span-2 text-sm font-medium text-foreground">
                {user.transactionCount}
              </div>

              {/* Status Badge */}
              <div className="col-span-2">
                <StatusBadge status={user.retentionStatus} />
              </div>

              {/* Action */}
              <div className="col-span-1 flex justify-end">
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Mail className="h-8 w-8 text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">No users found</p>
        </div>
      )}
    </motion.div>
  )
}
