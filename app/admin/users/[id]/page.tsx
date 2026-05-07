'use client'

import { use, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getAdminUserById,
  getUserTransactions,
  getUserCategories,
  getUserChat,
  getUserUsageStats,
} from '@/lib/admin/admin-mock-data'
import { StatusBadge } from '@/components/admin/shared/status-badge'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Send,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Flame,
  BarChart3,
  Tag,
  MessageSquare,
  LayoutList,
  Bot,
  Star,
  Search,
  Filter,
} from 'lucide-react'
import {
  getDaysSinceJoin,
  formatDateTime,
  formatRelativeTime,
  getActivityLevelLabel,
} from '@/lib/admin/admin-utils'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/lib/admin/admin-types'

interface UserProfilePageProps {
  params: Promise<{ id: string }>
}

const TABS = [
  { id: 'overview',      label: 'Обзор',        icon: LayoutList },
  { id: 'transactions',  label: 'Транзакции',   icon: CreditCard },
  { id: 'categories',    label: 'Категории',    icon: Tag },
  { id: 'chat',          label: 'Чат с ботом',  icon: MessageSquare },
] as const
type TabId = typeof TABS[number]['id']

function formatAmount(amount: number) {
  return amount.toLocaleString('ru-RU') + ' ₽'
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = use(params)
  const router = useRouter()
  const user = getAdminUserById(id)

  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [txSearch, setTxSearch] = useState('')
  const [txFilter, setTxFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() =>
    user ? getUserChat(id) : []
  )
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeTab, chatMessages])

  if (!user) {
    return (
      <div className="space-y-5">
        <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Пользователи
        </Link>
        <div className="bg-card rounded-xl border border-border py-20 text-center">
          <p className="text-sm font-semibold text-foreground">Пользователь не найден</p>
          <p className="text-xs text-muted-foreground mt-1">ID: {id}</p>
        </div>
      </div>
    )
  }

  const transactions = getUserTransactions(id)
  const categories   = getUserCategories(id)
  const stats        = getUserUsageStats(id)
  const daysSince    = getDaysSinceJoin(user.joinDate)

  // Filtered transactions
  const filteredTx = transactions.filter(tx => {
    const matchSearch = txSearch === '' || tx.description.toLowerCase().includes(txSearch.toLowerCase()) || tx.rawMessage.toLowerCase().includes(txSearch.toLowerCase())
    const matchFilter = txFilter === 'all' || tx.type === txFilter
    return matchSearch && matchFilter
  })

  function sendAdminMessage() {
    if (!chatInput.trim()) return
    const msg: ChatMessage = {
      id: `admin-${Date.now()}`,
      sender: 'bot',
      text: `[Сообщение от администратора]\n\n${chatInput.trim()}`,
      timestamp: new Date(),
      messageType: 'admin',
    }
    setChatMessages(prev => [...prev, msg])
    setChatInput('')
  }

  function handleAction(action: string) {
    const messages: Record<string, string> = {
      grant_premium: 'Premium-доступ выдан пользователю.',
      reset_onboarding: 'Онбординг сброшен. Пользователь пройдёт его заново.',
      send_report: 'Еженедельный отчёт отправлен в Telegram.',
    }
    alert(messages[action] ?? 'Действие выполнено.')
  }

  const activityPct    = user.activityLevel === 'high' ? 90 : user.activityLevel === 'medium' ? 55 : 22
  const engagementScore = user.activityLevel === 'high' ? 92 : user.activityLevel === 'medium' ? 61 : 34

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      {/* Back */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Все пользователи
      </Link>

      {/* ── Profile header ──────────────────────────────────────────────── */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary select-none flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.telegramUsername}</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                Участник {daysSince} {daysSince === 1 ? 'день' : daysSince < 5 ? 'дня' : 'дней'}
              </p>
            </div>
          </div>
          {/* Badges + quick actions */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              <StatusBadge status={user.retentionStatus} />
              <StatusBadge status={user.subscriptionStatus} />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setActiveTab('chat'); setTimeout(() => setChatInput('[Отчёт] '), 50) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/70 text-foreground border border-border transition-all"
              >
                <Send className="h-3 w-3" />
                Написать
              </button>
              <button
                onClick={() => handleAction('send_report')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/70 text-foreground border border-border transition-all"
              >
                <BarChart3 className="h-3 w-3" />
                Отправить отчёт
              </button>
              <button
                onClick={() => handleAction('grant_premium')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <Star className="h-3 w-3" />
                Premium
              </button>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-border">
          {[
            { icon: Calendar, label: 'Дата регистрации', value: user.joinDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) },
            { icon: CreditCard, label: 'Транзакций',     value: String(user.transactionCount) },
            { icon: Clock, label: 'Последняя активность',value: formatRelativeTime(user.lastActive) },
            { icon: Globe, label: 'Часовой пояс',         value: user.timezone },
          ].map(item => {
            const Icon = item.icon
            return (
              <div key={item.label}>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </div>
                <p className="text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 bg-muted rounded-xl p-1 w-fit">
        {TABS.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Tab Content ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        >

          {/* ─── OVERVIEW ─────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Top stats row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Balance */}
                <div className="bg-card rounded-xl border border-border p-5 space-y-1">
                  <p className="text-xs text-muted-foreground">Общий баланс</p>
                  <p className={cn('text-2xl font-bold', stats.netBalance >= 0 ? 'text-income' : 'text-expense')}>
                    {stats.netBalance >= 0 ? '+' : ''}{formatAmount(stats.netBalance)}
                  </p>
                  <div className="flex items-center gap-4 pt-1">
                    <span className="flex items-center gap-1 text-xs text-income">
                      <ArrowUpRight className="h-3 w-3" />
                      {formatAmount(stats.totalIncome)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-expense">
                      <ArrowDownRight className="h-3 w-3" />
                      {formatAmount(stats.totalExpense)}
                    </span>
                  </div>
                </div>

                {/* Activity */}
                <div className="bg-card rounded-xl border border-border p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Активность</p>
                    <p className="text-xs font-semibold text-foreground">{getActivityLevelLabel(user.activityLevel)}</p>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activityPct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={cn('h-full rounded-full', user.activityLevel === 'high' ? 'bg-income' : user.activityLevel === 'medium' ? 'bg-gold' : 'bg-expense')}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{stats.avgTransactionsPerWeek} тр/нед</span>
                    <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-primary" />{stats.streakDays} дней подряд</span>
                  </div>
                </div>

                {/* Engagement */}
                <div className="bg-card rounded-xl border border-border p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Engagement Score</p>
                    <p className="text-2xl font-bold text-foreground">{engagementScore}<span className="text-xs text-muted-foreground font-normal">/100</span></p>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${engagementScore}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {engagementScore >= 80 ? 'Очень вовлечённый пользователь' : engagementScore >= 50 ? 'Умеренная вовлечённость' : 'Риск оттока'}
                  </p>
                </div>
              </div>

              {/* Behaviour stats */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Поведение</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Clock,     label: 'Пик активности',     value: `${stats.mostActiveHour}:00` },
                    { icon: Calendar,  label: 'Активный день',       value: stats.mostActiveDay },
                    { icon: Tag,       label: 'Топ категория',       value: stats.topCategory },
                    { icon: Zap,       label: 'Транзакций в неделю', value: String(stats.avgTransactionsPerWeek) },
                  ].map(s => {
                    const Icon = s.icon
                    return (
                      <div key={s.label} className="bg-muted rounded-lg p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Icon className="h-3.5 w-3.5" />
                          {s.label}
                        </div>
                        <p className="text-sm font-semibold text-foreground">{s.value}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Subscription + quick nav */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card rounded-xl border border-border p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Подписка</h3>
                  <div className="flex items-center gap-3">
                    <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', user.subscriptionStatus === 'premium' ? 'bg-income/10' : user.subscriptionStatus === 'trial' ? 'bg-primary/10' : 'bg-muted')}>
                      <Star className={cn('h-5 w-5', user.subscriptionStatus === 'premium' ? 'text-income' : user.subscriptionStatus === 'trial' ? 'text-primary' : 'text-muted-foreground')} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {user.subscriptionStatus === 'premium' ? 'Premium' : user.subscriptionStatus === 'trial' ? 'Пробный период' : 'Бесплатный план'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.subscriptionStatus === 'premium' ? 'Полный доступ ко всем функциям' : user.subscriptionStatus === 'trial' ? 'Ограниченный пробный доступ' : 'Базовые функции'}
                      </p>
                    </div>
                  </div>
                  {user.subscriptionStatus !== 'premium' && (
                    <button onClick={() => handleAction('grant_premium')} className="mt-3 w-full py-2 px-3 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5">
                      <Star className="h-3.5 w-3.5" />
                      Выдать Premium
                    </button>
                  )}
                </div>

                <div className="bg-card rounded-xl border border-border p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Быстрый переход</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Посмотреть транзакции', tab: 'transactions' as TabId, icon: CreditCard, count: user.transactionCount },
                      { label: 'Категории пользователя', tab: 'categories' as TabId, icon: Tag, count: stats.totalCategories },
                      { label: 'История переписки с ботом', tab: 'chat' as TabId, icon: MessageSquare, count: chatMessages.length },
                    ].map(item => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.tab}
                          onClick={() => setActiveTab(item.tab)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted hover:bg-muted/70 transition-all group"
                        >
                          <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                            <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            {item.label}
                          </div>
                          <span className="text-xs text-muted-foreground bg-card px-2 py-0.5 rounded-md border border-border">{item.count}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── TRANSACTIONS ─────────────────────────────────────────── */}
          {activeTab === 'transactions' && (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-3 p-4 border-b border-border flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Поиск по транзакциям..."
                    value={txSearch}
                    onChange={e => setTxSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-muted border border-border rounded-lg outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                  {(['all', 'income', 'expense'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setTxFilter(f)}
                      className={cn(
                        'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                        txFilter === f ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {f === 'all' ? 'Все' : f === 'income' ? 'Доходы' : 'Расходы'}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground ml-auto">{filteredTx.length} записей</p>
              </div>

              {/* Transactions list */}
              <div className="divide-y divide-border">
                {filteredTx.slice(0, 50).map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors"
                  >
                    {/* Icon */}
                    <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0', tx.type === 'income' ? 'bg-income/10' : 'bg-expense/10')}>
                      {tx.type === 'income'
                        ? <ArrowUpRight className="h-4 w-4 text-income" />
                        : <ArrowDownRight className="h-4 w-4 text-expense" />
                      }
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{tx.rawMessage}</span>
                        <span className="text-xs text-muted-foreground/50">·</span>
                        <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded-md', tx.aiConfidence > 0.9 ? 'bg-income/10 text-income' : tx.aiConfidence > 0.7 ? 'bg-gold/10 text-gold' : 'bg-expense/10 text-expense')}>
                          AI {Math.round(tx.aiConfidence * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Date */}
                    <p className="text-xs text-muted-foreground flex-shrink-0 hidden md:block">
                      {tx.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                    </p>

                    {/* Amount */}
                    <p className={cn('text-sm font-semibold flex-shrink-0', tx.type === 'income' ? 'text-income' : 'text-expense')}>
                      {tx.type === 'income' ? '+' : '−'}{formatAmount(tx.amount)}
                    </p>
                  </motion.div>
                ))}

                {filteredTx.length === 0 && (
                  <div className="py-16 text-center">
                    <p className="text-sm text-muted-foreground">Транзакций не найдено</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── CATEGORIES ───────────────────────────────────────────── */}
          {activeTab === 'categories' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((cat, i) => {
                  const maxAmount = Math.max(...categories.map(c => c.totalAmount))
                  const pct = Math.round((cat.totalAmount / maxAmount) * 100)
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-card rounded-xl border border-border p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg flex items-center justify-center text-lg bg-muted flex-shrink-0">
                            {cat.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                            <p className="text-xs text-muted-foreground">{cat.transactionCount} транзакций</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn('text-sm font-bold', cat.type === 'income' ? 'text-income' : 'text-expense')}>
                            {formatAmount(cat.totalAmount)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cat.createdAt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ─── CHAT ─────────────────────────────────────────────────── */}
          {activeTab === 'chat' && (
            <div className="bg-card rounded-xl border border-border overflow-hidden flex flex-col" style={{ height: 600 }}>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted/30 flex-shrink-0">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Переписка {user.name} с ботом</p>
                  <p className="text-xs text-muted-foreground">{chatMessages.length} сообщений · последнее {formatRelativeTime(chatMessages[chatMessages.length - 1]?.timestamp ?? new Date())}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {chatMessages.map((msg, i) => {
                  const isUser = msg.sender === 'user'
                  const isAdmin = msg.messageType === 'admin'
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.3) }}
                      className={cn('flex items-end gap-2.5', isUser ? 'justify-end' : 'justify-start')}
                    >
                      {/* Bot avatar */}
                      {!isUser && (
                        <div className={cn('h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mb-0.5', isAdmin ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                          {isAdmin ? 'A' : <Bot className="h-3.5 w-3.5" />}
                        </div>
                      )}

                      <div className={cn('max-w-[72%] space-y-1', isUser ? 'items-end' : 'items-start')}>
                        {/* Bubble */}
                        <div className={cn(
                          'px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap',
                          isUser
                            ? 'bg-foreground text-background rounded-br-sm'
                            : isAdmin
                            ? 'bg-primary/10 text-foreground border border-primary/20 rounded-bl-sm'
                            : msg.messageType === 'transaction'
                            ? 'bg-income/8 border border-income/15 text-foreground rounded-bl-sm'
                            : msg.messageType === 'report'
                            ? 'bg-muted border border-border text-foreground rounded-bl-sm'
                            : msg.messageType === 'clarification'
                            ? 'bg-gold/8 border border-gold/15 text-foreground rounded-bl-sm'
                            : 'bg-muted text-foreground rounded-bl-sm'
                        )}>
                          {msg.text}
                          {/* Parsed transaction pill */}
                          {msg.parsedTransaction && (
                            <div className={cn('mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium', msg.parsedTransaction.type === 'income' ? 'bg-income/15 text-income' : 'bg-expense/15 text-expense')}>
                              {msg.parsedTransaction.type === 'income' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {msg.parsedTransaction.category} · {formatAmount(msg.parsedTransaction.amount)}
                            </div>
                          )}
                        </div>
                        <p className={cn('text-[11px] text-muted-foreground px-1', isUser ? 'text-right' : 'text-left')}>
                          {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                          {msg.messageType === 'admin' && ' · от вас'}
                        </p>
                      </div>

                      {/* User avatar */}
                      {isUser && (
                        <div className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground flex-shrink-0 mb-0.5">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </motion.div>
                  )
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="flex-shrink-0 border-t border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={`Написать ${user.name} от имени бота...`}
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAdminMessage() } }}
                      className="w-full px-4 py-2.5 text-sm bg-muted border border-border rounded-xl outline-none focus:border-primary transition-colors pr-12"
                    />
                  </div>
                  <button
                    onClick={sendAdminMessage}
                    disabled={!chatInput.trim()}
                    className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Сообщение будет отправлено пользователю через Telegram-бот. Enter для отправки.
                </p>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Footer meta */}
      <div className="flex items-center gap-4 px-1 pt-1 border-t border-border">
        <p className="text-xs text-muted-foreground">ID: <span className="font-mono">{user.id}</span></p>
        <p className="text-xs text-muted-foreground">Зарегистрирован: {formatDateTime(user.joinDate)}</p>
        <p className="text-xs text-muted-foreground">Активность: {formatDateTime(user.lastActive)}</p>
      </div>
    </motion.div>
  )
}
