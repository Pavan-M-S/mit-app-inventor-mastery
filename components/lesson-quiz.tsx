'use client'

import { useMemo, useState } from 'react'
import { Check, RotateCcw, Trophy, X } from 'lucide-react'
import type { QuizQuestion } from '@/lib/curriculum'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Question({
  q,
  index,
  selected,
  onSelect,
}: {
  q: QuizQuestion
  index: number
  selected: number | null
  onSelect: (choice: number) => void
}) {
  const answered = selected !== null
  return (
    <div className="rounded-xl border border-border bg-background/50 p-4">
      <p className="mb-3 flex gap-2 text-[15px] font-medium text-foreground">
        <span className="text-muted-foreground tabular-nums">{index + 1}.</span>
        <span className="text-pretty">{q.question}</span>
      </p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer
          const isChosen = selected === i
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => onSelect(i)}
              className={cn(
                'flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-[14px] transition-colors',
                'border-border bg-card hover:border-primary/50 hover:bg-accent',
                answered && 'cursor-default hover:border-border hover:bg-card',
                answered && isCorrect && 'border-success/60 bg-success/10 text-foreground',
                answered && isChosen && !isCorrect && 'border-destructive/60 bg-destructive/10 text-foreground',
              )}
              aria-pressed={isChosen}
            >
              <span className="text-pretty">{opt}</span>
              {answered && isCorrect && <Check className="size-4 shrink-0 text-success" />}
              {answered && isChosen && !isCorrect && <X className="size-4 shrink-0 text-destructive" />}
            </button>
          )
        })}
      </div>
      {answered && (
        <p
          className={cn(
            'mt-3 rounded-lg px-3 py-2 text-[13px] leading-relaxed text-pretty',
            selected === q.answer ? 'bg-success/10 text-foreground' : 'bg-muted text-muted-foreground',
          )}
        >
          <span className="font-semibold">
            {selected === q.answer ? 'Correct. ' : 'Not quite. '}
          </span>
          {q.explanation}
        </p>
      )}
    </div>
  )
}

export function LessonQuiz({ quiz, lessonId }: { quiz: QuizQuestion[]; lessonId: string }) {
  // Reset answers when the lesson changes by keying on lessonId.
  const [answers, setAnswers] = useState<(number | null)[]>(() => quiz.map(() => null))

  const answeredCount = answers.filter((a) => a !== null).length
  const score = useMemo(
    () => answers.reduce((acc, a, i) => (a === quiz[i].answer ? acc + 1 : acc), 0),
    [answers, quiz],
  )
  const allAnswered = answeredCount === quiz.length

  return (
    <section aria-label="Knowledge check" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground uppercase">
          <Trophy className="size-4 text-primary" />
          Knowledge Check
        </h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {answeredCount}/{quiz.length} answered
        </span>
      </div>

      {quiz.map((q, i) => (
        <Question
          key={`${lessonId}-${i}`}
          q={q}
          index={i}
          selected={answers[i]}
          onSelect={(choice) =>
            setAnswers((prev) => {
              const next = [...prev]
              next[i] = choice
              return next
            })
          }
        />
      ))}

      {allAnswered && (
        <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
          <p className="text-sm font-medium text-foreground">
            You scored {score}/{quiz.length}
            {score === quiz.length ? ' — perfect!' : '. Review the explanations above.'}
          </p>
          <Button variant="ghost" size="sm" onClick={() => setAnswers(quiz.map(() => null))}>
            <RotateCcw />
            Retry
          </Button>
        </div>
      )}
    </section>
  )
}
