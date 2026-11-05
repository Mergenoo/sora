<script setup lang="ts">
import { delivery } from '~/content/config'
const { t } = useI18n()
const localePath = useLocalePath()
const cart = useCart()
const dlg = ref<HTMLDialogElement | null>(null)
let opener: HTMLElement | null = null

watch(cart.open, (isOpen) => {
  const d = dlg.value
  if (!d) return
  if (isOpen && !d.open) { opener = document.activeElement as HTMLElement | null; d.showModal() }
  if (!isOpen && d.open) d.close()
})
const onClose = () => {
  const was = cart.open.value
  cart.open.value = false
  if (dlg.value?.open) dlg.value.close()
  if (was) { opener?.focus(); opener = null }
}
const onBackdrop = (e: MouseEvent) => { if (e.target === dlg.value) onClose() }
const route = useRoute()
watch(() => route.fullPath, () => { onClose() })
</script>

<template>
  <dialog ref="dlg" class="drawer m-0 ml-auto h-full max-h-none w-full max-w-md" :aria-label="t('a11y.bagDialog')" @cancel.prevent="onClose" @close="onClose" @click="onBackdrop">
    <div class="flex h-full flex-col">
      <div class="flex items-center justify-between border-b border-line px-5 py-3">
        <h2 class="!text-xl">{{ t('cart.title') }}</h2>
        <button type="button" class="btn btn-ghost !min-h-[44px] !px-3" @click="onClose">{{ t('common.close') }}</button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-4">
        <template v-if="cart.lines.value.length">
          <CartLines />
        </template>
        <div v-else class="grid gap-4 py-8">
          <p>{{ t('cart.empty') }}</p>
          <NuxtLink :to="localePath('/shop')" class="btn btn-primary" @click="onClose">{{ t('cart.emptyCta') }}</NuxtLink>
        </div>
      </div>
      <div v-if="cart.lines.value.length" class="grid gap-3 border-t border-line px-5 py-4">
        <FreeDeliveryBar :subtotal="cart.subtotal.value" />
        <p class="flex justify-between text-lg font-bold"><span>{{ t('cart.subtotal') }}</span><span>{{ formatMnt(cart.subtotal.value) }}</span></p>
        <p class="text-sm text-muted">{{ t('cart.deliveryEstimate', { fee: formatMnt(delivery.feesMnt.ub), min: delivery.etaDays.ub[0], max: delivery.etaDays.ub[1] }) }}</p>
        <NuxtLink :to="localePath('/checkout')" class="btn btn-primary">{{ t('cart.checkout') }}</NuxtLink>
        <NuxtLink :to="localePath('/cart')" class="btn btn-ghost">{{ t('cart.viewBag') }}</NuxtLink>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog.drawer { background: rgb(var(--c-bg)); border-left: 1px solid rgb(var(--c-line)); }
</style>
