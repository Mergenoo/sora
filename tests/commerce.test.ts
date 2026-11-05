import { describe, expect, it } from 'vitest'
import { products } from '../content/products'
import { kits } from '../content/kits'
import { routinePanel } from '../content/routines'
import { delivery } from '../content/config'
import { addLine, addRoutine, countItems, isEmpty, maxQty, removeLine, sanitizeCart, setQty } from '../utils/cart'
import { deliveryFee, freeDeliveryProgress, kitSaving, kitSeparatePrice, orderTotal, subtotal } from '../utils/pricing'
import { formatDate, formatMnt, formatTime, isoWeekday } from '../utils/format'
import { normalizePhone } from '../utils/phone'
import { validateOrder } from '../utils/order'
import type { Catalog } from '../utils/pricing'

const catalog: Catalog = { products, kits }
const rules = { freeThresholdMnt: delivery.freeThresholdMnt, feesMnt: { ...delivery.feesMnt } }

describe('cart', () => {
  it('adds, merges the same product and counts items', () => {
    let cart = addLine(catalog, [], 'product', 'dynasty-cream')
    cart = addLine(catalog, cart, 'product', 'dynasty-cream', 2)
    expect(cart).toEqual([{ kind: 'product', slug: 'dynasty-cream', qty: 3 }])
    expect(countItems(cart)).toBe(3)
  })
  it('keeps a product and a kit with the same slug apart', () => {
    let cart = addLine(catalog, [], 'product', 'dynasty-cream')
    cart = addLine(catalog, cart, 'kit', 'evening-trio')
    expect(cart).toHaveLength(2)
  })
  it('changes quantity and removes at zero', () => {
    let cart = addLine(catalog, [], 'product', 'dynasty-cream')
    cart = setQty(catalog, cart, 'product', 'dynasty-cream', 4)
    expect(cart[0].qty).toBe(4)
    cart = setQty(catalog, cart, 'product', 'dynasty-cream', 0)
    expect(isEmpty(cart)).toBe(true)
  })
  it('removes a line', () => {
    const cart = addLine(catalog, [], 'product', 'dynasty-cream')
    expect(removeLine(cart, 'product', 'dynasty-cream')).toEqual([])
  })
  it('handles an empty cart', () => {
    expect(isEmpty([])).toBe(true)
    expect(countItems([])).toBe(0)
    expect(subtotal(catalog, [])).toBe(0)
    expect(deliveryFee('ub', 0, rules)).toBe(0)
  })
  it('respects stock and per-line limits', () => {
    const limited: Catalog = { products: products.map((p) => (p.slug === 'dynasty-cream' ? { ...p, stock: 2 } : p)), kits }
    const cart = addLine(limited, [], 'product', 'dynasty-cream', 5)
    expect(cart[0].qty).toBe(2)
    expect(maxQty(limited, 'product', 'dynasty-cream')).toBe(2)
    const big = addLine(catalog, [], 'product', 'relief-sun-rice-probiotics', 99)
    expect(big[0].qty).toBe(10)
  })
  it('ignores out of stock products', () => {
    const out: Catalog = { products: products.map((p) => (p.slug === 'dynasty-cream' ? { ...p, stock: 0 } : p)), kits }
    expect(addLine(out, [], 'product', 'dynasty-cream')).toEqual([])
  })
  it('limits a kit by its scarcest product', () => {
    const limited: Catalog = { products: products.map((p) => (p.slug === 'dynasty-cream' ? { ...p, stock: 1 } : p)), kits }
    expect(maxQty(limited, 'kit', 'evening-trio')).toBe(1)
  })
  it('adds a morning and an evening routine', () => {
    const am = addRoutine(catalog, [], 'am', routinePanel)
    expect(am.map((l) => l.slug)).toEqual(routinePanel.am)
    const pm = addRoutine(catalog, am, 'pm', routinePanel)
    // shared products merge instead of duplicating
    const cream = pm.find((l) => l.slug === 'dynasty-cream')
    expect(cream?.qty).toBe(2)
    expect(new Set(pm.map((l) => l.slug)).size).toBe(pm.length)
  })
  it('drops unknown or broken lines from saved data', () => {
    const clean = sanitizeCart(catalog, [{ kind: 'product', slug: 'nope', qty: 1 }, { kind: 'product', slug: 'dynasty-cream', qty: 2 }, 'x', null])
    expect(clean).toEqual([{ kind: 'product', slug: 'dynasty-cream', qty: 2 }])
    expect(sanitizeCart(catalog, 'broken')).toEqual([])
  })
})

