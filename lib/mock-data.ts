import { 
  Coffee, 
  ShoppingCart, 
  Car, 
  Play, 
  UtensilsCrossed, 
  Pill,
  Briefcase,
  Laptop,
  RotateCcw,
  Smartphone,
  Home,
  Gift,
  Music,
  Dumbbell,
  type LucideIcon
} from 'lucide-react'

export type TransactionType = 'income' | 'expense'

export interface Category {
  id: string
  name: string
  icon: LucideIcon
  color: string
  type: TransactionType
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: TransactionType
  categoryId: string
  date: Date
  createdAt: Date
}

export const categories: Category[] = [
  // Expense categories
  { id: 'cafe', name: 'Кафе', icon: Coffee, color: '#E3807C', type: 'expense' },
  { id: 'food', name: 'Еда', icon: ShoppingCart, color: '#D6A85A', type: 'expense' },
  { id: 'transport', name: 'Транспорт', icon: Car, color: '#6F5E53', type: 'expense' },
  { id: 'subscriptions', name: 'Подписки', icon: Play, color: '#7A6F68', type: 'expense' },
  { id: 'restaurants', name: 'Рестораны', icon: UtensilsCrossed, color: '#D96C6C', type: 'expense' },
  { id: 'health', name: 'Здоровье', icon: Pill, color: '#6BAA75', type: 'expense' },
  { id: 'phone', name: 'Связь', icon: Smartphone, color: '#A39A93', type: 'expense' },
  { id: 'home', name: 'Дом', icon: Home, color: '#EADFD2', type: 'expense' },
  { id: 'entertainment', name: 'Развлечения', icon: Music, color: '#E3807C', type: 'expense' },
  { id: 'sport', name: 'Спорт', icon: Dumbbell, color: '#6BAA75', type: 'expense' },
  { id: 'gifts', name: 'Подарки', icon: Gift, color: '#D6A85A', type: 'expense' },
  // Income categories
  { id: 'salary', name: 'Зарплата', icon: Briefcase, color: '#6BAA75', type: 'income' },
  { id: 'freelance', name: 'Фриланс', icon: Laptop, color: '#6BAA75', type: 'income' },
  { id: 'refund', name: 'Возврат', icon: RotateCcw, color: '#6BAA75', type: 'income' },
]

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(c => c.id === id)
}

// Generate realistic mock transactions
const now = new Date()
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function createTransaction(
  id: string,
  description: string,
  amount: number,
  type: TransactionType,
  categoryId: string,
  daysAgo: number,
  hour: number = 12,
  minute: number = 0
): Transaction {
  const date = new Date(now)
  date.setDate(date.getDate() - daysAgo)
  date.setHours(hour, minute, 0, 0)
  return {
    id,
    description,
    amount,
    type,
    categoryId,
    date,
    createdAt: date,
  }
}

