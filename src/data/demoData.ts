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
  streamUrl: string
  officialUrl: string
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
  streamUrl: string
  officialUrl: string
  isFavorite?: boolean
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
    id: 'france24',
    name: 'France 24 English',
    country: 'France',
    language: 'English',
    category: 'News',
    description: 'Official 24/7 international news livestream.',
    status: 'Verified',
    streamUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCQfwfsi5VrQ8yKZ-UWmAEFg',
    officialUrl: 'https://www.france24.com/en/live',
    isFavorite: true,
  },
  {
    id: 'al-jazeera-english',
    name: 'Al Jazeera English',
    country: 'Qatar',
    language: 'English',
    category: 'News',
    description: 'Official live news and current affairs from around the world.',
    status: 'Verified',
    streamUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCNye-wNBqNL5ZzHSJj3l8Bg',
    officialUrl: 'https://www.aljazeera.com/live',
  },
  {
    id: 'france24-francais',
    name: 'France 24 Français',
    country: 'France',
    language: 'French',
    category: 'News',
    description: 'Official 24/7 French-language international news livestream.',
    status: 'Verified',
    streamUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCdTyuXgmJkG_O8dcJQjlnQ',
    officialUrl: 'https://www.france24.com/fr/direct',
  },
]

export const featuredStations: Station[] = [
  {
    id: 'bbc-world-service',
    name: 'BBC World Service',
    country: 'United Kingdom',
    language: 'English',
    category: 'News',
    description: 'BBC World Service live audio stream.',
    status: 'Verified',
    streamUrl: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service',
    officialUrl: 'https://www.bbc.co.uk/sounds/play/live:bbc_world_service',
    isFavorite: true,
  },
  {
    id: 'kexp',
    name: 'KEXP 90.3 FM',
    country: 'United States',
    language: 'English',
    category: 'Music',
    description: 'Independent music radio, broadcasting live from Seattle.',
    status: 'Verified',
    streamUrl: 'https://kexp.streamguys1.com/kexp160.aac',
    officialUrl: 'https://www.kexp.org/listen/',
  },
]

export const competitionCards = [
  { name: 'UEFA Champions League', sport: 'Football' },
  { name: 'NBA', sport: 'Basketball' },
  { name: 'ATP Tour', sport: 'Tennis' },
  { name: 'Premier League', sport: 'Football' },
]
