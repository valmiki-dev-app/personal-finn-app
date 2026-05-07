'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  MessageSquare,
  AlertTriangle,
  Send,
  CheckCheck,
  ChevronRight,
  X,
  AlertCircle,
  CheckCircle,
  Info,
  RefreshCw,
} from 'lucide-react'
import { adminNotifications } from '@/lib/admin/admin-mock-data'
import type { AdminNotification, NotificationType, NotificationSeverity } from '@/lib/admin/admin-types'
import { cn } from '@/lib/utils'

// ─── helpers ────────────────────────────────────────────────────────────────

function timeAgo(date: Date): string {
  const diff = (Date.now() - date.getTime()) / 1000
  if (diff < 60)    return 'только что'
  if (diff < 3600)  return `${Math.floor(diff / 60)} мин. назад`
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч. назад`
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

const TAB_CONFIG: { id: NotificationType | 'all'; label: string; icon: React.ElementType }[] = [
  { id: 'all',           label: 'Все',           icon: Bell          },
  { id: 'user_reply',    label: 'Ответы',        icon: MessageSquare },
  { id: 'system_alert',  label: 'Система',       icon: AlertTriangle },
  { id: 'sent_message',  label: 'Отправленные',  icon: Send          },
]

const SEVERITY_CONFIG: Record<NotificationSeverity, { icon: React.ElementType; classes: string; dot: string }> = {
  info:    { icon: Info,         classes: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900',       dot: 'bg-blue-500'  },
  success: { icon: CheckCircle,  classes: 'bg-income/10 text-income border-income/20',                                                                   dot: 'bg-income'    },
  warning: { icon: AlertTriangle,classes: 'bg-gold/10 text-gold border-gold/20',                                                                         dot: 'bg-gold'      },
  error:   { icon: AlertCircle,  classes: 'bg-expense/10 text-expense border-expense/20',                                                                dot: 'bg-expense'   },
}

// ─── NotificationCard ────────────────────────────────────────────────────────

function NotificationCard({
  notif,
  onRead,
  onDismiss,
}: {
  notif: AdminNotification
  onRead: (id: string) => void
  onDismiss: (id: string) => void
}) {
  const sev = SEVERITY_CONFIG[notif.severity]
  const SevIcon = sev.icon
  const isUserRelated = notif.type === 'user_reply' || notif.type === 'sent_message'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }}
      className={cn(
        'group relative flex gap-4 p-4 rounded-xl border transition-all duration-150',
        notif.read
          ? 'bg-card border-border'
          : 'bg-card border-primary/20 shadow-sm shadow-primary/5',
      )}
    >
      {/* Unread dot */}
      {!notif.read && (
        <span className={cn('absolute top-4 right-4 w-2 h-2 rounded-full', sev.dot)} />
      )}

      {/* Icon */}
      <div className={cn('flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg border text-sm', sev.classes)}>
        <SevIcon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className={cn('text-sm font-semibold leading-tight', notif.read ? 'text-foreground/80' : 'text-foreground')}>
            {notif.title}
          </p>
          <span className="flex-shrink-0 text-xs text-muted-foreground whitespace-nowrap">
            {timeAgo(notif.timestamp)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{notif.body}</p>

        {/* Thread context — show original admin message if this is a reply */}
        {notif.type === 'user_reply' && notif.adminMessage && (
          <div className="mt-2 pl-3 border-l-2 border-border">
            <p className="text-xs text-muted-foreground line-clamp-1">
              <span className="font-medium">Вы писали:</span> {notif.adminMessage}
            </p>
          </div>
        )}

        {/* System error code */}
        {notif.errorCode && (
          <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-xs font-mono text-muted-foreground">
            {notif.errorCode}
          </span>
        )}

        {/* Footer actions */}
        <div className="flex items-center gap-3 mt-3">
          {isUserRelated && notif.userId && (
            <Link
              href={`/admin/users/${notif.userId}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Открыть профиль
              <ChevronRight className="h-3 w-3" />
            </Link>
          )}
          {notif.type === 'system_alert' && (
            <Link
              href="/admin/system"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Статус системы
              <ChevronRight className="h-3 w-3" />
            </Link>
          )}
          {!notif.read && (
            <button
              onClick={() => onRead(notif.id)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Отметить прочитанным
            </button>
          )}
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => onDismiss(notif.id)}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex h-5 w-5 items-center justify-center rounded-full hover:bg-muted transition-all duration-150"
        aria-label="Dismiss"
      >
        <X className="h-3 w-3 text-muted-foreground" />
      </button>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AdminNotification[]>(adminNotifications)
  const [activeTab, setActiveTab] = useState<NotificationType | 'all'>('all')

  const unreadCount = notifications.filter(n => !n.read).length

  const filtered = useMemo(() => {
    if (activeTab === 'all') return notifications
    return notifications.filter(n => n.type === activeTab)
  }, [notifications, activeTab])

  const tabUnread = (tab: NotificationType | 'all') => {
    const pool = tab === 'all' ? notifications : notifications.filter(n => n.type === tab)
    return pool.filter(n => !n.read).length
  }

  function markRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function dismiss(id: string) {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            Уведомления
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Ответы пользователей, системные алерты и история отправленных сообщений
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 text-foreground transition-colors border border-border"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Все прочитаны
            </button>
          )}
          <button
            onClick={() => setNotifications(adminNotifications)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 text-foreground transition-colors border border-border"
            title="Сбросить"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {TAB_CONFIG.map(tab => {
          const Icon = tab.icon
          const count = tabUnread(tab.id)
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-card text-foreground shadow-sm border border-border'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className="h-3.5 w-3.5 flex-shrink-0" />
              {tab.label}
              {count > 0 && (
                <span className={cn(
                  'inline-flex items-center justify-center h-4.5 min-w-4 px-1 rounded-full text-xs font-semibold',
                  active ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-foreground',
                )}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Нет уведомлений</p>
              <p className="text-xs text-muted-foreground mt-1">В этом разделе пока пусто</p>
            </motion.div>
          ) : (
            filtered.map(notif => (
              <NotificationCard
                key={notif.id}
                notif={notif}
                onRead={markRead}
                onDismiss={dismiss}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
