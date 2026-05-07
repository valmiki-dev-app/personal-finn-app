'use client'

import { BarChart3 } from 'lucide-react'
import { funnelSteps, retentionCohorts } from '@/lib/admin/admin-mock-data'

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">User funnel and retention cohorts</p>
      </div>

      {/* Funnel */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Activation Funnel</h3>
        <div className="space-y-3">
          {funnelSteps.map((step, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{step.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{step.users.toLocaleString()} users</span>
                  <span className="text-xs font-semibold text-foreground w-10 text-right">{step.percentage}%</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${step.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retention Cohorts */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Retention Cohorts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground">Cohort</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground">Users</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground">D1</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground">D7</th>
                <th className="text-right py-2 pl-4 text-xs font-medium text-muted-foreground">D30</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {retentionCohorts.map((cohort, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 pr-4 text-foreground">
                    {cohort.cohortDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{cohort.userCount}</td>
                  <td className="py-3 px-4 text-right font-medium text-income">{cohort.d1}%</td>
                  <td className="py-3 px-4 text-right font-medium text-primary">{cohort.d7}%</td>
                  <td className="py-3 pl-4 text-right font-medium text-gold">
                    {cohort.d30 !== undefined ? `${cohort.d30}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
