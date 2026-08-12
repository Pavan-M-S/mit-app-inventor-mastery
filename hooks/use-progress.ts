'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'mai-progress'

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCompleted(new Set(JSON.parse(raw) as string[]))
    } catch {
      // ignore malformed storage
    }
    setHydrated(true)
  }, [])

  const persist = useCallback((next: Set<string>) => {
    setCompleted(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
    } catch {
      // storage may be unavailable (private mode); state still works in-session
    }
  }, [])

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(completed)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      persist(next)
    },
    [completed, persist],
  )

  const isComplete = useCallback((id: string) => completed.has(id), [completed])

  const reset = useCallback(() => persist(new Set()), [persist])

  return { completed, isComplete, toggle, reset, hydrated }
}
