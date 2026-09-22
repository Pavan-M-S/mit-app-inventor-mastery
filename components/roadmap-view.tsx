'use client'

import { CheckCircle2, Circle, Flag, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/50 p-4 sm:p-6 shadow-sm backdrop-blur-xl transition-all hover:border-border hover:shadow-md"
    >
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
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={cn(
              'flex size-14 items-center justify-center rounded-full border-2 text-sm font-bold shadow-sm transition-colors duration-500',
              complete
                ? 'border-success bg-success/15 text-success shadow-success/20'
                : 'border-primary bg-primary/10 text-primary shadow-primary/20',
            )}
          >
            {index + 1}
          </motion.div>
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
              <motion.path
                key={lesson.id}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 + j * 0.1, ease: "easeInOut" }}
                d={`M 0 ${moduleY} C ${CONN_W * 0.6} ${moduleY}, ${CONN_W * 0.4} ${y}, ${CONN_W} ${y}`}
                fill="none"
                stroke={active ? 'var(--primary)' : 'var(--border)'}
                strokeWidth={2}
                strokeLinecap="round"
                className={cn(active && "drop-shadow-[0_0_3px_var(--primary)]")}
              />
            )
          })}
        </svg>

        <div className="flex flex-1 flex-col" style={{ gap: GAP }}>
          {mod.lessons.map((lesson, j) => (
            <LessonNode
              key={lesson.id}
              title={lesson.title}
              summary={lesson.summary}
              minutes={lesson.minutes}
              complete={isComplete(lesson.id)}
              onClick={() => onSelect(lesson.id)}
              style={{ height: ITEM_H }}
              delay={index * 0.1 + j * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Mobile: simple stacked list */}
      <div className="flex flex-col gap-2.5 border-l-2 border-dashed border-border/50 pl-3 md:hidden">
        {mod.lessons.map((lesson, j) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: j * 0.1 }}
          >
            <LessonNode
              title={lesson.title}
              summary={lesson.summary}
              minutes={lesson.minutes}
              complete={isComplete(lesson.id)}
              onClick={() => onSelect(lesson.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function LessonNode({
  title,
  summary,
  minutes,
  complete,
  onClick,
  style,
  delay = 0,
}: {
  title: string
  summary: string
  minutes: number
  complete: boolean
  onClick: () => void
  style?: React.CSSProperties
  delay?: number
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={style}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group flex w-full items-center gap-3 rounded-xl border px-3.5 text-left transition-colors duration-300',
        complete
          ? 'border-success/30 bg-success/5 hover:border-success/60 hover:shadow-lg hover:shadow-success/10'
          : 'border-border/60 bg-background/40 py-3 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:bg-card/80 backdrop-blur-sm',
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
    </motion.button>
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
    <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-5 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 self-center rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md"
      >
        <Flag className="size-4" />
        Start your journey
      </motion.div>

      {curriculum.map((mod, i) => (
        <div key={mod.id} className="flex flex-col items-stretch gap-5">
          {i > 0 && <SpineConnector flip={i % 2 === 0} />}
          <ModuleStation mod={mod} index={i} isComplete={isComplete} onSelect={onSelect} />
        </div>
      ))}

      <SpineConnector flip />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          'flex items-center gap-3 self-center rounded-full border px-6 py-3 text-sm font-semibold shadow-sm backdrop-blur-md transition-all duration-500',
          allDone
            ? 'border-success bg-success/15 text-success shadow-success/20 scale-105'
            : 'border-border/50 bg-card/50 text-muted-foreground',
        )}
      >
        <Trophy className={cn('size-5', allDone ? 'text-success animate-pulse' : 'text-primary')} />
        {allDone ? 'Roadmap complete — publish to Google Play!' : 'Finish line: Google Play'}
      </motion.div>
    </div>
  )
}

function SpineConnector({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="80"
      height="48"
      viewBox="0 0 80 48"
      className="self-center text-border/40"
      aria-hidden
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        d={
          flip
            ? 'M 40 0 C 40 24, 8 24, 8 48'
            : 'M 40 0 C 40 24, 72 24, 72 48'
        }
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
    </svg>
  )
}
