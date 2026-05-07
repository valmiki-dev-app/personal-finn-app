'use client'

import { use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getAdminUserById } from '@/lib/admin/admin-mock-data'
import { StatusBadge } from '@/components/admin/shared/status-badge'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  CreditCard,
  Activity,
  MessageSquare,
  Mail,
  RefreshCw,
  Star,
} from 'lucide-react'
import { getDaysSinceJoin, formatDateTime, formatRelativeTime, getActivityLevelLabel } from '@/lib/admin/admin-utils'
import { cn } from '@/lib/utils'

interface UserProfilePageProps {
  params: Promise<{ id: string }>
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = use(params)
  const user = getAdminUserById(id)
  const router = useRouter()

  if (!user) {
    return (
      <div className="space-y-5">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Link>
        <div className="bg-card rounded-xl border border-border py-16 text-center">
          <p className="text-sm font-medium text-foreground">User not found</p>
          <p className="text-xs text-muted-foreground mt-1">No user with ID: {id}</p>
        </div>
      </div>
    )
  }

  const daysSince = getDaysSinceJoin(user.joinDate)
  const activityPct = user.activityLevel === 'high' ? 90 : user.activityLevel === 'medium' ? 55 : 25
  const engagementScore = user.activityLevel === 'high' ? 92 : user.activityLevel === 'medium' ? 61 : 34

  const infoItems = [
    { icon: Calendar, label: 'Member for', value: `${daysSince} days` },
    { icon: CreditCard, label: 'Transactions', value: String(user.transactionCount) },
    { icon: Clock, label: 'Last active', value: formatRelativeTime(user.lastActive) },
    { icon: Globe, label: 'Timezone', value: user.timezone },
  ]

  function handleAction(action: string) {
    alert(`Action: ${action}\n\n(In production this would send a request to your backend.)`)
  }

  const actions = [
    { icon: MessageSquare, label: 'Send message', action: 'send_message', variant: 'default' as const },
    { icon: Mail, label: 'Resend report', action: 'resend_report', variant: 'default' as const },
    { icon: RefreshCw, label: 'Reset onboarding', action: 'reset_onboarding', variant: 'default' as const },
    { icon: Star, label: 'Grant Premium', action: 'grant_premium', variant: 'primary' as const },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="space-y-5"
    >
      {/* Back */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Users
      </Link>

      {/* Profile header */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-2xl font-semibold flex-shrink-0">
              {user.avatar || user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.telegramUsername}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={user.retentionStatus} />
            <StatusBadge status={user.subscriptionStatus} />
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          {infoItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </div>
                <p className="text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Activity Level */}
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-xs text-muted-foreground mb-1">Activity Level</p>
          <p className="text-sm font-semibold text-foreground mb-3">
            {getActivityLevelLabel(user.activityLevel)}
          </p>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${activityPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn(
                'h-full rounded-full',
                user.activityLevel === 'high'
                  ? 'bg-income'
                  : user.activityLevel === 'medium'
                  ? 'bg-gold'
                  : 'bg-expense'
              )}
            />
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-xs text-muted-foreground mb-1">Subscription</p>
          <p className="text-sm font-semibold text-foreground capitalize">
            {user.subscriptionStatus === 'free'
              ? 'Free plan'
              : user.subscriptionStatus === 'trial'
              ? 'Trial period'
              : 'Premium member'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {user.subscriptionStatus === 'premium'
              ? 'Full feature access'
              : user.subscriptionStatus === 'trial'
              ? 'Limited time access'
              : 'Basic features only'}
          </p>
        </div>

        {/* Engagement Score */}
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-xs text-muted-foreground mb-1">Engagement Score</p>
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-bold text-foreground">{engagementScore}</span>
            <span className="text-xs text-muted-foreground mb-1">/ 100</span>
          </div>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${engagementScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Admin Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map(({ icon: Icon, label, action, variant }) => (
            <button
              key={action}
              onClick={() => handleAction(action)}
              className={cn(
                'flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                variant === 'primary'
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted hover:bg-muted/80 text-foreground border border-border'
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="px-1 space-y-1">
        <p className="text-xs text-muted-foreground">User ID: <span className="font-mono">{user.id}</span></p>
        <p className="text-xs text-muted-foreground">Joined: {formatDateTime(user.joinDate)}</p>
        <p className="text-xs text-muted-foreground">Last active: {formatDateTime(user.lastActive)}</p>
      </div>
    </motion.div>
  )
}
