export type ScoreboardLeague = {
  id: string
  label: string
}

export type ScoreboardMatch = {
  id: string
  competition: string
  homeTeam: string
  awayTeam: string
  homeScore: string
  awayScore: string
  status: string
  state: string
  date: string
  minute: string
  broadcasters: string[]
  eventUrl: string
}

export type SportsNewsItem = {
  id: string
  headline: string
  description: string
  published: string
  source: string
  url: string
  image?: string
}

type ESPNScoreboard = {
  events?: Array<{
    id: string
    name: string
    date: string
    competitions?: Array<{
      broadcasts?: Array<{ names?: string[] }>
      status?: {
        displayClock?: string
        type?: { state?: string; detail?: string; description?: string }
      }
      competitors?: Array<{
        homeAway: 'home' | 'away'
        score?: string
        team: { displayName: string }
      }>
    }>
    links?: Array<{ rel?: string[]; href?: string }>
  }>
}

type ESPNNews = {
  articles?: Array<{
    id: string | number
    headline?: string
    description?: string
    published?: string
    lastModified?: string
    byline?: string
    images?: Array<{ url?: string }>
    links?: { web?: { href?: string } }
  }>
}

export const scoreboardLeagues: ScoreboardLeague[] = [
  { id: 'eng.1', label: 'Premier League' },
  { id: 'uefa.champions', label: 'UEFA Champions League' },
  { id: 'esp.1', label: 'La Liga' },
  { id: 'ger.1', label: 'Bundesliga' },
  { id: 'ita.1', label: 'Serie A' },
  { id: 'fra.1', label: 'Ligue 1' },
]

export async function fetchScoreboard(league: string, signal?: AbortSignal) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard`,
    { signal },
  )

  if (!response.ok) {
    throw new Error(`Score feed returned ${response.status}`)
  }

  const data = (await response.json()) as ESPNScoreboard

  return (data.events ?? []).flatMap((event): ScoreboardMatch[] => {
    const competition = event.competitions?.[0]
    const home = competition?.competitors?.find((team) => team.homeAway === 'home')
    const away = competition?.competitors?.find((team) => team.homeAway === 'away')

    if (!home || !away) return []

    const status = competition?.status

    return [{
      id: event.id,
      competition: scoreboardLeagues.find((item) => item.id === league)?.label ?? league,
      homeTeam: home.team.displayName,
      awayTeam: away.team.displayName,
      homeScore: home.score ?? '0',
      awayScore: away.score ?? '0',
      status: status?.type?.detail ?? status?.type?.description ?? 'Scheduled',
      state: status?.type?.state ?? 'pre',
      date: event.date,
      minute: status?.displayClock ?? '',
      broadcasters: [...new Set(competition?.broadcasts?.flatMap((broadcast) => broadcast.names ?? []) ?? [])],
      eventUrl: event.links?.find((link) => link.rel?.includes('event'))?.href ?? '',
    }]
  })
}

export async function fetchAllScoreboards(signal?: AbortSignal) {
  const results = await Promise.allSettled(
    scoreboardLeagues.map((league) => fetchScoreboard(league.id, signal)),
  )
  const successfulFeeds = results.filter((result) => result.status === 'fulfilled')

  if (successfulFeeds.length === 0) {
    throw new Error('All score feeds are unavailable')
  }

  return successfulFeeds
    .flatMap((result) => result.value)
    .sort((first, second) => Date.parse(first.date) - Date.parse(second.date))
}

export async function fetchSportsNews(league: string, signal?: AbortSignal) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/news`,
    { signal },
  )

  if (!response.ok) {
    throw new Error(`News feed returned ${response.status}`)
  }

  const data = (await response.json()) as ESPNNews

  return (data.articles ?? []).flatMap((article): SportsNewsItem[] => {
    if (!article.headline || !article.links?.web?.href) return []

    return [{
      id: String(article.id),
      headline: article.headline,
      description: article.description ?? '',
      published: article.published ?? article.lastModified ?? '',
      source: article.byline ?? 'ESPN',
      url: article.links.web.href,
      image: article.images?.[0]?.url,
    }]
  })
}