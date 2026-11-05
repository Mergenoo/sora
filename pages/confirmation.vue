<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
useSeo({ titleKey: 'confirmation', noindex: true })
interface Saved { orderNumber: string; total: number; fee: number; subtotal: number; createdAt: string; phone: string; lines: { name: string; qty: number; total: number }[] }
const order = ref<Saved | null>(null)
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
  try { order.value = JSON.parse(localStorage.getItem('sora-last-order') || 'null') } catch { order.value = null }
})
const when = computed(() => (order.value ? { date: formatDate(new Date(order.value.createdAt), locale.value as 'mn' | 'en'), time: formatTime(new Date(order.value.createdAt)) } : null))
</script>

<template>
  <div class="wrap section !pt-8">
    <div v-if="order" class="grid max-w-2xl gap-6">
      <h1 class="!text-[clamp(2rem,1.4rem+2.5vw,3.25rem)]">{{ t('confirmation.title') }}</h1>
      <p class="text-xl font-extrabold">{{ t('confirmation.number', { number: order.orderNumber }) }}</p>
      <p>{{ t('confirmation.text', { phone: order.phone }) }}</p>
      <p v-if="when" class="text-muted">{{ t('confirmation.when', when) }}</p>
      <section class="card grid gap-3 p-5" aria-labelledby="sum">
        <h2 id="sum" class="!text-xl">{{ t('checkout.summary') }}</h2>
        <ul class="grid gap-2 text-sm"><li v-for="x in order.lines" :key="x.name" class="flex justify-between gap-4"><span>{{ x.name }} x {{ x.qty }}</span><span>{{ formatMnt(x.total) }}</span></li></ul>
        <dl class="grid gap-1 border-t border-line pt-3">
          <div class="flex justify-between"><dt>{{ t('cart.subtotal') }}</dt><dd>{{ formatMnt(order.subtotal) }}</dd></div>
          <div class="flex justify-between"><dt>{{ t('cart.delivery') }}</dt><dd>{{ order.fee === 0 ? t('checkout.free') : formatMnt(order.fee) }}</dd></div>
          <div class="flex justify-between text-xl font-extrabold"><dt>{{ t('checkout.total') }}</dt><dd>{{ formatMnt(order.total) }}</dd></div>
        </dl>
      </section>
      <section aria-labelledby="next">
        <h2 id="next" class="!text-xl">{{ t('confirmation.next') }}</h2>
        <ol class="mt-3 grid list-decimal gap-1 pl-5"><li>{{ t('confirmation.step1') }}</li><li>{{ t('confirmation.step2') }}</li><li>{{ t('confirmation.step3') }}</li></ol>
      </section>
      <div><NuxtLink :to="localePath('/')" class="btn btn-primary">{{ t('confirmation.home') }}</NuxtLink></div>
    </div>
    <div v-else-if="mounted" class="grid gap-4"><h1>{{ t('confirmation.title') }}</h1><p>{{ t('confirmation.none') }}</p><div><NuxtLink :to="localePath('/')" class="btn btn-primary">{{ t('confirmation.home') }}</NuxtLink></div></div>
  </div>
</template>
