'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { UsersTable } from '@/components/admin/users/users-table'
import { FiltersPanel } from '@/components/admin/users/filters-panel'
import { adminUsers } from '@/lib/admin/admin-mock-data'
import { Users } from 'lucide-react'

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredUsers = useMemo(() => {
    let result = adminUsers

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.telegramUsername.toLowerCase().includes(query)
      )
    }

    // Filter by retention status
    if (statusFilter !== 'all') {
      result = result.filter((user) => user.retentionStatus === statusFilter)
    }

    return result
  }, [searchQuery, statusFilter])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
        </div>
        <p className="text-muted-foreground">
          Manage and monitor {adminUsers.length} total users
        </p>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1">Total Users</p>
          <p className="text-2xl font-bold text-foreground">{adminUsers.length}</p>
        </div>
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1">Active</p>
          <p className="text-2xl font-bold text-income">
            {adminUsers.filter((u) => u.retentionStatus === 'active').length}
          </p>
        </div>
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1">At Risk</p>
          <p className="text-2xl font-bold text-gold">
            {adminUsers.filter((u) => u.retentionStatus === 'at_risk').length}
          </p>
        </div>
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1">Churned</p>
          <p className="text-2xl font-bold text-expense">
            {adminUsers.filter((u) => u.retentionStatus === 'churned').length}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <FiltersPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Users Table */}
      <div>
        <UsersTable users={filteredUsers} />
        
        {/* Results Summary */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-muted-foreground mt-4"
        >
          Showing {filteredUsers.length} of {adminUsers.length} users
        </motion.p>
      </div>
    </motion.div>
  )
}
