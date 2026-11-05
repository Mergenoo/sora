<script setup lang="ts">
import { delivery } from '~/content/config'
import { products } from '~/content/products'
import { kits } from '~/content/kits'
import { ingredients } from '~/content/ingredients'
import type { Category } from '~/content/types'
const { t } = useI18n()
const { l } = useCatalog()
const localePath = useLocalePath()
const cart = useCart()
useSeo({ titleKey: 'home' })

const amount = computed(() => formatMnt(delivery.freeThresholdMnt))
const featured = kits.find((k) => k.slug === 'evening-trio') ?? kits[0]!
const feat = featured.image
const addFeatured = () => { cart.add('kit', featured.slug); cart.announce.value = `${l(featured.name)}: ${t('common.added')}` }

const cat = ref<'all' | Category>('all')
const chips: ('all' | Category)[] = ['all', 'cleanse', 'treat', 'moisturise', 'protect']
const chipLabel = (c: string) => (c === 'all' ? t('shop.all') : t(`shop.cats.${c}`))
const rangeItems = computed(() => products.filter((p) => cat.value === 'all' || p.category === cat.value).slice(0, 8))
const setsProduct = products.find((p) => p.category === 'protect') ?? products[0]
const homeIngs = ingredients.filter((i) => ['niacinamide', 'ginseng', 'centella', 'aha-bha'].includes(i.slug))
// Scroll assist, desktop only: the first wheel tick or key press in the hero makes the page glide on its own
// down to the shop (and back up to the top the other way). Wheel and keys are
// ignored while it glides, so it always finishes. Off for reduced motion, small screens and old browsers.
const sceneOn = () => window.matchMedia('(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)').matches && CSS.supports('animation-timeline: scroll()')
let gliding = false
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const glide = (to: number, ms = 1500) => {
  const from = window.scrollY
  const root = document.documentElement
  // Lock the page while it glides so wheel, trackpad and touch cannot fight it. The gutter keeps the layout from jumping.
  root.style.scrollbarGutter = 'stable'
  root.style.overflow = 'hidden'
  gliding = true
  const t0 = performance.now()
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / ms)
    window.scrollTo(0, from + (to - from) * ease(p))
    if (p < 1) requestAnimationFrame(step)
    else { root.style.overflow = ''; root.style.scrollbarGutter = ''; setTimeout(() => { gliding = false }, 350) }
  }
  requestAnimationFrame(step)
}
const shopTarget = () => { const el = document.getElementById('shop'); return el ? el.getBoundingClientRect().top + window.scrollY - 64 : 0 }
const assist = (dir: 1 | -1): boolean => {
  if (!sceneOn()) return false
  const y = window.scrollY, target = shopTarget()
  if (dir === 1 && y < target - 120) { glide(target); return true }
  if (dir === -1 && y > 0 && y <= target + 60) { glide(0); return true }
  return false
}
// Passive on purpose: a blocking wheel listener makes the browser wait for script on every tick and scrolling lags.
const onWheel = (e: WheelEvent) => {
  if (gliding || Math.abs(e.deltaY) < 8) return
  assist(e.deltaY > 0 ? 1 : -1)
}
const onKey = (e: KeyboardEvent) => {
  const tag = (e.target as HTMLElement | null)?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
  const down = ['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.shiftKey
  const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)
  if (gliding && (down || up)) { e.preventDefault(); return }
  if ((down || up) && assist(down ? 1 : -1)) e.preventDefault()
}
// Scrollbar drag, touch and anything else that moves the page without a wheel event: react to the first
// movement so the page can never rest half way through the hero.
let lastY = 0
const onScroll = () => {
  const y = window.scrollY
  const dy = y - lastY
  lastY = y
  if (gliding || Math.abs(dy) < 1) return
  assist(dy > 0 ? 1 : -1)
}
onMounted(() => {
  lastY = window.scrollY
  window.addEventListener('wheel', onWheel, { passive: true })
  window.addEventListener('keydown', onKey)
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', onScroll)
})

