'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, ChevronDown, Circle } from 'lucide-react'
import { curriculum } from '@/lib/curriculum'
import { ModuleIcon } from '@/components/module-icon'
import { cn } from '@/lib/utils'

export interface LessonSidebarProps {
  selectedId: string
  onSelect: (id: string) => void
  isComplete: (id: string) => boolean
  query: string
}

export function LessonSidebar({ selectedId, onSelect, isComplete, query }: LessonSidebarProps) {
  const q = query.trim().toLowerCase()
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(curriculum.map((m) => [m.id, true])),
  )

  // Keep the module containing the active lesson expanded.
  useEffect(() => {
    const mod = curriculum.find((m) => m.lessons.some((l) => l.id === selectedId))
    if (mod) setOpen((prev) => ({ ...prev, [mod.id]: true }))
  }, [selectedId])

  const matches = (text: string) => text.toLowerCase().includes(q)

  return (
    <nav aria-label="Course modules" className="flex flex-col gap-1 p-3">
      {curriculum.map((mod) => {
        const visibleLessons = q
          ? mod.lessons.filter(
              (l) => matches(l.title) || matches(l.summary) || matches(mod.title),
            )
          : mod.lessons
        if (q && visibleLessons.length === 0) return null

        const done = mod.lessons.filter((l) => isComplete(l.id)).length
        const isOpen = q ? true : open[mod.id]

        return (
          <div key={mod.id} className="mb-1">
            <button
              type="button"
              onClick={() => setOpen((prev) => ({ ...prev, [mod.id]: !prev[mod.id] }))}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-accent"
              aria-expanded={isOpen}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <ModuleIcon name={mod.icon} className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-foreground">
                  {mod.title}
                </span>
                <span className="block text-[11px] text-muted-foreground tabular-nums">
                  {done}/{mod.lessons.length} done
                </span>
              </span>
              <ChevronDown
                className={cn(
                  'size-4 shrink-0 text-muted-foreground transition-transform',
                  !isOpen && '-rotate-90',
                )}
              />
            </button>

            {isOpen && (
              <ul className="mt-0.5 flex flex-col gap-0.5 pl-4">
                {visibleLessons.map((lesson) => {
                  const active = lesson.id === selectedId
                  const complete = isComplete(lesson.id)
                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(lesson.id)}
                        className={cn(
                          'flex w-full items-center gap-2.5 rounded-lg border-l-2 py-2 pr-2.5 pl-3 text-left transition-colors',
                          active
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-transparent text-muted-foreground hover:bg-accent hover:text-foreground',
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        {complete ? (
                          <CheckCircle2 className="size-4 shrink-0 text-success" />
                        ) : (
                          <Circle className="size-4 shrink-0 opacity-40" />
                        )}
                        <span className="truncate text-[13px]">{lesson.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
