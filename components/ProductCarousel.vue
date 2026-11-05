<script setup lang="ts">
import type { Product } from '~/content/types'
defineProps<{ items: Product[]; title: string; titleId: string }>()
const { t } = useI18n()
const track = ref<HTMLElement | null>(null)
const { atStart, atEnd, sync, go } = useRowScroll(track)
</script>

<template>
  <div>
    <div class="hairline" aria-hidden="true" />
    <div class="mt-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <h2 :id="titleId" class="display-serif min-w-[15rem]">{{ title }}</h2>
      <div class="flex shrink-0 items-center gap-2">
        <button type="button" class="carousel-btn" :disabled="atStart" :aria-label="t('a11y.prevProducts')" @click="go(-1)">
          <svg viewBox="0 0 92 48" width="92" height="48" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="68" cy="24" r="22" /><path d="M2 24h66M2 20v8" /></svg>
        </button>
        <button type="button" class="carousel-btn" :disabled="atEnd" :aria-label="t('a11y.nextProducts')" @click="go(1)">
          <svg viewBox="0 0 92 48" width="92" height="48" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="24" cy="24" r="22" /><path d="M24 24h66M90 20v8" /></svg>
        </button>
      </div>
    </div>
    <div class="mt-6 flex flex-wrap gap-x-6 gap-y-1" role="group" :aria-label="t('a11y.filters')"><slot name="filters" /></div>
    <ul ref="track" class="carousel-track mt-8" role="group" :aria-label="title" tabindex="0" @scroll.passive="sync">
      <li v-for="(p, i) in items" :key="p.slug" class="carousel-item">
        <ProductTile :product="p" :priority="i < 2" />
      </li>
    </ul>
    <div class="mt-12 flex justify-center"><slot name="footer" /></div>
  </div>
</template>
