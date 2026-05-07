'use client'

import { AdminSidebar } from './admin-sidebar'

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 lg:pl-60 min-h-screen">
        <div className="px-8 py-8 max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