export const mockTransactions: Transaction[] = [
  // Today
  createTransaction('1', 'Кофе в Surf', 250, 'expense', 'cafe', 0, 10, 42),
  createTransaction('2', 'Обед в Lavka', 650, 'expense', 'restaurants', 0, 13, 15),
  
  // Yesterday
  createTransaction('3', 'Продукты в Пятёрочке', 1240, 'expense', 'food', 1, 19, 30),
  createTransaction('4', 'Такси до работы', 430, 'expense', 'transport', 1, 8, 45),
  createTransaction('5', 'Spotify', 199, 'expense', 'subscriptions', 1, 12, 0),
  
  // 2 days ago
  createTransaction('6', 'Кофе с другом', 320, 'expense', 'cafe', 2, 16, 20),
  createTransaction('7', 'Фриланс проект', 10000, 'income', 'freelance', 2, 14, 0),
  
  // 3 days ago
  createTransaction('8', 'Аптека', 780, 'expense', 'health', 3, 11, 30),
  createTransaction('9', 'Метро', 62, 'expense', 'transport', 3, 9, 0),
  createTransaction('10', 'Обед', 450, 'expense', 'restaurants', 3, 13, 0),
  
  // 4 days ago
  createTransaction('11', 'Продукты', 2100, 'expense', 'food', 4, 18, 45),
  createTransaction('12', 'Netflix', 299, 'expense', 'subscriptions', 4, 10, 0),
  
  // 5 days ago
  createTransaction('13', 'Кофе', 180, 'expense', 'cafe', 5, 9, 15),
  createTransaction('14', 'Такси', 350, 'expense', 'transport', 5, 20, 30),
  createTransaction('15', 'Возврат от Маши', 2000, 'income', 'refund', 5, 15, 0),
  
  // 6 days ago
  createTransaction('16', 'Ужин в ресторане', 3200, 'expense', 'restaurants', 6, 19, 30),
  createTransaction('17', 'Кофе', 290, 'expense', 'cafe', 6, 11, 0),
  
  // 1 week ago
  createTransaction('18', 'Зарплата', 50000, 'income', 'salary', 7, 10, 0),
  createTransaction('19', 'Продукты на неделю', 3500, 'expense', 'food', 7, 17, 0),
  
  // 8 days ago
  createTransaction('20', 'Абонемент в зал', 2500, 'expense', 'sport', 8, 12, 0),
  createTransaction('21', 'Кофе', 220, 'expense', 'cafe', 8, 10, 30),
  
  // 10 days ago
  createTransaction('22', 'Мобильная связь', 600, 'expense', 'phone', 10, 11, 0),
  createTransaction('23', 'YouTube Premium', 299, 'expense', 'subscriptions', 10, 12, 0),
  
  // 12 days ago
  createTransaction('24', 'Подарок другу', 1500, 'expense', 'gifts', 12, 15, 0),
  createTransaction('25', 'Такси', 280, 'expense', 'transport', 12, 18, 0),
  
  // 14 days ago
  createTransaction('26', 'Продукты', 1800, 'expense', 'food', 14, 19, 0),
  createTransaction('27', 'Кофе', 250, 'expense', 'cafe', 14, 9, 30),
  
  // 15 days ago
  createTransaction('28', 'Фриланс', 8000, 'income', 'freelance', 15, 16, 0),
  
  // 20 days ago
  createTransaction('29', 'Квартплата', 12000, 'expense', 'home', 20, 10, 0),
  createTransaction('30', 'Продукты', 2200, 'expense', 'food', 20, 18, 30),
  
  // 25 days ago
  createTransaction('31', 'Зарплата аванс', 25000, 'income', 'salary', 25, 10, 0),
  createTransaction('32', 'Кино', 800, 'expense', 'entertainment', 25, 20, 0),
]

// Sort by date descending
export const transactions = mockTransactions.sort((a, b) => b.date.getTime() - a.date.getTime())

// Helper functions for analytics
export function getTransactionsForPeriod(days: number): Transaction[] {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return transactions.filter(t => t.date >= cutoff)
}

export function getTotalIncome(txns: Transaction[]): number {
  return txns.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
}

export function getTotalExpense(txns: Transaction[]): number {
  return txns.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
}

export function getExpensesByCategory(txns: Transaction[]): { categoryId: string; total: number; percentage: number }[] {
  const expenses = txns.filter(t => t.type === 'expense')
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0)
  
  const byCategory: Record<string, number> = {}
  expenses.forEach(t => {
    byCategory[t.categoryId] = (byCategory[t.categoryId] || 0) + t.amount
  })
  
  return Object.entries(byCategory)
    .map(([categoryId, total]) => ({
      categoryId,
      total,
      percentage: Math.round((total / totalExpense) * 100),
    }))
    .sort((a, b) => b.total - a.total)
}

export function getDailyExpenses(days: number): { date: string; expense: number; income: number }[] {
  const result: { date: string; expense: number; income: number }[] = []
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
    
    const dayTxns = transactions.filter(t => {
      const txnDate = new Date(t.date)
      return txnDate.toDateString() === date.toDateString()
    })
    
    result.push({
      date: dateStr,
      expense: dayTxns.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
      income: dayTxns.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    })
  }
  
  return result
}

// User data
export const userData = {
  name: 'Вальмики',
  telegramUsername: '@valmiki',
  timezone: 'Europe/Moscow',
  currency: 'RUB',
  account: {
    name: 'Основной счёт',
    balance: 42350,
    weekChange: 16570,
  },
}

// Format helpers
export function formatCurrency(amount: number, showSign = false): string {
  const formatted = new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))
  
  if (showSign && amount !== 0) {
    return `${amount > 0 ? '+' : '−'}${formatted} ₽`
  }
  return `${formatted} ₽`
}

export function formatDate(date: Date): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return `Сегодня, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return `Вчера, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
  }
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatShortDate(date: Date): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Сегодня'
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера'
  }
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}
