<script setup lang="ts">
import { routinePanel } from '~/content/routines'
import { productBySlug } from '~/content/products'
import type { Slot } from '~/content/types'
const { t } = useI18n()
const { l } = useCatalog()
const localePath = useLocalePath()
const cart = useCart()
const slot = ref<Slot>('am')
const added = ref(false)
const steps = computed(() =>
  routinePanel[slot.value].map((s, i) => {
    const p = productBySlug(s)!
    return { n: i + 1, p, note: l(p.routine[slot.value]!.note) }
  })
)
const total = computed(() => [...new Set(routinePanel[slot.value])].reduce((sum, s) => sum + (productBySlug(s)?.priceMnt ?? 0), 0))
const choose = (s: Slot) => { slot.value = s; added.value = false }
const addAll = () => {
  cart.addRoutine(slot.value)
  cart.announce.value = t('routine.added')
  added.value = true
}
</script>

<template>
  <section id="routine" class="wrap pb-16 lg:pb-24" aria-labelledby="routine-title">
    <div class="grid gap-10 bg-panel p-6 text-on-panel sm:p-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:p-16">
      <div class="grid content-start gap-5">
        <h2 id="routine-title">{{ t('routine.title') }}</h2>
        <p class="max-w-md text-on-panel/90">{{ t('routine.intro') }}</p>
        <div class="flex gap-2" role="group" :aria-label="t('a11y.routineToggle')">
          <button v-for="s in (['am', 'pm'] as const)" :key="s" type="button" class="min-h-[48px] border-2 border-on-panel px-7 text-base font-bold" :class="slot === s ? 'bg-white text-ink' : 'bg-transparent text-on-panel hover:bg-on-panel/10'" :aria-pressed="slot === s" @click="choose(s)">
            {{ t(`routine.${s}`) }}
          </button>
        </div>
        <p class="text-sm text-on-panel/90">{{ t('routine.tip') }}</p>
      </div>
      <div>
        <ol :key="slot" class="routine-steps grid gap-4">
          <li v-for="s in steps" :key="s.p.slug" class="grid grid-cols-[64px_1fr] gap-4 bg-on-panel/10 p-4 sm:grid-cols-[64px_1fr_auto]">
            <NuxtPicture :src="s.p.images[0].src" alt="" width="64" height="64" sizes="64px" loading="lazy" :img-attrs="{ class: 'h-16 w-16 object-cover' }" />
            <div>
              <p class="text-sm font-semibold text-panel-soft">{{ t('routine.step', { n: s.n }) }}, {{ t(`routine.roles.${s.p.role}`) }}</p>
              <h3 class="!text-base"><NuxtLink :to="localePath(`/products/${s.p.slug}`)" class="inline-flex min-h-[44px] items-center no-underline hover:underline">{{ s.p.name }}</NuxtLink></h3>
              <p class="mt-1 text-sm text-on-panel/90">{{ s.note }}</p>
            </div>
            <p class="col-start-2 font-bold sm:col-start-3">{{ formatMnt(s.p.priceMnt) }}</p>
          </li>
        </ol>
        <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p class="text-lg font-extrabold" aria-live="polite">{{ t('routine.total') }}: {{ formatMnt(total) }}</p>
          <button type="button" class="min-h-[48px] bg-white px-7 font-bold text-ink hover:brightness-95" @click="addAll">{{ added ? t('routine.added') : t('routine.addAll') }}</button>
        </div>
      </div>
    </div>
  </section>
</template>
