import type { Kit, Product } from '../content/types'

export type DeliveryType = 'ub' | 'countryside' | 'pickup'
export type LineKind = 'product' | 'kit'
export interface CartLine { kind: LineKind; slug: string; qty: number }
export interface Catalog { products: Product[]; kits: Kit[] }
export interface DeliveryRules {
  freeThresholdMnt: number
  feesMnt: Record<DeliveryType, number>
}

export const productPrice = (c: Catalog, slug: string): number => c.products.find((p) => p.slug === slug)?.priceMnt ?? 0

/** Sum of buying every product of a kit on its own. */
export function kitSeparatePrice(c: Catalog, kit: Kit): number {
  return kit.productSlugs.reduce((sum, s) => sum + productPrice(c, s), 0)
}

/** How much a kit saves compared with buying separately. Never negative. */
export function kitSaving(c: Catalog, kit: Kit): number {
  return Math.max(0, kitSeparatePrice(c, kit) - kit.priceMnt)
}

export function unitPrice(c: Catalog, line: Pick<CartLine, 'kind' | 'slug'>): number {
  if (line.kind === 'kit') return c.kits.find((k) => k.slug === line.slug)?.priceMnt ?? 0
  return productPrice(c, line.slug)
}

export const lineTotal = (c: Catalog, line: CartLine): number => unitPrice(c, line) * line.qty

export const subtotal = (c: Catalog, lines: CartLine[]): number => lines.reduce((s, l) => s + lineTotal(c, l), 0)

/** Delivery fee. Only Ulaanbaatar delivery gets the free-delivery threshold. An empty cart has no fee. */
export function deliveryFee(type: DeliveryType, sub: number, rules: DeliveryRules): number {
  if (sub <= 0) return 0
  if (type === 'ub' && sub >= rules.freeThresholdMnt) return 0
  return rules.feesMnt[type]
}

export interface FreeProgress { remaining: number; ratio: number; reached: boolean }

export function freeDeliveryProgress(sub: number, thresholdMnt: number): FreeProgress {
  const reached = sub >= thresholdMnt
  return {
    remaining: Math.max(0, thresholdMnt - sub),
    ratio: Math.min(1, Math.max(0, thresholdMnt === 0 ? 1 : sub / thresholdMnt)),
    reached
  }
}

export const orderTotal = (sub: number, fee: number): number => sub + fee
