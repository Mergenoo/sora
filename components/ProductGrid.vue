<script setup lang="ts">
import type { Product } from '~/content/types'
const props = defineProps<{ items: Product[]; priorityCount?: number; dense?: boolean }>()
const route = useRoute()
const router = useRouter()
const openSlug = ref<string | null>(null)
let opener: HTMLElement | null = null

const syncFromUrl = () => { openSlug.value = typeof route.query.p === 'string' ? route.query.p : null }
onMounted(syncFromUrl)
watch(() => route.query.p, syncFromUrl)

const open = (slug: string, el: HTMLElement) => {
  opener = el
  openSlug.value = slug
  router.replace({ query: { ...route.query, p: slug } })
}
const close = () => {
  openSlug.value = null
  const { p: _p, ...rest } = route.query
  router.replace({ query: rest })
  nextTick(() => { opener?.focus(); opener = null })
}
</script>

<template>
  <div>
    <ul :class="props.dense ? 'grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3' : 'grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4'">
      <li v-for="(p, i) in props.items" :key="p.slug">
        <ProductCard :product="p" :priority="i < (priorityCount ?? 0)" @quick="open" />
      </li>
    </ul>
    <QuickView :slug="openSlug" @close="close" />
  </div>
</template>
