<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const items = computed(() => (locales.value as { code: 'mn' | 'en'; name: string }[]).map((l) => ({ ...l, to: switchLocalePath(l.code) })))
</script>

<template>
  <nav :aria-label="t('a11y.language')" class="flex items-center">
    <template v-for="(l, i) in items" :key="l.code">
      <span v-if="i" aria-hidden="true" class="opacity-50">/</span>
      <NuxtLink
        :to="l.to"
        :hreflang="l.code"
        :lang="l.code"
        :aria-current="l.code === locale ? 'true' : undefined"
        class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-2 text-sm no-underline hover:underline hover:underline-offset-4"
        :class="l.code === locale ? 'font-extrabold underline decoration-2 underline-offset-[6px]' : 'font-medium opacity-80 hover:opacity-100'"
      >
        {{ l.name }}
      </NuxtLink>
    </template>
  </nav>
</template>
