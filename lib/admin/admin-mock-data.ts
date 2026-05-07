import { 
  type AdminUser, 
  type Activity, 
  type KPIMetric,
  type ProductInsight,
  type ParseEvent,
  type AIMetrics,
  type RevenueMetric,
  type SystemStatus,
  type Event,
  type RetentionCohort,
  type FunnelStep
} from './admin-types'
import { formatCurrency } from '../mock-data'

const now = new Date()

// Admin Users mock data
export const adminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Иван Петров',
    telegramUsername: '@ivan_p',
    joinDate: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
    lastActive: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    transactionCount: 245,
    retentionStatus: 'active',
    subscriptionStatus: 'premium',
    activityLevel: 'high',
    timezone: 'Europe/Moscow',
    avatar: '👨‍💼',
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    telegramUsername: '@maria_s',
    joinDate: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
    lastActive: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    transactionCount: 178,
    retentionStatus: 'active',
    subscriptionStatus: 'premium',
    activityLevel: 'high',
    timezone: 'Europe/Moscow',
    avatar: '👩‍💼',
  },
  {
    id: '3',
    name: 'Алексей Волков',
    telegramUsername: '@alex_v',
    joinDate: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000),
    lastActive: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    transactionCount: 92,
    retentionStatus: 'at_risk',
    subscriptionStatus: 'trial',
    activityLevel: 'medium',
    timezone: 'Europe/Moscow',
    avatar: '👨',
  },
  {
    id: '4',
    name: 'Елена Козлова',
    telegramUsername: '@elena_k',
    joinDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    lastActive: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
    transactionCount: 34,
    retentionStatus: 'at_risk',
    subscriptionStatus: 'free',
    activityLevel: 'low',
    timezone: 'Europe/Moscow',
    avatar: '👩',
  },
  {
    id: '5',
    name: 'Дмитрий Соколов',
    telegramUsername: '@dmitry_s',
    joinDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
    lastActive: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    transactionCount: 12,
    retentionStatus: 'churned',
    subscriptionStatus: 'free',
    activityLevel: 'low',
    timezone: 'Europe/Moscow',
    avatar: '👨‍🦱',
  },
  {
    id: '6',
    name: 'Ольга Новикова',
    telegramUsername: '@olga_n',
    joinDate: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
    lastActive: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    transactionCount: 156,
    retentionStatus: 'active',
    subscriptionStatus: 'premium',
    activityLevel: 'high',
    timezone: 'Europe/Moscow',
    avatar: '👩‍🦰',
  },
  {
    id: '7',
    name: 'Анатолий Морозов',
    telegramUsername: '@anatoly_m',
    joinDate: new Date(now.getTime() - 50 * 24 * 60 * 60 * 1000),
    lastActive: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    transactionCount: 203,
    retentionStatus: 'active',
    subscriptionStatus: 'premium',
    activityLevel: 'high',
    timezone: 'Europe/Moscow',
    avatar: '👴',
  },
  {
    id: '8',
    name: 'Виктория Лебедева',
    telegramUsername: '@vika_l',
    joinDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    lastActive: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    transactionCount: 45,
    retentionStatus: 'at_risk',
    subscriptionStatus: 'trial',
    activityLevel: 'medium',
    timezone: 'Europe/Moscow',
    avatar: '👱‍♀️',
  },
]

// Activity feed mock data
export const activityFeed: Activity[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Иван Петров',
    userAvatar: '👨‍💼',
    action: 'Добавил транзакцию',
    description: '₽2,350 в категорию "Продукты"',
    timestamp: new Date(now.getTime() - 5 * 60 * 1000),
    icon: 'ShoppingCart',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Мария Сидорова',
    userAvatar: '👩‍💼',
    action: 'Открыла аналитику',
    description: 'Просмотрела статистику за неделю',
    timestamp: new Date(now.getTime() - 15 * 60 * 1000),
    icon: 'BarChart3',
  },
  {
    id: '3',
    userId: '6',
    userName: 'Ольга Новикова',
    userAvatar: '👩‍🦰',
    action: 'Создала категорию',
    description: 'Новая категория "Фитнес"',
    timestamp: new Date(now.getTime() - 30 * 60 * 1000),
    icon: 'Dumbbell',
  },
  {
    id: '4',
    userId: '7',
    userName: 'Анатолий Морозов',
    userAvatar: '👴',
    action: 'Получил доход',
    description: '₽50,000 от "Зарплата"',
    timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    icon: 'TrendingUp',
  },
  {
    id: '5',
    userId: '1',
    userName: 'Иван Петров',
    userAvatar: '👨‍💼',
    action: 'Просмотрел отчёт',
    description: 'Еженедельный отчёт за неделю',
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    icon: 'FileText',
  },
  {
    id: '6',
    userId: '2',
    userName: 'Мария Сидорова',
    userAvatar: '👩‍💼',
    action: 'Исправила категорию',
    description: 'ИИ переклассифицировал "Кофе" → "Кафе"',
    timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    icon: 'Zap',
  },
]

