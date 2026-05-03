'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { 
  User, 
  Bell, 
  Palette, 
  Tag,
  MessageCircle,
  Globe,
  Clock,
  Check,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { SettingsSection } from '@/components/settings-section'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { userData, categories } from '@/lib/mock-data'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [dailyReminder, setDailyReminder] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)

  const themeOptions = [
    { value: 'light', label: 'Светлая', icon: Sun },
    { value: 'dark', label: 'Тёмная', icon: Moon },
    { value: 'system', label: 'Системная', icon: Laptop },
  ]

  const expenseCategories = categories.filter(c => c.type === 'expense')
  const incomeCategories = categories.filter(c => c.type === 'income')

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Настройки
          </h1>
          <p className="text-muted-foreground mt-1">
            Управление профилем и настройками приложения
          </p>
        </motion.div>

        {/* Profile Section */}
        <SettingsSection
          title="Профиль"
          description="Информация о вашем аккаунте"
          delay={0.1}
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground">{userData.name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                {userData.telegramUsername}
              </div>
            </div>
            <Badge variant="outline" className="rounded-full">
              <Check className="h-3 w-3 mr-1 text-income" />
              Активен
            </Badge>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Часовой пояс</p>
                <p className="text-xs text-muted-foreground">{userData.timezone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                <span className="text-sm font-semibold text-muted-foreground">₽</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Валюта</p>
                <p className="text-xs text-muted-foreground">Российский рубль ({userData.currency})</p>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Notifications Section */}
        <SettingsSection
          title="Уведомления"
          description="Настройки напоминаний и отчётов"
          delay={0.15}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor="daily-reminder" className="text-sm font-medium text-foreground cursor-pointer">
                    Ежедневное напоминание
                  </Label>
                  <p className="text-xs text-muted-foreground">Каждый день в 20:00</p>
                </div>
              </div>
              <Switch
                id="daily-reminder"
                checked={dailyReminder}
                onCheckedChange={setDailyReminder}
              />
            </div>
            
            <div className="h-px bg-border/50" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor="weekly-report" className="text-sm font-medium text-foreground cursor-pointer">
                    Еженедельный отчёт
                  </Label>
                  <p className="text-xs text-muted-foreground">Каждый понедельник в 20:00</p>
                </div>
              </div>
              <Switch
                id="weekly-report"
                checked={weeklyReport}
                onCheckedChange={setWeeklyReport}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Theme Section */}
        <SettingsSection
          title="Оформление"
          description="Выберите тему приложения"
          delay={0.2}
        >
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const Icon = option.icon
              const isActive = theme === option.value
              
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    isActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl',
                    isActive ? 'bg-primary/10' : 'bg-muted'
                  )}>
                    <Icon className={cn(
                      'h-5 w-5',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )} />
                  </div>
                  <span className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-primary' : 'text-foreground'
                  )}>
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>
        </SettingsSection>

        {/* Categories Section */}
        <SettingsSection
          title="Категории"
          description="Список доступных категорий для операций"
          delay={0.25}
        >
          <div className="space-y-4">
            {/* Expense Categories */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">Расходы</p>
              <div className="flex flex-wrap gap-2">
                {expenseCategories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <div
                      key={cat.id}
                      className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-xl"
                    >
                      <div 
                        className="flex h-6 w-6 items-center justify-center rounded-md"
                        style={{ backgroundColor: `${cat.color}20` }}
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color: cat.color }} />
                      </div>
                      <span className="text-sm text-foreground">{cat.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="h-px bg-border/50" />
            
            {/* Income Categories */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">Доходы</p>
              <div className="flex flex-wrap gap-2">
                {incomeCategories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <div
                      key={cat.id}
                      className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-xl"
                    >
                      <div 
                        className="flex h-6 w-6 items-center justify-center rounded-md"
                        style={{ backgroundColor: `${cat.color}20` }}
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color: cat.color }} />
                      </div>
                      <span className="text-sm text-foreground">{cat.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground pt-2">
              Редактирование категорий будет доступно в следующих версиях
            </p>
          </div>
        </SettingsSection>

        {/* Telegram Bot Status */}
        <SettingsSection
          title="Telegram бот"
          description="Статус подключения"
          delay={0.3}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#229ED9]/10">
              <MessageCircle className="h-6 w-6 text-[#229ED9]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">@finn_ovelin_bot</p>
              <p className="text-sm text-muted-foreground">Подключён к вашему аккаунту</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-income/10 rounded-full">
              <div className="w-2 h-2 bg-income rounded-full animate-pulse" />
              <span className="text-sm font-medium text-income">Активен</span>
            </div>
          </div>
        </SettingsSection>
      </div>
    </AppShell>
  )
}
