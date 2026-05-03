'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { type Transaction, getCategoryById, formatCurrency, formatDate } from '@/lib/mock-data'

interface TransactionItemProps {
  transaction: Transaction
  onEdit?: (transaction: Transaction) => void
  onDelete?: (transaction: Transaction) => void
  index?: number
  compact?: boolean
}

export function TransactionItem({ 
  transaction, 
  onEdit, 
  onDelete,
  index = 0,
  compact = false,
}: TransactionItemProps) {
  const category = getCategoryById(transaction.categoryId)
  const Icon = category?.icon
  const isIncome = transaction.type === 'income'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ backgroundColor: 'var(--muted)' }}
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl transition-colors group',
        compact ? 'p-2.5' : 'p-3'
      )}
    >
      {/* Category Icon */}
      <div 
        className={cn(
          'flex items-center justify-center rounded-xl flex-shrink-0',
          compact ? 'h-9 w-9' : 'h-10 w-10'
        )}
        style={{ backgroundColor: `${category?.color}15` }}
      >
        {Icon && (
          <Icon 
            className={cn(compact ? 'h-4 w-4' : 'h-5 w-5')} 
            style={{ color: category?.color }} 
          />
        )}
      </div>
      
      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          'font-medium text-foreground truncate',
          compact ? 'text-sm' : 'text-sm'
        )}>
          {transaction.description}
        </p>
        <p className="text-xs text-muted-foreground">
          {category?.name} · {formatDate(transaction.date)}
        </p>
      </div>
      
      {/* Amount */}
      <p className={cn(
        'font-semibold flex-shrink-0',
        compact ? 'text-sm' : 'text-base',
        isIncome ? 'text-income' : 'text-expense'
      )}>
        {isIncome ? '+' : '−'}{formatCurrency(transaction.amount)}
      </p>
      
      {/* Actions */}
      {(onEdit || onDelete) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Действия</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(transaction)}>
                <Pencil className="h-4 w-4 mr-2" />
                Изменить
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem 
                onClick={() => onDelete(transaction)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </motion.div>
  )
}
