'use client'

import { motion } from 'framer-motion'
import { Wallet, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/mock-data'

interface BalanceCardProps {
  accountName: string
  balance: number
  weekChange: number
  monthIncome: number
  monthExpense: number
}

export function BalanceCard({
  accountName,
  balance,
  weekChange,
  monthIncome,
  monthExpense,
}: BalanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
      className="bg-card rounded-2xl p-6 border border-border/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-income/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{accountName}</p>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-income" />
              <span className="text-xs font-medium text-income">
                +{formatCurrency(weekChange)} за неделю
              </span>
            </div>
          </div>
        </div>
        
        {/* Balance */}
        <motion.p 
          className="text-4xl font-bold tracking-tight text-foreground mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {formatCurrency(balance)}
        </motion.p>
        
        {/* Month stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-income/5 rounded-xl p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Доходы за месяц</p>
            <p className="text-lg font-semibold text-income">+{formatCurrency(monthIncome)}</p>
          </div>
          <div className="bg-expense/5 rounded-xl p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Расходы за месяц</p>
            <p className="text-lg font-semibold text-expense">−{formatCurrency(monthExpense)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