const perks = ['one', 'two', 'three', 'four'] as const
const badges = ['delivery', 'pay', 'pickup'] as const
</script>

<template>
  <div>
    <section class="scene" aria-labelledby="hero-title">
      <div class="scene-pin sky-hero">
        <NuxtPicture src="/images/hero/sky.jpg" alt="" width="2000" height="963" sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw" preload loading="eager" :img-attrs="{ class: 'sky-img', fetchpriority: 'high' }" />
        <div class="sky-shade" aria-hidden="true" />
        <div class="scene-wash" aria-hidden="true" />
        <div class="wrap pt-[104px] md:pt-[120px] lg:pt-0">
          <div class="scene-top">
            <div class="hero-seq grid gap-6">
              <h1 id="hero-title" class="sky-title">{{ t('hero.title') }}</h1>
            </div>
            <div class="hero-seq mt-6 grid justify-items-start gap-5">
              <p class="max-w-[52ch] text-base font-medium md:text-xl">{{ t('hero.sub') }}</p>
              <NuxtLink :to="localePath('/shop')" class="btn btn-primary !bg-[rgb(11_42_85)] !px-8 !text-[rgb(243_248_253)]">{{ t('hero.cta') }}</NuxtLink>
            </div>
          </div>

          <div class="scene-card mt-8 flex justify-center md:mt-10 lg:mt-0">
            <article class="hero-card glass w-full max-w-[520px] overflow-hidden !rounded-b-none border-b-0 px-4 pt-4" :aria-label="t('hero.featured')">
              <div class="card-img overflow-hidden rounded-[28px]">
                <NuxtPicture :src="feat.src" :alt="l(feat.alt)" :width="feat.width" :height="feat.height" sizes="xs:360px sm:480px" loading="eager" :img-attrs="{ class: 'aspect-[16/10] w-full object-cover object-[50%_36%]' }" />
              </div>
              <div class="card-info relative z-10 -mt-14 rounded-[24px] bg-surface/90 p-3 text-center text-ink backdrop-blur">
                <p class="text-[15px] font-semibold">{{ l(featured.name) }}</p>
                <p class="text-[clamp(1.75rem,1.2rem+2vw,2.25rem)] font-extrabold tracking-tight">{{ formatMnt(featured.priceMnt) }}</p>
                <button type="button" class="btn btn-primary mt-2 !min-h-[44px]" @click="addFeatured">{{ t('common.add') }}</button>
              </div>
              <ul class="mt-3 grid grid-cols-3 gap-2 rounded-t-[20px] bg-surface px-3 py-4 text-center text-[13px] font-bold text-ink">
                <li v-for="b in badges" :key="b">{{ t(`hero.badges.${b}`) }}</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>



    <section id="shop" class="bg-surface" aria-labelledby="range-title">
      <div class="wrap py-16 lg:py-24">
        <ProductCarousel :key="cat" :items="rangeItems" :title="t('categories.title')" title-id="range-title">
          <template #filters>
            <button v-for="c in chips" :key="c" type="button" class="tab" :aria-pressed="cat === c" @click="cat = c">{{ chipLabel(c) }}</button>
          </template>
          <template #footer><NuxtLink :to="localePath('/shop')" class="line-btn no-underline">{{ t('hero.cta') }}</NuxtLink></template>
        </ProductCarousel>
      </div>
    </section>
    <section class="wrap pb-4" :aria-label="t('hero.facts.delivery', { amount })">
      <ul class="grid gap-x-8 gap-y-3 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="p in perks" :key="p" class="text-label font-semibold">{{ t(`perks.${p}`) }}</li>
      </ul>
    </section>
    <RoutinePanel />

    <section class="wrap pb-16 lg:pb-24" aria-labelledby="kits-title">
      <div class="grid items-start gap-10 lg:grid-cols-3 lg:gap-12">
        <div class="order-2 lg:order-1 lg:mt-12">
          <FeatureImage v-if="kits[0]" :to="localePath('/kits') + '#' + kits[0].slug" :src="kits[0].image.src" :width="kits[0].image.width" :height="kits[0].image.height" :name="l(kits[0].name)" :price="kits[0].priceMnt" ratio="aspect-[3/4]" />
        </div>
        <div class="order-1 grid content-start justify-items-center gap-10 lg:order-2">
          <div class="grid justify-items-center gap-5 text-center">
            <h2 id="kits-title" class="text-center">{{ t('kitsSection.title') }}</h2>
            <p class="max-w-[34ch] text-lg text-muted">{{ t('kitsSection.intro') }}</p>
            <NuxtLink :to="localePath('/kits')" class="line-btn no-underline">{{ t('kitsSection.all') }}</NuxtLink>
          </div>
          <div class="hidden w-full lg:block lg:mt-6">
            <FeatureImage v-if="kits[1]" :to="localePath('/kits') + '#' + kits[1].slug" :src="kits[1].image.src" :width="kits[1].image.width" :height="kits[1].image.height" :name="l(kits[1].name)" :price="kits[1].priceMnt" />
          </div>
        </div>
        <div class="order-3 lg:mt-52">
          <FeatureImage v-if="setsProduct" :to="localePath(`/products/${setsProduct.slug}`)" :src="setsProduct.images[0].src" :width="setsProduct.images[0].width" :height="setsProduct.images[0].height" :name="setsProduct.name" :price="setsProduct.priceMnt" />
        </div>
        <div class="order-4 lg:hidden">
          <FeatureImage v-if="kits[1]" :to="localePath('/kits') + '#' + kits[1].slug" :src="kits[1].image.src" :width="kits[1].image.width" :height="kits[1].image.height" :name="l(kits[1].name)" :price="kits[1].priceMnt" />
        </div>
      </div>
    </section>

    <section class="wrap pb-16 lg:pb-24" aria-labelledby="ing-title">
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div class="grid content-start justify-items-start gap-5">
          <h2 id="ing-title">{{ t('ingredientsSection.title') }}</h2>
          <p class="max-w-[40ch] text-lg text-muted">{{ t('ingredientsSection.intro') }}</p>
          <NuxtLink :to="localePath('/ingredients')" class="line-btn no-underline">{{ t('ingredientsSection.all') }}</NuxtLink>
        </div>
        <ul class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <li v-for="i in homeIngs" :key="i.slug" class="border-t border-ink/50 pt-5"><p class="font-serif text-2xl font-medium leading-tight">{{ l(i.name) }}</p><p class="mt-2 text-muted">{{ l(i.why) }}</p></li>
        </ul>
      </div>
    </section>

    <section class="wrap pb-16 lg:pb-24" aria-labelledby="faq-title">
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div class="grid content-start justify-items-start gap-5 lg:sticky lg:top-28 lg:self-start">
          <h2 id="faq-title">{{ t('faq.title') }}</h2>
          <p class="max-w-[40ch] text-lg text-muted">{{ t('faq.intro') }}</p>
          <NuxtLink :to="localePath('/faq')" class="line-btn no-underline">{{ t('meta.faq.title') }}</NuxtLink>
        </div>
        <FaqList :count="5" />
      </div>
    </section>

    <section class="wrap pb-16 lg:pb-24" aria-labelledby="ig-title">
      <InstagramStrip />
    </section>

    <section class="wrap pb-16 lg:pb-24" aria-labelledby="closing-title">
      <div class="grid gap-6 bg-panel p-6 text-on-panel sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:p-16">
        <div class="grid gap-3">
          <h2 id="closing-title">{{ t('closing.title') }}</h2>
          <p class="max-w-[52ch] text-lg text-panel-soft">{{ t('closing.text', { amount }) }}</p>
        </div>
        <div class="lg:justify-self-end"><NuxtLink :to="localePath('/') + '#routine'" class="btn btn-light">{{ t('closing.cta') }}</NuxtLink></div>
      </div>
    </section>

    <section class="wrap pb-16 lg:pb-24" aria-labelledby="nl-title">
      <div class="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
        <h2 id="nl-title">{{ t('newsletter.title') }}</h2>
        <NewsletterForm />
      </div>
    </section>
  </div>
</template>