// KPI metrics
export const kpiMetrics: KPIMetric[] = [
  {
    title: 'Всего пользователей',
    value: 1243,
    change: 45,
    changeLabel: 'на этой неделе',
    icon: 'Users',
    type: 'positive',
    sparklineData: [32, 45, 38, 52, 48, 61, 55, 67, 72, 81, 88, 94, 102, 115],
  },
  {
    title: 'Активных сегодня',
    value: 328,
    change: -12,
    changeLabel: 'vs вчера',
    icon: 'Activity',
    type: 'negative',
    sparklineData: [145, 152, 148, 165, 158, 172, 168, 185, 192, 201, 215, 228, 245, 328],
  },
  {
    title: 'Активных на неделе',
    value: 872,
    change: 23,
    changeLabel: 'vs прошлая неделя',
    icon: 'TrendingUp',
    type: 'positive',
    sparklineData: [450, 480, 510, 540, 570, 605, 640, 680, 720, 760, 805, 850, 890, 872],
  },
  {
    title: 'Транзакций сегодня',
    value: 1245,
    change: 87,
    changeLabel: 'vs вчера',
    icon: 'CreditCard',
    type: 'positive',
    sparklineData: [320, 350, 380, 410, 440, 480, 520, 560, 610, 660, 720, 800, 920, 1245],
  },
  {
    title: 'D1 Retention',
    value: '72%',
    change: 3,
    changeLabel: 'vs неделю назад',
    icon: 'Target',
    type: 'positive',
    sparklineData: [65, 66, 67, 68, 69, 70, 70, 71, 71, 72, 72, 72, 71, 72],
  },
  {
    title: 'AI Parse Success',
    value: '94.2%',
    change: 2.1,
    changeLabel: 'vs вчера',
    icon: 'Zap',
    type: 'positive',
    sparklineData: [88, 89, 90, 90, 91, 91, 92, 92, 93, 93, 93, 93, 94, 94],
  },
]

// Product insights
export const productInsights: ProductInsight[] = [
  {
    title: 'Самая используемая функция',
    description: 'Добавление транзакций через Telegram',
    value: 'Используется 98% пользователей',
    trend: 'up',
    icon: 'MessageCircle',
  },
  {
    title: 'Самые активные пользователи',
    description: 'Иван Петров, Мария Сидорова',
    value: '245+ и 178+ транзакций',
    trend: 'up',
    icon: 'Users',
  },
  {
    title: 'Самая проигнорированная функция',
    description: 'Экспорт отчётов',
    value: 'Используется только 12% пользователей',
    trend: 'down',
    icon: 'Download',
  },
]

// Parse events
export const parseEvents: ParseEvent[] = [
  {
    id: '1',
    userId: '1',
    originalMessage: 'кофе в Surf 250',
    parsedResult: {
      category: 'Кафе',
      amount: 250,
      description: 'кофе в Surf',
    },
    confidenceScore: 0.98,
    status: 'success',
    timestamp: new Date(now.getTime() - 5 * 60 * 1000),
  },
  {
    id: '2',
    userId: '2',
    originalMessage: 'зарплата 50к',
    parsedResult: {
      category: 'Зарплата',
      amount: 50000,
      description: 'зарплата',
    },
    confidenceScore: 0.99,
    status: 'success',
    timestamp: new Date(now.getTime() - 10 * 60 * 1000),
  },
  {
    id: '3',
    userId: '3',
    originalMessage: 'купил что-то классное',
    parsedResult: {
      category: 'Покупки',
      amount: 0,
      description: 'купил что-то классное',
    },
    confidenceScore: 0.45,
    status: 'clarification',
    timestamp: new Date(now.getTime() - 20 * 60 * 1000),
  },
  {
    id: '4',
    userId: '4',
    originalMessage: 'ывфывфыв',
    parsedResult: {
      category: 'Неизвестно',
      amount: 0,
      description: '',
    },
    confidenceScore: 0.0,
    status: 'failed',
    timestamp: new Date(now.getTime() - 30 * 60 * 1000),
  },
]

// AI Metrics
export const aiMetrics: AIMetrics = {
  parseSuccessRate: 94.2,
  clarificationRate: 4.1,
  manualCorrectionRate: 1.7,
  averageConfidenceScore: 0.92,
  todayParseCount: 1245,
  todayFailedCount: 72,
}

