/** Everything business-specific that is not copy. Change this file to reskin the site. */
export const business = {
  /** Brand name lives in one place. "Sora" is the owner's choice. */
  name: 'Sora',
  legalName: 'Sora Skin Demo LLC',
  domainNote: 'sora-skin-demo.vercel.app',
  phone: '+97670000000',
  phoneDisplay: '+976 7000 0000',
  email: 'hello@example.com',
  messenger: 'https://m.me/sora.skin.demo',
  instagram: 'https://instagram.com/sora.skin.demo',
  address: {
    mn: 'Сүхбаатар дүүрэг, 1-р хороо, Демо гудамж 1, Улаанбаатар',
    en: 'Demo Street 1, Sukhbaatar district, Ulaanbaatar'
  },
  streetAddress: 'Demo Street 1',
  geo: { lat: 47.9184, lon: 106.9177 },
  hours: [
    { days: { mn: 'Даваа - Бямба', en: 'Monday to Saturday' }, open: '10:00', close: '20:00' },
    { days: { mn: 'Ням', en: 'Sunday' }, open: '11:00', close: '18:00' }
  ],
  timezone: 'Asia/Ulaanbaatar',
  currency: 'MNT'
} as const

export const delivery = {
  /** Orders at or above this subtotal ship free inside Ulaanbaatar. */
  freeThresholdMnt: 150000,
  feesMnt: { ub: 6000, countryside: 12000, pickup: 0 },
  etaDays: { ub: [1, 2], countryside: [3, 7], pickup: [0, 1] }
} as const

export const districts = [
  'Баянгол',
  'Баянзүрх',
  'Сүхбаатар',
  'Сонгинохайрхан',
  'Хан-Уул',
  'Чингэлтэй',
  'Налайх',
  'Багануур',
  'Багахангай'
] as const

export const features = {
  /** Privacy friendly analytics stay off unless you turn this on and add a script. */
  analytics: false,
  /** Maximum units of one product per order line, on top of stock. */
  maxPerLine: 10
} as const
