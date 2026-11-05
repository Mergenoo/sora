<script setup lang="ts">
import { business } from '~/content/config'
const { t } = useI18n()
const { l } = useCatalog()
useSeo({ titleKey: 'contact' })
const showMap = ref(false)
const { lat, lon } = business.geo
const d = 0.006
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`
useJsonLd(() => ({
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: business.name,
  telephone: business.phone,
  email: business.email,
  address: { '@type': 'PostalAddress', streetAddress: business.streetAddress, addressLocality: 'Ulaanbaatar', addressCountry: 'MN' },
  geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lon },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: business.hours[0].open, closes: business.hours[0].close },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: business.hours[1].open, closes: business.hours[1].close }
  ]
}))
</script>

<template>
  <div class="wrap section !pt-8">
    <h1 class="!text-[clamp(2rem,1.4rem+2.5vw,3.25rem)]">{{ t('contact.title') }}</h1>
    <p class="mt-2 max-w-xl text-muted">{{ t('contact.intro') }}</p>
    <div class="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div class="grid content-start gap-8">
        <div class="flex flex-wrap gap-3">
          <a :href="telHref(business.phone)" class="btn btn-primary">{{ t('contact.call') }} {{ business.phoneDisplay }}</a>
          <a :href="business.messenger" class="btn btn-ghost" rel="noopener" target="_blank">{{ t('contact.message') }}</a>
        </div>
        <dl class="grid gap-5">
          <div><dt class="font-bold">{{ t('contact.address') }}</dt><dd>{{ l(business.address) }}</dd></div>
          <div><dt class="font-bold">{{ t('contact.hours') }}</dt><dd><ul><li v-for="h in business.hours" :key="h.open">{{ l(h.days) }}: {{ h.open }} to {{ h.close }}</li></ul></dd></div>
          <div><dt class="font-bold">{{ t('contact.email') }}</dt><dd><a class="link inline-flex min-h-[44px] items-center" :href="`mailto:${business.email}`">{{ business.email }}</a></dd></div>
        </dl>
      </div>
      <section :aria-label="t('contact.map')" class="card grid min-h-[320px] place-items-center overflow-hidden">
        <iframe v-if="showMap" :src="mapSrc" :title="t('contact.mapTitle')" class="h-[360px] w-full border-0" loading="lazy" referrerpolicy="no-referrer" />
        <div v-else class="grid gap-3 p-6 text-center"><p class="text-muted">{{ t('contact.mapNote') }}</p><div><button type="button" class="btn btn-primary" @click="showMap = true">{{ t('contact.showMap') }}</button></div></div>
      </section>
    </div>
  </div>
</template>
