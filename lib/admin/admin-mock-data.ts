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

// ─── Growth data ────────────────────────────────────────────────────────────

const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
export const userGrowthMonthly: import('./admin-types').GrowthDataPoint[] = months.map((m, i) => {
  const newU = 40 + Math.round(Math.sin(i * 0.6) * 20 + i * 28 + Math.random() * 30)
  return { date: m, newUsers: newU, totalUsers: 200 + i * 95 + newU }
})

export const userGrowthWeekly: import('./admin-types').GrowthDataPoint[] = Array.from({ length: 12 }, (_, i) => {
  const newU = 12 + Math.round(Math.sin(i * 0.9) * 8 + i * 7 + Math.random() * 12)
  return { date: `Нед ${i + 1}`, newUsers: newU, totalUsers: 900 + i * 28 + newU }
})

// ─── Hourly activity heatmap ────────────────────────────────────────────────

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export const hourlyActivity: import('./admin-types').HourlyActivityRow[] = DAYS.map((day, di) => ({
  day,
  hours: Array.from({ length: 24 }, (_, h) => {
    // Peak usage: morning 8-10, lunch 12-14, evening 19-22
    const isMorning = h >= 8 && h <= 10
    const isLunch   = h >= 12 && h <= 14
    const isEvening = h >= 19 && h <= 22
    const isWeekend = di >= 5
    const base = isEvening ? 80 : isMorning ? 60 : isLunch ? 50 : 10
    const weekendMult = isWeekend ? 0.6 : 1
    return Math.max(0, Math.round((base + Math.random() * 30) * weekendMult))
  }),
}))

// ─── Feature adoption ────────────────────────────────────────────────────────

export const featureAdoption: import('./admin-types').FeatureAdoption[] = [
  { feature: 'Добавление транзакций',    users: 1220, percentage: 98, trend: 'stable' },
  { feature: 'Просмотр аналитики',       users:  780, percentage: 63, trend: 'up'     },
  { feature: 'Категории',                users:  645, percentage: 52, trend: 'up'     },
  { feature: 'Еженедельные отчёты',      users:  460, percentage: 37, trend: 'up'     },
  { feature: 'Лимиты расходов',          users:  285, percentage: 23, trend: 'stable' },
  { feature: 'Экспорт данных',           users:  152, percentage: 12, trend: 'down'   },
  { feature: 'Поиск по транзакциям',     users:   98, percentage:  8, trend: 'down'   },
]

// ─── Daily transaction volume ────────────────────────────────────────────────

export const dailyVolume: import('./admin-types').DailyVolume[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(now.getTime() - (29 - i) * 86400000)
  const isWeekend = d.getDay() === 0 || d.getDay() === 6
  const base = isWeekend ? 650 : 1100
  const tx = base + Math.round(Math.random() * 400 - 200 + i * 8)
  return {
    date: d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
    transactions: tx,
    income:  Math.round(tx * (0.3 + Math.random() * 0.15) * 2500),
    expense: Math.round(tx * (0.5 + Math.random() * 0.15) * 1800),
  }
})

// ─── Churn reasons ───────────────────────────────────────────────────────────

export const churnReasons: import('./admin-types').ChurnReason[] = [
  { reason: 'Неудобно добавлять вручную',    count: 38, percentage: 34 },
  { reason: 'Нашёл другое приложение',       count: 24, percentage: 21 },
  { reason: 'Слишком много уведомлений',     count: 19, percentage: 17 },
  { reason: 'Не понял как пользоваться',     count: 15, percentage: 13 },
  { reason: 'Цена за Premium',               count: 11, percentage: 10 },
  { reason: 'Другое',                        count:  6, percentage:  5 },
]

// ─── Subscription over time ───────────────────────────────────────────────────

export const subscriptionOverTime: import('./admin-types').SubscriptionDataPoint[] = months.map((m, i) => {
  const total = 200 + i * 95
  const premium = Math.round(total * (0.10 + i * 0.018))
  const trial   = Math.round(total * (0.08 + i * 0.005))
  return { date: m, premium, trial, free: total - premium - trial }
})

// ─── Per-user detail data ────────────────────────────────────────────────────

import type { UserTransaction, UserCategory, ChatMessage, UserUsageStats } from './admin-types'

