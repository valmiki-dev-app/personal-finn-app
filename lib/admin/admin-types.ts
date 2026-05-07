// Admin panel type definitions

export interface AdminUser {
  id: string
  name: string
  telegramUsername: string
  joinDate: Date
  lastActive: Date
  transactionCount: number
  retentionStatus: 'active' | 'at_risk' | 'churned'
  subscriptionStatus: 'free' | 'trial' | 'premium'
  activityLevel: 'high' | 'medium' | 'low'
  avatar?: string
  timezone: string
}

export interface KPIMetric {
  title: string
  value: number | string
  change?: number
  changeLabel?: string
  icon?: string
  type?: 'default' | 'positive' | 'negative' | 'neutral'
  sparklineData?: number[]
}

export interface Activity {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  action: string
  description: string
  timestamp: Date
  icon: string
  metadata?: Record<string, any>
}

export interface ProductInsight {
  title: string
  description: string
  value: string | number
  trend?: 'up' | 'down' | 'stable'
  icon: string
}

export interface ParseEvent {
  id: string
  userId: string
  originalMessage: string
  parsedResult: {
    category: string
    amount: number
    description: string
  }
  confidenceScore: number
  status: 'success' | 'clarification' | 'failed'
  timestamp: Date
}

export interface AIMetrics {
  parseSuccessRate: number
  clarificationRate: number
  manualCorrectionRate: number
  averageConfidenceScore: number
  todayParseCount: number
  todayFailedCount: number
}

export interface RevenueMetric {
  totalRevenue: number
  mrr: number
  payingUsers: number
  conversionRate: number
  arpu: number
}

export interface SystemStatus {
  name: string
  status: 'operational' | 'degraded' | 'down'
  uptime: number
  lastChecked: Date
}

export interface Event {
  id: string
  type: 'transaction' | 'analytics_opened' | 'category_added' | 'report_viewed' | 'clarification' | 'miniapp_opened'
  userId: string
  userName: string
  userAvatar?: string
  description: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface RetentionCohort {
  cohortDate: Date
  d1: number
  d7: number
  d30: number
  userCount: number
}

export interface FunnelStep {
  label: string
  users: number
  percentage: number
}
