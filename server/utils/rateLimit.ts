import type { H3Event } from 'h3'

const hits = new Map<string, number[]>()

/** Simple in-memory limiter: at most `max` requests per `windowMs` per client. Resets when the server restarts. */
export function rateLimit(event: H3Event, key: string, max = 5, windowMs = 60_000): boolean {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const id = `${key}:${ip}`
  const now = Date.now()
  const recent = (hits.get(id) || []).filter((t) => now - t < windowMs)
  if (recent.length >= max) { hits.set(id, recent); return false }
  recent.push(now)
  hits.set(id, recent)
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k)
  return true
}
