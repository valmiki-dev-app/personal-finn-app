import { AdminShell } from '@/components/admin/admin-shell'

export const metadata = {
  title: 'Admin Panel - Ovelin',
  description: 'Product management and analytics dashboard',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
