<script setup lang="ts">
import { delivery } from '~/content/config'
const props = defineProps<{ subtotal: number }>()
const { t } = useI18n()
const p = computed(() => freeDeliveryProgress(props.subtotal, delivery.freeThresholdMnt))
</script>

<template>
  <div v-if="subtotal > 0" class="grid gap-2">
    <p class="text-sm font-semibold">
      {{ p.reached ? t('cart.progressDone') : t('cart.progress', { amount: formatMnt(p.remaining) }) }}
    </p>
    <progress class="h-2 w-full overflow-hidden [&::-moz-progress-bar]:bg-brand [&::-webkit-progress-bar]:bg-line [&::-webkit-progress-value]:bg-brand" :value="Math.round(p.ratio * 100)" max="100" aria-hidden="true" />
  </div>
</template>
