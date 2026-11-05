<script setup lang="ts">
import { business } from '~/content/config'
import { products } from '~/content/products'
const { t } = useI18n()
const { l } = useCatalog()
const track = ref<HTMLElement | null>(null)
const { atStart, atEnd, sync, go } = useRowScroll(track)
// Demo only: product photos stand in for posts until the shop has real ones.
const shots = products.filter((p) => p.images[1]).slice(0, 8).map((p) => ({ slug: p.slug, img: p.images[1]! }))
</script>

<template>
  <div>
    <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <h2 id="ig-title" class="display-serif min-w-[15rem]">{{ t('instagram.title') }}</h2>
      <div class="flex shrink-0 items-center gap-2">
        <button type="button" class="carousel-btn" :disabled="atStart" :aria-label="t('a11y.prevSlide')" @click="go(-1)">
          <svg viewBox="0 0 92 48" width="92" height="48" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="68" cy="24" r="22" /><path d="M2 24h66M2 20v8" /></svg>
        </button>
        <button type="button" class="carousel-btn" :disabled="atEnd" :aria-label="t('a11y.nextSlide')" @click="go(1)">
          <svg viewBox="0 0 92 48" width="92" height="48" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="24" cy="24" r="22" /><path d="M24 24h66M90 20v8" /></svg>
        </button>
      </div>
    </div>
    <ul ref="track" class="carousel-track mt-8" role="group" :aria-label="t('instagram.title')" tabindex="0" @scroll.passive="sync">
      <li v-for="s in shots" :key="s.slug" class="carousel-item">
        <a :href="business.instagram" rel="noopener" target="_blank" class="block overflow-hidden bg-ice" tabindex="-1" aria-hidden="true">
          <NuxtPicture :src="s.img.src" alt="" :width="s.img.width" :height="s.img.height" sizes="xs:72vw sm:50vw lg:25vw" loading="lazy" :img-attrs="{ class: 'aspect-square w-full object-cover' }" />
        </a>
      </li>
    </ul>
    <div class="mt-10 flex justify-center"><a :href="business.instagram" rel="noopener" target="_blank" class="line-btn no-underline">{{ t('instagram.open') }}</a></div>
    <div class="rule-long mt-16" aria-hidden="true" />
  </div>
</template>
