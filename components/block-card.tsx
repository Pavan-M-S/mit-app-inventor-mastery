import type { BlockRow, BlockTone } from '@/lib/curriculum'

const toneColor: Record<BlockTone, string> = {
  control: '#f0b357',
  logic: '#64c99a',
  variable: '#ec7b8b',
  component: '#7fb3f0',
  math: '#a99bf5',
  text: '#57c7c0',
}

function Row({ row, depth }: { row: BlockRow; depth: number }) {
  const color = toneColor[row.tone]
  return (
    <div style={{ marginLeft: depth * 16 }}>
      <div
        className="flex items-center gap-2 rounded-md py-1.5 pr-3 pl-2 font-mono text-[13px] leading-tight"
        style={{
          background: color,
          color: '#0b1327',
          boxShadow: 'inset 3px 0 0 rgba(11,19,39,0.35)',
        }}
      >
        <span
          aria-hidden
          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: 'rgba(11,19,39,0.35)' }}
        />
        <span className="text-pretty">{row.label}</span>
      </div>
      {row.children && row.children.length > 0 && (
        <div className="mt-1.5 flex flex-col gap-1.5 border-l-2 border-dashed border-border pl-3">
          {row.children.map((child, i) => (
            <Row key={i} row={child} depth={0} />
          ))}
        </div>
      )}
    </div>
  )
}

export function BlockCard({ title, rows }: { title: string; rows: BlockRow[] }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-background/60">
      <figcaption className="flex items-center gap-2 border-b border-border px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        <span className="inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />
        {title}
      </figcaption>
      <div className="flex flex-col gap-1.5 p-4">
        {rows.map((row, i) => (
          <Row key={i} row={row} depth={0} />
        ))}
      </div>
    </figure>
  )
}
