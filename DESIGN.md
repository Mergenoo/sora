---
name: Sora Skin
description: Bilingual K-beauty storefront in cold winter-sky blue, white, ink and one blue, serif headings, square corners, routine-led and flat.
colors:
  ink: "#11141A"
  brand-blue: "#1760C4"
  sky-tint: "#E0ECFC"
  sky-fill: "#C4DAF8"
  muted-grey: "#5B616B"
  page-white: "#FFFFFF"
  surface-white: "#FFFFFF"
  line-grey: "#E5E7EB"
  well-grey: "#F3F4F6"
  panel-soft: "#C9CDD3"
  on-sky: "#F7F9FC"
  focus-amber: "#C46210"
  ok-green: "#156E3E"
  danger-red: "#AF2424"
typography:
  display:
    fontFamily: "Manrope Variable, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 4vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope Variable, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.1rem + 2.4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope Variable, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Manrope Variable, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.3
  meta:
    fontFamily: "Manrope Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  square: "0px"
  hero-pill: "999px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "32px"
  section-mobile: "64px"
  section-desktop: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.square}"
    padding: "12px 28px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 28px"
    height: "48px"
  button-sky:
    backgroundColor: "{colors.on-sky}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 28px"
    height: "48px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "8px 20px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page-white}"
  input:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "10px 20px"
    height: "48px"
  card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "16px"
---

# Design System: Sora Skin

## Overview

**Creative North Star: "The Winter Sky"**

A bright blue sky photograph opens the page, then everything is white: white pages, near-black ink, one blue. Headings are a refined serif, buttons and cards are square-cornered, and the products speak for themselves in image-led tiles, after the reference in `docs/reference/products-section-nuori.webp`. The page teaches a routine before it asks for a sale, so layouts favour clear steps and generous white space.

The system is flat. Depth comes from a thin grey border or the step from white to Well Grey, never from shadows, with one exception: the white header casts a soft bottom shadow. The only effects are the frosted glass panel on the hero and one orchestrated hero entrance.

Mongolian and English are equal. Manrope covers Cyrillic including Ө and ү, and Cormorant (headings) is loaded with its Cyrillic-extended subset for the same reason.

**Key Characteristics:**
- White surfaces, ink text, one blue (Brand Blue); the hero keeps its own sky tints.
- Serif headings (Cormorant) with a short hairline above; sans (Manrope) for everything else.
- Square corners on buttons, inputs, chips, cards, panels and dialogs; pills only on the hero.
- Phone-first: 44 to 48px touch targets, 16px gutters, light imagery.
- Motion is rare and purposeful, always disabled under reduced-motion.

## Colors

White pages, a near-black ink and exactly one blue. The hero keeps its own sky-blue tints.

