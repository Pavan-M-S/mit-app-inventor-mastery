'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'mai-theme'

export function useTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setIsDark(stored ? stored === 'dark' : true)
  }, [])

  const apply = useCallback((dark: boolean) => {
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    root.classList.toggle('light', !dark)
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [])

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev
      apply(next)
      return next
    })
  }, [apply])

  return { isDark, toggle }
}
