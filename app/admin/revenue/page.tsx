'use client'

import { revenueMetrics } from '@/lib/admin/admin-mock-data'

export default function AdminRevenuePage() {
  const metrics = [
    { label: 'Total Revenue', value: `₽${revenueMetrics.totalRevenue.toLocaleString()}`, color: 'text-foreground' },
    { label: 'MRR', value: `₽${revenueMetrics.mrr.toLocaleString()}`, color: 'text-income' },
    { label: 'Paying Users', value: String(revenueMetrics.payingUsers), color: 'text-primary' },
    { label: 'Conversion Rate', value: `${revenueMetrics.conversionRate}%`, color: 'text-gold' },
    { label: 'ARPU', value: `₽${revenueMetrics.arpu.toLocaleString()}`, color: 'text-foreground' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Revenue</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Subscription and monetisation overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-card rounded-xl border border-border p-5">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className={`text-2xl font-bold mt-1 ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Subscription breakdown</h3>
        <div className="space-y-2.5">
          {[
            { label: 'Premium', count: 342, pct: 27.5, color: 'bg-income' },
            { label: 'Trial', count: 180, pct: 14.5, color: 'bg-primary' },
            { label: 'Free', count: 721, pct: 58, color: 'bg-muted-foreground/30' },
          ].map((tier) => (
            <div key={tier.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{tier.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{tier.count} users</span>
                  <span className="text-xs font-semibold text-foreground w-10 text-right">{tier.pct}%</span>
                </div>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${tier.color}`} style={{ width: `${tier.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
