'use client'

import { systemStatus } from '@/lib/admin/admin-mock-data'
import { StatusBadge } from '@/components/admin/shared/status-badge'
import { formatRelativeTime } from '@/lib/admin/admin-utils'

export default function AdminSystemPage() {
  const allOperational = systemStatus.every((s) => s.status === 'operational')

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">System Health</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {allOperational ? 'All systems operational' : 'Some systems have issues'}
        </p>
      </div>

      {/* Summary banner */}
      <div className={`rounded-xl border p-4 flex items-center gap-3 ${allOperational ? 'bg-income/5 border-income/20' : 'bg-expense/5 border-expense/20'}`}>
        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse ${allOperational ? 'bg-income' : 'bg-expense'}`} />
        <p className={`text-sm font-medium ${allOperational ? 'text-income' : 'text-expense'}`}>
          {allOperational ? 'All 4 services are operational' : 'Service disruption detected'}
        </p>
      </div>

      {/* Services */}
      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {systemStatus.map((service) => (
          <div key={service.name} className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${service.status === 'operational' ? 'bg-income animate-pulse' : service.status === 'degraded' ? 'bg-gold' : 'bg-expense'}`} />
              <div>
                <p className="text-sm font-medium text-foreground">{service.name}</p>
                <p className="text-xs text-muted-foreground">Checked {formatRelativeTime(service.lastChecked)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Uptime</p>
                <p className="text-sm font-semibold text-foreground">{service.uptime}%</p>
              </div>
              <StatusBadge status={service.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
