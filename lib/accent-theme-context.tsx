'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type AccentTheme = 'terracotta' | 'ocean' | 'forest' | 'amber' | 'slate' | 'rose'

export const ACCENT_THEMES: { id: AccentTheme; label: string; color: string }[] = [
  { id: 'terracotta', label: 'Terracotta', color: '#E3807C' },
  { id: 'ocean',      label: 'Ocean',      color: '#4A90D9' },
  { id: 'forest',     label: 'Forest',     color: '#4E9B6A' },
  { id: 'amber',      label: 'Amber',      color: '#C98B2E' },
  { id: 'slate',      label: 'Slate',      color: '#5B6A7E' },
  { id: 'rose',       label: 'Rose',       color: '#C0485B' },
]

const STORAGE_KEY = 'finn-admin-accent'

interface AccentThemeContextValue {
  accent: AccentTheme
  setAccent: (accent: AccentTheme) => void
}

const AccentThemeContext = createContext<AccentThemeContextValue>({
  accent: 'terracotta',
  setAccent: () => {},
})

export function AccentThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentTheme>('terracotta')

  // Read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AccentTheme | null
    if (stored && ACCENT_THEMES.find(t => t.id === stored)) {
      setAccentState(stored)
      applyAccent(stored)
    }
  }, [])

  function setAccent(next: AccentTheme) {
    setAccentState(next)
    localStorage.setItem(STORAGE_KEY, next)
    applyAccent(next)
  }

  return (
    <AccentThemeContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentThemeContext.Provider>
  )
}

function applyAccent(accent: AccentTheme) {
  const html = document.documentElement
  // Remove previous accent attr, then set new one (terracotta = default = no attr needed but we set it anyway)
  html.setAttribute('data-accent', accent === 'terracotta' ? '' : accent)
}

export function useAccentTheme() {
  return useContext(AccentThemeContext)
}
