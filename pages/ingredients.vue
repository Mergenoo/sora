<script setup lang="ts">
import { ingredients } from '~/content/ingredients'
import { products } from '~/content/products'
const { t } = useI18n()
const { l } = useCatalog()
const localePath = useLocalePath()
useSeo({ titleKey: 'ingredients' })
const rows = computed(() => ingredients.map((i) => ({ i, items: products.filter((p) => p.ingredients.includes(i.slug)) })))
</script>

<template>
  <div class="wrap section !pt-8">
    <h1 class="!text-[clamp(2rem,1.4rem+2.5vw,3.25rem)]">{{ t('ingredientsSection.title') }}</h1>
    <p class="mt-2 max-w-xl text-muted">{{ t('ingredientsSection.intro') }}</p>
    <ul class="mt-10 grid gap-x-12 gap-y-12 md:grid-cols-2">
      <li v-for="r in rows" :id="r.i.slug" :key="r.i.slug" class="scroll-mt-24">
        <h2 class="!text-2xl">{{ l(r.i.name) }}</h2>
        <dl class="mt-3 grid gap-3">
          <div><dt class="font-bold">{{ t('ing.what') }}</dt><dd>{{ l(r.i.what) }}</dd></div>
          <div><dt class="font-bold">{{ t('ing.why') }}</dt><dd>{{ l(r.i.why) }}</dd></div>
          <div><dt class="font-bold">{{ t('ing.care') }}</dt><dd>{{ l(r.i.note) }}</dd></div>
          <div>
            <dt class="font-bold">{{ t('ing.contains') }}</dt>
            <dd>
              <ul v-if="r.items.length" class="mt-1 grid gap-1">
                <li v-for="p in r.items" :key="p.slug"><NuxtLink class="link inline-flex min-h-[44px] items-center" :to="localePath(`/products/${p.slug}`)">{{ p.name }}</NuxtLink></li>
              </ul>
              <span v-else>{{ t('ing.none') }}</span>
            </dd>
          </div>
        </dl>
        <p v-if="r.items.length" class="mt-4"><NuxtLink class="btn btn-ghost" :to="localePath({ path: '/shop', query: { ing: r.i.slug } })">{{ t('ing.shopWith', { name: l(r.i.name) }) }}</NuxtLink></p>
      </li>
    </ul>
    <p class="mt-14 text-sm text-muted">{{ t('ing.disclaimer') }}</p>
  </div>
</template>
