'use client'

import { CheckCircle2, Circle, Flag, Trophy } from 'lucide-react'
import { curriculum, type Module } from '@/lib/curriculum'
import { ModuleIcon } from '@/components/module-icon'
import { cn } from '@/lib/utils'

const ITEM_H = 64
const GAP = 16
const CONN_W = 60

function ModuleStation({
  mod,
  index,
  isComplete,
  onSelect,
}: {
  mod: Module
  index: number
  isComplete: (id: string) => boolean
  onSelect: (id: string) => void
}) {
  const n = mod.lessons.length
  const totalH = n * ITEM_H + (n - 1) * GAP
  const moduleY = totalH / 2
  const done = mod.lessons.filter((l) => isComplete(l.id)).length
  const complete = done === n

  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6">
      {/* Module heading */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-2xl',
            complete ? 'bg-success/15 text-success' : 'bg-primary/15 text-primary',
          )}
        >
          <ModuleIcon name={mod.icon} className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase tabular-nums">
            Module {index + 1}
          </p>
          <h3 className="truncate text-base font-semibold text-foreground">{mod.title}</h3>
          <p className="truncate text-xs text-muted-foreground">{mod.subtitle}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground tabular-nums">
          {done}/{n}
        </span>
      </div>

      {/* Desktop: node + curved connectors + lessons */}
      <div className="hidden md:flex md:items-stretch">
        <div className="flex items-center" style={{ minHeight: totalH }}>
          <div
            className={cn(
              'flex size-14 items-center justify-center rounded-full border-2 text-sm font-bold',
              complete
                ? 'border-success bg-success/15 text-success'
                : 'border-primary bg-primary/10 text-primary',
            )}
          >
            {index + 1}
          </div>
        </div>

        <svg
          width={CONN_W}
          height={totalH}
          className="shrink-0"
          aria-hidden
          style={{ overflow: 'visible' }}
        >
          {mod.lessons.map((lesson, j) => {
            const y = j * (ITEM_H + GAP) + ITEM_H / 2
            const active = isComplete(lesson.id)
            return (
              <path
                key={lesson.id}
                d={`M 0 ${moduleY} C ${CONN_W * 0.6} ${moduleY}, ${CONN_W * 0.4} ${y}, ${CONN_W} ${y}`}
                fill="none"
                stroke={active ? 'var(--primary)' : 'var(--border)'}
                strokeWidth={2}
                strokeLinecap="round"
              />
            )
          })}
        </svg>

        <div className="flex flex-1 flex-col" style={{ gap: GAP }}>
          {mod.lessons.map((lesson) => (
            <LessonNode
              key={lesson.id}
              title={lesson.title}
              summary={lesson.summary}
              minutes={lesson.minutes}
              complete={isComplete(lesson.id)}
              onClick={() => onSelect(lesson.id)}
              style={{ height: ITEM_H }}
            />
          ))}
        </div>
      </div>

      {/* Mobile: simple stacked list */}
      <div className="flex flex-col gap-2.5 border-l-2 border-dashed border-border pl-3 md:hidden">
        {mod.lessons.map((lesson) => (
          <LessonNode
            key={lesson.id}
            title={lesson.title}
            summary={lesson.summary}
            minutes={lesson.minutes}
            complete={isComplete(lesson.id)}
            onClick={() => onSelect(lesson.id)}
          />
        ))}
      </div>
    </div>
  )
}

function LessonNode({
  title,
  summary,
  minutes,
  complete,
  onClick,
  style,
}: {
  title: string
  summary: string
  minutes: number
  complete: boolean
  onClick: () => void
  style?: React.CSSProperties
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={cn(
        'group flex w-full items-center gap-3 rounded-xl border px-3.5 text-left transition-all',
        'border-border bg-background/60 py-3 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5',
      )}
    >
      {complete ? (
        <CheckCircle2 className="size-5 shrink-0 text-success" />
      ) : (
        <Circle className="size-5 shrink-0 text-muted-foreground/40 group-hover:text-primary" />
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">{title}</span>
        <span className="block truncate text-xs text-muted-foreground">{summary}</span>
      </span>
      <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">{minutes}m</span>
    </button>
  )
}

export function RoadmapView({
  isComplete,
  onSelect,
}: {
  isComplete: (id: string) => boolean
  onSelect: (id: string) => void
}) {
  const allDone = curriculum.every((m) => m.lessons.every((l) => isComplete(l.id)))

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-5 px-4 py-6">
      <div className="flex items-center gap-3 self-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
        <Flag className="size-4 text-primary" />
        Start your journey
      </div>

      {curriculum.map((mod, i) => (
        <div key={mod.id} className="flex flex-col items-stretch gap-5">
          {i > 0 && <SpineConnector flip={i % 2 === 0} />}
          <ModuleStation mod={mod} index={i} isComplete={isComplete} onSelect={onSelect} />
        </div>
      ))}

      <SpineConnector flip />
      <div
        className={cn(
          'flex items-center gap-3 self-center rounded-full border px-5 py-2.5 text-sm font-semibold',
          allDone
            ? 'border-success/40 bg-success/15 text-success'
            : 'border-border bg-card text-muted-foreground',
        )}
      >
        <Trophy className={cn('size-4', allDone ? 'text-success' : 'text-primary')} />
        {allDone ? 'Roadmap complete — publish to Google Play!' : 'Finish line: Google Play'}
      </div>
    </div>
  )
}

function SpineConnector({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="80"
      height="48"
      viewBox="0 0 80 48"
      className="self-center text-border"
      aria-hidden
    >
      <path
        d={
          flip
            ? 'M 40 0 C 40 24, 8 24, 8 48'
            : 'M 40 0 C 40 24, 72 24, 72 48'
        }
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="2 7"
        strokeLinecap="round"
      />
    </svg>
  )
}
