<script setup lang="ts">
import type { Kit } from '~/content/types'
import { catalog } from '~/utils/catalog'
import { productBySlug } from '~/content/products'
import { kitSaving, kitSeparatePrice } from '~/utils/pricing'
const props = defineProps<{ kit: Kit; headingLevel?: 2 | 3; tone?: 'white' | 'ice' }>()
const { t } = useI18n()
const { l } = useCatalog()
const localePath = useLocalePath()
const cart = useCart()
const added = ref(false)
const items = computed(() => props.kit.productSlugs.map((s) => productBySlug(s)!).filter(Boolean))
const separate = computed(() => kitSeparatePrice(catalog, props.kit))
const saving = computed(() => kitSaving(catalog, props.kit))
const Heading = computed(() => `h${props.headingLevel ?? 3}`)
const add = () => {
  cart.add('kit', props.kit.slug)
  cart.announce.value = `${l(props.kit.name)}: ${t('common.added')}`
  added.value = true
  setTimeout(() => (added.value = false), 1800)
}
</script>

<template>
  <article :id="kit.slug" class="card grid h-full content-start gap-5 p-4 sm:p-6" :class="tone === 'ice' ? '!bg-ice' : ''">
    <NuxtPicture :src="kit.image.src" :alt="l(kit.image.alt)" :width="kit.image.width" :height="kit.image.height" sizes="xs:100vw sm:100vw md:40vw" loading="lazy" :img-attrs="{ class: 'aspect-[4/3] w-full object-cover' }" />
    <div class="grid content-start gap-4 px-1 pb-1">
      <component :is="Heading" class="!text-2xl">{{ l(kit.name) }}</component>
      <p>{{ l(kit.description) }}</p>
      <div>
        <p class="font-bold">{{ t('kit.inside') }}</p>
        <ul class="mt-2 grid gap-2">
          <li v-for="p in items" :key="p.slug" class="flex items-baseline justify-between gap-4 text-sm">
            <NuxtLink :to="localePath(`/products/${p.slug}`)" class="link inline-flex min-h-[44px] items-center !font-semibold">{{ p.name }} <span class="font-normal text-muted">{{ l(p.subtitle) }}</span></NuxtLink>
            <span class="shrink-0">{{ formatMnt(p.priceMnt) }}</span>
          </li>
        </ul>
      </div>
      <dl class="grid gap-1 border-t border-line pt-4">
        <div class="flex justify-between text-sm text-muted"><dt>{{ t('kit.separate') }}</dt><dd class="line-through">{{ formatMnt(separate) }}</dd></div>
        <div class="flex justify-between text-xl font-extrabold"><dt>{{ t('kit.kitPrice') }}</dt><dd>{{ formatMnt(kit.priceMnt) }}</dd></div>
        <div class="flex justify-between font-bold text-ok"><dt class="sr-only">{{ t('kit.saving', { amount: '' }) }}</dt><dd>{{ t('kit.saving', { amount: formatMnt(saving) }) }}</dd></div>
      </dl>
      <button type="button" class="btn btn-primary w-full sm:w-auto" @click="add">{{ added ? t('common.added') : t('kit.addKit') }}</button>
    </div>
  </article>
</template>
