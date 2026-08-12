import { Lightbulb } from 'lucide-react'
import type { ContentBlock } from '@/lib/curriculum'
import { BlockCard } from '@/components/block-card'

export function LessonContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h3 key={i} className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                {block.text}
              </h3>
            )
          case 'paragraph':
            return (
              <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            )
          case 'list':
            return (
              <ul key={i} className="flex flex-col gap-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'tip':
            return (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4"
              >
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-[14px] leading-relaxed text-foreground text-pretty">{block.text}</p>
              </div>
            )
          case 'blocks':
            return <BlockCard key={i} title={block.title} rows={block.rows} />
          default:
            return null
        }
      })}
    </div>
  )
}
