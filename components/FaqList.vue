<script setup lang="ts">
import { delivery } from '~/content/config'
const props = defineProps<{ count?: number }>()
const { t } = useI18n()
const vars = computed(() => ({
  amount: formatMnt(delivery.freeThresholdMnt),
  fee: formatMnt(delivery.feesMnt.ub),
  ubMin: delivery.etaDays.ub[0], ubMax: delivery.etaDays.ub[1],
  csMin: delivery.etaDays.countryside[0], csMax: delivery.etaDays.countryside[1],
  puMax: delivery.etaDays.pickup[1]
}))
const items = computed(() => Array.from({ length: props.count ?? 11 }, (_, i) => ({ q: t(`faq.q${i + 1}`), a: t(`faq.a${i + 1}`, vars.value) })))
defineExpose({ items })
</script>

<template>
  <div class="grid gap-3">
    <details v-for="it in items" :key="it.q" class="card group">
      <summary class="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-3 text-lg font-bold [&::-webkit-details-marker]:hidden">
        <span>{{ it.q }}</span>
        <span aria-hidden="true" class="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-4 before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-4 after:w-0.5 after:bg-ink group-open:after:hidden" />
      </summary>
      <p class="px-6 pb-6 text-muted">{{ it.a }}</p>
    </details>
  </div>
</template>