describe('pricing', () => {
  it('calculates kit saving from the catalog', () => {
    for (const kit of kits) {
      const separate = kitSeparatePrice(catalog, kit)
      expect(separate).toBeGreaterThan(kit.priceMnt)
      expect(kitSaving(catalog, kit)).toBe(separate - kit.priceMnt)
    }
    const duo = kits.find((k) => k.slug === 'glow-boosting-duo')!
    expect(kitSaving(catalog, duo)).toBe(6000)
  })
  it('free delivery at, just below and just above the threshold', () => {
    const t = rules.freeThresholdMnt
    expect(deliveryFee('ub', t - 1, rules)).toBe(rules.feesMnt.ub)
    expect(deliveryFee('ub', t, rules)).toBe(0)
    expect(deliveryFee('ub', t + 1, rules)).toBe(0)
  })
  it('charges by delivery type', () => {
    expect(deliveryFee('ub', 10000, rules)).toBe(6000)
    expect(deliveryFee('countryside', 10000, rules)).toBe(12000)
    expect(deliveryFee('pickup', 10000, rules)).toBe(0)
    expect(deliveryFee('countryside', rules.freeThresholdMnt + 1, rules)).toBe(12000)
  })
  it('reports progress to free delivery', () => {
    const p = freeDeliveryProgress(75000, 150000)
    expect(p).toEqual({ remaining: 75000, ratio: 0.5, reached: false })
    expect(freeDeliveryProgress(150000, 150000).reached).toBe(true)
    expect(freeDeliveryProgress(200000, 150000).ratio).toBe(1)
  })
  it('adds the fee to the total', () => {
    const cart = addLine(catalog, [], 'product', 'dynasty-cream', 2)
    const sub = subtotal(catalog, cart)
    expect(sub).toBe(78000)
    expect(orderTotal(sub, deliveryFee('ub', sub, rules))).toBe(84000)
  })
})

describe('formats', () => {
  it('formats tugrik', () => {
    expect(formatMnt(450000)).toBe('450,000₮')
    expect(formatMnt(0)).toBe('0₮')
    expect(formatMnt(1234567)).toBe('1,234,567₮')
  })
  it('formats dates and time in Ulaanbaatar time', () => {
    const d = new Date('2026-11-04T17:30:00Z') // 01:30 on 5 November in UTC+8
    expect(formatDate(d, 'mn')).toBe('2026.11.05')
    expect(formatTime(d)).toBe('01:30')
    expect(isoWeekday(new Date('2026-11-02T04:00:00Z'))).toBe(1) // a Monday
    expect(isoWeekday(new Date('2026-11-08T04:00:00Z'))).toBe(7) // a Sunday
  })
})

describe('phone', () => {
  it('normalises the accepted formats', () => {
    for (const v of ['99112233', '+976 9911 2233', '976-99112233']) expect(normalizePhone(v)).toBe('+97699112233')
  })
  it('rejects wrong lengths', () => {
    for (const v of ['', '9911223', '991122334', '+976 9911 223', 'abc']) expect(normalizePhone(v)).toBeNull()
  })
})

describe('order validation', () => {
  const base = { name: 'Болд', phone: '99112233', delivery: 'pickup' as const, payment: 'cod' as const, lines: [{ kind: 'product' as const, slug: 'dynasty-cream', qty: 1 }] }
  it('accepts a pickup order without an address', () => expect(validateOrder(base)).toEqual({}))
  it('needs district, khoroo and building for Ulaanbaatar', () => {
    const e = validateOrder({ ...base, delivery: 'ub' })
    expect(Object.keys(e).sort()).toEqual(['building', 'district', 'khoroo'])
    expect(validateOrder({ ...base, delivery: 'ub', district: 'Баянгол', khoroo: '3', building: '12', door: '45' })).toEqual({})
  })
  it('needs a terminal for countryside cargo', () => {
    expect(validateOrder({ ...base, delivery: 'countryside' }).terminal).toBe('errors.terminal')
  })
  it('rejects bad phone and empty cart', () => {
    const e = validateOrder({ ...base, phone: '123', lines: [] })
    expect(e.phone).toBe('errors.phone')
    expect(e.lines).toBe('errors.lines')
  })
})
