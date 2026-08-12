'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { Lesson } from '@/lib/curriculum'
import { Button } from '@/components/ui/button'
import { LessonPanel } from '@/components/lesson-panel'

export interface LessonDrawerProps {
  lesson: Lesson | null
  moduleTitle: string
  lessonNumber: number
  lessonTotal: number
  isComplete: boolean
  onToggleComplete: (id: string) => void
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export function LessonDrawer({
  lesson,
  moduleTitle,
  lessonNumber,
  lessonTotal,
  isComplete,
  onToggleComplete,
  onClose,
  onPrev,
  onNext,
}: LessonDrawerProps) {
  useEffect(() => {
    if (!lesson) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lesson, onClose])

  if (!lesson) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={lesson.title}>
      <button
        type="button"
        aria-label="Close lesson"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
      />
      <div className="relative flex h-full w-full max-w-xl flex-col bg-card shadow-2xl animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-medium text-muted-foreground">Lesson briefing</span>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close">
            <X />
          </Button>
        </div>
        <div className="scrollbar-slim flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <LessonPanel
            lesson={lesson}
            moduleTitle={moduleTitle}
            lessonNumber={lessonNumber}
            lessonTotal={lessonTotal}
            isComplete={isComplete}
            onToggleComplete={onToggleComplete}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  )
}
