'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { type Transaction, type TransactionType, categories, getCategoryById } from '@/lib/mock-data'

interface TransactionEditModalProps {
  transaction: Transaction | null
  open: boolean
  onClose: () => void
  onSave: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export function TransactionEditModal({
  transaction,
  open,
  onClose,
  onSave,
  onDelete,
}: TransactionEditModalProps) {
  const [type, setType] = useState<TransactionType>('expense')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [date, setDate] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (transaction) {
      setType(transaction.type)
      setAmount(transaction.amount.toString())
      setDescription(transaction.description)
      setCategoryId(transaction.categoryId)
      setDate(transaction.date.toISOString().split('T')[0])
    }
  }, [transaction])

  const filteredCategories = categories.filter(c => c.type === type)

  const handleSave = () => {
    if (!transaction) return
    
    onSave({
      ...transaction,
      type,
      amount: parseFloat(amount) || 0,
      description,
      categoryId,
      date: new Date(date),
    })
    onClose()
  }

  const handleDelete = () => {
    if (!transaction) return
    onDelete(transaction)
    setShowDeleteConfirm(false)
    onClose()
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full"
            >
              <div className="bg-card rounded-t-3xl md:rounded-2xl border border-border shadow-2xl max-h-[85vh] overflow-y-auto">
                {/* Handle for mobile */}
                <div className="flex justify-center pt-3 md:hidden">
                  <div className="w-10 h-1 bg-border rounded-full" />
                </div>
                
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-border/50">
                  <h2 className="text-lg font-semibold text-foreground">
                    Редактировать операцию
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Form */}
                <div className="p-5 space-y-5">
                  {/* Type */}
                  <div className="space-y-2">
                    <Label>Тип операции</Label>
                    <div className="flex bg-muted rounded-xl p-1">
                      <button
                        onClick={() => {
                          setType('expense')
                          setCategoryId('')
                        }}
                        className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all ${
                          type === 'expense' 
                            ? 'bg-expense text-white' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Расход
                      </button>
                      <button
                        onClick={() => {
                          setType('income')
                          setCategoryId('')
                        }}
                        className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all ${
                          type === 'income' 
                            ? 'bg-income text-white' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Доход
                      </button>
                    </div>
                  </div>
                  
                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Сумма</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="text-lg font-semibold"
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Кофе в Surf"
                    />
                  </div>
                  
                  {/* Category */}
                  <div className="space-y-2">
                    <Label>Категория</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCategories.map((cat) => {
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
                  
                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Actions */}
                <div className="p-5 pt-0 flex gap-3">
                  <Button
                    variant="outline"
                    className="rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Удалить
                  </Button>
                  <Button 
                    className="flex-1 rounded-xl"
                    onClick={handleSave}
                  >
                    Сохранить
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить операцию?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Операция будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
