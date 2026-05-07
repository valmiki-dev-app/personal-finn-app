'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Zap,
  Activity,
  DollarSign,
  Server,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  collapsed?: boolean
}

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/ai-control', label: 'AI Control', icon: Zap },
  { href: '/admin/events', label: 'Events', icon: Activity },
  { href: '/admin/revenue', label: 'Revenue', icon: DollarSign },
  { href: '/admin/system-health', label: 'System', icon: Server },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar({ collapsed = false }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-sidebar border-r border-sidebar-border z-40">
      {/* Admin Header */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg">
          ⚙️
        </div>
        <span className="font-semibold text-lg text-foreground">Admin Panel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                'hover:bg-sidebar-accent',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="admin-sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200">
          <LogOut className="h-5 w-5" />
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>
  )
}
