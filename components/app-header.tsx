'use client'

import { GraduationCap, ListTree, Map, Moon, Search, Sun } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 50], ["0%", "50%"]);
  const headerBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const headerBorder = useTransform(scrollY, [0, 50], ["rgba(var(--border), 0)", "rgba(var(--border), 0.5)"]);

  return (
    <motion.header
      style={{
        backdropFilter: headerBlur,
        borderColor: headerBorder,
      }}
      className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur-xl transition-all duration-300"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
         <motion.div
            style={{ y: backgroundY }}
            className="absolute -top-[100px] -left-[100px] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px]"
         />
         <motion.div
            style={{ y: backgroundY }}
            className="absolute -top-[50px] -right-[50px] h-[200px] w-[200px] rounded-full bg-brand-blue/10 blur-[60px]"
         />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex min-w-0 items-center gap-2.5"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand-blue text-primary-foreground shadow-lg shadow-primary/20">
              <GraduationCap className="size-5" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-base leading-tight font-bold text-foreground tracking-tight">
                Master AppInventor
              </h1>
              <p className="truncate text-xs text-muted-foreground font-medium">The Complete Learning Roadmap</p>
            </div>
          </motion.div>

          {/* Search — grows on desktop */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative ml-auto hidden max-w-xs flex-1 sm:block group"
          >
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search lessons…"
              aria-label="Search lessons"
              className="h-10 w-full rounded-full border border-border/50 bg-card/50 pr-3 pl-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background transition-all shadow-sm"
            />
          </motion.div>

          {/* View switcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden items-center rounded-full border border-border/50 bg-card/50 p-1 md:flex shadow-sm backdrop-blur-sm"
          >
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
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-full border-border/50 bg-card/50 shadow-sm hover:bg-accent/80 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Mobile search */}
        <div className="relative sm:hidden group">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search lessons…"
            aria-label="Search lessons"
            className="h-10 w-full rounded-full border border-border/50 bg-card/50 pr-3 pl-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background transition-all shadow-sm"
          />
        </div>

        {/* Progress */}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex items-center gap-3"
        >
          <div
            className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted/80 shadow-inner"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall course progress"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-brand-blue relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12 -translate-x-full" />
            </motion.div>
          </div>
          <span className="shrink-0 text-xs font-semibold text-muted-foreground tabular-nums bg-card/50 px-2 py-0.5 rounded-full border border-border/50">
            {completed}/{total} · {pct}%
          </span>
        </motion.div>
      </div>
    </motion.header>
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
        'relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors z-10',
        active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
      )}
      aria-pressed={active}
    >
      {active && (
        <motion.div
          layoutId="active-segment"
          className="absolute inset-0 -z-10 rounded-full bg-primary shadow-md shadow-primary/20"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      {icon}
      {children}
    </button>
  )
}
