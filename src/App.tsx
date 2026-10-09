import { ArrowRight, Search, ShieldCheck, Star, Trophy } from 'lucide-react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { SectionHeader } from './components/SectionHeader'
import { competitionCards, featuredChannels, featuredStations, liveMatches, newsArticles, upcomingMatches } from './data/demoData'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/radio" element={<RadioPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  )
}

function HomePage() {
  return (
    <div className="space-y-10 pb-10">
      <section className="overflow-hidden rounded-[28px] border border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(37,137,255,0.3),_transparent_30%),linear-gradient(135deg,#0d1b2a,#07111f_50%)] p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              Live around the world
            </p>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Your world of live TV, radio and sports.
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-300 md:text-lg">
              Discover international channels, authorized audio streams, and live match updates in one premium destination.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/sports" className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400">Live Sports <ArrowRight size={18} /></Link>
              <Link to="/tv" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 font-semibold text-slate-100 transition hover:border-sky-500">Live TV</Link>
              <Link to="/radio" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 font-semibold text-slate-100 transition hover:border-sky-500">Live Radio</Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-5 shadow-[0_20px_80px_rgba(14,116,144,0.22)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Featured</p>
                <p className="mt-2 text-xl font-semibold text-white">Global Live Feed</p>
              </div>
              <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-medium text-red-300">LIVE</span>
            </div>
            <div className="space-y-4">
              {liveMatches.slice(0, 3).map((match) => (
                <div key={match.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                    <span>{match.competition}</span>
                    <span>{match.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-200">
                    <span>{match.homeTeam}</span>
                    <span className="font-bold text-white">{match.homeScore}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-200">
                    <span>{match.awayTeam}</span>
                    <span className="font-bold text-white">{match.awayScore}</span>
                  </div>
                  <div className="mt-3 text-xs text-sky-300">{match.minute}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Live sports" title="Match center" action="View all matches" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {liveMatches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                <span>{match.sport}</span>
                <span className="rounded-full bg-red-500/15 px-2 py-1 text-red-300">{match.status}</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-base font-medium text-white">
                  <span>{match.homeTeam}</span>
                  <span>{match.homeScore}</span>
                </div>
                <div className="flex items-center justify-between text-base font-medium text-white">
                  <span>{match.awayTeam}</span>
                  <span>{match.awayScore}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                <span>{match.competition}</span>
                <span>{match.minute}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Popular TV" title="Featured channels" action="Browse directory" />
        <div className="grid gap-4 md:grid-cols-3">
          {featuredChannels.map((channel) => (
            <div key={channel.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-200">{channel.name.slice(0, 2).toUpperCase()}</div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">{channel.status}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{channel.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{channel.country} · {channel.category}</p>
              <p className="mt-3 text-sm text-slate-300">{channel.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Live radio" title="Popular stations" action="Open radio" />
        <div className="grid gap-4 md:grid-cols-3">
          {featuredStations.map((station) => (
            <div key={station.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-sm font-bold text-violet-200">{station.name.slice(0, 2).toUpperCase()}</div>
                <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-sky-300">{station.status}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{station.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{station.country} · {station.category}</p>
              <p className="mt-3 text-sm text-slate-300">{station.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Fixtures" title="Upcoming matches" action="View schedule" />
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingMatches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                <span>{match.competition}</span>
                <span>{match.minute}</span>
              </div>
              <div className="flex items-center justify-between text-base text-white">
                <span>{match.homeTeam}</span>
                <span>vs</span>
                <span>{match.awayTeam}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="News" title="Latest sports coverage" action="Read all" />
        <div className="grid gap-4 md:grid-cols-3">
          {newsArticles.map((article) => (
            <article key={article.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-sky-300">{article.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{article.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{article.summary}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                <span>{article.source}</span>
                <span>{article.date}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function TvPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="TV directory" title="Live TV catalog" action="Filter channels" />
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500" placeholder="Search channels" />
          <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"><option>Country</option></select>
          <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"><option>Category</option></select>
          <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"><option>Sort</option></select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredChannels.map((channel) => (
          <div key={channel.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 font-bold text-sky-200">{channel.name.slice(0, 2).toUpperCase()}</div>
              <span className="text-xs uppercase tracking-[0.18em] text-emerald-300">{channel.status}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{channel.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{channel.country} · {channel.language}</p>
            <p className="mt-3 text-sm text-slate-300">{channel.description}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="rounded-full border border-slate-700 px-2 py-1 text-slate-300">{channel.category}</span>
              <button type="button" className="rounded-full bg-sky-500 px-3 py-2 font-medium text-white">Watch</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RadioPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Radio directory" title="Live listening" action="Audio set" />
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500" placeholder="Search stations" />
          <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"><option>Country</option></select>
          <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"><option>Language</option></select>
          <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"><option>Category</option></select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredStations.map((station) => (
          <div key={station.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 font-bold text-violet-200">{station.name.slice(0, 2).toUpperCase()}</div>
              <span className="text-xs uppercase tracking-[0.18em] text-sky-300">{station.status}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{station.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{station.country} · {station.language}</p>
            <p className="mt-3 text-sm text-slate-300">{station.description}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="rounded-full border border-slate-700 px-2 py-1 text-slate-300">{station.category}</span>
              <button type="button" className="rounded-full bg-violet-500 px-3 py-2 font-medium text-white">Play</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SportsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Sports hub" title="Live scores and fixtures" action="Refresh data" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live</p>
          <p className="mt-3 text-3xl font-bold text-white">24</p>
          <p className="mt-2 text-sm text-slate-400">Matches active</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Fixtures</p>
          <p className="mt-3 text-3xl font-bold text-white">48</p>
          <p className="mt-2 text-sm text-slate-400">Scheduled events</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Demo status</p>
          <p className="mt-3 text-3xl font-bold text-amber-300">Demo</p>
          <p className="mt-2 text-sm text-slate-400">Provider keys required for production data</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {liveMatches.map((match) => (
          <div key={match.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>{match.competition}</span>
              <span className="rounded-full bg-red-500/15 px-2 py-1 text-red-300">{match.status}</span>
            </div>
            <div className="space-y-3 text-white">
              <div className="flex items-center justify-between"><span>{match.homeTeam}</span><span>{match.homeScore}</span></div>
              <div className="flex items-center justify-between"><span>{match.awayTeam}</span><span>{match.awayScore}</span></div>
            </div>
            <p className="mt-4 text-sm text-sky-300">{match.minute}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompetitionsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Competitions" title="World competition directory" action="Add filter" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {competitionCards.map((competition, index) => (
          <div key={`${competition.name}-${index}`} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 text-sky-200"><Trophy size={20} /></div>
            <h3 className="text-xl font-semibold text-white">{competition.name}</h3>
            <p className="mt-3 text-sm text-slate-400">{competition.sport}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function NewsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Newsroom" title="Sports headlines" action="Filter stories" />
      <div className="grid gap-4 md:grid-cols-3">
        {newsArticles.map((article) => (
          <article key={article.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-sky-300">{article.category}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{article.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{article.summary}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>{article.source}</span>
              <span>{article.date}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function FavoritesPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Favorites" title="Saved channels and teams" action="Manage" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2"><Star size={18} className="text-amber-300" /> <h3 className="text-lg font-semibold text-white">Favorite TV</h3></div>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>BBC World</li>
            <li>France 24</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-300" /> <h3 className="text-lg font-semibold text-white">Favorite teams</h3></div>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>Real Madrid</li>
            <li>Boston Celtics</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function SearchPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Search" title="Global discovery" action="Recent" />
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3">
          <Search size={18} className="text-slate-400" />
          <input placeholder="Search channels, stations, teams, competitions and news" className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><h3 className="text-lg font-semibold text-white">TV & radio</h3><p className="mt-2 text-sm text-slate-400">3 results</p></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><h3 className="text-lg font-semibold text-white">Teams</h3><p className="mt-2 text-sm text-slate-400">7 results</p></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><h3 className="text-lg font-semibold text-white">News</h3><p className="mt-2 text-sm text-slate-400">4 results</p></div>
      </div>
    </div>
  )
}

function LoginPage() {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
      <p className="mt-2 text-sm text-slate-400">Sign in to manage favorites and personal settings.</p>
      <form className="mt-6 space-y-4">
        <input type="email" placeholder="Email" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white placeholder:text-slate-500" />
        <input type="password" placeholder="Password" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white placeholder:text-slate-500" />
        <button type="button" className="w-full rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white">Login</button>
      </form>
      <Link to="/register" className="mt-4 block text-center text-sm text-sky-300">Need an account? Register</Link>
    </div>
  )
}

function RegisterPage() {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <h2 className="text-2xl font-semibold text-white">Create account</h2>
      <form className="mt-6 space-y-4">
        <input type="text" placeholder="Full name" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white placeholder:text-slate-500" />
        <input type="email" placeholder="Email" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white placeholder:text-slate-500" />
        <input type="password" placeholder="Password" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white placeholder:text-slate-500" />
        <button type="button" className="w-full rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white">Register</button>
      </form>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Profile" title="Your account" action="Edit profile" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-sm text-slate-400">Display name</p><p className="mt-2 text-xl font-semibold text-white">Alex Morgan</p></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-sm text-slate-400">Favorites saved</p><p className="mt-2 text-xl font-semibold text-white">12</p></div>
      </div>
    </div>
  )
}

function AdminPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Admin" title="Content operations" action="Audit logs" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Channels</p><p className="mt-3 text-3xl font-bold text-white">128</p></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Radio</p><p className="mt-3 text-3xl font-bold text-white">63</p></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Reports</p><p className="mt-3 text-3xl font-bold text-white">07</p></div>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <p className="text-sm text-slate-400">Protected admin area. Real authorization and database policies will be enforced once Supabase is connected.</p>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-sky-300">404</p>
      <h2 className="mt-4 text-3xl font-bold text-white">Page not found</h2>
      <p className="mt-3 text-slate-300">This route is not available in the current demo build.</p>
      <Link to="/" className="mt-6 inline-flex rounded-full bg-sky-500 px-4 py-2 font-semibold text-white">Back home</Link>
    </div>
  )
}

export default App
