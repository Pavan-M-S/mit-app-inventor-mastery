'use client'

import { ListTree, Map, Moon, Sun } from 'lucide-react'
import type { ViewMode } from '@/components/app-header'
import { cn } from '@/lib/utils'

export function MobileNav({
  view,
  onViewChange,
  isDark,
  onToggleTheme,
}: {
  view: ViewMode
  onViewChange: (v: ViewMode) => void
  isDark: boolean
  onToggleTheme: () => void
}) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto grid max-w-md grid-cols-3">
        <Item active={view === 'map'} onClick={() => onViewChange('map')} icon={<Map className="size-5" />}>
          Roadmap
        </Item>
        <Item
          active={view === 'split'}
          onClick={() => onViewChange('split')}
          icon={<ListTree className="size-5" />}
        >
          Lessons
        </Item>
        <Item active={false} onClick={onToggleTheme} icon={isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}>
          Theme
        </Item>
      </div>
    </nav>
  )
}

function Item({
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
      aria-pressed={active}
      className={cn(
        'flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {icon}
      {children}
    </button>
  )
}
