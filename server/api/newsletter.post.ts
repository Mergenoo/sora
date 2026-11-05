import { validateEmail } from '../../utils/order'
export default defineEventHandler(async (event) => {
  if (!rateLimit(event, 'newsletter', 4)) throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  const body = (await readBody<Record<string, unknown>>(event)) ?? {}
  if (String(body.website ?? '').trim()) return { ok: true }
  const email = String(body.email ?? '').trim().slice(0, 120)
  if (!validateEmail(email)) throw createError({ statusCode: 422, statusMessage: 'Invalid email' })
  await notify(`Шинэ бүртгэл: ${esc(email)}`)
  return { ok: true }
})
