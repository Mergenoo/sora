export const TIMEZONE = 'Asia/Ulaanbaatar'

/** 450000 -> "450,000₮" */
export function formatMnt(value: number): string {
  const n = Math.round(value)
  const sign = n < 0 ? '-' : ''
  const digits = String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${sign}${digits}₮`
}

const parts = (date: Date) => {
  const f = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  })
  const out: Record<string, string> = {}
  for (const p of f.formatToParts(date)) out[p.type] = p.value
  return out
}

/** 2026.11.04 in Mongolian, 04 Nov 2026 style is avoided: both locales use the same numeric order for clarity. */
export function formatDate(date: Date, locale: 'mn' | 'en'): string {
  const p = parts(date)
  return locale === 'mn' ? `${p.year}.${p.month}.${p.day}` : `${p.year}-${p.month}-${p.day}`
}

/** 24-hour time in Ulaanbaatar. */
export function formatTime(date: Date): string {
  const p = parts(date)
  return `${p.hour}:${p.minute}`
}

/** Monday is day 1, Sunday is day 7, calculated in Ulaanbaatar time. */
export function isoWeekday(date: Date): number {
  const p = parts(date)
  const d = new Date(Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day)))
  return d.getUTCDay() === 0 ? 7 : d.getUTCDay()
}
