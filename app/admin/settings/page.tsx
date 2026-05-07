'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Bell, Shield, Database } from 'lucide-react'

const sections = [
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Configure alert thresholds and notification channels for system events.',
    items: ['Alert on churn spike above 10%', 'Daily digest at 09:00 MSK', 'AI failure rate alerts'],
  },
  {
    icon: Shield,
    title: 'Access Control',
    description: 'Manage admin roles and permissions.',
    items: ['Owner: full access', 'Viewer: read-only access'],
  },
  {
    icon: Database,
    title: 'Data',
    description: 'Data retention and export settings.',
    items: ['Event log retention: 90 days', 'Export format: CSV / JSON'],
  },
]

export default function AdminSettingsPage() {
  const router = useRouter()

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Admin Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Configure admin panel preferences</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <div key={section.title} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
                </div>
              </div>
              <ul className="space-y-2 pl-11">
                {section.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Exit admin */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-1">Navigation</h3>
        <p className="text-xs text-muted-foreground mb-4">Return to the main application.</p>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-sm font-medium text-foreground hover:bg-muted/80 transition-colors border border-border"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to finn.ovelin
        </button>
      </div>
    </div>
  )
}
