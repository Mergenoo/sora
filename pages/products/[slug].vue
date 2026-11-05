<script setup lang="ts">
import { productBySlug, products } from '~/content/products'
import { business } from '~/content/config'
const route = useRoute()
const { t } = useI18n()
const { l } = useCatalog()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const product = productBySlug(String(route.params.slug))
if (!product) throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })

useSeo({ title: product.name, description: l(product.description), image: product.images[0].src, type: 'product' })
const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)
useJsonLd(() => [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: l(product.description),
    image: product.images.map((i) => `${config.public.siteUrl}${i.src}`),
    sku: product.slug,
    brand: { '@type': 'Brand', name: business.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MNT',
      price: product.priceMnt,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${config.public.siteUrl}${localePath(`/products/${product.slug}`)}`
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('common.home'), item: `${config.public.siteUrl}${localePath('/')}` },
      { '@type': 'ListItem', position: 2, name: t('shop.title'), item: `${config.public.siteUrl}${localePath('/shop')}` },
      { '@type': 'ListItem', position: 3, name: product.name }
    ]
  }
])
</script>

<template>
  <div v-if="product" class="wrap section !pt-6">
    <nav :aria-label="t('a11y.breadcrumb')" class="mb-6 text-sm">
      <ol class="flex flex-wrap items-center gap-x-2">
        <li class="flex items-center gap-x-2"><NuxtLink :to="localePath('/')" class="link inline-flex min-h-[44px] items-center !font-medium">{{ t('common.home') }}</NuxtLink><span aria-hidden="true">/</span></li>
        <li class="flex items-center gap-x-2"><NuxtLink :to="localePath('/shop')" class="link inline-flex min-h-[44px] items-center !font-medium">{{ t('shop.title') }}</NuxtLink><span aria-hidden="true">/</span></li>
        <li class="flex min-h-[44px] items-center" aria-current="page">{{ product.name }}</li>
      </ol>
    </nav>
    <ProductDetail :product="product" :level="1" priority />
    <section v-if="related.length" class="mt-20" aria-labelledby="rel-title">
      <h2 id="rel-title" class="mb-6">{{ t('product.related') }}</h2>
      <ProductGrid :items="related" />
    </section>
  </div>
</template>
