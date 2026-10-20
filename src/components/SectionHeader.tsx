import { Link } from 'react-router-dom'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  action?: string
  to?: string
}

export function SectionHeader({ eyebrow, title, action, to }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      </div>
      {action ? (
        to ? (
          <Link to={to} className="rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-500 hover:text-white">
            {action}
          </Link>
        ) : (
          <button type="button" className="rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-500 hover:text-white">
            {action}
          </button>
        )
      ) : null}
    </div>
  )
}
