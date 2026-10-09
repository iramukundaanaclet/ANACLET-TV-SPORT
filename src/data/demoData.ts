export type NavItem = {
  label: string
  path: string
}

export type Channel = {
  id: string
  name: string
  country: string
  language: string
  category: string
  description: string
  status: 'Verified' | 'Demo'
  isFavorite?: boolean
}

export type Station = {
  id: string
  name: string
  country: string
  language: string
  category: string
  description: string
  status: 'Verified' | 'Demo'
  isFavorite?: boolean
}

export type Match = {
  id: string
  competition: string
  sport: 'Football' | 'Basketball' | 'Tennis'
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  minute: string
  status: string
}

export type NewsArticle = {
  id: string
  title: string
  category: string
  summary: string
  source: string
  date: string
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'TV', path: '/tv' },
  { label: 'Radio', path: '/radio' },
  { label: 'Sports', path: '/sports' },
  { label: 'Competitions', path: '/competitions' },
  { label: 'News', path: '/news' },
  { label: 'Favorites', path: '/favorites' },
]

export const featuredChannels: Channel[] = [
  {
    id: 'cnn',
    name: 'CNN International',
    country: 'United States',
    language: 'English',
    category: 'News',
    description: 'World news and reporting from global bureaus.',
    status: 'Verified',
    isFavorite: true,
  },
  {
    id: 'beins',
    name: 'beIN Sports',
    country: 'Qatar',
    language: 'English',
    category: 'Sports',
    description: 'Live football, basketball, and international sports coverage.',
    status: 'Demo',
  },
  {
    id: 'france24',
    name: 'France 24',
    country: 'France',
    language: 'French',
    category: 'News',
    description: 'International news, politics, and culture coverage.',
    status: 'Verified',
  },
]

export const featuredStations: Station[] = [
  {
    id: 'bbc-world-service',
    name: 'BBC World Service',
    country: 'United Kingdom',
    language: 'English',
    category: 'News',
    description: 'Global news, analysis, and live reporting.',
    status: 'Verified',
    isFavorite: true,
  },
  {
    id: 'esports-radio',
    name: 'ESPN Radio',
    country: 'United States',
    language: 'English',
    category: 'Sports',
    description: 'Live sports talk, scores, and commentary.',
    status: 'Demo',
  },
  {
    id: 'radio-france-international',
    name: 'Radio France Internationale',
    country: 'France',
    language: 'French',
    category: 'International',
    description: 'World news and cultural programming in multiple languages.',
    status: 'Demo',
  },
]

export const liveMatches: Match[] = [
  {
    id: 'match-1',
    competition: 'UEFA Champions League',
    sport: 'Football',
    homeTeam: 'Real Madrid',
    awayTeam: 'Bayern Munich',
    homeScore: 2,
    awayScore: 1,
    minute: '67\'',
    status: 'Live',
  },
  {
    id: 'match-2',
    competition: 'NBA',
    sport: 'Basketball',
    homeTeam: 'Boston Celtics',
    awayTeam: 'New York Knicks',
    homeScore: 102,
    awayScore: 99,
    minute: '4th Q',
    status: 'Live',
  },
  {
    id: 'match-3',
    competition: 'ATP Masters',
    sport: 'Tennis',
    homeTeam: 'Alcaraz',
    awayTeam: 'Sinner',
    homeScore: 6,
    awayScore: 5,
    minute: 'Set 2',
    status: 'Live',
  },
]

export const upcomingMatches: Match[] = [
  {
    id: 'upcoming-1',
    competition: 'Premier League',
    sport: 'Football',
    homeTeam: 'Arsenal',
    awayTeam: 'Manchester City',
    homeScore: 0,
    awayScore: 0,
    minute: '19:45',
    status: 'Upcoming',
  },
  {
    id: 'upcoming-2',
    competition: 'EuroLeague',
    sport: 'Basketball',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    homeScore: 0,
    awayScore: 0,
    minute: '20:00',
    status: 'Upcoming',
  },
]

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Champions League momentum shifts as defending champions respond late',
    category: 'Football',
    summary: 'A dramatic second-half turnaround has redefined the knockout race this week.',
    source: 'Global Sports Wire',
    date: '2026-10-09',
  },
  {
    id: 'news-2',
    title: 'International basketball finals set after tense semifinal deciders',
    category: 'Basketball',
    summary: 'Both finalists advanced with late-game defense and efficient shooting in the final quarter.',
    source: 'Arena Digest',
    date: '2026-10-08',
  },
  {
    id: 'news-3',
    title: 'Young stars shape the future of world tennis circuit',
    category: 'Tennis',
    summary: 'A wave of rising talent is driving faster rallies and more unpredictable outcomes.',
    source: 'Court Report',
    date: '2026-10-07',
  },
]

export const competitionCards = [
  { name: 'UEFA Champions League', sport: 'Football' },
  { name: 'NBA', sport: 'Basketball' },
  { name: 'ATP Tour', sport: 'Tennis' },
  { name: 'Premier League', sport: 'Football' },
]
