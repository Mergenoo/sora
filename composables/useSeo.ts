import { business } from '../content/config'

interface SeoOptions { titleKey?: string; title?: string; description?: string; image?: string; type?: 'website' | 'product'; noindex?: boolean }

/** Sets title, description, Open Graph and Twitter tags. Canonical and hreflang come from app.vue. */
export function useSeo(opts: SeoOptions) {
  const { t, locale } = useI18n()
  const config = useRuntimeConfig()
  const route = useRoute()
  const title = computed(() => opts.title ?? t(`meta.${opts.titleKey}.title`))
  const description = computed(() => opts.description ?? t(`meta.${opts.titleKey}.description`))
  const image = computed(() => `${config.public.siteUrl}${opts.image ?? '/og.jpg'}`)
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: opts.noindex ? 'noindex, nofollow' : 'index, follow' },
      { property: 'og:title', content: computed(() => `${title.value} | ${business.name}`) },
      { property: 'og:description', content: description },
      { property: 'og:type', content: opts.type ?? 'website' },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: business.name },
      { property: 'og:locale', content: computed(() => (locale.value === 'mn' ? 'mn_MN' : 'en_US')) },
      { property: 'og:url', content: computed(() => `${config.public.siteUrl}${route.path}`) },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  })
}

/** Adds a JSON-LD script. Pass a plain object or a getter so it follows the language. */
export function useJsonLd(data: () => Record<string, unknown> | Record<string, unknown>[]) {
  useHead({ script: [{ type: 'application/ld+json', innerHTML: computed(() => JSON.stringify(data())) }] })
}
