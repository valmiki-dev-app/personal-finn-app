'use client'

import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'

interface FiltersPanelProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
}

export function FiltersPanel({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: FiltersPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border/50 p-4 space-y-4"
    >
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name or username..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border/50 rounded-lg text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
          <Filter className="h-3 w-3" />
          Retention Status
        </label>
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'at_risk', 'churned'].map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
