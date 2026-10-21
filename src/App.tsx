import { useEffect, useState } from 'react'
import { ArrowRight, Search, ShieldCheck, Star, Trophy } from 'lucide-react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { SectionHeader } from './components/SectionHeader'
import { competitionCards, featuredChannels, featuredStations } from './data/demoData'
import { fetchScoreboard, fetchSportsNews, scoreboardLeagues, type ScoreboardMatch, type SportsNewsItem } from './data/liveSports'

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

function useScoreboard(league: string) {
  const [matches, setMatches] = useState<ScoreboardMatch[]>([])
  const [error, setError] = useState('')
  const [refreshToken, setRefreshToken] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [completedRequest, setCompletedRequest] = useState({ league: '', token: -1 })
  const loading = completedRequest.league !== league || completedRequest.token !== refreshToken

  useEffect(() => {
    const controller = new AbortController()

    const refresh = async () => {
      try {
        const results = await fetchScoreboard(league, controller.signal)
        setMatches(results)
        setError('')
        setLastUpdated(new Date())
      } catch {
        if (!controller.signal.aborted) setError('Live scores are temporarily unavailable.')
      } finally {
        if (!controller.signal.aborted) setCompletedRequest({ league, token: refreshToken })
      }
    }

    void refresh()
    const timer = window.setInterval(() => void refresh(), 60_000)

    return () => {
      controller.abort()
      window.clearInterval(timer)
    }
  }, [league, refreshToken])

  return { matches, loading, error, lastUpdated, refresh: () => setRefreshToken((token) => token + 1) }
}

function useSportsNews(league: string) {
  const [articles, setArticles] = useState<SportsNewsItem[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const refresh = async () => {
      try {
        setArticles(await fetchSportsNews(league, controller.signal))
        setError('')
      } catch {
        if (!controller.signal.aborted) setError('Sports news is temporarily unavailable.')
      }
    }

    void refresh()
    const timer = window.setInterval(() => void refresh(), 300_000)

    return () => {
      controller.abort()
      window.clearInterval(timer)
    }
  }, [league])

  return { articles, error }
}

