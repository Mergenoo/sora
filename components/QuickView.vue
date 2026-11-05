<script setup lang="ts">
import { productBySlug } from '~/content/products'
const props = defineProps<{ slug: string | null }>()
const emit = defineEmits<{ (e: 'close'): void }>()
const { t } = useI18n()
const localePath = useLocalePath()
const dlg = ref<HTMLDialogElement | null>(null)
const product = computed(() => (props.slug ? productBySlug(props.slug) : undefined))

watch(
  () => props.slug,
  async (slug) => {
    await nextTick()
    const d = dlg.value
    if (!d) return
    if (slug && product.value && !d.open) d.showModal()
    if (!slug && d.open) d.close()
  },
  { immediate: true, flush: 'post' }
)
let closed = false
const closeNow = () => {
  if (dlg.value?.open) dlg.value.close()
  if (!closed) { closed = true; emit('close') }
}
watch(() => props.slug, (s) => { if (s) closed = false })
const onBackdrop = (e: MouseEvent) => { if (e.target === dlg.value) closeNow() }
</script>

<template>
  <dialog ref="dlg" class="modal m-auto w-[min(1000px,calc(100vw-16px))] max-h-[calc(100dvh-16px)]" aria-labelledby="qv-title" @cancel.prevent="closeNow" @close="closeNow" @click="onBackdrop">
    <div v-if="product" class="relative p-5 md:p-8">
      <button type="button" class="btn btn-ghost sticky right-0 top-0 float-right !min-h-[44px] !px-3" @click="closeNow">{{ t('common.close') }}</button>
      <ProductDetail :product="product" :level="2" />
      <p class="mt-6"><NuxtLink class="link" :to="localePath(`/products/${product.slug}`)">{{ t('common.viewDetails') }}</NuxtLink></p>
    </div>
  </dialog>
</template>
