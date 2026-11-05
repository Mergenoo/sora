<script setup lang="ts">
import type { Product } from '~/content/types'
import { ingredientBySlug } from '~/content/ingredients'
const props = defineProps<{ product: Product; priority?: boolean; compact?: boolean }>()
const emit = defineEmits<{ (e: 'quick', slug: string, el: HTMLElement): void }>()
const { t } = useI18n()
const { l } = useCatalog()
const localePath = useLocalePath()
const cart = useCart()
const added = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
const add = () => {
  cart.add('product', props.product.slug)
  cart.announce.value = `${props.product.name}: ${t('common.added')}`
  added.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (added.value = false), 1800)
}
const img = computed(() => props.product.images[0])
const keyIng = computed(() => props.product.ingredients.map((x) => ingredientBySlug(x)).filter(Boolean).map((i) => l(i!.name)).join(', '))
</script>

<template>
  <article class="flex h-full flex-col">
    <NuxtLink :to="localePath(`/products/${product.slug}`)" class="relative block overflow-hidden bg-ice" tabindex="-1" aria-hidden="true">
      <NuxtPicture :src="img.src" alt="" :width="img.width" :height="img.height" sizes="xs:50vw sm:50vw md:33vw lg:25vw" :loading="priority ? 'eager' : 'lazy'" :img-attrs="{ class: 'aspect-square w-full object-cover' }" />
    </NuxtLink>
    <div class="mt-4 flex flex-1 flex-col gap-1">
      <h3 class="line-clamp-3 min-h-[3.9em] sm:line-clamp-2 sm:min-h-[2.6em]"><NuxtLink :to="localePath(`/products/${product.slug}`)" class="no-underline hover:underline">{{ product.name }}</NuxtLink></h3>
      <p class="line-clamp-1 text-meta text-muted">{{ l(product.subtitle) }}</p>
      <p class="line-clamp-2 min-h-[2.8em] text-meta text-muted"><template v-if="keyIng"><strong>{{ t('product.keyIngredients') }}:</strong> {{ keyIng }}</template></p>
      <div class="mt-auto flex items-center justify-between gap-2 pt-3">
        <p class="font-extrabold">{{ formatMnt(product.priceMnt) }} <span class="text-meta font-medium text-muted">{{ product.size }}</span></p>
        <button type="button" class="btn btn-primary !min-h-[44px] !px-5 !text-label" :aria-label="product.stock <= 0 ? t('a11y.soldOutName', { name: product.name }) : added ? t('a11y.addedToBag', { name: product.name }) : t('a11y.addToBag', { name: product.name })" :disabled="product.stock <= 0" @click="add">{{ product.stock <= 0 ? t('common.soldOut') : added ? t('common.added') : t('common.addShort') }}</button>
      </div>
      <button v-if="!compact" type="button" class="link inline-flex min-h-[44px] items-center self-start text-meta" :aria-label="t('a11y.quickView', { name: product.name })" @click="emit('quick', product.slug, $event.currentTarget as HTMLElement)">{{ t('common.quickView') }}</button>
    </div>
  </article>
</template>
