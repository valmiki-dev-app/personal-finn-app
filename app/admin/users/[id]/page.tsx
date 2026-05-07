'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getAdminUserById } from '@/lib/admin/admin-mock-data'
import { StatusBadge } from '@/components/admin/shared/status-badge'
import { ChartContainer } from '@/components/admin/shared/chart-container'
import {
  ArrowLeft,
  Mail,
  Calendar,
  Globe,
  TrendingUp,
  Activity,
  Zap,
  Shield,
  MessageSquare,
} from 'lucide-react'
import { getDaysSinceJoin, formatDateTime, formatSubscriptionStatus, formatRelativeTime } from '@/lib/admin/admin-utils'

interface UserProfilePageProps {
  params: {
    id: string
  }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const user = getAdminUserById(params.id)

  if (!user) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Link>
        <div className="text-center py-12">
          <p className="text-muted-foreground">User not found</p>
        </div>
      </div>
    )
  }

  const daysSinceJoin = getDaysSinceJoin(user.joinDate)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Users
      </Link>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border/50 p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold">
              {user.avatar || user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
              <p className="text-muted-foreground">{user.telegramUsername}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <StatusBadge status={user.retentionStatus} />
            <StatusBadge status={user.subscriptionStatus} />
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Member for
            </p>
            <p className="text-lg font-semibold text-foreground">{daysSinceJoin} days</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              Transactions
            </p>
            <p className="text-lg font-semibold text-foreground">{user.transactionCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Activity className="h-3.5 w-3.5" />
              Last Active
            </p>
            <p className="text-lg font-semibold text-foreground">{formatRelativeTime(user.lastActive)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              Timezone
            </p>
            <p className="text-lg font-semibold text-foreground">{user.timezone}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <ChartContainer title="Activity Level" delay={0.2}>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {user.activityLevel === 'high'
                    ? 'High Activity'
                    : user.activityLevel === 'medium'
                      ? 'Medium Activity'
                      : 'Low Activity'}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{
                    width:
                      user.activityLevel === 'high' ? '100%' : user.activityLevel === 'medium' ? '60%' : '30%',
                  }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary to-income"
                />
              </div>
            </div>
          </div>
        </ChartContainer>

        <ChartContainer title="Subscription" delay={0.25}>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-foreground">
              {formatSubscriptionStatus(user.subscriptionStatus)}
            </p>
            <p className="text-sm text-muted-foreground">
              {user.subscriptionStatus === 'premium'
                ? 'Premium member'
                : user.subscriptionStatus === 'trial'
                  ? 'Trial period active'
                  : 'Free user'}
            </p>
          </div>
        </ChartContainer>

        <ChartContainer title="Engagement Score" delay={0.3}>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-4xl font-bold text-primary mb-2">
              {user.activityLevel === 'high' ? '92' : user.activityLevel === 'medium' ? '65' : '38'}
            </div>
            <p className="text-xs text-muted-foreground">out of 100</p>
          </div>
        </ChartContainer>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card rounded-xl border border-border/50 p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Support Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors text-sm font-medium text-foreground">
            <MessageSquare className="h-4 w-4" />
            Send Message
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors text-sm font-medium text-foreground">
            <Mail className="h-4 w-4" />
            Resend Report
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors text-sm font-medium text-foreground">
            <Zap className="h-4 w-4" />
            Reset Onboarding
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 border border-primary/50 hover:bg-primary/20 transition-colors text-sm font-medium text-primary">
            <TrendingUp className="h-4 w-4" />
            Grant Premium
          </button>
        </div>
      </motion.div>

      {/* Metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-muted-foreground space-y-1"
      >
        <p>User ID: {user.id}</p>
        <p>Joined: {formatDateTime(user.joinDate)}</p>
        <p>Last active: {formatDateTime(user.lastActive)}</p>
      </motion.div>
    </motion.div>
  )
}
