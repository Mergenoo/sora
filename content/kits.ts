import type { Kit } from './types.ts'

export const kits: Kit[] = [
  {
    slug: 'glow-boosting-duo',
    name: { mn: 'Гэрэлтүүлэх хос серум', en: 'Glow Boosting Duo' },
    description: {
      mn: 'Хоёр серумыг хослуулсан багц: нэг нь ниацинамид, пропполис, нөгөө нь будаа, альфа арбутинтай. Өдөр бүр нэгийг, эсвэл өглөө, оройд тус тусад нь хэрэглэнэ.',
      en: 'Two serums in one set: one with niacinamide and propolis, the other with rice and alpha arbutin. Use one a day, or split them across morning and evening.'
    },
    productSlugs: ['glow-serum-propolis-niacinamide', 'glow-deep-serum-rice-alpha-arbutin'],
    priceMnt: 78000,
    image: {
      src: '/images/kits/glow-boosting-duo-1.jpg',
      width: 1000,
      height: 1000,
      alt: { mn: 'Гэрэлтүүлэх хос серумын иж бүрдэл', en: 'The Glow Boosting Duo serum set' }
    },
    source: 'https://beautyofjoseon.com/products/glow-boosting-duo'
  },
  {
    slug: 'evening-trio',
    name: { mn: 'Орой хэрэглэх гурвал', en: 'Evening Trio' },
    description: {
      mn: 'Эссенс, нүдний серум, баялаг крем: өвлийн хуурай оройд зориулсан гурван алхам.',
      en: 'Essence, eye serum and a rich cream: three steps for dry winter evenings.'
    },
    productSlugs: ['ginseng-essence-water', 'revive-eye-serum-ginseng-retinal', 'dynasty-cream'],
    priceMnt: 120000,
    image: {
      src: '/images/kits/slow-aging-trio-1.jpg',
      width: 1000,
      height: 1000,
      alt: { mn: 'Орой хэрэглэх гурван бүтээгдэхүүний иж бүрдэл', en: 'The Evening Trio set' }
    },
    source: 'https://beautyofjoseon.com/products/slow-aging-trio'
  }
]

export const kitBySlug = (slug: string): Kit | undefined => kits.find((k) => k.slug === slug)
