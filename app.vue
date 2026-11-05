<script setup lang="ts">
import { business } from '~/content/config'
const { t } = useI18n()
const config = useRuntimeConfig()
const cart = useCart()
const head = useLocaleHead({ addDirAttribute: true, identifierAttribute: 'id', addSeoAttributes: true })
useHead({
  htmlAttrs: computed(() => ({ lang: head.value.htmlAttrs?.lang, dir: head.value.htmlAttrs?.dir })),
  link: computed(() => head.value.link ?? []),
  meta: computed(() => head.value.meta ?? []),
  titleTemplate: (title) => (title ? `${title} | ${business.name}` : business.name)
})
useJsonLd(() => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: business.name,
  legalName: business.legalName,
  url: config.public.siteUrl,
  telephone: business.phone,
  email: business.email,
  sameAs: [business.instagram, business.messenger],
  address: { '@type': 'PostalAddress', streetAddress: business.streetAddress, addressLocality: 'Ulaanbaatar', addressCountry: 'MN' }
}))
</script>

<template>
  <div>
    <a href="#main" class="sr-only-focusable fixed left-2 top-2 z-50 bg-accent px-4 py-3 font-bold text-on-accent no-underline focus:not-sr-only">{{ t('a11y.skip') }}</a>
    <SiteHeader />
    <main id="main" tabindex="-1" class="outline-none">
      <NuxtPage />
    </main>
    <SiteFooter />
    <CartDrawer />
    <p class="sr-only" role="status" aria-live="polite">{{ cart.announce.value }}</p>
  </div>
</template>
