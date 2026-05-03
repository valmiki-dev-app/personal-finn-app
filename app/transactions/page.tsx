'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  SlidersHorizontal, 
  Plus,
  X,
  ArrowUpDown,
  Calendar,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TransactionItem } from '@/components/transaction-item'
import { TransactionEditModal } from '@/components/transaction-edit-modal'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { 
  type Transaction, 
  type TransactionType,
  transactions as initialTransactions, 
  categories,
  formatShortDate,
} from '@/lib/mock-data'

type PeriodFilter = 'all' | 'today' | 'week' | 'month'
type TypeFilter = 'all' | 'income' | 'expense'
type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState<PeriodFilter>('all')
  const [type, setType] = useState<TypeFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sort, setSort] = useState<SortOption>('date-desc')
  const [showFilters, setShowFilters] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const filteredTransactions = useMemo(() => {
    let result = [...transactions]

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(t => 
        t.description.toLowerCase().includes(searchLower)
      )
    }

    // Period filter
    if (period !== 'all') {
      const now = new Date()
      const cutoff = new Date()
      
      if (period === 'today') {
        cutoff.setHours(0, 0, 0, 0)
      } else if (period === 'week') {
        cutoff.setDate(now.getDate() - 7)
      } else if (period === 'month') {
        cutoff.setMonth(now.getMonth() - 1)
      }
      
      result = result.filter(t => t.date >= cutoff)
    }

    // Type filter
    if (type !== 'all') {
      result = result.filter(t => t.type === type)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(t => t.categoryId === categoryFilter)
    }

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case 'date-desc':
          return b.date.getTime() - a.date.getTime()
        case 'date-asc':
          return a.date.getTime() - b.date.getTime()
        case 'amount-desc':
          return b.amount - a.amount
        case 'amount-asc':
          return a.amount - b.amount
        default:
          return 0
      }
    })

    return result
  }, [transactions, search, period, type, categoryFilter, sort])

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: { date: string; transactions: Transaction[] }[] = []
    
    filteredTransactions.forEach(t => {
      const dateStr = formatShortDate(t.date)
      const existing = groups.find(g => g.date === dateStr)
      
      if (existing) {
        existing.transactions.push(t)
      } else {
        groups.push({ date: dateStr, transactions: [t] })
      }
    })
    
    return groups
  }, [filteredTransactions])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (period !== 'all') count++
    if (type !== 'all') count++
    if (categoryFilter !== 'all') count++
    if (sort !== 'date-desc') count++
    return count
  }, [period, type, categoryFilter, sort])

  const handleSave = (updated: Transaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === updated.id ? updated : t)
    )
  }

  const handleDelete = (transaction: Transaction) => {
    setTransactions(prev => prev.filter(t => t.id !== transaction.id))
  }

  const clearFilters = () => {
    setPeriod('all')
    setType('all')
    setCategoryFilter('all')
    setSort('date-desc')
  }

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Period */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Период</label>
        <Select value={period} onValueChange={(v) => setPeriod(v as PeriodFilter)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все время</SelectItem>
            <SelectItem value="today">Сегодня</SelectItem>
            <SelectItem value="week">Неделя</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Тип</label>
        <div className="flex bg-muted rounded-xl p-1">
          {(['all', 'expense', 'income'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                'flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all',
                type === t 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'all' ? 'Все' : t === 'expense' ? 'Расходы' : 'Доходы'}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Категория</label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <SelectItem key={cat.id} value={cat.id}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color: cat.color }} />
                    {cat.name}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Сортировка</label>
        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Сначала новые</SelectItem>
            <SelectItem value="date-asc">Сначала старые</SelectItem>
            <SelectItem value="amount-desc">По сумме (убыв.)</SelectItem>
            <SelectItem value="amount-asc">По сумме (возр.)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {activeFiltersCount > 0 && (
        <Button 
          variant="outline" 
          className="w-full rounded-xl"
          onClick={clearFilters}
        >
          Сбросить фильтры
        </Button>
      )}
    </div>
  )

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
              Транзакции
            </h1>
            <p className="text-muted-foreground mt-1">
              Все доходы и расходы в одном месте
            </p>
          </div>
          <Button className="rounded-xl gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Добавить вручную
          </Button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-3"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по описанию..."
              className="pl-9 rounded-xl"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:flex gap-2">
            <Select value={period} onValueChange={(v) => setPeriod(v as PeriodFilter)}>
              <SelectTrigger className="w-[140px] rounded-xl">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все время</SelectItem>
                <SelectItem value="today">Сегодня</SelectItem>
                <SelectItem value="week">Неделя</SelectItem>
                <SelectItem value="month">Месяц</SelectItem>
              </SelectContent>
            </Select>

            <Select value={type} onValueChange={(v) => setType(v as TypeFilter)}>
              <SelectTrigger className="w-[130px] rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="expense">Расходы</SelectItem>
                <SelectItem value="income">Доходы</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-[160px] rounded-xl">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Сначала новые</SelectItem>
                <SelectItem value="date-asc">Сначала старые</SelectItem>
                <SelectItem value="amount-desc">По сумме</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-xl lg:hidden relative"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader className="mb-4">
                <SheetTitle>Фильтры</SheetTitle>
              </SheetHeader>
              <FilterContent />
            </SheetContent>
          </Sheet>
        </motion.div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          {filteredTransactions.length} операций
        </div>

        {/* Transaction List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-4"
        >
          {groupedTransactions.length === 0 ? (
            <EmptyState
              title="Операций не найдено"
              description={search || activeFiltersCount > 0 
                ? "Попробуйте изменить параметры поиска или фильтры"
                : "Пока здесь пусто. Добавь первую операцию в Telegram: 'кофе 250'"
              }
              action={activeFiltersCount > 0 ? {
                label: 'Сбросить фильтры',
                onClick: clearFilters,
              } : undefined}
            />
          ) : (
            groupedTransactions.map((group, groupIndex) => (
              <div key={group.date}>
                <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
                  {group.date}
                </h3>
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden divide-y divide-border/30">
                  {group.transactions.map((transaction, index) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      index={index}
                      onEdit={setEditingTransaction}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>

      {/* Edit Modal */}
      <TransactionEditModal
        transaction={editingTransaction}
        open={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </AppShell>
  )
}
