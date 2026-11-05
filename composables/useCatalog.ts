import { catalog } from '../utils/catalog'
import type { L10n, Locale } from '../content/types'

export function useCatalog() {
  const { locale } = useI18n()
  const l = (v: L10n | undefined): string => (v ? v[locale.value as Locale] : '')
  return { catalog, products: catalog.products, kits: catalog.kits, l }
}
