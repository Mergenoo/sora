import { products } from '../../content/products'
import { kits } from '../../content/kits'
import { delivery, business } from '../../content/config'
import { addLine } from '../../utils/cart'
import { deliveryFee, orderTotal, subtotal, lineTotal } from '../../utils/pricing'
import type { CartLine, DeliveryType } from '../../utils/pricing'
import { normalizePhone } from '../../utils/phone'
import { validateOrder } from '../../utils/order'
import type { OrderInput } from '../../utils/order'
import { formatDate, formatMnt, formatTime } from '../../utils/format'

const catalog = { products, kits }
const clean = (v: unknown, max = 200) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max)

export default defineEventHandler(async (event) => {
  if (!rateLimit(event, 'order', 5)) throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  const body = (await readBody<Record<string, unknown>>(event)) ?? {}

  // Honeypot: bots fill the hidden field. Pretend it worked and send nothing.
  if (clean(body.website)) return { orderNumber: 'S000000-0000', total: 0, fee: 0, createdAt: new Date().toISOString() }

  const input: OrderInput = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 30),
    delivery: (['ub', 'countryside', 'pickup'].includes(String(body.delivery)) ? body.delivery : 'ub') as DeliveryType,
    payment: body.payment === 'transfer' ? 'transfer' : 'cod',
    district: clean(body.district, 40),
    khoroo: clean(body.khoroo, 3),
    building: clean(body.building, 40),
    door: clean(body.door, 40),
    terminal: clean(body.terminal, 120),
    notes: clean(body.notes, 300),
    lines: []
  }

  // Rebuild the cart from the catalog. Prices and stock limits never come from the client.
  let lines: CartLine[] = []
  if (Array.isArray(body.lines)) {
    for (const raw of body.lines.slice(0, 30)) {
      const r = raw as Record<string, unknown>
      if ((r.kind === 'product' || r.kind === 'kit') && typeof r.slug === 'string') lines = addLine(catalog, lines, r.kind, r.slug, Math.floor(Number(r.qty) || 0))
    }
  }
  input.lines = lines

  const errors = validateOrder(input)
  if (Object.keys(errors).length) throw createError({ statusCode: 422, statusMessage: 'Invalid order', data: errors })

  const sub = subtotal(catalog, lines)
  const fee = deliveryFee(input.delivery, sub, { freeThresholdMnt: delivery.freeThresholdMnt, feesMnt: { ...delivery.feesMnt } })
  const total = orderTotal(sub, fee)
  const now = new Date()
  const yy = formatDate(now, 'en').replace(/-/g, '').slice(2)
  const orderNumber = `S${yy}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  const phone = normalizePhone(input.phone)!

  const nameOf = (l: CartLine) => (l.kind === 'kit' ? kits.find((k) => k.slug === l.slug)!.name.mn : products.find((p) => p.slug === l.slug)!.name)
  const deliveryText = input.delivery === 'ub' ? `Улаанбаатар: ${input.district}, ${input.khoroo}-р хороо, байр ${input.building}${input.door ? `, тоот ${input.door}` : ''}` : input.delivery === 'countryside' ? `Орон нутаг, карго: ${input.terminal}` : 'Дэлгүүрээс авна'
  const text = [
    `<b>Шинэ захиалгын хүсэлт ${esc(orderNumber)}</b> (${esc(business.name)} демо)`,
    `${esc(input.name)}, ${esc(phone)}`,
    esc(deliveryText),
    input.notes ? `Тэмдэглэл: ${esc(input.notes)}` : '',
    '',
    ...lines.map((l) => `${esc(nameOf(l))} x ${l.qty} = ${formatMnt(lineTotal(catalog, l))}`),
    '',
    `Дүн ${formatMnt(sub)}, хүргэлт ${formatMnt(fee)}, нийт ${formatMnt(total)}`,
    `Төлбөр: ${input.payment === 'cod' ? 'хүлээн авахдаа' : 'дансаар'}`,
    `${formatDate(now, 'mn')} ${formatTime(now)}`
  ].filter((x) => x !== '').join('\n')
  await notify(text)

  return { orderNumber, total, fee, createdAt: now.toISOString() }
})
