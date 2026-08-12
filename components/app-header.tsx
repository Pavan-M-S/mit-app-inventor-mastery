'use client'

import { GraduationCap, ListTree, Map, Moon, Search, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ViewMode = 'map' | 'split'

export interface AppHeaderProps {
  query: string
  onQueryChange: (q: string) => void
  completed: number
  total: number
  view: ViewMode
  onViewChange: (v: ViewMode) => void
  isDark: boolean
  onToggleTheme: () => void
}

export function AppHeader({
  query,
  onQueryChange,
  completed,
  total,
  view,
  onViewChange,
  isDark,
  onToggleTheme,
}: AppHeaderProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-[15px] leading-tight font-semibold text-foreground">
                Master AppInventor
              </h1>
              <p className="truncate text-[11px] text-muted-foreground">The Complete Learning Roadmap</p>
            </div>
          </div>

          {/* Search — grows on desktop */}
          <div className="relative ml-auto hidden max-w-xs flex-1 sm:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search lessons…"
              aria-label="Search lessons"
              className="h-9 w-full rounded-full border border-border bg-card pr-3 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>

          {/* View switcher */}
          <div className="hidden items-center rounded-full border border-border bg-card p-1 md:flex">
            <SegBtn active={view === 'map'} onClick={() => onViewChange('map')} icon={<Map className="size-4" />}>
              Map
            </SegBtn>
            <SegBtn
              active={view === 'split'}
              onClick={() => onViewChange('split')}
              icon={<ListTree className="size-4" />}
            >
              Dashboard
            </SegBtn>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-full"
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>
        </div>

        {/* Mobile search */}
        <div className="relative sm:hidden">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search lessons…"
            aria-label="Search lessons"
            className="h-9 w-full rounded-full border border-border bg-card pr-3 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall course progress"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="shrink-0 text-xs font-medium text-muted-foreground tabular-nums">
            {completed}/{total} · {pct}%
          </span>
        </div>
      </div>
    </header>
  )
}

function SegBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors',
        active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
      aria-pressed={active}
    >
      {icon}
      {children}
    </button>
  )
}
