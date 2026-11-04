export type TvCountry = {
  code: string
  name: string
  flag: string
}

export type TvChannel = {
  id: string
  name: string
  countryName: string
  languages: string[]
  categories: string[]
  logo: string
  website: string
  streamUrls: string[]
  quality: string
}

type ApiCountry = TvCountry

type ApiChannel = {
  id: string
  name: string
  country: string
  languages?: string[]
  categories?: string[]
  is_nsfw?: boolean
  closed?: string | null
  website?: string | null
}

type ApiStream = {
  channel: string
  url: string
  quality?: string | null
  labels?: string[]
}

type ApiLogo = {
  channel: string
  in_use?: boolean
  url: string
}

type TvDirectory = {
  countries: TvCountry[]
  channelsByCountry: Record<string, TvChannel[]>
}

const API_BASE = 'https://iptv-org.github.io/api'

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`TV directory returned ${response.status}`)
  return response.json() as Promise<T>
}

function safeStreamUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : ''
  } catch {
    return ''
  }
}

function safeWebsiteUrl(value: string | null | undefined) {
  if (!value) return ''
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''
  } catch {
    return ''
  }
}

export async function fetchTvDirectory(signal?: AbortSignal): Promise<TvDirectory> {
  const [countries, apiChannels, apiStreams, apiLogos] = await Promise.all([
    fetchJson<ApiCountry[]>(`${API_BASE}/countries.json`, signal),
    fetchJson<ApiChannel[]>(`${API_BASE}/channels.json`, signal),
    fetchJson<ApiStream[]>(`${API_BASE}/streams.json`, signal),
    fetchJson<ApiLogo[]>(`${API_BASE}/logos.json`, signal),
  ])

  const countryNames = new Map(countries.map((country) => [country.code, country.name]))
  const preferredLogos = new Map<string, string>()
  for (const logo of apiLogos) {
    if (logo.in_use && !preferredLogos.has(logo.channel)) preferredLogos.set(logo.channel, logo.url)
  }

  const channelsById = new Map(
    apiChannels
      .filter((channel) => !channel.is_nsfw && !channel.closed && countryNames.has(channel.country))
      .map((channel) => [channel.id, channel]),
  )
  const streamsByChannel = new Map<string, Array<{ stream: ApiStream; url: string }>>()

  for (const stream of apiStreams) {
    if (!channelsById.has(stream.channel)) continue
    const url = safeStreamUrl(stream.url)
    if (!url || !url.toLowerCase().includes('.m3u8')) continue
    if (window.location.protocol === 'https:' && new URL(url).protocol !== 'https:') continue

    const channelStreams = streamsByChannel.get(stream.channel) ?? []
    if (!channelStreams.some((item) => item.url === url)) channelStreams.push({ stream, url })
    streamsByChannel.set(stream.channel, channelStreams)
  }

  const channelsByCountry: Record<string, TvChannel[]> = {}

  for (const channelStreams of streamsByChannel.values()) {
    channelStreams.sort((first, second) => Number(new URL(second.url).protocol === 'https:') - Number(new URL(first.url).protocol === 'https:'))
    const { stream } = channelStreams[0]
    const channel = channelsById.get(stream.channel)
    if (!channel) continue
    const countryChannels = channelsByCountry[channel.country] ??= []

    countryChannels.push({
      id: channel.id,
      name: channel.name,
      countryName: countryNames.get(channel.country) ?? channel.country,
      languages: channel.languages ?? [],
      categories: channel.categories ?? [],
      logo: preferredLogos.get(channel.id) ?? '',
      website: safeWebsiteUrl(channel.website),
      streamUrls: channelStreams.map((item) => item.url),
      quality: stream.quality ?? stream.labels?.[0] ?? 'HLS live stream',
    })
  }

  for (const channelList of Object.values(channelsByCountry)) {
    channelList.sort((first, second) => first.name.localeCompare(second.name))
  }

  return {
    countries: countries.sort((first, second) => first.name.localeCompare(second.name)),
    channelsByCountry,
  }
}