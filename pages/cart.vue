<script setup lang="ts">
import { delivery } from '~/content/config'
const { t } = useI18n()
const localePath = useLocalePath()
const cart = useCart()
useSeo({ titleKey: 'cart', noindex: true })
const mounted = ref(false)
onMounted(() => { mounted.value = true })
</script>

<template>
  <div class="wrap section !pt-8">
    <h1 class="!text-[clamp(2rem,1.4rem+2.5vw,3.25rem)]">{{ t('cart.title') }}</h1>
    <div v-if="mounted && cart.lines.value.length" class="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
      <CartLines />
      <aside class="card grid content-start gap-4 p-5">
        <FreeDeliveryBar :subtotal="cart.subtotal.value" />
        <p class="flex justify-between text-lg font-bold"><span>{{ t('cart.subtotal') }}</span><span>{{ formatMnt(cart.subtotal.value) }}</span></p>
        <p class="text-sm text-muted">{{ t('cart.deliveryEstimate', { fee: formatMnt(delivery.feesMnt.ub), min: delivery.etaDays.ub[0], max: delivery.etaDays.ub[1] }) }}</p>
        <NuxtLink :to="localePath('/checkout')" class="btn btn-primary">{{ t('cart.checkout') }}</NuxtLink>
        <NuxtLink :to="localePath('/shop')" class="btn btn-ghost">{{ t('cart.continue') }}</NuxtLink>
      </aside>
    </div>
    <div v-else class="mt-8 grid gap-4">
      <p>{{ t('cart.empty') }}</p>
      <div><NuxtLink :to="localePath('/shop')" class="btn btn-primary">{{ t('cart.emptyCta') }}</NuxtLink></div>
    </div>
  </div>
</template>