function makeUserTransactions(userId: string, count: number): UserTransaction[] {
  const cats = [
    { name: 'Продукты', icon: '🛒', type: 'expense' as const },
    { name: 'Кафе', icon: '☕', type: 'expense' as const },
    { name: 'Транспорт', icon: '🚌', type: 'expense' as const },
    { name: 'Развлечения', icon: '🎬', type: 'expense' as const },
    { name: 'Здоровье', icon: '💊', type: 'expense' as const },
    { name: 'Зарплата', icon: '💳', type: 'income' as const },
    { name: 'Фриланс', icon: '💻', type: 'income' as const },
    { name: 'Коммуналка', icon: '🏠', type: 'expense' as const },
  ]
  const messages = [
    'кофе в surf 250', 'продукты пятёрочка 1200', 'метро 50', 'кино 450',
    'аптека 380', 'зарплата 75000', 'фриланс проект 15000', 'свет газ 3200',
    'ужин в кафе 980', 'такси 320', 'супермаркет 2100', 'спортзал 3000',
  ]
  return Array.from({ length: count }, (_, i) => {
    const cat = cats[i % cats.length]
    const isIncome = cat.type === 'income'
    const amount = isIncome
      ? 15000 + Math.round(Math.random() * 60000)
      : 100 + Math.round(Math.random() * 4000)
    return {
      id: `${userId}-tx-${i}`,
      date: new Date(now.getTime() - i * 18 * 60 * 60 * 1000),
      description: cat.name,
      category: cat.name,
      amount,
      type: cat.type,
      rawMessage: messages[i % messages.length],
      aiConfidence: 0.72 + Math.random() * 0.27,
    }
  })
}

function makeUserCategories(userId: string): UserCategory[] {
  return [
    { id: `${userId}-c1`, name: 'Продукты',      icon: '🛒', color: '#6BAA75', transactionCount: 42, totalAmount: 52400, type: 'expense', createdAt: new Date(now.getTime() - 80*86400000) },
    { id: `${userId}-c2`, name: 'Кафе',           icon: '☕', color: '#D6A85A', transactionCount: 28, totalAmount: 18700, type: 'expense', createdAt: new Date(now.getTime() - 79*86400000) },
    { id: `${userId}-c3`, name: 'Транспорт',      icon: '🚌', color: '#6F5E53', transactionCount: 61, totalAmount: 9200,  type: 'expense', createdAt: new Date(now.getTime() - 78*86400000) },
    { id: `${userId}-c4`, name: 'Развлечения',    icon: '🎬', color: '#E3807C', transactionCount: 14, totalAmount: 8900,  type: 'expense', createdAt: new Date(now.getTime() - 60*86400000) },
    { id: `${userId}-c5`, name: 'Зарплата',       icon: '💳', color: '#6BAA75', transactionCount:  3, totalAmount: 225000,type: 'income',  createdAt: new Date(now.getTime() - 80*86400000) },
    { id: `${userId}-c6`, name: 'Фриланс',        icon: '💻', color: '#6BAA75', transactionCount:  8, totalAmount: 92000, type: 'income',  createdAt: new Date(now.getTime() - 55*86400000) },
    { id: `${userId}-c7`, name: 'Коммуналка',     icon: '🏠', color: '#7A6F68', transactionCount:  3, totalAmount: 9600,  type: 'expense', createdAt: new Date(now.getTime() - 80*86400000) },
    { id: `${userId}-c8`, name: 'Здоровье',       icon: '💊', color: '#D6A85A', transactionCount:  7, totalAmount: 4200,  type: 'expense', createdAt: new Date(now.getTime() - 40*86400000) },
  ]
}

