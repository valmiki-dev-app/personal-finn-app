'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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
  ArrowLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/users', label: 'Users', icon: Users, exact: false },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, exact: true },
  { href: '/admin/ai-control', label: 'AI Control', icon: Zap, exact: true },
  { href: '/admin/events', label: 'Events', icon: Activity, exact: true },
  { href: '/admin/revenue', label: 'Revenue', icon: DollarSign, exact: true },
  { href: '/admin/system', label: 'System', icon: Server, exact: true },
  { href: '/admin/settings', label: 'Settings', icon: Settings, exact: true },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  function isActive(item: (typeof adminNavItems)[0]) {
    if (item.exact) return pathname === item.href
    return pathname === item.href || pathname.startsWith(item.href + '/')
  }

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-60 flex-col bg-card border-r border-border z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          A
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">Admin Panel</p>
          <p className="text-xs text-muted-foreground leading-tight">finn.ovelin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {adminNavItems.map((item) => {
            const active = isActive(item)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/60 hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="admin-active-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Back to App */}
      <div className="border-t border-border p-3">
        <button
          onClick={() => router.push('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/60 hover:bg-muted hover:text-foreground transition-all duration-150"
        >
          <ArrowLeft className="h-4 w-4 flex-shrink-0" />
          <span>Back to App</span>
        </button>
      </div>
    </aside>
  )
}