### Primary
- **Ink** (#11141A): text only (and outlines). It is no longer used for fills.
- **Sky Fill** (#C4DAF8): the main action color: primary buttons, selected chips and the skip link, always with Ink text.
- **Sky Tint** (#E0ECFC): panels and bands: the promo strip, routine panel, closing band, footer, the header's buttons and language container. Ink text on it is 15:1.
- **Brand Blue** (#1760C4): content links, the selected tab underline, cart count badge, delivery progress and the hero's sky shade. Sky Fill and Sky Tint are tints of this one hue.

### Neutral
- **Page White** (#FFFFFF): page, header, cards, inputs and the products band.
- **Line Grey** (#E5E7EB): hairlines and card borders.
- **Well Grey** (#F3F4F6): image wells and quiet fills.
- **Muted Grey** (#5B616B): secondary text (6.3:1 on white).
- **Muted on tint** (#4F5B72 at 5:1 on Sky Tint): secondary text inside panels and the footer.
- **Sky Paper** (#F7F9FC): text and buttons on the sky photograph.

### Status
- **Focus Amber** (#C46210): the focus ring only.
- **Confirm Green** (#156E3E) and **Alert Red** (#AF2424): success and errors.

### Named Rules
**The One Blue Rule.** Outside the hero there is a single hue, Brand Blue, used at full strength for small accents and as two light tints (Sky Fill, Sky Tint) for fills. No black fills, no navy. Text is Ink.

**The Hero Keeps Its Tints Rule.** The `.scene` block in `assets/css/main.css` restores the original navy and ice-blue tokens for the hero only, so the hero never changes with the site palette.

**The Amber Is Focus Rule.** Amber appears nowhere except `:focus-visible`.

## Typography

**Display, Body and Label Font:** Manrope Variable (self-hosted woff2, weights 200 to 800, with system-ui fallback)

**Character:** One geometric sans, rounded and open, used at confident bold weights for headings and plain regular for reading. Tight negative tracking on large sizes keeps it modern.

### Hierarchy
- **Display** (700, clamp 2rem to 4.25rem, 1.02): page H1. The sky hero title is larger (up to 4.75rem EN) and Mongolian is stepped down (up to 4rem) with a wider measure (22ch) for longer words.
- **Headline** (700, clamp 1.75rem to 3.5rem, 1.05): section H2.
- **Title** (700, 1.125rem, 1.3): card and product names (product cards use 17px).
- **Body** (400, 1rem, 1.55): running text, capped near 68ch in prose blocks.
- **Label** (600, 0.95rem, `text-label`): nav links, perk lines, short card text, button text on product cards; buttons themselves use 1rem and field labels 700.
- **Meta** (400, 0.875rem, `text-meta`): product subtitles, key ingredients, pack size, the quick-view link. Never below 0.875rem except the hero badge line.

### Named Rules
**The Cyrillic First Rule.** Every type decision is checked with Mongolian copy, including Ө and ү, before English.

**The Two Small Sizes Rule.** Small text is `text-label` or `text-meta`. Arbitrary `text-[13px]` style values are drift.

**The Balanced Headings Rule.** Headings use balanced wrapping and body uses pretty wrapping, so lines never end on a lone word.

## Layout

A single centered wrapper, max 1240px, with 16px side gutters on phones and 32px from 768px up. Sections are 64px tall at rest and 96px from 1024px. Product grids are two columns on phones and four on large screens (three in the filtered shop beside its sidebar). The home shop is a horizontal carousel (see Product carousel), not a grid. Perks are a plain hairline-topped row, not cards. Header is a 72px sticky bar that hides on scroll down and returns on scroll up; on the home page it sits transparent over the sky until scrolled.

On large screens with scroll-timeline support, the home hero is a scroll scene: a pale panel grows out from behind the product card and the shop slides up over it. Below 1024px or without support, the hero is an ordinary stacked block. Anything pinned or scroll-driven must degrade to static content.

Phone first: touch targets are at least 44px (48px for primary controls), and pages stay light for mobile data.

## Elevation & Depth

Flat. Cards are white with a 1px Line Grey border; image wells are Well Grey. The header is the one raised surface: solid white with `box-shadow: 0 2px 14px rgb(0 0 0 / .09)`. Dialogs and drawers sit over a dark scrim (62%).

### Named Rules
**The Flat-By-Default Rule.** No box-shadows for elevation except the header's. A new surface is distinguished by border or tone.

**The Glass Is Hero-Only Rule.** Backdrop blur (14px) appears only on the sky hero.

## Shapes

Square. Buttons, inputs, chips, cards, panels, dialogs, product images and the language switch have no corner radius. The hero is the exception and keeps its pills, its 28px image radius and its 40px glass card. Outlined controls use a 1.5px ink line; hairline rules are 1px with a small end tick.

## Components

### Buttons
- **Shape:** square, min height 48px (44px in dense places), padding 12px 28px, 600 weight.
- **Primary:** Sky Fill with Ink text. Hover darkens 5%; press nudges down 1px.
- **Ghost:** transparent with a 1.5px ink outline.
- **Line button (`line-btn`):** a quieter outlined rectangle, 0.875rem bold, for "Add" and "Browse the shop" in the carousel.
- **Light (`btn-light`):** white fill with ink text, for tinted panels.
- **Sky / Sky-ghost:** hero only, on the photograph.
- **Disabled:** 50% opacity, not-allowed cursor.

### Chips and tabs
- **Chips:** square, 44px high, 1.5px ink outline; selected fills Sky Fill.
- **Tabs (carousel):** plain text, 2px underline, Brand Blue when selected.

### Cards / Containers
- **Corner Style:** square. **Background:** white. **Border:** 1px Line Grey. **Shadow:** none.
- **Internal Padding:** 12px on phones, 16px from 640px.

### Inputs / Fields
- **Style:** square, 48px high, white, 1.5px ink border at 40%, 20px side padding.
- **Focus:** the global 3px amber outline with 3px offset.
- **Error:** border turns Alert Red with a short red message beneath.

### Shop filters
The sidebar (and the phone sheet) scrolls on its own when taller than the screen. After the product filters comes an open "Иж бүрдэл" group that links to each kit on the kits page.

### Dropdown (`SelectMenu`)
A custom listbox replaces the browser's native popup for the shop sort. The trigger is an `.input` button with a chevron that flips when open. The menu is a white panel under the same 1.5px grey border as the trigger (ink at 40%, no shadow) aligned to the trigger's right edge. Options are 48px rows; the highlighted row is Sky Tint, the selected one is bold with a check. Keyboard: Up/Down/Home/End move, Enter or Space picks, Esc closes and returns focus, typing jumps to a match, Tab closes. Other forms still use native selects.

### Joined field
The newsletter input and its button share one 52px row and one 3px amber focus ring drawn around both (`joined-field`).

### Navigation
Two links only: Shop and Kits. The shop page also lists the kits below the products (when no filter is active). The header is transparent over the sky hero (home, scrolled to the top) with white text; once the page scrolls, and on every other page, it turns solid white with a soft bottom shadow (`0 2px 14px rgb(0 0 0 / .09)`) and ink text. The wordmark and the two links share one text baseline (the links are nudged up 2.5px to match the Cormorant metrics) and are set in the heading serif (Cormorant, links 20px, wordmark 2.25rem semibold); the controls on the right (language switch, bag count, Menu) stay in Manrope at 14px. Its controls are minimal and borderless: a text language switch ("MH / EN", the current language bold and underlined), a thin shopping-bag icon with the item count beside it as plain bold text (no circle, no badge), and on phones a plain underlined "Menu" word. No pills, fills or circles. It overlaps the top 72px of the hero.

### Section layouts (below the shop)
Taken from `docs/reference/products-section-nuori.webp`; the hero and the shop carousel keep their own layouts.
- **Kits** ("Save on sets", after `docs/reference` image 4): three columns. Left, a tall kit image; centre, a serif heading, one sentence and a `line-btn`, with a second kit image below; right, a product image set lower. Captions give name and price. Phones stack text first, then the images.
- **Instagram strip** (after reference image 3): serif heading with the thin circle arrows, a scroll-snap row of square images, a centred `line-btn` and a long hairline (`rule-long`, with a dot at its left end) sealing the section. The images are second product photos standing in for posts and link to the shop's Instagram profile in `content/config.ts`; replace them with real posts when they exist.
- **Ingredients and FAQ:** heading, sentence and `line-btn` on the left; ingredients as a 2x2 list under hairlines (Cormorant names), the FAQ as an accordion on the right. The FAQ heading is sticky from 1024px.
- **Newsletter:** serif heading left; an email field with an attached ink Subscribe button right (no panel).
- Kit cards with full details remain on the kits page.

### Closing band
A navy `bg-panel` panel (40px radius) near the foot of the home page: heading, one soft-blue sentence, one light pill button that links back to the routine. It repeats the routine and free-delivery message once, with no new claims.

### Editorial language (site-wide)
Pinned by the owner after the products carousel: every page below the hero follows the reference in `docs/reference/products-section-nuori.webp`.
- **Headings:** every h1 and h2 (except the hero title `.sky-title`, small `!text-base/lg/xl` headings and dialog titles) is Cormorant 500 with a short hairline and end tick above it. h3 and body stay Manrope.
- **Corners:** buttons, inputs, chips, cards, panels and dialogs are square. Pills survive only in the hero, the header (`btn-sky`) and the language switch, which sit on the sky photograph.
- **Cards:** a 1px Stone Line border on Cream White, no shadow. Product cards on the shop page are image-first, no badge, no box.
- **Do** keep the hero and header exactly as they were; `.sky-hero .btn, .btn-sky, .btn-sky-ghost` keep their pill radius on purpose.

### Product carousel
Pinned by the owner: follow `docs/reference/products-section-nuori.webp` closely for this section. It is the one place the system departs from its soft pill language, on purpose.
- **Heading:** Cormorant (self-hosted variable, Latin and Cyrillic subsets, weight 500, `display-serif`) at 2.25 to 3.5rem, under a hairline rule with an end tick. It is the only serif on the site; every other role stays Manrope. No small-caps kicker above it.
- **Arrows:** a thin 1.25px circle with a line running out to a tick, left and right, right-aligned beside the heading (`carousel-btn`). They dim at the ends; scrolling lands on tile edges.
- **Tabs:** category names as plain text with a 2px underline on the selected one, not chips.
- **Tiles:** square-cornered 4:5 images in an Stone Line well, no card, no badge, 32px gaps from 1024px. On hover or keyboard focus a navy 80% overlay shows the name (underlined link), price and an outlined Add button. On touch devices the same content sits as a caption below the image instead.
- **Buttons:** `line-btn` is a sharp-cornered 1.5px outlined rectangle, 0.875rem bold. Used for Add and "Browse the shop" in this section only; the rest of the site keeps pills.
- **Surface:** the section sits on Cream White, a full-width band against the Linen Page around it.
- Product cards (`ProductCard`) are still used on the shop page.

### Product card
Image in an Stone Line well with a category pill pinned top-left, a two-line name, subtitle and key ingredients in Slate Muted, then a bold price beside a compact Add pill. Quick view is a text link beneath.

## Do's and Don'ts

### Do:
- **Do** keep pages white and text Ink (#11141A) for AA contrast.
- **Do** use exactly one blue, Brand Blue, outside the hero.
- **Do** keep corners square outside the hero.
- **Do** test layouts with Mongolian strings, including Ө and ү.
- **Do** keep touch targets at 44px or more and the 3px amber focus ring visible everywhere.
- **Do** wrap every animation in `prefers-reduced-motion: no-preference`.

### Don't:
- **Don't** add drop shadows (except the header's), gradient text, or warm or blue-tinted neutrals.
- **Don't** use amber or red for decoration; they are focus and error only.
- **Don't** use backdrop blur outside the sky hero.
- **Don't** use en or em dashes in copy; `check:content` fails the build on them.
- **Don't** hardcode colours in components; use the `--c-*` tokens and Tailwind colour names.
- **Don't** let a palette change reach the hero; its tints live in the `.scene` override.
