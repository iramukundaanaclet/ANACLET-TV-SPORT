import { Menu, Search, Tv, Radio, Trophy, Newspaper, UserCircle2 } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { navItems } from '../data/demoData'

export function Layout() {
  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-lg font-bold text-white shadow-lg shadow-sky-500/20">A</div>
            <div>
              <p className="text-lg font-bold tracking-[0.18em] text-white">ANACLET</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">TV & SPORTS</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-sky-500/20 text-sky-200' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-slate-300">
              <Search size={16} />
              <span className="text-sm">Search</span>
            </div>
            <button type="button" className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">EN</button>
            <button type="button" className="rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-100">Login</button>
          </div>

          <button type="button" className="rounded-full border border-slate-700 p-2 text-slate-200 lg:hidden" aria-label="Open menu">
            <Menu size={18} />
          </button>
        </div>

        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto border-t border-slate-800 px-4 py-3 text-sm text-slate-300 lg:hidden">
          <NavLink to="/tv" className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2"><Tv size={14} /> TV</NavLink>
          <NavLink to="/radio" className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2"><Radio size={14} /> Radio</NavLink>
          <NavLink to="/sports" className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2"><Trophy size={14} /> Sports</NavLink>
          <NavLink to="/news" className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2"><Newspaper size={14} /> News</NavLink>
          <NavLink to="/profile" className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2"><UserCircle2 size={14} /> Profile</NavLink>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
          <div>
            <p className="mb-3 text-lg font-semibold text-white">ANACLET</p>
            <p className="text-sm text-slate-400">Your World of Live TV, Radio and Sports.</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Company</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Legal</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Terms of Service</li>
              <li>Content Notice</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Status</p>
            <p className="text-sm text-slate-400">Live sports scores by ESPN. TV and radio streams are provided by their official broadcasters.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
