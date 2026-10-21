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
  status: 'Verified' | 'Demo' | 'Website'
  streamUrl?: string
  officialUrl: string
  listenUrl?: string
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

const verifiedStations: Station[] = [
  {
    id: 'radio-rwanda',
    name: 'Radio Rwanda',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'Amakuru',
    description: 'Radiyo y’Igihugu itangaza amakuru, ibiganiro n’imyidagaduro.',
    status: 'Verified',
    streamUrl: 'https://listen.rba.co.rw:8008/rwanda/',
    officialUrl: 'https://www.rba.co.rw/radio/1/Radio-Rwanda',
  },
  {
    id: 'radio-1',
    name: 'Radio 1',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'Umuziki',
    description: 'Amakuru, ibiganiro n’umuziki byo mu Rwanda.',
    status: 'Website',
    officialUrl: 'https://tv1.rw/',
    listenUrl: 'https://tv1.rw/',
  },
  {
    id: 'magic-fm',
    name: 'Magic FM',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'Umuziki',
    description: 'Imiziki n’ibiganiro bya Magic FM ya RBA.',
    status: 'Verified',
    streamUrl: 'http://listen.rba.co.rw:8080/',
    officialUrl: 'https://www.rba.co.rw/radio/7/Magic-Fm',
  },
  {
    id: 'radio-maria-rwanda',
    name: 'Radio Maria Rwanda',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'Iyobokamana',
    description: 'Radiyo Gatolika itangaza amasengesho n’ibiganiro.',
    status: 'Verified',
    streamUrl: 'http://dreamsiteradiocp.com:8044/stream',
    officialUrl: 'http://www.radiomaria.rw/',
  },
  {
    id: 'radio-10',
    name: 'Radio 10',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'Amakuru',
    description: 'Amakuru, ibiganiro n’imyidagaduro byo mu Rwanda.',
    status: 'Website',
    officialUrl: 'https://radiotv10.rw/',
    listenUrl: 'https://onlineradiobox.com/rw/radio10/',
  },
  {
    id: 'radio-huye',
    name: 'Radio Huye',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'RBA',
    description: 'Radiyo ya RBA ikorera mu karere ka Huye.',
    status: 'Website',
    officialUrl: 'https://www.rba.co.rw/radio/5/Radio-Huye',
  },
  {
    id: 'radio-musanze',
    name: 'Radio Musanze',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'RBA',
    description: 'Radiyo ya RBA ikorera mu karere ka Musanze.',
    status: 'Website',
    officialUrl: 'https://www.rba.co.rw/radio/4/Radio-Musanze',
  },
  {
    id: 'radio-rusizi',
    name: 'Radio Rusizi',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'RBA',
    description: 'Radiyo ya RBA ikorera mu karere ka Rusizi.',
    status: 'Website',
    officialUrl: 'https://www.rba.co.rw/radio/6/Radio-Rusizi',
  },
  {
    id: 'radio-rubavu',
    name: 'Radio Rubavu',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'RBA',
    description: 'Radiyo ya RBA ikorera mu karere ka Rubavu.',
    status: 'Website',
    officialUrl: 'https://www.rba.co.rw/radio/2/Radio-Rubavu',
  },
  {
    id: 'radio-nyagatare',
    name: 'Radio Nyagatare',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'RBA',
    description: 'Radiyo ya RBA ikorera mu karere ka Nyagatare.',
    status: 'Website',
    officialUrl: 'https://www.rba.co.rw/radio/3/Radio-Nyagatare',
  },
  {
    id: 'radio-inteko',
    name: 'Radio Inteko',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'RBA',
    description: 'Radiyo y’Inteko Ishinga Amategeko y’u Rwanda.',
    status: 'Website',
    officialUrl: 'https://www.rba.co.rw/radio/8/Radio-Inteko',
  },
  {
    id: 'isango-star',
    name: 'Isango Star',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'Amakuru',
    description: 'Amakuru, umuco, siporo n’imyidagaduro yo mu Rwanda.',
    status: 'Website',
    officialUrl: 'https://isangostar.rw/',
  },
  {
    id: 'kfm-rwanda',
    name: 'KFM Rwanda',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'Amakuru',
    description: 'Amakuru n’ibiganiro byo mu Rwanda.',
    status: 'Website',
    officialUrl: 'https://kfm.rw/',
  },
  {
    id: 'kiss-fm-rwanda',
    name: 'Kiss FM Rwanda',
    country: 'Rwanda',
    language: 'Kinyarwanda',
    category: 'Umuziki',
    description: 'Umuziki n’imyidagaduro byo mu Rwanda.',
    status: 'Website',
    officialUrl: 'https://kissfm.rw/',
  },
]