function makeUserChat(userId: string, userName: string): ChatMessage[] {
  const pairs: Array<{ userText: string; botText: string; txData?: ChatMessage['parsedTransaction']; msgType?: ChatMessage['messageType'] }> = [
    {
      userText: 'кофе в surf 250',
      botText: '✅ Записал: Кафе — 250 ₽',
      txData: { category: 'Кафе', amount: 250, type: 'expense' },
      msgType: 'transaction',
    },
    {
      userText: 'зарплата 75000',
      botText: '✅ Записал: Зарплата +75 000 ₽',
      txData: { category: 'Зарплата', amount: 75000, type: 'income' },
      msgType: 'transaction',
    },
    {
      userText: 'продукты пятёрочка 1200',
      botText: '✅ Записал: Продукты — 1 200 ₽',
      txData: { category: 'Продукты', amount: 1200, type: 'expense' },
      msgType: 'transaction',
    },
    {
      userText: 'купил что-то в магазине',
      botText: 'Уточни, пожалуйста: это расход на продукты или что-то другое? И на какую сумму?',
      msgType: 'clarification',
    },
    {
      userText: 'продукты, 850 руб',
      botText: '✅ Записал: Продукты — 850 ₽',
      txData: { category: 'Продукты', amount: 850, type: 'expense' },
      msgType: 'transaction',
    },
    {
      userText: '/report',
      botText: 'Вот твой отчёт за неделю:\n\n💸 Расходы: 8 450 ₽\n💰 Доходы: 75 000 ₽\n📊 Топ категория: Продукты (3 200 ₽)\n\nЭкономишь на 12% больше, чем на прошлой неделе.',
      msgType: 'report',
    },
    {
      userText: 'такси 320',
      botText: '✅ Записал: ��ранспорт — 320 ₽',
      txData: { category: 'Транспорт', amount: 320, type: 'expense' },
      msgType: 'transaction',
    },
    {
      userText: 'спасибо, всё понятно',
      botText: 'Всегда рад помочь! Просто пиши сколько потратил или получил, я всё запишу.',
      msgType: 'text',
    },
  ]
  const messages: ChatMessage[] = []
  pairs.forEach((p, i) => {
    const base = now.getTime() - (pairs.length - i) * 4 * 60 * 60 * 1000
    messages.push({
      id: `${userId}-msg-u-${i}`,
      sender: 'user',
      text: p.userText,
      timestamp: new Date(base),
      messageType: 'text',
    })
    messages.push({
      id: `${userId}-msg-b-${i}`,
      sender: 'bot',
      text: p.botText,
      timestamp: new Date(base + 4000),
      isAiParsed: !!p.txData,
      parsedTransaction: p.txData,
      messageType: p.msgType,
    })
  })
  return messages
}

function makeUserUsageStats(user: AdminUser): UserUsageStats {
  const totalIncome  = 317000
  const totalExpense = 102300
  return {
    avgTransactionsPerWeek: Math.round(user.transactionCount / Math.max(1, Math.round((now.getTime() - user.joinDate.getTime()) / 604800000))),
    mostActiveHour: 20,
    mostActiveDay: 'Вторник',
    topCategory: 'Продукты',
    topCategoryAmount: 52400,
    streakDays: user.activityLevel === 'high' ? 14 : user.activityLevel === 'medium' ? 5 : 1,
    totalCategories: 8,
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  }
}

// Cached per-user data maps (keyed by userId)
export function getUserTransactions(userId: string): UserTransaction[] {
  const user = adminUsers.find(u => u.id === userId)
  return makeUserTransactions(userId, user?.transactionCount ?? 20)
}

export function getUserCategories(userId: string): UserCategory[] {
  return makeUserCategories(userId)
}

export function getUserChat(userId: string): ChatMessage[] {
  const user = adminUsers.find(u => u.id === userId)
  return makeUserChat(userId, user?.name ?? 'Пользователь')
}

export function getUserUsageStats(userId: string): UserUsageStats {
  const user = adminUsers.find(u => u.id === userId)!
  return makeUserUsageStats(user)
}

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

// ─── Notifications mock data ─────────────────────────────────────────────────

import type { AdminNotification } from './admin-types'

