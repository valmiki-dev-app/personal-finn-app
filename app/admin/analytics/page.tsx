'use client'

import { useState } from 'react'
import {
  AreaChart, Area,
  BarChart, Bar,
  ComposedChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { TrendingUp, TrendingDown, Minus, Users, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  userGrowthMonthly,
  userGrowthWeekly,
  hourlyActivity,
  featureAdoption,
  dailyVolume,
  churnReasons,
  subscriptionOverTime,
  funnelSteps,
  retentionCohorts,
} from '@/lib/admin/admin-mock-data'

// ─── Helpers ────────────────────────────────────────────────────────────────

const PRIMARY    = '#E3807C'
const INCOME     = '#6BAA75'
const EXPENSE    = '#D96C6C'
const GOLD       = '#D6A85A'
const MUTED_BG   = '#EADFD2'

function PeriodToggle({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { label: string; value: string }[]
}) {
  return (
    <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150',
            value === o.value
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function SectionHeader({ title, description, right }: { title: string; description?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {right}
    </div>
  )
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('bg-card rounded-xl border border-border p-5', className)}>
      {children}
    </div>
  )
}

// ─── Custom Tooltip ─────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-sm text-xs">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <span className="font-semibold ml-0.5">{typeof p.value === 'number' && p.value > 999 ? p.value.toLocaleString('ru-RU') : p.value}</span>
        </p>
      ))}
    </div>
  )
}

// ─── 1. User Growth ─────────────────────────────────────────────────────────

function UserGrowthChart() {
  const [period, setPeriod] = useState<'monthly' | 'weekly'>('monthly')
  const data = period === 'monthly' ? userGrowthMonthly : userGrowthWeekly
  const totalNew = data.reduce((s, d) => s + d.newUsers, 0)

  return (
    <Card>
      <SectionHeader
        title="Рост пользователей"
        description={`+${totalNew.toLocaleString('ru-RU')} новых за период`}
        right={
          <PeriodToggle
            value={period}
            onChange={(v) => setPeriod(v as 'monthly' | 'weekly')}
            options={[
              { label: 'По месяцам', value: 'monthly' },
              { label: 'По неделям', value: 'weekly' },
            ]}
          />
        }
      />
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ left: -10, right: 8, top: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={PRIMARY} stopOpacity={0.15} />
              <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={MUTED_BG} vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#A89080' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#A89080' }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="totalUsers"
            name="Всего"
            stroke={PRIMARY}
            strokeWidth={2}
            fill="url(#totalGrad)"
            dot={false}
          />
          <Bar dataKey="newUsers" name="Новые" fill={INCOME} opacity={0.85} radius={[3, 3, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: PRIMARY }} />
          Всего пользователей
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: INCOME, opacity: 0.85 }} />
          Новые за период
        </div>
      </div>
    </Card>
  )
}

// ─── 2. Hourly Activity Heatmap ─────────────────────────────────────────────

