<script setup lang="ts">
import type { Product } from '~/content/types'
const props = defineProps<{ product: Product; priority?: boolean }>()
const { t } = useI18n()
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
onBeforeUnmount(() => clearTimeout(timer))
const img = computed(() => props.product.images[0])
const addLabel = computed(() => (props.product.stock <= 0 ? t('a11y.soldOutName', { name: props.product.name }) : added.value ? t('a11y.addedToBag', { name: props.product.name }) : t('a11y.addToBag', { name: props.product.name })))
</script>

<template>
  <article class="tile">
    <NuxtLink :to="localePath(`/products/${product.slug}`)" class="tile-media" tabindex="-1" aria-hidden="true">
      <NuxtPicture :src="img.src" alt="" :width="img.width" :height="img.height" sizes="xs:72vw sm:50vw md:33vw lg:25vw" :loading="priority ? 'eager' : 'lazy'" :img-attrs="{ class: 'aspect-[4/5] w-full object-cover' }" />
    </NuxtLink>
    <div class="tile-body">
      <h3 class="line-clamp-3 !text-base"><NuxtLink :to="localePath(`/products/${product.slug}`)" class="underline underline-offset-4">{{ product.name }}</NuxtLink></h3>
      <p class="font-bold">{{ formatMnt(product.priceMnt) }} <span class="text-meta font-medium opacity-80">{{ product.size }}</span></p>
      <button type="button" class="line-btn" :aria-label="addLabel" :disabled="product.stock <= 0" @click="add">{{ product.stock <= 0 ? t('common.soldOut') : added ? t('common.added') : t('common.addShort') }}</button>
    </div>
  </article>
</template>