// Revenue metrics
export const revenueMetrics: RevenueMetric = {
  totalRevenue: 145320,
  mrr: 28500,
  payingUsers: 342,
  conversionRate: 27.5,
  arpu: 425,
}

// System status
export const systemStatus: SystemStatus[] = [
  {
    name: 'Telegram Bot',
    status: 'operational',
    uptime: 99.98,
    lastChecked: new Date(now.getTime() - 5 * 60 * 1000),
  },
  {
    name: 'Database',
    status: 'operational',
    uptime: 99.99,
    lastChecked: new Date(now.getTime() - 2 * 60 * 1000),
  },
  {
    name: 'Groq API',
    status: 'operational',
    uptime: 99.95,
    lastChecked: new Date(now.getTime() - 1 * 60 * 1000),
  },
  {
    name: 'Scheduler',
    status: 'operational',
    uptime: 99.92,
    lastChecked: new Date(now.getTime() - 8 * 60 * 1000),
  },
]

// Events stream
export const eventsStream: Event[] = [
  {
    id: '1',
    type: 'transaction',
    userId: '1',
    userName: 'Иван Петров',
    userAvatar: '👨‍💼',
    description: 'Добавил ₽2,350 в категорию "Продукты"',
    timestamp: new Date(now.getTime() - 2 * 60 * 1000),
  },
  {
    id: '2',
    type: 'analytics_opened',
    userId: '2',
    userName: 'Мария Сидорова',
    userAvatar: '👩‍💼',
    description: 'Открыла аналитику за неделю',
    timestamp: new Date(now.getTime() - 8 * 60 * 1000),
  },
  {
    id: '3',
    type: 'category_added',
    userId: '6',
    userName: 'Ольга Новикова',
    userAvatar: '👩‍🦰',
    description: 'Создала новую категорию "Фитнес"',
    timestamp: new Date(now.getTime() - 25 * 60 * 1000),
  },
  {
    id: '4',
    type: 'transaction',
    userId: '7',
    userName: 'Анатолий Морозов',
    userAvatar: '👴',
    description: 'Добавил ₽50,000 дохода',
    timestamp: new Date(now.getTime() - 55 * 60 * 1000),
  },
  {
    id: '5',
    type: 'report_viewed',
    userId: '1',
    userName: 'Иван Петров',
    userAvatar: '👨‍💼',
    description: 'Просмотрел еженедельный отчёт',
    timestamp: new Date(now.getTime() - 1.5 * 60 * 60 * 1000),
  },
  {
    id: '6',
    type: 'clarification',
    userId: '2',
    userName: 'Мария Сидорова',
    userAvatar: '👩‍💼',
    description: 'Уточнила классификацию для "Кофе"',
    timestamp: new Date(now.getTime() - 2.5 * 60 * 60 * 1000),
  },
]

// Retention cohorts
export const retentionCohorts: RetentionCohort[] = [
  {
    cohortDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    d1: 87,
    d7: 65,
    d30: 45,
    userCount: 150,
  },
  {
    cohortDate: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
    d1: 89,
    d7: 68,
    d30: 48,
    userCount: 180,
  },
  {
    cohortDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    d1: 85,
    d7: 70,
    d30: 52,
    userCount: 200,
  },
  {
    cohortDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    d1: 91,
    d7: 72,
    userCount: 220,
  },
]

// Funnel steps
export const funnelSteps: FunnelStep[] = [
  {
    label: 'Запустили бота',
    users: 1500,
    percentage: 100,
  },
  {
    label: 'Добавили первую транзакцию',
    users: 1243,
    percentage: 82.9,
  },
  {
    label: '5+ транзакций',
    users: 945,
    percentage: 63,
  },
  {
    label: 'Открыли аналитику',
    users: 612,
    percentage: 40.8,
  },
  {
    label: 'Вернулись в день 2',
    users: 524,
    percentage: 34.9,
  },
  {
    label: 'Вернулись в день 7',
    users: 342,
    percentage: 22.8,
  },
]

// Helper function to get user by ID
export function getAdminUserById(id: string): AdminUser | undefined {
  return adminUsers.find(u => u.id === id)
}

// Helper function to format retention status
export function formatRetentionStatus(status: AdminUser['retentionStatus']): string {
  const statusMap = {
    active: 'Активный',
    at_risk: 'Под угрозой',
    churned: 'Неактивный',
  }
  return statusMap[status]
}

// Helper function to format subscription status
export function formatSubscriptionStatus(status: AdminUser['subscriptionStatus']): string {
  const statusMap = {
    free: 'Бесплатный',
    trial: 'Пробный период',
    premium: 'Premium',
  }
  return statusMap[status]
}
