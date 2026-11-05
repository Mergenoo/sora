import { products } from '../../content/products'

const pages = ['', '/shop', '/kits', '/ingredients', '/delivery', '/faq', '/contact', '/credits']

export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  const paths = [...pages, ...products.map((p) => `/products/${p.slug}`)]
  const loc = (p: string, l: 'mn' | 'en') => `${base}${l === 'en' ? '/en' : ''}${p}` || base
  const urls = paths
    .map((p) => {
      const mn = p === '' ? `${base}/` : loc(p, 'mn')
      const en = p === '' ? `${base}/en` : loc(p, 'en')
      return [mn, en].map((u) => `<url><loc>${u}</loc><xhtml:link rel="alternate" hreflang="mn" href="${mn}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/></url>`).join('')
    })
    .join('')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
})
