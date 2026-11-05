<script setup lang="ts">
import { delivery } from '~/content/config'
const { t } = useI18n()
useSeo({ titleKey: 'faq' })
const vars = { amount: formatMnt(delivery.freeThresholdMnt), fee: formatMnt(delivery.feesMnt.ub), ubMin: delivery.etaDays.ub[0], ubMax: delivery.etaDays.ub[1], csMin: delivery.etaDays.countryside[0], csMax: delivery.etaDays.countryside[1], puMax: delivery.etaDays.pickup[1] }
useJsonLd(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: Array.from({ length: 11 }, (_, i) => ({ '@type': 'Question', name: t(`faq.q${i + 1}`), acceptedAnswer: { '@type': 'Answer', text: t(`faq.a${i + 1}`, vars) } }))
}))
</script>

<template>
  <div class="wrap section !pt-8">
    <h1 class="!text-[clamp(2rem,1.4rem+2.5vw,3.25rem)]">{{ t('faq.title') }}</h1>
    <p class="mt-2 text-muted">{{ t('faq.intro') }}</p>
    <div class="mt-8 max-w-3xl"><FaqList :count="11" /></div>
  </div>
</template>
