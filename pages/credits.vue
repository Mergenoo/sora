<script setup lang="ts">
import { products } from '~/content/products'
import { kits } from '~/content/kits'
const { t } = useI18n()
const { l } = useCatalog()
useSeo({ titleKey: 'credits' })
const rows = [...products.map((p) => ({ name: p.name, source: p.source })), ...kits.map((k) => ({ name: l(k.name), source: k.source }))]
</script>

<template>
  <div class="wrap section !pt-8">
    <h1 class="!text-[clamp(2rem,1.4rem+2.5vw,3.25rem)]">{{ t('credits.title') }}</h1>
    <p class="mt-2 max-w-2xl text-muted">{{ t('credits.intro') }}</p>
    <div class="mt-8 max-w-3xl overflow-x-auto">
      <table class="w-full text-left text-sm">
        <caption class="sr-only">{{ t('credits.title') }}</caption>
        <thead><tr><th scope="col" class="py-2 pr-4">{{ t('credits.product') }}</th><th scope="col" class="py-2">{{ t('credits.source') }}</th></tr></thead>
        <tbody>
          <tr v-for="r in rows" :key="r.source"><td class="py-2 pr-4 align-top font-semibold">{{ r.name }}</td><td class="py-2 break-all"><a class="link !font-medium" :href="r.source" rel="noopener" target="_blank">{{ r.source }}</a></td></tr>
        </tbody>
      </table>
    </div>
    <section class="mt-10 max-w-3xl"><h2 class="!text-xl">{{ t('credits.photos') }}</h2><p class="mt-2">{{ t('credits.sky') }} <a class="link" href="https://commons.wikimedia.org/wiki/File:Blue_sky_with_wispy_clouds.jpg" rel="noopener" target="_blank">{{ t('credits.skyLink') }}</a></p></section>
    <section class="mt-10 max-w-3xl"><h2 class="!text-xl">{{ t('credits.fonts') }}</h2><p class="mt-2">{{ t('credits.fontsText') }}</p></section>
    <p class="mt-8 max-w-3xl text-sm text-muted">{{ t('credits.name') }}</p>
  </div>
</template>
