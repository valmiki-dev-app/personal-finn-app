'use client'

import { AdminSidebar } from './admin-sidebar'

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Admin Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Manage and monitor your product</p>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