const onlineStationDirectory = [
  ['play-power-fm', '104.1 Play Power FM', 'power', 'Umuziki'],
  ['capital-fm', '103.5 Capital FM Kigali', 'capital', 'Umuziki'],
  ['flash-fm', 'Flash FM Rwanda', 'flash', 'Amakuru'],
  ['ijwi-rya-gare', 'Radio Ijwi Rya Gare', 'ijwiryagare', 'Amakuru'],
  ['fine-fm', 'Fine FM', 'fine', 'Amakuru'],
  ['kt-radio', 'KT RADIO', 'kt', 'Amakuru'],
  ['bb-kigali', 'B&B Kigali 89.7 FM', 'bbkigali', 'Siporo'],
  ['royal-fm', '94.3 Royal FM', 'royal', 'Umuziki'],
  ['polo-radio', 'Polo Radio', 'polo', 'Amakuru'],
  ['umwezi-radio', 'Umwezi Radio 95.3 FM', 'umwezi', 'Siporo'],
  ['imbaraga-radio', 'Imbaraga Internet Radio', 'imbaraga', 'Umuziki'],
  ['radio-o', '92.8 Radio O', '928authentic', 'Iyobokamana'],
  ['energy-radio', 'Energy Radio', 'energy', 'Umuziki'],
  ['big-base-radio', 'Big Base Radio', 'bigbase', 'Umuziki'],
  ['nufashwa-yafasha', 'Nufashwa Yafasha Radio', 'nufashwayafasha', 'Umuziki'],
  ['urugero-online', 'Urugero Online Radio', 'sowing', 'Umuziki'],
  ['umucyo-radio', 'Umucyo Radio', 'umucyo', 'Iyobokamana'],
  ['bethel-radio', 'Bethel Radio', 'bethel', 'Iyobokamana'],
  ['radio-8', 'Radio8', 'radio8', 'Umuziki'],
  ['yap-radio', 'Yap Radio', 'yap', 'Umuziki'],
  ['voice-fm', 'Voice FM', 'voice', 'Umuziki'],
  ['biryogo-radio', 'Biryogo Radio', 'biryogo', 'Umuziki'],
  ['ineza-star', 'InezaStar Radio', 'inezastar', 'Amakuru'],
  ['radio-kime', 'Radio KIME Karongi', 'brm', 'Umuziki'],
  ['voice-of-africa', '94.7 Voice of Africa FM', 'voiceofafrica', 'Iyobokamana'],
  ['mixxx-fm', 'Mixxx FM', '1mnmix', 'Umuziki'],
  ['cnm-radio', 'CNM Station', 'cnmstation', 'Iyobokamana'],
  ['online-radio-station', 'Online Radio Station', 'onlinestation', 'Umuziki'],
  ['big-fm-kigali', 'BIG FM Kigali', 'big', 'Umuziki'],
  ['treasure-radio', 'Treasure Radio', 'treasure', 'Imyidagaduro'],
  ['urban-radio', 'Urban Radio', 'urban', 'Imyidagaduro'],
  ['bois-debene', "Bois d'Ebene", 'boisdebene', 'Umuziki'],
  ['kigali-yacu', 'Kigali Yacu', 'kigaliyacu', 'Amakuru'],
  ['btn-radio', 'BTN Radio', 'bigtelevisionnetwork', 'Imyidagaduro'],
  ['tzgospel', 'TZ Gospel Swahili Rwanda', 'tzgospel', 'Iyobokamana'],
  ['royal-fm-kigali', 'Royal FM 94.3 Kigali', 'royal943', 'Umuziki'],
  ['ahupa-visual', 'Ahupa Visual Radio', 'ahupavisual', 'Imyidagaduro'],
  ['kigali-groove', 'Kigali Groove Radio', 'kigaligroove', 'Umuziki'],
  ['spark-radio', 'Spark Radio', 'spark', 'Amakuru'],
  ['living-word-radio', 'Living Word Church Radio', 'livingwordchurch', 'Iyobokamana'],
  ['pulse-radio', 'Pulse Radio', 'pulse', 'Umuziki'],
  ['izuba-radio', 'Izuba Radio', 'izuba', 'Amakuru'],
  ['sana-radio', 'Sana Radio 98.0 FM', 'sana', 'Iyobokamana'],
  ['hero-radio', 'Hero Radio Rwanda', 'herorwanda', 'Iyobokamana'],
  ['ijwi-ry-ubugorozi', 'Ijwi ry’Ubugorozi', 'ijwiryubugorozi', 'Iyobokamana'],
  ['radio-imanzi', 'Radio Imanzi 105.1 FM', 'imanzi', 'Umuziki'],
  ['angels-radio', 'Angels Radio', 'angels', 'Iyobokamana'],
  ['ubuvumbuzi-radio', 'Ubuvumbuzi Radio', 'ubuvumbuzi', 'Amakuru'],
  ['bingwa-radio', 'Bingwa Radio', 'bingwa', 'Amakuru'],
  ['high-line-fm', 'High Line FM', 'highline', 'Umuziki'],
  ['dove-life-radio', 'Dove Life Radio', 'dovelife', 'Iyobokamana'],
  ['afrokast-radio', 'Afrokast Radio', 'afrokast', 'Umuziki'],
  ['ibyiringiro-radio', 'Ibyiringiro Byacu Radio/TV', 'ibyiringirobyacu', 'Iyobokamana'],
  ['m-live-radio', 'M Live Radio', 'mlive', 'Umuziki'],
  ['glorious-newness', 'Glorious Newness Radio', 'gloriousnewness', 'Iyobokamana'],
  ['kasuku-radio', 'Kasuku Radio', 'kasuku', 'Umuziki'],
  ['go24-radio', 'GO24 Radio', 'go24', 'Imyidagaduro'],
  ['eamg-radio', 'EAMG Radio', 'eamg', 'Umuziki'],
  ['farmer-radio', 'Umuhinzi mu Mihigo Farmer Radio', 'umuhinzimumihigofarmer', 'Amakuru'],
  ['sbn-gospel', 'SBN Gospel', 'sbngospel', 'Iyobokamana'],
  ['lrcm-radio', 'LRCM Radio Rwanda', 'lrcm', 'Iyobokamana'],
  ['gendana-radio', "Gendana n'Igihe Radio", 'gendananigihe', 'Amakuru'],
  ['ikosora-radio', 'Ikosora Radio', 'ikosora', 'Amakuru'],
  ['classic-fm', 'Classic FM Kigali', 'classic', 'Umuziki'],
  ['faba-radio', 'FABA', 'safi', 'Umuziki'],
  ['jay-radio', 'JAY Radio', 'smedia', 'Imyidagaduro'],
  ['space-fm', 'SPACE FM', 'key', 'Umuziki'],
  ['radio-ishingiro', 'Radio Ishingiro 107.5 FM', 'ishingiro', 'Amakuru'],
  ['antenna-web-kigali', 'Antenna Web Kigali', 'antennawebkigali', 'Umuziki'],
  ['rpc-radio', 'RPC Online Radio', 'rpconline', 'Iyobokamana'],
  ['radio-afia', 'Radio Afia', 'afia', 'Imyidagaduro'],
  ['eagle-wing-radio', 'Eagle Wing Radio', 'globalvibe', 'Umuziki'],
  ['menyatips-radio', 'MenyaTips Radio', 'menyatips', 'Amakuru'],
  ['dreams-radio', 'Dreams Radio', 'dreams', 'Umuziki'],
  ['ururembo-radio', 'Ururembo Kingdom Radio', 'ururembokingdom', 'Iyobokamana'],
] as const

export const featuredStations: Station[] = [
  ...verifiedStations,
  ...onlineStationDirectory.map(([id, name, slug, category]) => {
    const listenUrl = `https://onlineradiobox.com/rw/${slug}/`
    return {
      id,
      name,
      country: 'Rwanda',
      language: 'Kinyarwanda',
      category,
      description: 'Radiyo yo mu Rwanda. Fungura urupapuro rwayo kugira ngo uyumve online.',
      status: 'Website' as const,
      officialUrl: listenUrl,
      listenUrl,
    }
  }),
]

export const competitionCards = [
  { name: 'UEFA Champions League', sport: 'Football' },
  { name: 'NBA', sport: 'Basketball' },
  { name: 'ATP Tour', sport: 'Tennis' },
  { name: 'Premier League', sport: 'Football' },
]
