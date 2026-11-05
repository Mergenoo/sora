import { catalog } from '../utils/catalog'
import { addLine, addRoutine, countItems, removeLine, sanitizeCart, setQty } from '../utils/cart'
import type { CartLine, LineKind } from '../utils/pricing'
import { subtotal } from '../utils/pricing'
import { routinePanel } from '../content/routines'
import type { Slot } from '../content/types'

const KEY = 'sora-cart-v1'

export function useCart() {
  const lines = useState<CartLine[]>('cart-lines', () => [])
  const ready = useState('cart-ready', () => false)
  const open = useState('cart-open', () => false)
  const announce = useState('cart-announce', () => '')

  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(lines.value)) } catch { /* private mode or blocked storage */ }
  }
  const load = () => {
    try { lines.value = sanitizeCart(catalog, JSON.parse(localStorage.getItem(KEY) || '[]')) } catch { lines.value = [] }
  }
  const commit = (next: CartLine[]) => { lines.value = next; save() }

  // Saved carts are read after hydration (see plugins/cart.client.ts) so server and client markup match.
  if (import.meta.client && !ready.value) {
    ready.value = true
    useNuxtApp().hook('app:mounted', () => {
      load()
      window.addEventListener('storage', (e) => { if (e.key === KEY || e.key === null) load() })
    })
  }

  return {
    lines,
    open,
    announce,
    count: computed(() => countItems(lines.value)),
    subtotal: computed(() => subtotal(catalog, lines.value)),
    add: (kind: LineKind, slug: string, qty = 1) => commit(addLine(catalog, lines.value, kind, slug, qty)),
    setQty: (kind: LineKind, slug: string, qty: number) => commit(setQty(catalog, lines.value, kind, slug, qty)),
    remove: (kind: LineKind, slug: string) => commit(removeLine(lines.value, kind, slug)),
    addRoutine: (slot: Slot) => commit(addRoutine(catalog, lines.value, slot, routinePanel)),
    clear: () => commit([])
  }
}
