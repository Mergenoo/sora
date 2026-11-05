# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Mongolian-speaking skincare shoppers in Ulaanbaatar, mostly on phones and mobile data, who want K-beauty skincare that suits cold, dry winters and want to be taught a routine before they buy. English (`/en`) is a secondary audience.

A second audience is the shop owner being pitched: the demo has to be convincing to them and cheap to reskin.

## Product Purpose
A bilingual skincare storefront that teaches before it sells and lets a customer order from a phone in under two minutes. Success is a confident first-time buyer who understands their routine and completes a pay-on-delivery order, and, for the pitch, an owner who sees their own shop in it.

Status: private pitch demo and reskinnable template. Prices and stock are made up, no real orders are taken, and it is not to be published as a real shop.

## Positioning
Routine-led selling (morning and evening routine for Mongolian winters, one button adds the whole routine), truly bilingual Mongolian/English, and a local checkout: Ulaanbaatar district and khoroo, pay on delivery, order delivered to the owner in Telegram.

## Operating Context
Nuxt 3 / Vue 3 / TypeScript / Tailwind, with `@nuxtjs/i18n` and `@nuxt/image`. Every page is prerendered in both languages; only forms and orders use server routes. Deployed to Vercel. Orders and newsletter signups go to Telegram when configured, otherwise to the server log.

## Capabilities and Constraints
- Pages: home, shop, product, kits, ingredients, cart, checkout, confirmation, delivery, FAQ, contact, credits.
- All business details live in `content/config.ts`; all UI strings in `i18n/locales/mn.json` and `en.json` (components never hardcode copy). Catalog is typed in `content/*.ts`.
- `check:content` fails the build on missing translations or alt text, bad prices, broken kit references, missing images, duplicate slugs, or en/em dashes in copy.
- Mongolian copy is unreviewed by a native speaker (see `COPY-REVIEW.md`). Cyrillic Ө/ү must render correctly at every weight.
- Currency MNT. Pregnancy and retinoid advice must read as "ask your doctor", never a promise. No medical claims ("эмчлэх").
- Full INCI lists are not copied; products link to their source page.
- Undecided: brand name "Sora" is the owner's choice and unchecked against an AI video product of the same name.

## Brand Commitments
Name "Sora" (owner's choice). Copy style: sentence case, plain verbs, no en or em dashes, one name per action across the flow.

## Evidence on Hand
Product and kit photographs in `public/images/` belong to a third-party brand (see `public/images/CREDITS.md`) and are not licensed for public use. No real testimonials, customers, or benchmarks exist; do not fabricate them. Lighthouse has not been run.

## Product Principles
1. Teach before selling: explain the routine, then make buying it one action.
2. Phone and mobile data first: light pages, short flows, small images.
3. Both languages are first-class; nothing is translated as an afterthought.
4. Honest about skin and health: advice, not promises.
5. Reskinnable in an hour: business specifics stay in config, content and locale files.
