import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Search, ShieldCheck, Star, Trophy } from 'lucide-react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { SectionHeader } from './components/SectionHeader'
import { competitionCards, featuredChannels, featuredStations } from './data/demoData'
import { fetchRadioCountries, fetchRadioStations, type RadioCountry, type RadioStation } from './data/radioDirectory'
import { fetchTvDirectory, type TvChannel, type TvCountry } from './data/tvDirectory'
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
  const [countries, setCountries] = useState<TvCountry[]>([])
  const [channelsByCountry, setChannelsByCountry] = useState<Record<string, TvChannel[]>>({})
  const [selectedCountry, setSelectedCountry] = useState('RW')
  const [selectedChannel, setSelectedChannel] = useState<TvChannel | null>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [playerError, setPlayerError] = useState('')
  const [playerRetry, setPlayerRetry] = useState(0)
  const [streamIndex, setStreamIndex] = useState(0)
  const [playerMode, setPlayerMode] = useState<'stream' | 'broadcaster'>('stream')
  const [refreshToken, setRefreshToken] = useState(0)
  const videoPlayer = useRef<HTMLVideoElement>(null)
  const countryChannels = channelsByCountry[selectedCountry] ?? []
  const categories = ['All', ...new Set(countryChannels.flatMap((channel) => channel.categories))]
  const channels = countryChannels.filter((channel) =>
    `${channel.name} ${channel.languages.join(' ')} ${channel.categories.join(' ')}`.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'All' || channel.categories.includes(category)),
  )

  useEffect(() => {
    const controller = new AbortController()

    const loadDirectory = async () => {
      setLoading(true)
      setError('')
      try {
        const directory = await fetchTvDirectory(controller.signal)
        setCountries(directory.countries)
        setChannelsByCountry(directory.channelsByCountry)
      } catch {
        if (!controller.signal.aborted) setError('The TV directory could not be loaded. Check your connection and try again.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadDirectory()
    return () => controller.abort()
  }, [refreshToken])

  useEffect(() => {
    const player = videoPlayer.current
    if (!player || !selectedChannel || playerMode !== 'stream') return

    let hls: import('hls.js').default | null = null
    let cancelled = false
    setPlayerError('')
    player.muted = true

    const streamUrl = selectedChannel.streamUrls[streamIndex]
    const startStream = async () => {
      if (!streamUrl) {
        setPlayerError('No stream source is available for this channel.')
        return
      }

      if (/\.m3u8(?:$|[?#])/i.test(streamUrl)) {
        const Hls = (await import('hls.js')).default
        if (cancelled) return

        if (Hls.isSupported()) {
          hls = new Hls()
          hls.loadSource(streamUrl)
          hls.attachMedia(player)
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            void player.play().catch(() => setPlayerError('Press play in the video controls to start this channel.'))
          })
          hls.on(Hls.Events.ERROR, (_event, data) => {
            if (data.fatal) {
              setPlayerError(data.type === Hls.ErrorTypes.MEDIA_ERROR
                ? 'This channel uses a format that this browser cannot play. Try another channel.'
                : 'This channel stream is unavailable right now. Try another channel.')
            }
          })
          return
        }

        if (player.canPlayType('application/vnd.apple.mpegurl')) {
          player.src = streamUrl
          void player.play().catch(() => setPlayerError('Press play in the video controls to start this channel.'))
          return
        }

        setPlayerError('This browser cannot play this channel stream.')
        return
      }

      player.src = streamUrl
      void player.play().catch(() => setPlayerError('Press play in the video controls to start this channel.'))
    }

    void startStream().catch(() => setPlayerError('This channel stream could not be started.'))

    return () => {
      cancelled = true
      hls?.destroy()
      player.pause()
      player.removeAttribute('src')
      player.load()
    }
  }, [selectedChannel, playerRetry, streamIndex, playerMode])

  const chooseChannel = (channel: TvChannel) => {
    setPlayerError('')
    setStreamIndex(0)
    setPlayerMode('stream')
    setSelectedChannel(channel)
  }

  const retryStream = () => {
    if (selectedChannel && selectedChannel.streamUrls.length > 1) {
      setStreamIndex((index) => (index + 1) % selectedChannel.streamUrls.length)
    } else {
      setPlayerRetry((retry) => retry + 1)
    }
    setPlayerError('')
  }

  const showBroadcasterEmbed = () => {
    if (!selectedChannel?.website) return
    setPlayerError('')
    setPlayerMode('broadcaster')
  }

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Global TV directory" title="Watch TV around the world" />
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-black">
        <div className="aspect-video w-full">
          {selectedChannel && playerMode === 'stream' ? (
            <video
              ref={videoPlayer}
              key={selectedChannel.id}
              poster={selectedChannel.logo || undefined}
              controls
              autoPlay
              muted
              playsInline
              className="h-full w-full bg-black"
              aria-label={`${selectedChannel.name} live TV`}
              onError={() => setPlayerError('This channel stream is unavailable right now. Try another channel.')}
            />
          ) : selectedChannel?.website ? (
            <iframe
              key={`${selectedChannel.id}-broadcaster`}
              src={selectedChannel.website}
              title={`${selectedChannel.name} official broadcaster player`}
              className="h-full w-full border-0 bg-black"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="text-sm text-slate-400">{loading ? 'Loading live TV channels…' : 'Choose a channel below to watch.'}</p>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 px-4 py-3">
          <div>
            <p className="font-semibold text-white">{selectedChannel?.name ?? 'ANACLET PAGE TV'}</p>
            <p className="text-sm text-slate-400">{selectedChannel ? `${selectedChannel.countryName} · ${selectedChannel.languages.join(', ') || 'Language not listed'}` : 'Live channels from around the world'}</p>
          </div>
          {selectedChannel && (
            <div className="flex flex-wrap items-center gap-2">
              {playerMode === 'stream' && selectedChannel.website && <button type="button" onClick={showBroadcasterEmbed} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800">Try broadcaster embed</button>}
              {playerMode === 'broadcaster' && <button type="button" onClick={() => { setPlayerError(''); setStreamIndex(0); setPlayerMode('stream') }} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800">Use direct stream</button>}
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-300">{playerMode === 'stream' ? 'In-page stream' : 'Official embed'}</span>
            </div>
          )}
        </div>
      </section>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500" placeholder="Search channels" aria-label="Search channels" />
        <select value={selectedCountry} onChange={(event) => { setSelectedCountry(event.target.value); setSelectedChannel(null); setCategory('All') }} disabled={loading || countries.length === 0} className="max-w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white disabled:opacity-60" aria-label="Choose a TV country">
          {countries.map((country) => <option key={country.code} value={country.code}>{country.flag} {country.name} ({channelsByCountry[country.code]?.length ?? 0})</option>)}
        </select>
        <select value={category} onChange={(event) => setCategory(event.target.value)} disabled={categories.length < 2} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white disabled:opacity-60" aria-label="Filter TV channels by category">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      {error && <p role="alert" className="text-sm text-amber-300">{error} <button type="button" onClick={() => setRefreshToken((token) => token + 1)} className="underline">Retry</button></p>}
      {playerError && <p role="status" className="flex flex-wrap items-center gap-2 text-sm text-amber-300">{playerError}<button type="button" onClick={retryStream} className="underline">Retry{selectedChannel && selectedChannel.streamUrls.length > 1 ? ` source ${((streamIndex + 1) % selectedChannel.streamUrls.length) + 1}/${selectedChannel.streamUrls.length}` : ''}</button>{selectedChannel?.website && <button type="button" onClick={showBroadcasterEmbed} className="underline">Try broadcaster embed</button>}</p>}
      {!loading && !error && countryChannels.length === 0 && <p className="text-sm text-slate-400">No playable public channels are listed for this country yet.</p>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {channels.map((channel) => (
          <article key={channel.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              {channel.logo ? (
                <div className="relative flex h-12 w-20 items-center justify-center rounded-lg bg-sky-500/15">
                  <img src={channel.logo} alt="" className="h-full w-full rounded-lg bg-white object-contain p-1" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
                  <span className="hidden font-bold text-sky-200">{channel.name.slice(0, 2).toUpperCase()}</span>
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 font-bold text-sky-200">{channel.name.slice(0, 2).toUpperCase()}</div>
              )}
              <span className="text-xs uppercase tracking-[0.18em] text-emerald-300">Public stream</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{channel.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{channel.countryName} · {channel.languages.join(', ') || 'Language not listed'}</p>
            <p className="mt-3 text-sm text-slate-300">{channel.categories.join(' · ') || 'Television'}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="min-w-0 truncate text-xs text-slate-500">{channel.quality || 'Live stream'}{channel.streamUrls.length > 1 ? ` · ${channel.streamUrls.length} sources` : ''}</span>
              <button type="button" onClick={() => chooseChannel(channel)} className="shrink-0 rounded-full bg-sky-500 px-3 py-2 font-medium text-white hover:bg-sky-400">{selectedChannel?.id === channel.id ? 'Selected' : 'Watch'}</button>
            </div>
          </article>
        ))}
      </div>
      {channels.length === 0 && countryChannels.length > 0 && <p className="text-sm text-slate-400">No channels match this search.</p>}
      <p className="text-xs text-slate-500">Channel directory and stream listings by <a href="https://iptv-org.github.io/" target="_blank" rel="noreferrer" className="underline hover:text-slate-300">iptv-org</a>. Streams are provided by their broadcasters.</p>
    </div>
  )
}

function RadioPage() {
  const [countries, setCountries] = useState<RadioCountry[]>([])
  const [selectedCountry, setSelectedCountry] = useState('Rwanda')
  const [stations, setStations] = useState<RadioStation[]>([])
  const [activeStation, setActiveStation] = useState<RadioStation | null>(null)
  const [streamError, setStreamError] = useState(false)
  const [query, setQuery] = useState('')
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [loadingStations, setLoadingStations] = useState(true)
  const [countryError, setCountryError] = useState('')
  const [stationError, setStationError] = useState('')
  const [refreshToken, setRefreshToken] = useState(0)
  const audioPlayer = useRef<HTMLAudioElement>(null)
  const visibleStations = stations.filter((station) =>
    `${station.name} ${station.language} ${station.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()),
  )

  const playStation = (station: RadioStation) => {
    setActiveStation(station)
    setStreamError(false)
      const radioPlayer = audioPlayer.current
      if (radioPlayer) {
        radioPlayer.src = station.streamUrl
        void radioPlayer.play().catch(() => setStreamError(true))
      }
  }

  useEffect(() => {
    const controller = new AbortController()
    const loadCountries = async () => {
      try {
        setCountries(await fetchRadioCountries(controller.signal))
        setCountryError('')
      } catch {
        if (!controller.signal.aborted) setCountryError('Countries could not be loaded. Check your connection and try again.')
      } finally {
        if (!controller.signal.aborted) setLoadingCountries(false)
      }
    }
    void loadCountries()
    return () => controller.abort()
  }, [refreshToken])

  useEffect(() => {
    const controller = new AbortController()
    const loadStations = async () => {
      setLoadingStations(true)
      setStations([])
      setActiveStation(null)
      setStreamError(false)
      setStationError('')
      audioPlayer.current?.pause()
      audioPlayer.current?.removeAttribute('src')
      audioPlayer.current?.load()
      try {
        setStations(await fetchRadioStations(selectedCountry, controller.signal))
      } catch {
        if (!controller.signal.aborted) setStationError(`Stations for ${selectedCountry} could not be loaded. Please try again.`)
      } finally {
        if (!controller.signal.aborted) setLoadingStations(false)
      }
    }
    void loadStations()
    return () => controller.abort()
  }, [selectedCountry, refreshToken])

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Global radio directory" title="Listen around the world" />
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Now playing</p>
            <p className="mt-1 text-lg font-semibold text-white">{activeStation?.name ?? 'Choose a station to listen'}</p>
          </div>
        </div>
        <audio ref={audioPlayer} controls={Boolean(activeStation)} aria-label="Live radio player" className="mt-4 w-full" onError={() => setStreamError(true)} />
        {!activeStation && <p className="mt-3 text-sm text-slate-400">Select a station below to start listening.</p>}
        {activeStation && streamError && <p role="status" className="mt-3 text-sm text-amber-300">This stream could not be played here. It may be offline or block playback from a secure website.</p>}
      </section>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500" placeholder="Search stations, language or genre" aria-label="Search stations, language or genre" />
        <select value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)} disabled={loadingCountries || countries.length === 0} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white disabled:opacity-60" aria-label="Choose a radio country">
          {countries.map((country) => <option key={country.name} value={country.name}>{country.name} ({country.stationcount})</option>)}
        </select>
      </div>
      {countryError && <p role="alert" className="text-sm text-amber-300">{countryError} <button type="button" onClick={() => setRefreshToken((token) => token + 1)} className="underline">Retry</button></p>}
      {stationError && <p role="alert" className="text-sm text-amber-300">{stationError} <button type="button" onClick={() => setRefreshToken((token) => token + 1)} className="underline">Retry</button></p>}
      {loadingCountries && <p role="status" className="text-sm text-slate-400">Loading countries…</p>}
      {loadingStations && <p role="status" className="text-sm text-slate-400">Loading verified stations in {selectedCountry}…</p>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleStations.map((station) => (
          <article key={station.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              {station.favicon ? <img src={station.favicon} alt="" className="h-12 w-12 rounded-lg bg-slate-800 object-contain" loading="lazy" onError={(event) => { event.currentTarget.hidden = true }} /> : <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 font-bold text-emerald-200">{station.name.slice(0, 2).toUpperCase()}</div>}
              <span className="text-xs uppercase tracking-[0.18em] text-emerald-300">Recently checked</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{station.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{station.country} · {station.language}</p>
            <p className="mt-3 text-sm text-slate-300">{station.codec || 'Live stream'}{station.bitrate ? ` · ${station.bitrate} kbps` : ''}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="min-w-0 truncate text-slate-400">{station.tags.length > 0 ? station.tags.slice(0, 2).join(' · ') : 'Radio'}</span>
              <button type="button" onClick={() => playStation(station)} className="shrink-0 rounded-full bg-sky-500 px-3 py-2 font-medium text-white hover:bg-sky-400">{activeStation?.id === station.id && !streamError ? 'Playing' : 'Listen'}</button>
            </div>
          </article>
        ))}
      </div>
      {!loadingStations && !stationError && visibleStations.length === 0 && <p className="text-sm text-slate-400">{stations.length === 0 ? `No verified stations are listed for ${selectedCountry} right now.` : 'No stations match your search.'}</p>}
      <p className="text-xs text-slate-500">Station directory provided by <a href="https://www.radio-browser.info/" target="_blank" rel="noreferrer" className="underline hover:text-slate-300">Radio Browser</a>. Streams are hosted by their broadcasters.</p>
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