function HomePage() {
  const { matches, loading, error } = useScoreboard('eng.1')
  const { articles, error: newsError } = useSportsNews('eng.1')
  const liveMatches = matches.filter((match) => match.state === 'in')

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
                <p className="mt-2 text-xl font-semibold text-white">Premier League scores</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${liveMatches.length ? 'bg-red-500/15 text-red-300' : 'bg-slate-800 text-slate-300'}`}>
                {liveMatches.length ? 'LIVE' : 'UPDATES'}
              </span>
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
              {liveMatches.length === 0 && (
                <p className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
                  {error || (loading ? 'Loading live scores…' : 'No Premier League matches are live right now.')}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Live sports" title="Match center" action="View all matches" to="/sports" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {liveMatches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                <span>{match.competition}</span>
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
        {liveMatches.length === 0 && (
          <p className="text-sm text-slate-400">{error || (loading ? 'Loading live scores…' : 'No matches are live right now.')}</p>
        )}
      </section>

      <section>
        <SectionHeader eyebrow="Popular TV" title="Featured channels" action="Browse directory" to="/tv" />
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
              <Link to="/tv" className="mt-4 inline-flex rounded-full bg-sky-500 px-3 py-2 text-sm font-medium text-white">Watch live</Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Live radio" title="Popular stations" action="Open radio" to="/radio" />
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
              <Link to="/radio" className="mt-4 inline-flex rounded-full bg-sky-500 px-3 py-2 text-sm font-medium text-white">Listen live</Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="ESPN news" title="Latest sports coverage" action="Read all" to="/news" />
        <div className="grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <article key={article.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-sky-300">Football · ESPN</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{article.headline}</h3>
              <p className="mt-3 text-sm text-slate-300">{article.description}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                <span>{article.source}</span>
                <span>{article.published ? new Date(article.published).toLocaleDateString() : ''}</span>
              </div>
              <a href={article.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm text-sky-300">Read story</a>
            </article>
          ))}
        </div>
        {articles.length === 0 && <p className="text-sm text-slate-400">{newsError || 'Loading sports news…'}</p>}
      </section>
    </div>
  )
}

function TvPage() {
  const [selectedChannel, setSelectedChannel] = useState(featuredChannels[0])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(featuredChannels.map((channel) => channel.category))]
  const channels = featuredChannels.filter((channel) =>
    channel.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'All' || channel.category === category),
  )

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="TV directory" title="Live TV catalog" />
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-black">
        <div className="aspect-video w-full">
          <iframe
            key={selectedChannel.id}
            src={`${selectedChannel.streamUrl}&autoplay=1&mute=1`}
            title={`${selectedChannel.name} live stream`}
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 px-4 py-3">
          <div>
            <p className="font-semibold text-white">{selectedChannel.name}</p>
            <p className="text-sm text-slate-400">Official live stream · {selectedChannel.language}</p>
          </div>
          <a href={selectedChannel.officialUrl} target="_blank" rel="noreferrer" className="text-sm text-sky-300 hover:text-sky-200">Open broadcaster site</a>
        </div>
      </section>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500" placeholder="Search channels" aria-label="Search channels" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" aria-label="Filter channels by category">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {channels.map((channel) => (
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
              <button type="button" onClick={() => setSelectedChannel(channel)} className="rounded-full bg-sky-500 px-3 py-2 font-medium text-white hover:bg-sky-400">Watch</button>
            </div>
          </div>
        ))}
      </div>
      {channels.length === 0 && <p className="text-sm text-slate-400">No channels match this search.</p>}
    </div>
  )
}

function RadioPage() {
  const [activeStation, setActiveStation] = useState(featuredStations[0])
  const [streamError, setStreamError] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(featuredStations.map((station) => station.category))]
  const stations = featuredStations.filter((station) =>
    station.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'All' || station.category === category),
  )

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Radio directory" title="Live listening" />
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Now playing</p>
            <p className="mt-1 text-lg font-semibold text-white">{activeStation.name}</p>
          </div>
          <a href={activeStation.listenUrl || activeStation.officialUrl} target="_blank" rel="noreferrer" className="text-sm text-sky-300 hover:text-sky-200">Yumvire online</a>
        </div>
        {activeStation.streamUrl ? (
          <audio key={activeStation.id} controls autoPlay className="mt-4 w-full" src={activeStation.streamUrl} onError={() => setStreamError(true)}>
            Your browser does not support audio playback.
          </audio>
        ) : (
          <p className="mt-4 text-sm text-slate-300">
            Nta murongo wa live audio direct watangajwe. <a href={activeStation.listenUrl || activeStation.officialUrl} target="_blank" rel="noreferrer" className="text-sky-300 hover:text-sky-200">Yumvire online</a>.
          </p>
        )}
        {activeStation.streamUrl && streamError && (
          <p className="mt-3 text-sm text-amber-300">
            Stream ntiyafunguye. <a href={activeStation.listenUrl || activeStation.officialUrl} target="_blank" rel="noreferrer" className="underline">Yumvire online</a>.
          </p>
        )}
      </section>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500" placeholder="Search stations" aria-label="Search stations" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" aria-label="Filter stations by category">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stations.map((station) => (
          <div key={station.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 font-bold text-violet-200">{station.name.slice(0, 2).toUpperCase()}</div>
              <span className="text-xs uppercase tracking-[0.18em] text-sky-300">{station.status === 'Website' ? 'Listen online' : station.status}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{station.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{station.country} · {station.language}</p>
            <p className="mt-3 text-sm text-slate-300">{station.description}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="rounded-full border border-slate-700 px-2 py-1 text-slate-300">{station.category}</span>
              <button type="button" onClick={() => { setActiveStation(station); setStreamError(false) }} className="rounded-full bg-sky-500 px-3 py-2 font-medium text-white hover:bg-sky-400">{station.streamUrl ? 'Listen' : 'Open online'}</button>
            </div>
          </div>
        ))}
      </div>
      {stations.length === 0 && <p className="text-sm text-slate-400">No stations match this search.</p>}
    </div>
  )
}

function SportsPage() {
  const [league, setLeague] = useState(scoreboardLeagues[0].id)
  const { matches, loading, error, lastUpdated, refresh } = useScoreboard(league)
  const live = matches.filter((match) => match.state === 'in')
  const scheduled = matches.filter((match) => match.state === 'pre')
  const finished = matches.filter((match) => match.state === 'post')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow="ESPN live data" title="Scores and fixtures" />
        <div className="mb-6 flex items-center gap-3">
          <select value={league} onChange={(event) => setLeague(event.target.value)} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" aria-label="Choose competition">
            {scoreboardLeagues.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <button type="button" onClick={refresh} disabled={loading} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-white disabled:opacity-50">
            {loading ? 'Updating…' : 'Refresh'}
          </button>
        </div>
      </div>
      <p className="-mt-5 text-xs text-slate-500">Source: ESPN · updates every minute{lastUpdated ? ` · last checked ${lastUpdated.toLocaleTimeString()}` : ''}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4"><p className="text-sm text-slate-400">Live</p><p className="mt-1 text-2xl font-bold text-white">{live.length}</p></div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4"><p className="text-sm text-slate-400">Upcoming</p><p className="mt-1 text-2xl font-bold text-white">{scheduled.length}</p></div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4"><p className="text-sm text-slate-400">Completed</p><p className="mt-1 text-2xl font-bold text-white">{finished.length}</p></div>
      </div>
      {error && <p role="status" className="text-sm text-amber-300">{error} Check your connection and refresh.</p>}
      {loading && matches.length === 0 && <p className="text-sm text-slate-400">Loading live scores…</p>}
      {!loading && !error && matches.length === 0 && <p className="text-sm text-slate-400">No fixtures are listed for this competition today.</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {matches.map((match) => (
          <article key={match.id} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-slate-400">
              <span>{match.competition}</span>
              <span className={match.state === 'in' ? 'rounded-full bg-red-500/15 px-2 py-1 text-red-300' : 'rounded-full bg-slate-800 px-2 py-1 text-slate-300'}>{match.status}</span>
            </div>
            <div className="space-y-3 text-white">
              <div className="flex items-center justify-between gap-4"><span>{match.homeTeam}</span><span className="font-bold tabular-nums">{match.homeScore}</span></div>
              <div className="flex items-center justify-between gap-4"><span>{match.awayTeam}</span><span className="font-bold tabular-nums">{match.awayScore}</span></div>
            </div>
            <p className="mt-4 text-sm text-sky-300">{match.state === 'pre' ? new Date(match.date).toLocaleString() : match.minute}</p>
          </article>
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
  const { articles, error } = useSportsNews('eng.1')

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="ESPN newsroom" title="Current football headlines" />
      <div className="grid gap-4 md:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            {article.image && <img src={article.image} alt="" className="mb-4 aspect-video w-full rounded-lg object-cover" loading="lazy" />}
            <p className="text-xs uppercase tracking-[0.18em] text-sky-300">Football · ESPN</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{article.headline}</h3>
            <p className="mt-3 text-sm text-slate-300">{article.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>{article.source}</span>
              <span>{article.published ? new Date(article.published).toLocaleDateString() : ''}</span>
            </div>
            <a href={article.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm text-sky-300">Read story</a>
          </article>
        ))}
      </div>
      {articles.length === 0 && <p className="text-sm text-slate-400">{error || 'Loading sports news…'}</p>}
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
