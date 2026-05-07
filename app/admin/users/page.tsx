'use client'

import { useState, useMemo } from 'react'
import { UsersTable } from '@/components/admin/users/users-table'
import { FiltersPanel } from '@/components/admin/users/filters-panel'
import { adminUsers } from '@/lib/admin/admin-mock-data'

const totalUsers = adminUsers.length
const activeCount = adminUsers.filter((u) => u.retentionStatus === 'active').length
const atRiskCount = adminUsers.filter((u) => u.retentionStatus === 'at_risk').length
const churnedCount = adminUsers.filter((u) => u.retentionStatus === 'churned').length

const stats = [
  { label: 'Total', value: totalUsers, color: 'text-foreground' },
  { label: 'Active', value: activeCount, color: 'text-income' },
  { label: 'At Risk', value: atRiskCount, color: 'text-gold' },
  { label: 'Churned', value: churnedCount, color: 'text-expense' },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredUsers = useMemo(() => {
    let result = adminUsers

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.telegramUsername.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== 'all') {
      result = result.filter((u) => u.retentionStatus === statusFilter)
    }

    return result
  }, [searchQuery, statusFilter])

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Users</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage and monitor all registered users
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <FiltersPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Table + count */}
      <div className="space-y-2">
        <UsersTable users={filteredUsers} />
        <p className="text-xs text-muted-foreground px-1">
          Showing {filteredUsers.length} of {totalUsers} users
        </p>
      </div>
    </div>
  )
}
