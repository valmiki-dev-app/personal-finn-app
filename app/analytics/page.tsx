'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Hash,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { AppShell } from '@/components/app-shell'
import { MetricCard } from '@/components/metric-card'
import { ChartCard } from '@/components/chart-card'
import { InsightCard } from '@/components/insight-card'
import { CategoryProgress } from '@/components/category-progress'
import { PeriodSelector, type Period } from '@/components/period-selector'
import {
  getTransactionsForPeriod,
  getTotalIncome,
  getTotalExpense,
  getExpensesByCategory,
  getDailyExpenses,
  getCategoryById,
  formatCurrency,
} from '@/lib/mock-data'

const COLORS = ['#E3807C', '#6BAA75', '#D6A85A', '#6F5E53', '#A39A93', '#7A6F68']

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('month')

  const days = period === 'week' ? 7 : period === 'month' ? 30 : 365
  
  const transactions = useMemo(() => getTransactionsForPeriod(days), [days])
  const income = useMemo(() => getTotalIncome(transactions), [transactions])
  const expense = useMemo(() => getTotalExpense(transactions), [transactions])
  const balance = useMemo(() => income - expense, [income, expense])
  const txCount = transactions.length
  
  const categoryExpenses = useMemo(() => getExpensesByCategory(transactions), [transactions])
  const dailyData = useMemo(() => getDailyExpenses(period === 'week' ? 7 : period === 'month' ? 30 : 12), [period])

  // Pie chart data
  const pieData = useMemo(() => {
    return categoryExpenses.slice(0, 6).map(cat => {
      const category = getCategoryById(cat.categoryId)
      return {
        name: category?.name || cat.categoryId,
        value: cat.total,
        percentage: cat.percentage,
      }
    })
  }, [categoryExpenses])

  // Top category insight
  const topCategory = categoryExpenses[0]
  const topCategoryName = getCategoryById(topCategory?.categoryId)?.name || ''

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Аналитика
            </h1>
            <p className="text-muted-foreground mt-1">
              Анализ доходов и расходов
            </p>
          </div>
          <PeriodSelector value={period} onChange={setPeriod} />
        </motion.div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <MetricCard
            title="Доходы"
            value={income}
            type="income"
            icon={TrendingUp}
            delay={0.1}
          />
          <MetricCard
            title="Расходы"
            value={expense}
            type="expense"
            icon={TrendingDown}
            delay={0.15}
          />
          <MetricCard
            title="Баланс"
            value={balance}
            type={balance >= 0 ? 'income' : 'expense'}
            icon={Wallet}
            delay={0.2}
          />
          <MetricCard
            title="Операций"
            value={txCount}
            type="default"
            icon={Hash}
            delay={0.25}
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          {/* Expense by Category Pie Chart */}
          <ChartCard
            title="Расходы по категориям"
            description={`За ${period === 'week' ? 'неделю' : period === 'month' ? 'месяц' : 'год'}`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2 w-full">
                {pieData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-foreground flex-1 truncate">{item.name}</span>
                    <span className="text-sm font-medium text-foreground">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          {/* Income vs Expense Bar Chart */}
          <ChartCard
            title="Доходы и расходы"
            description="Сравнение по дням"
          >
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData.slice(-7)} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
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
                    formatter={(value: number, name: string) => [
                      formatCurrency(value), 
                      name === 'income' ? 'Доходы' : 'Расходы'
                    ]}
                  />
                  <Bar 
                    dataKey="income" 
                    fill="var(--income)" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                  />
                  <Bar 
                    dataKey="expense" 
                    fill="var(--expense)" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-income" />
                <span className="text-sm text-muted-foreground">Доходы</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-expense" />
                <span className="text-sm text-muted-foreground">Расходы</span>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Daily Spending Trend */}
        <ChartCard
          title="Тренд расходов"
          description="Динамика трат по дням"
        >
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="expenseGradientAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--expense)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--expense)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  dy={10}
                  interval="preserveStartEnd"
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
                  formatter={(value: number) => [formatCurrency(value), 'Расходы']}
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="var(--expense)"
                  strokeWidth={2}
                  fill="url(#expenseGradientAnalytics)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* AI Insight */}
        {topCategory && (
          <InsightCard 
            message={`Расходы на ${topCategoryName.toLowerCase()} составили ${topCategory.percentage}% от всех трат за ${period === 'week' ? 'неделю' : period === 'month' ? 'месяц' : 'год'}. ${topCategory.percentage > 25 ? 'Это довольно много — возможно, стоит обратить внимание на эту категорию.' : 'Это не критично, баланс выглядит здоровым.'}`}
          />
        )}

        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card rounded-2xl border border-border/50 p-5"
        >
          <h3 className="font-semibold text-foreground mb-4">Все категории расходов</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {categoryExpenses.map((cat, index) => {
              const category = getCategoryById(cat.categoryId)
              const Icon = category?.icon
              const prevPeriodEstimate = cat.total * 0.9 // Mock previous period
              const change = cat.total - prevPeriodEstimate
              const changePercent = Math.round((change / prevPeriodEstimate) * 100)
              
              return (
                <motion.div
                  key={cat.categoryId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${category?.color}15` }}
                  >
                    {Icon && <Icon className="h-5 w-5" style={{ color: category?.color }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground truncate">{category?.name}</p>
                      <p className="font-semibold text-foreground">{formatCurrency(cat.total)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-muted-foreground">{cat.percentage}% от расходов</p>
                      <div className={`flex items-center gap-0.5 text-xs ${change > 0 ? 'text-expense' : 'text-income'}`}>
                        {change > 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {Math.abs(changePercent)}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </AppShell>
  )
}
