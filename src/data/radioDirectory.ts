export type RadioCountry = {
  name: string
  stationcount: number
}

export type RadioStation = {
  id: string
  name: string
  country: string
  language: string
  tags: string[]
  codec: string
  bitrate: number
  streamUrl: string
  secureStream: boolean
  homepage: string
  favicon: string
}

type RadioBrowserCountry = RadioCountry

type RadioBrowserStation = {
  stationuuid: string
  name: string
  url?: string
  url_resolved?: string
  homepage?: string
  favicon?: string
  country?: string
  language?: string
  languagecodes?: string
  tags?: string
  codec?: string
  bitrate?: number
  lastcheckok?: number
}

const API_BASE = 'https://de1.api.radio-browser.info/json'

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Radio directory returned ${response.status}`)
  return response.json() as Promise<T>
}

function safeWebUrl(value: string | undefined) {
  if (!value) return ''
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : ''
  } catch {
    return ''
  }
}

export async function fetchRadioCountries(signal?: AbortSignal) {
  const countries = await fetchJson<RadioBrowserCountry[]>(`${API_BASE}/countries`, signal)
  return countries
    .filter((country) => country.name.trim() && country.stationcount > 0)
    .sort((first, second) => first.name.localeCompare(second.name))
}

export async function fetchRadioStations(country: string, signal?: AbortSignal) {
  const params = new URLSearchParams({
    limit: '100',
    hidebroken: 'true',
    order: 'clickcount',
    reverse: 'true',
  })
  const stations = await fetchJson<RadioBrowserStation[]>(
    `${API_BASE}/stations/bycountryexact/${encodeURIComponent(country)}?${params}`,
    signal,
  )

  return stations.flatMap((station): RadioStation[] => {
    const streamUrl = safeWebUrl(station.url_resolved || station.url)
    if (!station.stationuuid || !station.name.trim() || !streamUrl || station.lastcheckok !== 1) return []

    return [{
      id: station.stationuuid,
      name: station.name.trim(),
      country: station.country || country,
      language: station.language?.trim() || station.languagecodes?.trim() || 'Language not listed',
      tags: (station.tags ?? '').split(',').map((tag) => tag.trim()).filter(Boolean),
      codec: station.codec?.trim() || '',
      bitrate: station.bitrate || 0,
      streamUrl,
      secureStream: new URL(streamUrl).protocol === 'https:',
      homepage: safeWebUrl(station.homepage),
      favicon: safeWebUrl(station.favicon),
    }]
  })
}