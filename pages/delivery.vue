<script setup lang="ts">
import { delivery } from '~/content/config'
const { t } = useI18n()
useSeo({ titleKey: 'delivery' })
const eta = (k: 'ub' | 'countryside' | 'pickup') => ({ min: delivery.etaDays[k][0], max: delivery.etaDays[k][1], fee: formatMnt(delivery.feesMnt[k]), amount: formatMnt(delivery.freeThresholdMnt) })
</script>

<template>
  <div class="wrap section !pt-8">
    <h1 class="!text-[clamp(2rem,1.4rem+2.5vw,3.25rem)]">{{ t('delivery.title') }}</h1>
    <p class="mt-2 max-w-xl text-muted">{{ t('delivery.intro') }}</p>
    <div class="mt-10 grid max-w-3xl gap-10">
      <section v-for="k in (['ub', 'countryside', 'pickup'] as const)" :key="k"><h2 class="!text-2xl">{{ t(`delivery.${k}.title`) }}</h2><p class="mt-2">{{ t(`delivery.${k}.text`, eta(k)) }}</p></section>
      <section><h2 class="!text-2xl">{{ t('delivery.paymentTitle') }}</h2><p class="mt-2">{{ t('delivery.payment') }}</p></section>
      <section><h2 class="!text-2xl">{{ t('delivery.returnsTitle') }}</h2><p class="mt-2">{{ t('delivery.returns') }}</p></section>
    </div>
  </div>
</template>
