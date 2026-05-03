'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Calculator,
  ArrowRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { AppShell } from '@/components/app-shell'
import { BalanceCard } from '@/components/balance-card'
import { MetricCard } from '@/components/metric-card'
import { InsightCard } from '@/components/insight-card'
import { ChartCard } from '@/components/chart-card'
import { TransactionItem } from '@/components/transaction-item'
import { CategoryProgress } from '@/components/category-progress'
import { Button } from '@/components/ui/button'
import {
  userData,
  transactions,
  getTransactionsForPeriod,
  getTotalIncome,
  getTotalExpense,
  getExpensesByCategory,
  getDailyExpenses,
} from '@/lib/mock-data'

export default function DashboardPage() {
  const monthTransactions = useMemo(() => getTransactionsForPeriod(30), [])
  const weekTransactions = useMemo(() => getTransactionsForPeriod(7), [])
  
  const monthIncome = useMemo(() => getTotalIncome(monthTransactions), [monthTransactions])
  const monthExpense = useMemo(() => getTotalExpense(monthTransactions), [monthTransactions])
  
  const topCategories = useMemo(() => getExpensesByCategory(monthTransactions).slice(0, 4), [monthTransactions])
  const dailyData = useMemo(() => getDailyExpenses(7), [])
  const recentTransactions = useMemo(() => transactions.slice(0, 5), [])
  
  const avgDailyExpense = useMemo(() => Math.round(monthExpense / 30), [monthExpense])

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
            Привет, {userData.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Вот твоя финансовая картина на сегодня
          </p>
        </motion.div>

        {/* Main Balance Card */}
        <BalanceCard
          accountName={userData.account.name}
          balance={userData.account.balance}
          weekChange={userData.account.weekChange}
          monthIncome={monthIncome}
          monthExpense={monthExpense}
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <MetricCard
            title="Доходы за месяц"
            value={monthIncome}
            type="income"
            icon={TrendingUp}
            delay={0.1}
          />
          <MetricCard
            title="Расходы за месяц"
            value={monthExpense}
            type="expense"
            icon={TrendingDown}
            delay={0.15}
          />
          <MetricCard
            title="Баланс месяца"
            value={monthIncome - monthExpense}
            type="balance"
            icon={Wallet}
            delay={0.2}
          />
          <MetricCard
            title="Средний расход в день"
            value={avgDailyExpense}
            type="default"
            icon={Calculator}
            delay={0.25}
          />
        </div>

        {/* Insight Card */}
        <InsightCard 
          message="На этой неделе больше всего ушло на кафе и еду. Всё окей, но если хочешь мягко снизить расходы, можно поставить ориентир на кафе до 1 500 ₽ в неделю."
        />

        {/* Charts and Categories */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          {/* Expense Chart */}
          <ChartCard
            title="Расходы за неделю"
            description="Динамика трат за последние 7 дней"
          >
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--expense)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--expense)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    hide 
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                    labelStyle={{ color: 'var(--foreground)', fontWeight: 500 }}
                    formatter={(value: number) => [`${value.toLocaleString('ru-RU')} ₽`, 'Расходы']}
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="var(--expense)"
                    strokeWidth={2}
                    fill="url(#expenseGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Top Categories */}
          <ChartCard
            title="Топ категорий расходов"
            description="За последний месяц"
          >
            <div className="space-y-4">
              {topCategories.map((cat, index) => (
                <CategoryProgress
                  key={cat.categoryId}
                  categoryId={cat.categoryId}
                  total={cat.total}
                  percentage={cat.percentage}
                  index={index}
                />
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-card rounded-2xl border border-border/50 overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <div>
              <h3 className="font-semibold text-foreground">Последние операции</h3>
              <p className="text-sm text-muted-foreground">5 последних транзакций</p>
            </div>
            <Link href="/transactions">
              <Button variant="ghost" size="sm" className="rounded-xl gap-2">
                Все операции
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="divide-y divide-border/30">
            {recentTransactions.map((transaction, index) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                index={index}
                compact
              />
            ))}
          </div>
        </motion.div>
      </div>
    </AppShell>
  )
}
