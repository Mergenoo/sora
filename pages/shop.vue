<script setup lang="ts">
import { products } from '~/content/products'
import { ingredients } from '~/content/ingredients'
import type { Category, Concern, SkinType } from '~/content/types'
const { t, locale } = useI18n()
const { l } = useCatalog()
const route = useRoute()
const router = useRouter()
useSeo({ titleKey: 'shop' })

const mounted = ref(false)
onMounted(() => { mounted.value = true })
const str = (v: unknown) => (typeof v === 'string' ? v : '')
const q = computed(() => (mounted.value ? { cat: str(route.query.cat), skin: str(route.query.skin), concern: str(route.query.concern), ing: str(route.query.ing), sort: str(route.query.sort) || 'featured' } : { cat: '', skin: '', concern: '', ing: '', sort: 'featured' }))
const setQ = (key: string, value: string) => { router.replace({ query: { ...route.query, [key]: value && q.value[key as 'cat'] !== value ? value : undefined } }) }
const clear = () => { const { p } = route.query; router.replace({ query: p ? { p } : {} }) }

const groups = computed(() => [
  { key: 'cat', label: t('shop.category'), options: (['cleanse', 'treat', 'moisturise', 'protect'] as Category[]).map((v) => ({ v, label: t(`shop.cats.${v}`) })) },
  { key: 'skin', label: t('shop.skinType'), options: (['dry', 'normal', 'oily', 'combination', 'sensitive'] as SkinType[]).map((v) => ({ v, label: t(`shop.skin.${v}`) })) },
  { key: 'concern', label: t('shop.concern'), options: (['dryness', 'dullness', 'sensitivity', 'texture', 'sun', 'eyes'] as Concern[]).map((v) => ({ v, label: t(`shop.concerns.${v}`) })) },
  { key: 'ing', label: t('shop.ingredient'), options: ingredients.map((i) => ({ v: i.slug, label: l(i.name) })) }
])

const list = computed(() => {
  const f = q.value
  let out = products.filter((p) => (!f.cat || p.category === f.cat) && (!f.skin || p.skinTypes.includes(f.skin as SkinType)) && (!f.concern || p.concerns.includes(f.concern as Concern)) && (!f.ing || p.ingredients.includes(f.ing)))
  if (f.sort === 'priceAsc') out = [...out].sort((a, b) => a.priceMnt - b.priceMnt)
  else if (f.sort === 'priceDesc') out = [...out].sort((a, b) => b.priceMnt - a.priceMnt)
  else if (f.sort === 'nameAsc') out = [...out].sort((a, b) => a.name.localeCompare(b.name, locale.value === 'mn' ? 'mn' : 'en'))
  return out
})
const activeCount = computed(() => [q.value.cat, q.value.skin, q.value.concern, q.value.ing].filter(Boolean).length)
const countText = computed(() => (list.value.length === 1 ? t('shop.countOne') : t('shop.count', { n: list.value.length })))

const sheet = ref<HTMLDialogElement | null>(null)
const sheetOpener = ref<HTMLElement | null>(null)
const openSheet = (e: Event) => { sheetOpener.value = e.currentTarget as HTMLElement; sheet.value?.showModal() }
const closeSheet = () => { if (sheet.value?.open) sheet.value.close(); sheetOpener.value?.focus() }
</script>

<template>
  <div class="wrap section !pt-8">
    <h1 class="!text-[clamp(2.25rem,1.4rem+3vw,4rem)]">{{ t('shop.title') }}</h1>
    <p class="mt-2 text-muted">{{ t('shop.intro') }}</p>

    <div class="mt-8 grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
      <aside class="card hidden h-fit p-5 lg:sticky lg:top-24 lg:block" :aria-label="t('a11y.filters')">
        <ShopFilters :groups="groups" :q="q" @set="setQ" @clear="clear" />
      </aside>

      <div>
        <div class="card mb-5 flex flex-wrap items-center justify-between gap-3 px-5 py-3">
          <p class="font-bold" role="status" aria-live="polite" aria-atomic="true">{{ countText }}</p>
          <div class="flex flex-wrap items-center gap-3">
            <button type="button" class="btn btn-ghost !min-h-[44px] lg:hidden" @click="openSheet">{{ t('shop.openFilters') }}<span v-if="activeCount" aria-hidden="true"> ({{ activeCount }})</span></button>
            <div class="field !grid-flow-col items-center !gap-2">
              <label for="sort" class="!font-semibold">{{ t('shop.sort') }}</label>
              <select id="sort" class="input !w-auto" :value="q.sort" @change="router.replace({ query: { ...route.query, sort: ($event.target as HTMLSelectElement).value === 'featured' ? undefined : ($event.target as HTMLSelectElement).value } })">
                <option v-for="o in ['featured', 'priceAsc', 'priceDesc', 'nameAsc']" :key="o" :value="o">{{ t(`shop.sortOptions.${o}`) }}</option>
              </select>
            </div>
          </div>
        </div>
        <ProductGrid v-if="list.length" :items="list" :priority-count="2" dense />
        <div v-else class="card grid gap-3 p-6"><p>{{ t('shop.none') }}</p><div><button type="button" class="btn btn-primary" @click="clear">{{ t('common.clear') }}</button></div></div>
      </div>
    </div>

    <dialog ref="sheet" class="sheet m-auto mb-0 w-full max-w-lg" :aria-label="t('a11y.filters')" @cancel.prevent="closeSheet" @close="closeSheet">
      <div class="max-h-[85dvh] overflow-y-auto p-5">
        <div class="mb-4 flex items-center justify-between"><h2 class="!text-xl">{{ t('shop.openFilters') }}</h2><button type="button" class="btn btn-ghost !min-h-[44px] !px-3" @click="closeSheet">{{ t('common.close') }}</button></div>
        <ShopFilters :groups="groups" :q="q" @set="setQ" @clear="clear" />
        <button type="button" class="btn btn-primary mt-6 w-full" @click="closeSheet">{{ t('shop.showResults') }} ({{ list.length }})</button>
      </div>
    </dialog>
  </div>
</template>
