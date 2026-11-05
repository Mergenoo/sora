<script setup lang="ts">
if (!import.meta.dev) throw createError({ statusCode: 404, fatal: true })
const { t } = useI18n()
useSeo({ titleKey: 'dev', noindex: true })
const weights = [400, 500, 600, 700, 800]
</script>

<template>
  <div class="wrap section">
    <h1>{{ t('dev.fontTitle') }}</h1>
    <p class="mt-2 text-muted">Manrope Variable. Check the glyphs below render in Manrope, not a fallback.</p>
    <ul class="mt-8 grid gap-4">
      <li v-for="w in weights" :key="w" class="text-3xl" :style="{ fontWeight: w }">{{ w }} Өө Үү Нэг хоёр гурав 450,000₮</li>
    </ul>
  </div>
</template>
