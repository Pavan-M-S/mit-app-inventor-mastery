'use client'

import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <AnimatePresence mode="wait">
      <motion.article
        key={lesson.id}
        initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-2xl flex-col gap-6"
      >
        <header className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
          >
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
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-balance text-foreground bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            {lesson.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-base md:text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            {lesson.summary}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Button
              variant={isComplete ? 'secondary' : 'default'}
              onClick={() => onToggleComplete(lesson.id)}
              className={cn(
                'gap-2 transition-all duration-300',
                isComplete ? 'text-success bg-success/10 hover:bg-success/20 border border-success/20 shadow-[0_0_15px_rgba(74,222,128,0.1)]' : 'shadow-[0_0_15px_rgba(94,234,212,0.1)]'
              )}
            >
              {isComplete ? <CheckCircle2 className="animate-in zoom-in" /> : <Circle />}
              {isComplete ? 'Completed' : 'Mark as complete'}
            </Button>
          </motion.div>
        </header>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <LessonContent blocks={lesson.content} />
        </motion.div>

        <div className="h-px w-full bg-border/50" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <LessonQuiz quiz={lesson.quiz} lessonId={lesson.id} />
        </motion.div>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-border/50 pt-6">
          <Button variant="ghost" size="sm" onClick={onPrev} disabled={!onPrev} className="hover:-translate-x-1 transition-transform">
            <ArrowLeft />
            Previous
          </Button>
          <Button variant="ghost" size="sm" onClick={onNext} disabled={!onNext} className="hover:translate-x-1 transition-transform">
            Next
            <ArrowRight />
          </Button>
        </div>
      </motion.article>
    </AnimatePresence>
  )
}