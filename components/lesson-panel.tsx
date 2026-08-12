'use client'

import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react'
import type { Lesson } from '@/lib/curriculum'
import { Button } from '@/components/ui/button'
import { LessonContent } from '@/components/lesson-content'
import { LessonQuiz } from '@/components/lesson-quiz'
import { cn } from '@/lib/utils'

export interface LessonPanelProps {
  lesson: Lesson
  moduleTitle: string
  lessonNumber: number
  lessonTotal: number
  isComplete: boolean
  onToggleComplete: (id: string) => void
  onPrev?: () => void
  onNext?: () => void
}

export function LessonPanel({
  lesson,
  moduleTitle,
  lessonNumber,
  lessonTotal,
  isComplete,
  onToggleComplete,
  onPrev,
  onNext,
}: LessonPanelProps) {
  return (
    <article className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/15 px-2.5 py-1 font-medium text-primary">
            {moduleTitle}
          </span>
          <span className="tabular-nums">
            Lesson {lessonNumber} of {lessonTotal}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {lesson.minutes} min
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground">
          {lesson.title}
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty">{lesson.summary}</p>
        <div>
          <Button
            variant={isComplete ? 'secondary' : 'default'}
            onClick={() => onToggleComplete(lesson.id)}
            className={cn('gap-2', isComplete && 'text-success')}
          >
            {isComplete ? <CheckCircle2 /> : <Circle />}
            {isComplete ? 'Completed' : 'Mark as complete'}
          </Button>
        </div>
      </header>

      <div className="h-px w-full bg-border" />

      <LessonContent blocks={lesson.content} />

      <div className="h-px w-full bg-border" />

      <LessonQuiz quiz={lesson.quiz} lessonId={lesson.id} />

      <div className="mt-2 flex items-center justify-between gap-3 border-t border-border pt-4">
        <Button variant="ghost" size="sm" onClick={onPrev} disabled={!onPrev}>
          <ArrowLeft />
          Previous
        </Button>
        <Button variant="ghost" size="sm" onClick={onNext} disabled={!onNext}>
          Next
          <ArrowRight />
        </Button>
      </div>
    </article>
  )
}
