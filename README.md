# Sora Skin (demo storefront)

A bilingual (Mongolian default, English at `/en`) skincare store demo built with Nuxt 3, Vue 3, TypeScript, Tailwind CSS, `@nuxtjs/i18n` and `@nuxt/image`. Every page is prerendered in both languages. Only forms and orders use server routes.

It is a demo. No real orders are taken, prices and stock are made up, and the product photos and descriptions belong to the brand named on the credits page (see `public/images/CREDITS.md`). Do not publish this as a real shop.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run test         # Vitest: cart, pricing, formats, phone, order validation
npm run check:content
npm run build        # runs check:content, then builds and prerenders both languages
node .output/server/index.mjs   # serve the production build
```

Pages: `/`, `/shop`, `/products/[slug]`, `/kits`, `/ingredients`, `/cart`, `/checkout`, `/confirmation`, `/delivery`, `/faq`, `/contact`, `/credits`, and the same under `/en`. `/dev/fonts` is a development-only font test page (Ө, ө, Ү, ү at every weight) and returns 404 in production.

## Environment variables

Copy `.env.example` to `.env`.

| Variable | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | When both are set, every order and newsletter signup is sent to Telegram. When not set, the message is printed in the server log and the site still shows the success state. |
| `NUXT_PUBLIC_SITE_URL` | Public URL, used for canonical links, hreflang, the sitemap and Open Graph. |

## Deploy to Vercel

1. Push the folder to a Git repository and import it in Vercel. The Nuxt preset is detected automatically.
2. Add the environment variables above.
3. Deploy. Prerendered pages are served statically, `/api/order` and `/api/newsletter` run as functions.

Images are optimised by `@nuxt/image` (AVIF and WebP). On Vercel the Vercel image provider is used automatically.

## Where things live

- `content/config.ts`: brand name, phone, Messenger, address, hours, delivery fees and the free-delivery threshold, districts. All contact details are here.
- `content/products.ts`, `content/kits.ts`, `content/ingredients.ts`, `content/routines.ts`: typed catalog (see `content/types.ts`).
- `i18n/locales/mn.json`, `en.json`: every UI string. Components never hardcode copy.
- `utils/`: pure commerce logic (`cart.ts`, `pricing.ts`, `phone.ts`, `format.ts`, `order.ts`), covered by tests.
- `public/images/products`, `public/images/kits`: photos, named `<slug>-1.jpg` and `<slug>-2.jpg`. Replace a file with the same name and nothing else needs to change.
- `scripts/check-content.ts`: fails the build on a missing translation or alt text, price of zero or less, a kit that references a missing product, a missing image file, a duplicate slug, a kit priced above buying separately, or an en or em dash in copy.

## Reskin for a new client (under an hour)

1. `content/config.ts`: name, phone, Messenger link, address, hours, delivery fees and threshold.
2. `.env`: Telegram bot token and chat id, site URL.
3. `content/products.ts` and `content/kits.ts`: replace products. Keep one entry per slug, prices in MNT, both languages, alt text for both photos.
4. Drop the client's photos into `public/images/` using the same file names. Update `width` and `height` if they are not square. Update `public/og.jpg` (1200 by 630).
5. `i18n/locales/*.json`: change the hero, perks, FAQ, delivery and returns copy. Keep both files in step. Then run `npm run check:content`.
6. Colours: change the `--c-accent` and `--c-panel` values in `assets/css/main.css` (light and dark). Keep contrast at AA.
7. Rewrite `COPY-REVIEW.md` and ask a native speaker to check the Mongolian.
8. `npm run test && npm run build`, then deploy.

## Notes

- Photographs and product text come from a third party, kept with the owner's agreement for this private demo. Replace them with licensed photos before showing the site publicly. The brief for a client site asks for Unsplash or Wikimedia Commons images with credits.
- Full ingredient lists (INCI) are not copied. Each product links to its source page instead. `check:content` requires either a list or a source link.
- The name "Sora" is the owner's choice and is stored in `content/config.ts`. It is also the name of an AI video product, so check it before real use.
- Lighthouse was not run in the build environment (no Chrome available). Run it on the deployed URL.
