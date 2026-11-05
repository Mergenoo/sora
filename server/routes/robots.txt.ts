export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /checkout\nDisallow: /confirmation\nDisallow: /en/cart\nDisallow: /en/checkout\nDisallow: /en/confirmation\n\nSitemap: ${base}/sitemap.xml\n`
})
