<script setup lang="ts">
import { business, delivery } from '~/content/config'
const { t } = useI18n()
const localePath = useLocalePath()
const cart = useCart()
const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const isHome = computed(() => getRouteBaseName(route) === 'index')
// Transparent over the sky hero (home, scrolled to the top); solid white everywhere else.
const onSky = computed(() => isHome.value && atTop.value)
const menu = ref(false)
const hidden = ref(false)
const atTop = ref(true)
let lastY = 0
const onScroll = () => {
  const y = window.scrollY
  const dy = y - lastY
  atTop.value = y < 8
  if (y < 8) hidden.value = false
  else if (dy > 6 && y > 140 && !menu.value) hidden.value = true
  else if (dy < -4) hidden.value = false
  lastY = y
}
onMounted(() => { lastY = window.scrollY; onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const toggle = ref<HTMLButtonElement | null>(null)
watch(() => route.fullPath, () => { menu.value = false })
const onEsc = () => { if (menu.value) { menu.value = false; toggle.value?.focus() } }
const links = computed(() => [
  { to: localePath('/shop'), label: t('nav.shop') },
  { to: localePath('/') + '#shop', label: t('nav.categories') },
  { to: localePath('/kits'), label: t('nav.kits') }
])
</script>

<template>
  <p class="bg-panel px-4 py-2 text-center text-sm font-semibold text-on-panel">
    {{ t('promo', { amount: formatMnt(delivery.freeThresholdMnt) }) }}
  </p>
  <header
    class="sticky top-0 z-40 transition-[transform,background-color,box-shadow] duration-300 ease-out motion-reduce:transition-none"
    :class="[hidden ? '-translate-y-full' : 'translate-y-0', isHome ? '-mb-[72px]' : '', onSky ? 'bg-transparent text-[rgb(var(--c-on-sky))]' : 'bg-surface text-ink shadow-[0_2px_14px_rgb(0_0_0/0.09)]']"
    @keydown.esc="onEsc"
    @focusin="hidden = false"
  >
    <div class="wrap flex h-[72px] items-center gap-4">
      <NuxtLink :to="localePath('/')" class="inline-flex min-h-[44px] items-center text-3xl font-extrabold tracking-tight no-underline" :aria-label="t('a11y.home', { name: business.name })">
        {{ business.name.toLowerCase() }}
      </NuxtLink>
      <nav :aria-label="t('a11y.primary')" class="ml-4 hidden flex-1 lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="l in links" :key="l.label">
            <NuxtLink :to="l.to" class="inline-flex min-h-[44px] items-center px-3 text-label font-semibold no-underline hover:underline">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="ml-auto flex items-center gap-2">
        <LangSwitch />
        <NuxtLink
          :to="localePath('/cart')"
          class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 px-1 no-underline hover:opacity-75"
          :aria-label="t('a11y.openBag', { count: cart.count.value })"
          @click.capture.prevent="cart.open.value = true"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
          <span v-if="cart.count.value" class="text-sm font-extrabold" aria-hidden="true">{{ cart.count.value }}</span>
        </NuxtLink>
        <button ref="toggle" type="button" class="inline-flex min-h-[44px] items-center px-2 text-sm font-extrabold underline decoration-2 underline-offset-[6px] lg:hidden" :aria-expanded="menu" aria-controls="mobile-nav" @click="menu = !menu">
          {{ t('a11y.menu') }}
        </button>
      </div>
    </div>
    <nav v-show="menu" id="mobile-nav" :aria-label="t('a11y.primary')" class="mx-4 mb-3 border border-line bg-surface p-2 lg:hidden">
      <ul class="grid">
        <li v-for="l in links" :key="l.label">
          <NuxtLink :to="l.to" class="flex min-h-[48px] items-center px-4 text-base font-semibold no-underline">{{ l.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
