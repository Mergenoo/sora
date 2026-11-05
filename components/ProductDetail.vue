<script setup lang="ts">
import type { Product } from '~/content/types'
import { ingredientBySlug } from '~/content/ingredients'
import { kits } from '~/content/kits'
import { products } from '~/content/products'
const props = defineProps<{ product: Product; level?: 1 | 2; priority?: boolean }>()
const { t } = useI18n()
const { l } = useCatalog()
const localePath = useLocalePath()
const cart = useCart()
const current = ref(0)
const added = ref(false)
const Heading = computed(() => (props.level === 2 ? 'h2' : 'h1'))
const hasRetinoid = computed(() => props.product.ingredients.includes('retinal'))
const inKits = computed(() => kits.filter((k) => k.productSlugs.includes(props.product.slug)))
const keyIngredients = computed(() => props.product.ingredients.map((s) => ingredientBySlug(s)).filter((x): x is NonNullable<typeof x> => !!x))
const add = () => {
  cart.add('product', props.product.slug)
  cart.announce.value = `${props.product.name}: ${t('common.added')}`
  added.value = true
  setTimeout(() => (added.value = false), 1800)
}
watch(() => props.product.slug, () => { current.value = 0 })
const img = computed(() => props.product.images[current.value])
const slots = computed(() => (['am', 'pm'] as const).filter((s) => props.product.routine[s]))
</script>

<template>
  <div class="grid gap-8 md:grid-cols-2 md:gap-12">
    <div>
      <div class="overflow-hidden bg-ice">
        <NuxtPicture :key="img.src" :src="img.src" :alt="l(img.alt)" :width="img.width" :height="img.height" sizes="xs:100vw sm:100vw md:560px" :preload="priority" :loading="priority && current === 0 ? 'eager' : 'lazy'" :img-attrs="{ class: 'aspect-square w-full object-cover' }" />
      </div>
      <ul class="mt-3 flex gap-3" :aria-label="t('product.gallery')">
        <li v-for="(im, i) in product.images" :key="im.src">
          <button type="button" class="block overflow-hidden border-2 p-0" :class="i === current ? 'border-accent' : 'border-transparent'" :aria-pressed="i === current" :aria-label="l(im.alt)" @click="current = i">
            <NuxtPicture :src="im.src" alt="" width="72" height="72" sizes="72px" loading="lazy" :img-attrs="{ class: 'h-[72px] w-[72px] object-cover' }" />
          </button>
        </li>
      </ul>
    </div>
    <div class="grid content-start gap-6">
      <div>
        <component :is="Heading" :id="level === 2 ? 'qv-title' : undefined" class="!text-[clamp(1.75rem,1.2rem+2vw,2.5rem)]">{{ product.name }}</component>
        <p class="mt-1 text-lg text-muted">{{ l(product.subtitle) }}</p>
        <p class="mt-4 text-2xl font-extrabold">{{ formatMnt(product.priceMnt) }} <span class="text-base font-medium text-muted">{{ product.size }}</span></p>
      </div>
      <p>{{ l(product.description) }}</p>
      <div class="grid gap-2">
        <button type="button" class="btn btn-primary w-full sm:w-auto" :disabled="product.stock <= 0" @click="add">{{ product.stock <= 0 ? t('common.soldOut') : added ? t('common.added') : t('common.add') }}</button>
      </div>
      <section>
        <h2 class="!text-lg">{{ t('product.howTo') }}</h2>
        <p class="mt-2">{{ l(product.howToUse) }}</p>
      </section>
      <section v-if="keyIngredients.length">
        <h2 class="!text-lg">{{ t('product.keyIngredients') }}</h2>
        <ul class="mt-2 flex flex-wrap gap-2">
          <li v-for="i in keyIngredients" :key="i.slug">
            <NuxtLink :to="localePath({ path: '/shop', query: { ing: i.slug } })" class="chip inline-flex items-center no-underline">{{ l(i.name) }}</NuxtLink>
          </li>
        </ul>
      </section>
      <section>
        <h2 class="!text-lg">{{ t('product.fullList') }}</h2>
        <p v-if="product.inci" class="mt-2 text-sm">{{ product.inci }}</p>
        <p v-else class="mt-2 text-sm">{{ t('product.fullListMissing') }} <a class="link" :href="product.inciSource" rel="noopener" target="_blank">{{ t('common.sourceLink') }}</a></p>
      </section>
      <section>
        <dl class="grid gap-3 text-sm">
          <div>
            <dt class="font-bold">{{ t('product.suitedFor') }}</dt>
            <dd>{{ product.skinTypes.map((s) => t(`shop.skin.${s}`)).join(', ') }}</dd>
          </div>
          <div v-if="product.concerns.length">
            <dt class="font-bold">{{ t('product.concerns') }}</dt>
            <dd>{{ product.concerns.map((s) => t(`shop.concerns.${s}`)).join(', ') }}</dd>
          </div>
        </dl>
      </section>
      <section v-if="slots.length">
        <h2 class="!text-lg">{{ t('product.routineTitle') }}</h2>
        <ul class="mt-2 grid gap-2 text-sm">
          <li v-for="s in slots" :key="s"><strong>{{ t(`routine.${s}`) }}.</strong> {{ l(product.routine[s]!.note) }}</li>
        </ul>
      </section>
      <aside class="card grid gap-3 p-5 text-sm">
        <p><strong>{{ t('product.patchTitle') }}.</strong> {{ t('product.patchText') }}</p>
        <p v-if="hasRetinoid"><strong>{{ t('product.retinoidTitle') }}.</strong> {{ t('product.retinoidText') }}</p>
      </aside>
      <section v-if="inKits.length">
        <h2 class="!text-lg">{{ t('product.inKits') }}</h2>
        <ul class="mt-2 grid gap-1">
          <li v-for="k in inKits" :key="k.slug"><NuxtLink class="link inline-flex min-h-[44px] items-center" :to="localePath(`/kits#${k.slug}`)">{{ l(k.name) }}</NuxtLink></li>
        </ul>
      </section>
      <p class="text-sm text-muted">{{ t('common.sourceLabel') }} <a class="link" :href="product.source" rel="noopener" target="_blank">{{ t('common.sourceLink') }}</a></p>
    </div>
  </div>
</template>