export const adminNotifications: AdminNotification[] = [
  // User replies to admin messages
  {
    id: 'notif-1',
    type: 'user_reply',
    severity: 'info',
    title: 'Ответ от @anna_k',
    body: 'Спасибо, всё понятно! Буду пользоваться лимитами.',
    timestamp: new Date(now.getTime() - 5 * 60 * 1000),
    read: false,
    userId: 'user-1',
    userName: 'Анна Кравцова',
    userTelegramUsername: 'anna_k',
    adminMessage: 'Привет! Напоминаем что вы можете настроить лимиты расходов по категориям.',
  },
  {
    id: 'notif-2',
    type: 'user_reply',
    severity: 'info',
    title: 'Ответ от @dmitry_fm',
    body: 'А когда будет функция импорта из банка?',
    timestamp: new Date(now.getTime() - 22 * 60 * 1000),
    read: false,
    userId: 'user-2',
    userName: 'Дмитрий Фомин',
    userTelegramUsername: 'dmitry_fm',
    adminMessage: 'Дмитрий, мы заметили что вы не заходили 10 дней. Всё ли в порядке?',
  },
  {
    id: 'notif-3',
    type: 'user_reply',
    severity: 'info',
    title: 'Ответ от @m_petrov',
    body: 'Да, всё нормально. Просто был в отпуске.',
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    read: true,
    userId: 'user-3',
    userName: 'Михаил Петров',
    userTelegramUsername: 'm_petrov',
    adminMessage: 'Михаил, мы заметили что вы не заходили некоторое время. Есть вопросы?',
  },
  // System alerts
  {
    id: 'notif-4',
    type: 'system_alert',
    severity: 'error',
    title: 'AI parse error rate повышен',
    body: 'За последний час parse error rate составил 8.3% — превышен порог в 5%. Проверьте логи AI-сервиса.',
    timestamp: new Date(now.getTime() - 35 * 60 * 1000),
    read: false,
    service: 'AI Parser',
    errorCode: 'ERR_PARSE_RATE_HIGH',
  },
  {
    id: 'notif-5',
    type: 'system_alert',
    severity: 'warning',
    title: 'Telegram Webhook — задержки ответа',
    body: 'Среднее время ответа выросло до 1.8с (норма < 0.8с). Вероятно, пиковая нагрузка.',
    timestamp: new Date(now.getTime() - 1.5 * 60 * 60 * 1000),
    read: false,
    service: 'Telegram Webhook',
    errorCode: 'WARN_HIGH_LATENCY',
  },
  {
    id: 'notif-6',
    type: 'system_alert',
    severity: 'success',
    title: 'База данных восстановлена',
    body: 'После кратковременного сбоя (14:22–14:31) сервис базы данных работает штатно. Потерь данных нет.',
    timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    read: true,
    service: 'Database',
  },
  {
    id: 'notif-7',
    type: 'system_alert',
    severity: 'error',
    title: 'Сбой базы данных',
    body: 'Connection pool исчерпан. Сервис недоступен с 14:22. Автоматический рестарт запущен.',
    timestamp: new Date(now.getTime() - 3.2 * 60 * 60 * 1000),
    read: true,
    service: 'Database',
    errorCode: 'ERR_POOL_EXHAUSTED',
  },
  // Sent messages log
  {
    id: 'notif-8',
    type: 'sent_message',
    severity: 'info',
    title: 'Сообщение отправлено @anna_k',
    body: 'Привет! Напоминаем что вы можете настроить лимиты расходов по категориям.',
    timestamp: new Date(now.getTime() - 40 * 60 * 1000),
    read: true,
    userId: 'user-1',
    userName: 'Анна Кравцова',
    userTelegramUsername: 'anna_k',
    adminMessage: 'Привет! Напоминаем что вы можете настроить лимиты расходов по категориям.',
  },
  {
    id: 'notif-9',
    type: 'sent_message',
    severity: 'info',
    title: 'Сообщение отправлено @dmitry_fm',
    body: 'Дмитрий, мы заметили что вы не заходили 10 дней. Всё ли в порядке?',
    timestamp: new Date(now.getTime() - 45 * 60 * 1000),
    read: true,
    userId: 'user-2',
    userName: 'Дмитрий Фомин',
    userTelegramUsername: 'dmitry_fm',
    adminMessage: 'Дмитрий, мы заметили что вы не заходили 10 дней. Всё ли в порядке?',
  },
  {
    id: 'notif-10',
    type: 'sent_message',
    severity: 'info',
    title: 'Сообщение отправлено @m_petrov',
    body: 'Михаил, мы заметили что вы не заходили некоторое время. Есть вопросы?',
    timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
    read: true,
    userId: 'user-3',
    userName: 'Михаил Петров',
    userTelegramUsername: 'm_petrov',
    adminMessage: 'Михаил, мы заметили что вы не заходили некоторое время. Есть вопросы?',
  },
]
