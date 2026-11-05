---
target: homepage
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/mergen/Desktop/sora-skin-nuxt/pages/index.vue"
target_fingerprint: "sha256:1b3d34575da11d672c16d7c5f0c8098a3f3915a6dd68193c0138985b70cca64a"
target_path: /Users/mergen/Desktop/sora-skin-nuxt/pages/index.vue
timestamp: 2026-11-05T00-28-33Z
slug: pages-index-vue
---
Method: dual-agent. Assessment A ran from source only (no browser tool); B ran the detector (source scan 0 findings; rendered URL scan 1 low-contrast warning, 3.8:1, #f7f9fc on #4580d0).

# Critique: homepage (pages/index.vue)

Score 22/32 (heuristics 7 and 10 scored n/a: Persuade surface). Acceptable (69%).

Scores: 1:3, 2:3, 3:2, 4:3, 5:3, 6:3, 7:n/a, 8:2, 9:3, 10:n/a.

## Design Specificity Verdict
Strategy is authored (Mongolian winter, AM/PM routine, pay-on-delivery); visual layer is generic (monochrome navy/ice blue, stock sky, frosted glass, centred product card). Hero borrows a revolut.com scroll pattern.

## Priority Issues
- [P1] Page sells before it teaches: routine panel is 4th block behind an 8-product grid (index.vue:137 vs :164). Fix: move RoutinePanel after hero, shrink grid. Command: layout.
- [P1] Scroll-jacked borrowed hero, weak mobile story, heavy hero image (index.vue:29-92). Fix: remove glide/sticky scene, winter-specific image or routine as hero object. Command: distill, then bolder.
- [P1] Repeated delivery/payment reassurance, 6 nav links, chips duplicate tiles; "Монгол даяар" vs Ulaanbaatar delivery contradiction. Command: distill.
- [P2] Weak add-routine feedback, silent duplicate add, page ends on newsletter (RoutinePanel.vue:19-23,53; index.vue:191). Command: delight, harden.
- [P2] Generic light-only identity, no dark theme, near-identical ice tiles, hero CTA token override, unresolved 3.8:1 contrast failure (main.css:18-37). Command: colorize.

## Persona Red Flags
Casey: long scroll on mobile data, header hides on scroll-down, routine far down. Jordan: single-serum hero, no start-here cue, kits vs routine unexplained. Riley: repeat add duplicates, glide blocks keyboard, edge cases untested. Narantuya (UB office worker, 4G): finds answer only after the grid; delivery badge contradiction.

## Minor Observations
Check 22ch H1 break at 390px; hero text contrast over 0.62 overlay; thin type scale H2 to body; odd Mongolian tile label; footer and cart drawer not reviewed; duplicated "Дэлгүүр үзэх" string.

## Questions to Consider
If the routine is the product, why is a single serum first? What is only Ulaanbaatar here? Does the scroll scene serve the shopper or the pitch? What if the hero were the AM routine with one Add all button? Should pay-on-delivery be the loudest line?
