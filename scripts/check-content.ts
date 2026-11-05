import { existsSync, readFileSync } from 'node:fs'
import { products } from '../content/products.ts'
import { kits } from '../content/kits.ts'
import { ingredients } from '../content/ingredients.ts'
import { routinePanel } from '../content/routines.ts'
import { delivery } from '../content/config.ts'

const errors: string[] = []
const fail = (m: string) => errors.push(m)
const pub = (src: string) => new URL(`../public${src}`, import.meta.url)
const has = (v: { mn?: string; en?: string } | undefined) => !!v && !!v.mn?.trim() && !!v.en?.trim()
const bad = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`)

const slugs = new Set<string>()
for (const p of products) {
  if (slugs.has(p.slug)) fail(`duplicate slug: ${p.slug}`)
  slugs.add(p.slug)
  for (const k of ['subtitle', 'description', 'howToUse'] as const) if (!has(p[k])) fail(`${p.slug}: missing translation in ${k}`)
  if (!(p.priceMnt > 0)) fail(`${p.slug}: price must be above zero`)
  if (!(p.stock >= 0)) fail(`${p.slug}: stock must be zero or more`)
  if (!p.source.startsWith('https://')) fail(`${p.slug}: missing source url`)
  if (p.inci === null && !p.inciSource) fail(`${p.slug}: no INCI list and no inciSource`)
  p.images.forEach((im, i) => {
    if (!has(im.alt)) fail(`${p.slug}: image ${i + 1} missing alt text in both languages`)
    if (!existsSync(pub(im.src))) fail(`${p.slug}: image file missing ${im.src}`)
    if (!(im.width > 0 && im.height > 0)) fail(`${p.slug}: image ${i + 1} needs width and height`)
  })
  for (const b of p.badges) if (!has(b)) fail(`${p.slug}: badge missing translation`)
  for (const [slot, r] of Object.entries(p.routine)) if (!has(r?.note)) fail(`${p.slug}: routine ${slot} note missing translation`)
  for (const s of p.ingredients) if (!ingredients.some((i) => i.slug === s)) fail(`${p.slug}: unknown ingredient ${s}`)
}

for (const k of kits) {
  if (slugs.has(k.slug)) fail(`duplicate slug: ${k.slug}`)
  slugs.add(k.slug)
  if (!has(k.name) || !has(k.description)) fail(`${k.slug}: missing translation`)
  if (!(k.priceMnt > 0)) fail(`${k.slug}: price must be above zero`)
  if (!has(k.image.alt)) fail(`${k.slug}: image missing alt text`)
  if (!existsSync(pub(k.image.src))) fail(`${k.slug}: image file missing ${k.image.src}`)
  let separate = 0
  for (const s of k.productSlugs) {
    const p = products.find((x) => x.slug === s)
    if (!p) fail(`${k.slug}: references missing product ${s}`)
    else separate += p.priceMnt
  }
  if (separate && k.priceMnt >= separate) fail(`${k.slug}: kit price must be lower than buying separately`)
}

for (const i of ingredients) if (!has(i.name) || !has(i.what) || !has(i.why) || !has(i.note)) fail(`ingredient ${i.slug}: missing translation`)
for (const slot of ['am', 'pm'] as const) for (const s of routinePanel[slot]) {
  const p = products.find((x) => x.slug === s)
  if (!p) fail(`routine ${slot}: missing product ${s}`)
  else if (!p.routine[slot]) fail(`routine ${slot}: ${s} has no ${slot} note`)
}
if (!(delivery.freeThresholdMnt > 0)) fail('delivery.freeThresholdMnt must be above zero')

// locale parity and banned dashes
const flat = (o: unknown, prefix = ''): Record<string, string> => {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(o as Record<string, unknown>)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object') Object.assign(out, flat(v, key))
    else out[key] = String(v)
  }
  return out
}
const mn = flat(JSON.parse(readFileSync(new URL('../i18n/locales/mn.json', import.meta.url), 'utf8')))
const en = flat(JSON.parse(readFileSync(new URL('../i18n/locales/en.json', import.meta.url), 'utf8')))
for (const k of Object.keys(en)) if (!(k in mn) || !mn[k].trim()) fail(`locale: ${k} missing in mn`)
for (const k of Object.keys(mn)) if (!(k in en) || !en[k].trim()) fail(`locale: ${k} missing in en`)
for (const [loc, set] of [['mn', mn], ['en', en]] as const) for (const [k, v] of Object.entries(set)) if (bad.test(v)) fail(`locale ${loc}: ${k} contains an en or em dash`)
for (const f of ['products', 'kits', 'ingredients', 'config']) {
  if (bad.test(readFileSync(new URL(`../content/${f}.ts`, import.meta.url), 'utf8'))) fail(`content/${f}.ts contains an en or em dash`)
}

if (errors.length) {
  console.error(`check:content failed with ${errors.length} problem(s):`)
  for (const e of errors) console.error(` - ${e}`)
  process.exit(1)
}
console.log(`check:content ok: ${products.length} products, ${kits.length} kits, ${ingredients.length} ingredients, ${Object.keys(en).length} strings in both languages`)
