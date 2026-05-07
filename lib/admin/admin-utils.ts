// Admin utilities and helpers

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'только что'
  if (diffMins < 60) return `${diffMins}м назад`
  if (diffHours < 24) return `${diffHours}ч назад`
  if (diffDays === 1) return 'вчера'
  if (diffDays < 7) return `${diffDays}д назад`
  
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short',
  })
}

export function formatDateTime(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getRetentionStatusColor(status: 'active' | 'at_risk' | 'churned'): string {
  switch (status) {
    case 'active':
      return 'bg-income/10 text-income'
    case 'at_risk':
      return 'bg-gold/10 text-gold'
    case 'churned':
      return 'bg-expense/10 text-expense'
  }
}

export function getSubscriptionStatusColor(status: 'free' | 'trial' | 'premium'): string {
  switch (status) {
    case 'free':
      return 'bg-muted text-muted-foreground'
    case 'trial':
      return 'bg-primary/10 text-primary'
    case 'premium':
      return 'bg-income/10 text-income'
  }
}

export function getActivityLevelColor(level: 'high' | 'medium' | 'low'): string {
  switch (level) {
    case 'high':
      return 'bg-income/10'
    case 'medium':
      return 'bg-gold/10'
    case 'low':
      return 'bg-expense/10'
  }
}

export function getActivityLevelLabel(level: 'high' | 'medium' | 'low'): string {
  const map = {
    high: 'Высокая',
    medium: 'Средняя',
    low: 'Низкая',
  }
  return map[level]
}

export function getDaysSinceJoin(joinDate: Date): number {
  const now = new Date()
  const diffMs = now.getTime() - joinDate.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

export function getStatusColor(status: 'operational' | 'degraded' | 'down'): string {
  switch (status) {
    case 'operational':
      return 'text-income'
    case 'degraded':
      return 'text-gold'
    case 'down':
      return 'text-expense'
  }
}

export function getStatusLabel(status: 'operational' | 'degraded' | 'down'): string {
  const map = {
    operational: 'Работает',
    degraded: 'Проблемы',
    down: 'Недоступен',
  }
  return map[status]
}

export function calculateChurnRisk(lastActive: Date, joinDate: Date): 'high' | 'medium' | 'low' {
  const daysSinceActive = Math.floor(
    (new Date().getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
  )
  const daysSinceJoin = getDaysSinceJoin(joinDate)

  if (daysSinceActive > daysSinceJoin) {
    return 'high'
  }
  if (daysSinceActive > 7) {
    return 'medium'
  }
  return 'low'
}

export function sortUsersByActivity(users: any[]): any[] {
  return [...users].sort((a, b) => {
    const dateA = new Date(a.lastActive).getTime()
    const dateB = new Date(b.lastActive).getTime()
    return dateB - dateA
  })
}

export function filterUsersByStatus(
  users: any[],
  status: 'active' | 'at_risk' | 'churned'
): any[] {
  return users.filter(u => u.retentionStatus === status)
}

export function calculateAverageMetric(values: number[]): number {
  if (values.length === 0) return 0
  return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length)
}

export function getSparklineColor(type?: 'positive' | 'negative' | 'neutral'): string {
  switch (type) {
    case 'positive':
      return 'text-income'
    case 'negative':
      return 'text-expense'
    default:
      return 'text-primary'
  }
}

export function getChangeColor(change?: number): string {
  if (change === undefined) return ''
  if (change > 0) return 'text-income'
  if (change < 0) return 'text-expense'
  return 'text-muted-foreground'
}

export function formatSubscriptionStatus(status: 'free' | 'trial' | 'premium'): string {
  const map = {
    free: 'Free',
    trial: 'Trial',
    premium: 'Premium',
  }
  return map[status]
}
