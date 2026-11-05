import type { Ref } from 'vue'

/** Scroll state and prev/next for a horizontal scroll-snap row whose children are the tiles. */
export function useRowScroll(track: Ref<HTMLElement | null>) {
  const atStart = ref(true)
  const atEnd = ref(false)
  const sync = () => {
    const el = track.value
    if (!el) return
    atStart.value = el.scrollLeft <= 2
    atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
  }
  const go = (dir: 1 | -1) => {
    const el = track.value
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = Array.from(el.children) as HTMLElement[]
    const origin = items[0]?.offsetLeft ?? 0
    const want = el.scrollLeft + dir * el.clientWidth * 0.8
    // land exactly on a tile edge so snapping never fights the scroll
    const target = items.reduce((best, it) => (Math.abs(it.offsetLeft - origin - want) < Math.abs(best - want) ? it.offsetLeft - origin : best), 0)
    const clamped = Math.max(0, Math.min(target, el.scrollWidth - el.clientWidth))
    el.scrollTo({ left: clamped === el.scrollLeft ? el.scrollLeft + dir : clamped, behavior: reduce ? 'auto' : 'smooth' })
  }
  onMounted(() => { sync(); window.addEventListener('resize', sync) })
  onBeforeUnmount(() => window.removeEventListener('resize', sync))
  return { atStart, atEnd, sync, go }
}
