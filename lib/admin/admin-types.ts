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

// Daily/weekly/monthly user growth point
export interface GrowthDataPoint {
  date: string        // formatted label: "Янв", "Нед 1", "01.05"
  newUsers: number
  totalUsers: number
}

// Hour-of-day activity heatmap row (one per day-of-week)
export interface HourlyActivityRow {
  day: string         // "Пн", "Вт", …, "Вс"
  hours: number[]     // 24 values — messages count per hour
}

// Feature adoption item
export interface FeatureAdoption {
  feature: string
  users: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
}

// Daily transaction volume
export interface DailyVolume {
  date: string
  transactions: number
  income: number
  expense: number
}

// Churn reason
export interface ChurnReason {
  reason: string
  count: number
  percentage: number
}

// Subscription conversion over time
export interface SubscriptionDataPoint {
  date: string
  free: number
  trial: number
  premium: number
}

// Single transaction on a user profile
export interface UserTransaction {
  id: string
  date: Date
  description: string
  category: string
  amount: number
  type: 'income' | 'expense'
  rawMessage: string        // original Telegram message the user sent
  aiConfidence: number      // 0–1
}

// A custom category created by the user
export interface UserCategory {
  id: string
  name: string
  icon: string              // emoji
  color: string             // hex
  transactionCount: number
  totalAmount: number
  type: 'income' | 'expense' | 'both'
  createdAt: Date
}

// One message in the Telegram chat history
export type ChatSender = 'user' | 'bot'

export interface ChatMessage {
  id: string
  sender: ChatSender
  text: string
  timestamp: Date
  // only on bot messages
  isAiParsed?: boolean
  parsedTransaction?: {
    category: string
    amount: number
    type: 'income' | 'expense'
  }
  // message type for UI rendering
  messageType?: 'text' | 'transaction' | 'report' | 'clarification' | 'admin'
}

// Per-user usage stats (for the Overview tab)
export interface UserUsageStats {
  avgTransactionsPerWeek: number
  mostActiveHour: number       // 0–23
  mostActiveDay: string
  topCategory: string
  topCategoryAmount: number
  streakDays: number
  totalCategories: number
  totalIncome: number
  totalExpense: number
  netBalance: number
}
