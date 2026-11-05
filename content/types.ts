export type Locale = 'mn' | 'en'
export type L10n = { mn: string; en: string }
export type Category = 'cleanse' | 'treat' | 'moisturise' | 'protect'
export type Role = 'cleanse' | 'tone' | 'treat' | 'moisturise' | 'protect'
export type Concern = 'dryness' | 'dullness' | 'sensitivity' | 'texture' | 'sun' | 'eyes'
export type SkinType = 'dry' | 'normal' | 'oily' | 'combination' | 'sensitive'
export type Slot = 'am' | 'pm'

export interface ProductImage {
  src: string
  width: number
  height: number
  alt: L10n
}

export interface Product {
  slug: string
  name: string
  subtitle: L10n
  description: L10n
  howToUse: L10n
  category: Category
  role: Role
  concerns: Concern[]
  skinTypes: SkinType[]
  /** key ingredients, matched by slug to content/ingredients.ts */
  ingredients: string[]
  /** Full INCI list, or null when it is not verified yet. Then inciSource must point to where to read it. */
  inci: string | null
  inciSource: string
  priceMnt: number
  size: string
  images: [ProductImage, ProductImage]
  badges: L10n[]
  stock: number
  routine: Partial<Record<Slot, { note: L10n }>>
  source: string
}

export interface Kit {
  slug: string
  name: L10n
  description: L10n
  productSlugs: string[]
  /** price of the kit in MNT, must be lower than buying separately */
  priceMnt: number
  image: ProductImage
  source: string
}

export interface Ingredient {
  slug: string
  name: L10n
  what: L10n
  why: L10n
  note: L10n
}
