'use client'

import { useMemo, useState } from 'react'
import { allLessons, curriculum, totalLessonCount } from '@/lib/curriculum'
import { useProgress } from '@/hooks/use-progress'
import { useTheme } from '@/hooks/use-theme'
import { AppHeader, type ViewMode } from '@/components/app-header'
import { MobileNav } from '@/components/mobile-nav'
import { LessonSidebar } from '@/components/lesson-sidebar'
import { LessonPanel } from '@/components/lesson-panel'
import { RoadmapView } from '@/components/roadmap-view'
import { LessonDrawer } from '@/components/lesson-drawer'

// Precompute per-lesson metadata for fast lookups.
const lessonMeta = new Map(
  curriculum.flatMap((mod) =>
    mod.lessons.map((lesson, i) => [
      lesson.id,
      {
        lesson,
        moduleTitle: mod.title,
        numberInModule: i + 1,
        moduleLessonCount: mod.lessons.length,
      },
    ]),
  ),
)

const orderedIds = allLessons.map((l) => l.id)

export default function Page() {
  const { isComplete, toggle, completed } = useProgress()
  const { isDark, toggle: toggleTheme } = useTheme()

  const [view, setView] = useState<ViewMode>('map')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(orderedIds[0])
  const [drawerId, setDrawerId] = useState<string | null>(null)

  const completedCount = useMemo(
    () => orderedIds.filter((id) => completed.has(id)).length,
    [completed],
  )

  const go = (id: string, target: 'panel' | 'drawer') => {
    if (target === 'drawer') setDrawerId(id)
    else setSelectedId(id)
  }

  const neighbors = (id: string) => {
    const idx = orderedIds.indexOf(id)
    return {
      prev: idx > 0 ? orderedIds[idx - 1] : undefined,
      next: idx < orderedIds.length - 1 ? orderedIds[idx + 1] : undefined,
    }
  }

  const selectedMeta = lessonMeta.get(selectedId)!
  const selectedNeighbors = neighbors(selectedId)

  const drawerMeta = drawerId ? lessonMeta.get(drawerId) : null
  const drawerNeighbors = drawerId ? neighbors(drawerId) : { prev: undefined, next: undefined }

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader
        query={query}
        onQueryChange={setQuery}
        completed={completedCount}
        total={totalLessonCount}
        view={view}
        onViewChange={setView}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto max-w-6xl pb-24 md:pb-10">
        {view === 'map' ? (
          <RoadmapView isComplete={isComplete} onSelect={(id) => go(id, 'drawer')} />
        ) : (
          <div className="flex">
            {/* Sidebar */}
            <aside className="scrollbar-slim sticky top-[137px] hidden h-[calc(100dvh-137px)] w-72 shrink-0 overflow-y-auto border-r border-border md:block lg:w-80">
              <LessonSidebar
                selectedId={selectedId}
                onSelect={(id) => go(id, 'panel')}
                isComplete={isComplete}
                query={query}
              />
            </aside>

            {/* Mobile lesson list */}
            <div className="w-full md:hidden">
              <LessonSidebar
                selectedId={selectedId}
                onSelect={(id) => go(id, 'drawer')}
                isComplete={isComplete}
                query={query}
              />
            </div>

            {/* Main reading panel (desktop) */}
            <section className="hidden flex-1 px-6 py-8 md:block">
              <LessonPanel
                lesson={selectedMeta.lesson}
                moduleTitle={selectedMeta.moduleTitle}
                lessonNumber={selectedMeta.numberInModule}
                lessonTotal={selectedMeta.moduleLessonCount}
                isComplete={isComplete(selectedId)}
                onToggleComplete={toggle}
                onPrev={selectedNeighbors.prev ? () => setSelectedId(selectedNeighbors.prev!) : undefined}
                onNext={selectedNeighbors.next ? () => setSelectedId(selectedNeighbors.next!) : undefined}
              />
            </section>
          </div>
        )}
      </main>

      {/* Drawer for roadmap + mobile lesson taps */}
      <LessonDrawer
        lesson={drawerMeta?.lesson ?? null}
        moduleTitle={drawerMeta?.moduleTitle ?? ''}
        lessonNumber={drawerMeta?.numberInModule ?? 0}
        lessonTotal={drawerMeta?.moduleLessonCount ?? 0}
        isComplete={drawerId ? isComplete(drawerId) : false}
        onToggleComplete={toggle}
        onClose={() => setDrawerId(null)}
        onPrev={drawerNeighbors.prev ? () => setDrawerId(drawerNeighbors.prev!) : undefined}
        onNext={drawerNeighbors.next ? () => setDrawerId(drawerNeighbors.next!) : undefined}
      />

      <MobileNav view={view} onViewChange={setView} isDark={isDark} onToggleTheme={toggleTheme} />
    </div>
  )
}
