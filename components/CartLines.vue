<script setup lang="ts">
import { catalog } from '~/utils/catalog'
import { maxQty } from '~/utils/cart'
import { lineTotal, unitPrice } from '~/utils/pricing'
import type { CartLine } from '~/utils/pricing'
import { features } from '~/content/config'

defineProps<{ compact?: boolean }>()
const { t } = useI18n()
const { l } = useCatalog()
const localePath = useLocalePath()
const cart = useCart()

const rows = computed(() =>
  cart.lines.value.map((line: CartLine) => {
    if (line.kind === 'kit') {
      const k = catalog.kits.find((x) => x.slug === line.slug)!
      return { line, key: `k:${line.slug}`, name: l(k.name), sub: t('cart.kit'), image: k.image, to: localePath(`/kits#${k.slug}`), max: maxQty(catalog, 'kit', k.slug, features.maxPerLine), unit: unitPrice(catalog, line), total: lineTotal(catalog, line) }
    }
    const p = catalog.products.find((x) => x.slug === line.slug)!
    return { line, key: `p:${line.slug}`, name: p.name, sub: l(p.subtitle), image: p.images[0], to: localePath(`/products/${p.slug}`), max: maxQty(catalog, 'product', p.slug, features.maxPerLine), unit: unitPrice(catalog, line), total: lineTotal(catalog, line) }
  })
)
</script>

<template>
  <ul class="grid gap-4">
    <li v-for="r in rows" :key="r.key" class="grid grid-cols-[72px_1fr] gap-4 border-b border-line pb-4 last:border-b-0">
      <NuxtLink :to="r.to" tabindex="-1" aria-hidden="true">
        <NuxtPicture :src="r.image.src" alt="" :width="r.image.width" :height="r.image.height" sizes="72px" loading="lazy" :img-attrs="{ class: 'h-[72px] w-[72px] object-cover' }" />
    </NuxtLink>
      <div class="min-w-0">
        <NuxtLink :to="r.to" class="block font-bold leading-snug no-underline hover:underline">{{ r.name }}</NuxtLink>
        <p class="text-sm text-muted">{{ r.sub }}</p>
        <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div class="flex items-center border border-ink/40" role="group" :aria-label="t('a11y.quantity', { name: r.name })">
            <button type="button" class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-lg font-bold" :aria-label="t('a11y.decrease', { name: r.name })" @click="cart.setQty(r.line.kind, r.line.slug, r.line.qty - 1)">-</button>
            <span class="min-w-[2ch] text-center font-bold" aria-live="polite">{{ r.line.qty }}</span>
            <button type="button" class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-lg font-bold disabled:opacity-40" :disabled="r.line.qty >= r.max" :aria-label="t('a11y.increase', { name: r.name })" @click="cart.setQty(r.line.kind, r.line.slug, r.line.qty + 1)">+</button>
          </div>
          <span class="font-bold">{{ formatMnt(r.total) }}</span>
          <button type="button" class="link inline-flex min-h-[44px] items-center text-sm" :aria-label="t('a11y.remove', { name: r.name })" @click="cart.remove(r.line.kind, r.line.slug)">{{ t('cart.remove') }}</button>
        </div>
        <p v-if="r.line.qty >= r.max" class="text-sm text-muted">{{ t('product.stockLimit') }}</p>
      </div>
    </li>
  </ul>
</template>