function HourlyHeatmap() {
  const maxVal = Math.max(...hourlyActivity.flatMap(r => r.hours))

  function cellColor(value: number) {
    const intensity = value / maxVal
    if (intensity === 0) return 'bg-muted'
    if (intensity < 0.2) return 'bg-primary/10'
    if (intensity < 0.4) return 'bg-primary/25'
    if (intensity < 0.6) return 'bg-primary/45'
    if (intensity < 0.8) return 'bg-primary/65'
    return 'bg-primary/85'
  }

  const peakHour = (() => {
    let maxH = 0, maxV = 0
    hourlyActivity.forEach(row => {
      row.hours.forEach((v, h) => { if (v > maxV) { maxV = v; maxH = h } })
    })
    return `${maxH}:00–${maxH + 1}:00`
  })()

  return (
    <Card>
      <SectionHeader
        title="Активность по времени"
        description={`Пиковое время: ${peakHour}`}
      />
      {/* Hour labels */}
      <div className="flex items-center mb-1.5">
        <div className="w-7 flex-shrink-0" />
        <div className="flex-1 grid gap-px" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="text-center" style={{ fontSize: 9 }}>
              <span className="text-muted-foreground">
                {h % 3 === 0 ? h : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Grid */}
      <div className="space-y-px">
        {hourlyActivity.map((row) => (
          <div key={row.day} className="flex items-center gap-1">
            <span className="w-6 text-right text-muted-foreground flex-shrink-0" style={{ fontSize: 10 }}>
              {row.day}
            </span>
            <div className="flex-1 grid gap-px" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
              {row.hours.map((v, h) => (
                <div
                  key={h}
                  title={`${row.day} ${h}:00 — ${v} сообщений`}
                  className={cn('rounded-sm h-5 cursor-default transition-opacity hover:opacity-80', cellColor(v))}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-muted-foreground">Меньше</span>
        {[0, 0.15, 0.35, 0.55, 0.75, 1].map((i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-sm"
            style={{ background: i === 0 ? MUTED_BG : PRIMARY, opacity: i === 0 ? 1 : i }}
          />
        ))}
        <span className="text-xs text-muted-foreground">Больше</span>
      </div>
    </Card>
  )
}

// ─── 3. Daily Transaction Volume ────────────────────────────────────────────

function TransactionVolumeChart() {
  const [mode, setMode] = useState<'count' | 'amount'>('count')
  const last7  = dailyVolume.slice(-7)
  const last30 = dailyVolume

  const [period, setPeriod] = useState<'7' | '30'>('30')
  const data = period === '7' ? last7 : last30

  return (
    <Card>
      <SectionHeader
        title="Объём транзакций"
        description="Пульс продукта — сколько записей добавляют пользователи"
        right={
          <div className="flex items-center gap-2">
            <PeriodToggle
              value={mode}
              onChange={(v) => setMode(v as 'count' | 'amount')}
              options={[
                { label: 'Кол-во', value: 'count' },
                { label: 'Сумма', value: 'amount' },
              ]}
            />
            <PeriodToggle
              value={period}
              onChange={(v) => setPeriod(v as '7' | '30')}
              options={[
                { label: '7д', value: '7' },
                { label: '30д', value: '30' },
              ]}
            />
          </div>
        }
      />
      <ResponsiveContainer width="100%" height={200}>
        {mode === 'count' ? (
          <BarChart data={data} margin={{ left: -10, right: 8, top: 4, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={MUTED_BG} vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#A89080' }} axisLine={false} tickLine={false} interval={period === '30' ? 5 : 0} />
            <YAxis tick={{ fontSize: 10, fill: '#A89080' }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="transactions" name="Транзакций" fill={PRIMARY} radius={[3, 3, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={data} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={INCOME} stopOpacity={0.2} />
                <stop offset="95%" stopColor={INCOME} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={EXPENSE} stopOpacity={0.2} />
                <stop offset="95%" stopColor={EXPENSE} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={MUTED_BG} vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#A89080' }} axisLine={false} tickLine={false} interval={period === '30' ? 5 : 0} />
            <YAxis tick={{ fontSize: 10, fill: '#A89080' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="income"  name="Доходы"  stroke={INCOME}  strokeWidth={2} fill="url(#incomeGrad)"  dot={false} />
            <Area type="monotone" dataKey="expense" name="Расходы" stroke={EXPENSE} strokeWidth={2} fill="url(#expenseGrad)" dot={false} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </Card>
  )
}

// ─── 4. Subscription breakdown ───────────────────────────────────────────────

function SubscriptionChart() {
  const data = subscriptionOverTime
  return (
    <Card>
      <SectionHeader
        title="Динамика подписок"
        description="Free / Trial / Premium по месяцам"
      />
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ left: -10, right: 8, top: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="premGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={GOLD} stopOpacity={0.3} />
              <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={MUTED_BG} vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#A89080' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#A89080' }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey="free"    name="Free"    stroke={MUTED_BG} strokeWidth={1.5} fill="transparent" dot={false} />
          <Area type="monotone" dataKey="trial"   name="Trial"   stroke={PRIMARY}  strokeWidth={1.5} fill="transparent" dot={false} />
          <Area type="monotone" dataKey="premium" name="Premium" stroke={GOLD}     strokeWidth={2}   fill="url(#premGrad)"  dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

// ─── 5. Feature Adoption ────────────────────────────────────────────────────

function FeatureAdoptionChart() {
  const trendIcon = (t: 'up' | 'down' | 'stable') => {
    if (t === 'up')   return <TrendingUp   className="h-3 w-3 text-income" />
    if (t === 'down') return <TrendingDown className="h-3 w-3 text-expense" />
    return <Minus className="h-3 w-3 text-muted-foreground" />
  }

  return (
    <Card>
      <SectionHeader
        title="Adoption функций"
        description="Насколько каждая функция задействована в базе"
      />
      <div className="space-y-3">
        {featureAdoption.map((f) => (
          <div key={f.feature}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                {trendIcon(f.trend)}
                <span className="text-sm text-foreground">{f.feature}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{f.users.toLocaleString('ru-RU')}</span>
                <span className="text-xs font-semibold text-foreground w-8 text-right">{f.percentage}%</span>
              </div>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${f.percentage}%`,
                  background: f.percentage >= 60 ? INCOME : f.percentage >= 30 ? PRIMARY : EXPENSE,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── 6. Churn Reasons ───────────────────────────────────────────────────────

const CHURN_COLORS = [EXPENSE, PRIMARY, GOLD, '#A89FD0', '#7BBFB5', '#C8A8A0']

function ChurnReasonsChart() {
  return (
    <Card>
      <SectionHeader
        title="Причины оттока"
        description="Почему пользователи перестают пользоваться"
      />
      <div className="flex flex-col gap-5">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={churnReasons}
              dataKey="count"
              nameKey="reason"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
            >
              {churnReasons.map((_, i) => (
                <Cell key={i} fill={CHURN_COLORS[i % CHURN_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any, name: any) => [`${val} чел.`, name]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2">
          {churnReasons.map((r, i) => (
            <div key={r.reason} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: CHURN_COLORS[i % CHURN_COLORS.length] }}
                />
                <span className="text-foreground/80">{r.reason}</span>
              </div>
              <span className="text-xs font-medium text-foreground">{r.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

// ─── 7. Activation Funnel ───────────────────────────────────────────────────

function FunnelChart() {
  const max = funnelSteps[0].users
  return (
    <Card>
      <SectionHeader
        title="Activation Funnel"
        description="Путь пользователя от запуска до удержания"
      />
      <div className="space-y-2.5">
        {funnelSteps.map((step, i) => {
          const prevPct = i === 0 ? 100 : (step.users / funnelSteps[i - 1].users) * 100
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-medium flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{step.label}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground">{step.users.toLocaleString('ru-RU')}</span>
                  {i > 0 && (
                    <span className={cn('font-medium', prevPct >= 70 ? 'text-income' : prevPct >= 40 ? 'text-gold' : 'text-expense')}>
                      {prevPct.toFixed(0)}%
                    </span>
                  )}
                  <span className="text-foreground font-semibold w-10 text-right">{step.percentage}%</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${(step.users / max) * 100}%`, background: PRIMARY }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// ─── 8. Retention Cohorts ───────────────────────────────────────────────────

function RetentionTable() {
  function retColor(v: number) {
    if (v >= 80) return 'text-income font-semibold'
    if (v >= 60) return 'text-income/80'
    if (v >= 40) return 'text-gold'
    return 'text-expense'
  }

  return (
    <Card>
      <SectionHeader
        title="Retention cohorts"
        description="Процент пользователей, вернувшихся через N дней"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground">Когорта</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Пользователей</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">D1</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">D7</th>
              <th className="text-right py-2 pl-3 text-xs font-medium text-muted-foreground">D30</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {retentionCohorts.map((c, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 pr-4 text-foreground">
                  {c.cohortDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                </td>
                <td className="py-3 px-3 text-right text-muted-foreground">{c.userCount}</td>
                <td className={cn('py-3 px-3 text-right', retColor(c.d1))}>{c.d1}%</td>
                <td className={cn('py-3 px-3 text-right', retColor(c.d7))}>{c.d7}%</td>
                <td className={cn('py-3 pl-3 text-right', c.d30 !== undefined ? retColor(c.d30) : 'text-muted-foreground')}>
                  {c.d30 !== undefined ? `${c.d30}%` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

// ─── Summary bar ────────────────────────────────────────────────────────────

const SUMMARY = [
  { label: 'Всего пользователей', value: '1 243',  delta: '+45 эта неделя',   up: true  },
  { label: 'Конверсия в Premium', value: '27.5%',  delta: '+2.1% vs месяц',   up: true  },
  { label: 'D7 Retention',        value: '70%',    delta: '+2pp vs месяц',    up: true  },
  { label: 'Avg. транзакций/user', value: '87',    delta: '+11 vs месяц',     up: true  },
]

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Рост, активность и здоровье продукта
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {SUMMARY.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border px-4 py-3">
            <p className="text-xs text-muted-foreground mb-0.5">{s.label}</p>
            <p className="text-xl font-bold text-foreground leading-none">{s.value}</p>
            <p className={cn('text-xs mt-1 flex items-center gap-1', s.up ? 'text-income' : 'text-expense')}>
              <ArrowUpRight className="h-3 w-3" />
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Row 1: Growth + Subscriptions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <UserGrowthChart />
        </div>
        <SubscriptionChart />
      </div>

      {/* Row 2: Heatmap full width */}
      <HourlyHeatmap />

      {/* Row 3: Transaction volume + Feature adoption */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <TransactionVolumeChart />
        <FeatureAdoptionChart />
      </div>

      {/* Row 4: Funnel + Churn reasons */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <FunnelChart />
        <ChurnReasonsChart />
      </div>

      {/* Row 5: Retention cohorts */}
      <RetentionTable />

    </div>
  )
}
