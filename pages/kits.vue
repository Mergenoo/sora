<script setup lang="ts">
import { kits } from '~/content/kits'
const { t } = useI18n()
useSeo({ titleKey: 'kits' })
</script>

<template>
  <div class="wrap section !pt-8">
    <h1 class="!text-[clamp(2rem,1.4rem+2.5vw,3.25rem)]">{{ t('kitsSection.title') }}</h1>
    <p class="mt-2 max-w-xl text-muted">{{ t('kitsSection.intro') }}</p>
    <div class="mt-10 grid gap-5 md:grid-cols-2">
      <KitCard v-for="(k, i) in kits" :key="k.slug" :kit="k" :heading-level="2" :tone="i % 2 ? 'ice' : 'white'" />
    </div>
  </div>
</template>
