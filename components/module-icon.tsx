import {
  Database,
  Gamepad2,
  LayoutGrid,
  PackageCheck,
  Radio,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  Rocket,
  LayoutGrid,
  Gamepad2,
  Radio,
  Database,
  PackageCheck,
}

export function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Rocket
  return <Icon className={className} />
}
