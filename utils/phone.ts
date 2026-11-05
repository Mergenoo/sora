/**
 * Accepts 99112233, +976 9911 2233, 976-99112233, normalises to +97699112233.
 * Returns null when there are not exactly 8 digits after the country code.
 */
export function normalizePhone(input: string): string | null {
  const digits = String(input ?? '').replace(/\D/g, '')
  if (digits.length === 8) return `+976${digits}`
  if (digits.length === 11 && digits.startsWith('976')) return `+${digits}`
  return null
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
