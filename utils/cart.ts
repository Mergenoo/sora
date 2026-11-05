import type { Slot } from '../content/types'
import type { CartLine, Catalog, LineKind } from './pricing'

export const MAX_PER_LINE = 10

/** Highest quantity the shopper can order for a line. Kits are limited by their scarcest product. */
export function maxQty(c: Catalog, kind: LineKind, slug: string, perLineCap = MAX_PER_LINE): number {
  if (kind === 'kit') {
    const kit = c.kits.find((k) => k.slug === slug)
    if (!kit) return 0
    const stocks = kit.productSlugs.map((s) => c.products.find((p) => p.slug === s)?.stock ?? 0)
    return Math.min(perLineCap, ...stocks)
  }
  const p = c.products.find((x) => x.slug === slug)
  return p ? Math.min(perLineCap, p.stock) : 0
}

const same = (l: CartLine, kind: LineKind, slug: string) => l.kind === kind && l.slug === slug

/** Adds a product or kit. The same item merges into one line. Quantity never passes the stock limit. */
export function addLine(c: Catalog, cart: CartLine[], kind: LineKind, slug: string, qty = 1, perLineCap = MAX_PER_LINE): CartLine[] {
  const cap = maxQty(c, kind, slug, perLineCap)
  if (cap <= 0 || qty <= 0) return cart
  const existing = cart.find((l) => same(l, kind, slug))
  if (!existing) return [...cart, { kind, slug, qty: Math.min(qty, cap) }]
  return cart.map((l) => (same(l, kind, slug) ? { ...l, qty: Math.min(l.qty + qty, cap) } : l))
}

/** Sets an exact quantity. A quantity of zero or below removes the line. */
export function setQty(c: Catalog, cart: CartLine[], kind: LineKind, slug: string, qty: number, perLineCap = MAX_PER_LINE): CartLine[] {
  if (qty <= 0) return removeLine(cart, kind, slug)
  const cap = maxQty(c, kind, slug, perLineCap)
  if (cap <= 0) return removeLine(cart, kind, slug)
  return cart.map((l) => (same(l, kind, slug) ? { ...l, qty: Math.min(Math.floor(qty), cap) } : l))
}

export const removeLine = (cart: CartLine[], kind: LineKind, slug: string): CartLine[] => cart.filter((l) => !same(l, kind, slug))

export const countItems = (cart: CartLine[]): number => cart.reduce((n, l) => n + l.qty, 0)

export const isEmpty = (cart: CartLine[]): boolean => cart.length === 0

/** Adds every product of a morning or evening routine, one of each. Products out of stock are skipped. */
export function addRoutine(c: Catalog, cart: CartLine[], slot: Slot, panel: Record<Slot, string[]>): CartLine[] {
  let next = cart
  const seen = new Set<string>()
  for (const slug of panel[slot]) {
    if (seen.has(slug)) continue
    seen.add(slug)
    next = addLine(c, next, 'product', slug, 1)
  }
  return next
}

/** Drops lines that no longer exist in the catalog and clamps quantities. Used after reading localStorage. */
export function sanitizeCart(c: Catalog, raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return []
  let next: CartLine[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const { kind, slug, qty } = item as Record<string, unknown>
    if ((kind !== 'product' && kind !== 'kit') || typeof slug !== 'string' || typeof qty !== 'number') continue
    next = addLine(c, next, kind, slug, Math.floor(qty))
  }
  return next
}
