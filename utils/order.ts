import { normalizePhone } from './phone'
import { districts } from '../content/config'
import type { DeliveryType } from './pricing'

export interface OrderInput {
  name: string
  phone: string
  delivery: DeliveryType
  payment: 'cod' | 'transfer'
  district?: string
  khoroo?: string
  building?: string
  door?: string
  notes?: string
  terminal?: string
  /** Honeypot. Real people leave it empty. */
  website?: string
  lines: { kind: 'product' | 'kit'; slug: string; qty: number }[]
}

/** Error keys, translated in the locale files under errors.*. */
export type OrderErrors = Partial<Record<'name' | 'phone' | 'district' | 'khoroo' | 'building' | 'terminal' | 'lines' | 'payment', string>>

export function validateOrder(o: OrderInput): OrderErrors {
  const e: OrderErrors = {}
  if (!o.name || o.name.trim().length < 2) e.name = 'errors.name'
  if (!normalizePhone(o.phone)) e.phone = 'errors.phone'
  if (o.payment !== 'cod' && o.payment !== 'transfer') e.payment = 'errors.payment'
  if (o.delivery === 'ub') {
    if (!o.district || !(districts as readonly string[]).includes(o.district)) e.district = 'errors.district'
    if (!o.khoroo || !/^\d{1,2}$/.test(o.khoroo.trim())) e.khoroo = 'errors.khoroo'
    if (!o.building || o.building.trim().length < 1) e.building = 'errors.building'
  }
  if (o.delivery === 'countryside' && (!o.terminal || o.terminal.trim().length < 2)) e.terminal = 'errors.terminal'
  if (!Array.isArray(o.lines) || o.lines.length === 0) e.lines = 'errors.lines'
  return e
}

export const validateEmail = (v: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v ?? '').trim())
