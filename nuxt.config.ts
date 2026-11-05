export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  typescript: { strict: true, typeCheck: false },
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    public: { siteUrl: 'https://sora-skin-demo.vercel.app' }
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'mn',
    langDir: 'locales',
    locales: [
      { code: 'mn', language: 'mn-MN', file: 'mn.json', name: 'МН' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'EN' }
    ],
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://sora-skin-demo.vercel.app',
    detectBrowserLanguage: false
  },
  image: {
    format: ['avif', 'webp'],
    quality: 70,
    screens: { xs: 375, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1440 }
  },
  app: {
    head: {
      meta: [{ name: 'theme-color', content: '#1760C4' }, { name: 'color-scheme', content: 'light' }],
      link: [
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/manrope-latin-wght-normal.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/manrope-cyrillic-wght-normal.woff2', crossorigin: 'anonymous' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
      ]
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ['/dev', '/en/dev'],
      routes: ['/', '/en', '/sitemap.xml', '/robots.txt']
    }
  }
})
