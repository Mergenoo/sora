import type { Product, ProductImage } from './types.ts'

const src = (handle: string) => `https://beautyofjoseon.com/products/${handle}`

const img = (slug: string, n: 1 | 2, mn: string, en: string): ProductImage => ({
  src: `/images/products/${slug}-${n}.jpg`,
  width: 1000,
  height: 1000,
  alt: { mn, en }
})

const pair = (slug: string, mn: string, en: string): [ProductImage, ProductImage] => [
  img(slug, 1, `${mn}, савны урд тал`, `${en}, front of the pack`),
  img(slug, 2, `${mn}, нэмэлт өнцөг`, `${en}, second view`)
]

export const products: Product[] = [
  {
    slug: 'green-plum-refreshing-cleanser',
    name: 'Green Plum Refreshing Cleanser',
    subtitle: { mn: 'Өдөр тутмын зөөлөн угаалга', en: 'Gentle daily cleanser' },
    description: {
      mn: 'Огор болон мөнгөн буурцгийн хандтай, бага хөөстэй угаалгын гель. Сайн зайлагдах бөгөөд арьсыг чангалахгүй.',
      en: 'A low-foam gel cleanser with plum and mung bean extracts. It rinses clean and does not leave skin feeling tight.'
    },
    howToUse: {
      mn: 'Нойтон гараар хөөсрүүлж, нүүрээ нэг минут орчим массажлаад бүлээн усаар зайлна. Өглөө, орой хэрэглэнэ.',
      en: 'Lather in wet hands, massage over the face for about a minute, then rinse with lukewarm water. Use morning and evening.'
    },
    category: 'cleanse',
    role: 'cleanse',
    concerns: ['texture'],
    skinTypes: ['normal', 'combination', 'oily'],
    ingredients: ['green-plum'],
    inci: null,
    inciSource: src('green-plum-refreshing-cleanser'),
    priceMnt: 28000,
    size: '100 ml',
    images: pair('green-plum-refreshing-cleanser', 'Green Plum Refreshing Cleanser', 'Green Plum Refreshing Cleanser'),
    badges: [{ mn: 'Өдөр тутмын', en: 'Daily use' }],
    stock: 30,
    routine: {
      am: { note: { mn: 'Шөнийн нөмрөгөө угаахад хангалттай. Хэт халуун ус бүү хэрэглээрэй, бүлээн ус тохиромжтой.', en: 'Enough to clear the night. Use lukewarm water rather than very hot water, which dries skin in winter.' } },
      pm: { note: { mn: 'Тосоор цэвэрлэсний дараах хоёр дахь алхам.', en: 'The second cleanse, after the oil.' } }
    },
    source: src('green-plum-refreshing-cleanser')
  },
  {
    slug: 'ginseng-cleansing-oil',
    name: 'Ginseng Cleansing Oil',
    subtitle: { mn: 'Нарны тос, будаг арилгах тос', en: 'Oil cleanser for sunscreen and makeup' },
    description: {
      mn: 'Женьшенийн хандтай цэвэрлэгч тос. Усаар зайлахад сүү шиг болж, нарны тос болон будгийг арилгахад тусална.',
      en: 'A ginseng cleansing oil that turns milky with water and helps lift sunscreen and makeup.'
    },
    howToUse: {
      mn: 'Хуурай гар, хуурай нүүрэнд түрхэж массажлаад, бага зэрэг ус нэмж сүүлэг болгоод зайлна. Дараа нь угаалгын гелээр дахин угаана.',
      en: 'Massage onto dry skin with dry hands, add a little water until it turns milky, then rinse. Follow with a gel cleanser.'
    },
    category: 'cleanse',
    role: 'cleanse',
    concerns: ['sun'],
    skinTypes: ['dry', 'normal', 'combination', 'oily'],
    ingredients: ['ginseng'],
    inci: null,
    inciSource: src('ginseng-cleansing-oil'),
    priceMnt: 42000,
    size: '210 ml',
    images: pair('ginseng-cleansing-oil', 'Ginseng Cleansing Oil', 'Ginseng Cleansing Oil'),
    badges: [{ mn: 'Орой хэрэглэнэ', en: 'For evenings' }],
    stock: 18,
    routine: {
      pm: { note: { mn: 'Өдрийн нарны тосыг арилгахын тулд үргэлж эхэнд нь хэрэглэнэ.', en: 'Always first in the evening, to lift the day\'s sunscreen.' } }
    },
    source: src('ginseng-cleansing-oil')
  },
  {
    slug: 'green-plum-refreshing-toner-aha-bha',
    name: 'Green Plum Refreshing Toner',
    subtitle: { mn: 'AHA + BHA', en: 'AHA + BHA' },
    description: {
      mn: 'Огорын ханд, AHA болон BHA бүхий зөөлөн тонер. Арьсны гадаргууг жигд, цэвэр мэдрэмжтэй болгоход тусална.',
      en: 'A gentle toner with plum extract, AHA and BHA that helps skin feel smoother and clearer on the surface.'
    },
    howToUse: {
      mn: 'Угаасны дараа хөвөнд дусааж арчих эсвэл гараараа зөөлөн хавтана. Долоо хоногт 2-3 удаагаас эхэлнэ. Өдрийн цагаар хэрэглэсэн бол нарны тос заавал түрхээрэй.',
      en: 'After cleansing, sweep on with a cotton pad or press in by hand. Start with 2 to 3 times a week. If you use it in the day, always follow with sunscreen.'
    },
    category: 'cleanse',
    role: 'tone',
    concerns: ['texture', 'dullness'],
    skinTypes: ['normal', 'combination', 'oily'],
    ingredients: ['green-plum', 'aha-bha'],
    inci: null,
    inciSource: src('green-plum-refreshing-toner-aha-bha'),
    priceMnt: 38000,
    size: '150 ml',
    images: pair('green-plum-refreshing-toner-aha-bha', 'Green Plum Refreshing Toner', 'Green Plum Refreshing Toner'),
    badges: [{ mn: 'Хүчлийн тонер', en: 'Exfoliating toner' }],
    stock: 22,
    routine: {},
    source: src('green-plum-refreshing-toner-aha-bha')
  },
  {
    slug: 'ginseng-essence-water',
    name: 'Ginseng Essence Water',
    subtitle: { mn: 'Чийгшүүлэх эссенс', en: 'Hydrating essence' },
    description: {
      mn: 'Женьшенийн ус, ниацинамид бүхий эссенс. Дулаан өрөөний хуурай агаарт арьсны чийгийг дэмжинэ.',
      en: 'An essence with ginseng water and niacinamide that supports skin hydration in dry, heated rooms.'
    },
    howToUse: {
      mn: 'Угаасны дараа ам цайх хэмжээний хэмжээг гарт аваад нүүрэндээ хавтана. Дараа нь серум, кремээ түрхэнэ.',
      en: 'After cleansing, press a small amount into the face with your palms. Follow with serum and cream.'
    },
    category: 'moisturise',
    role: 'tone',
    concerns: ['dryness', 'dullness'],
    skinTypes: ['dry', 'normal', 'combination', 'sensitive'],
    ingredients: ['ginseng', 'niacinamide'],
    inci: null,
    inciSource: src('ginseng-essence-water'),
    priceMnt: 45000,
    size: '150 ml',
    images: pair('ginseng-essence-water', 'Ginseng Essence Water', 'Ginseng Essence Water'),
    badges: [{ mn: 'Өвлийн чийгшүүлэг', en: 'Winter hydration' }],
    stock: 20,
    routine: {
      pm: { note: { mn: 'Арьс чийгтэй байхад хавтана. Дулаан өрөөнд хуурайшсан арьсанд тохиромжтой.', en: 'Press in while skin is still damp. It suits skin dried out by indoor heating.' } }
    },
    source: src('ginseng-essence-water')
  },
  {
    slug: 'glow-serum-propolis-niacinamide',
    name: 'Glow Serum',
    subtitle: { mn: 'Propolis + Niacinamide', en: 'Propolis + Niacinamide' },
    description: {
      mn: 'Ниацинамид, пропполисын хандтай зөөлөн серум. Арьсны гадаргууг жигд харагдуулж, чийгшүүлж, тайвшруулахад тусална.',
      en: 'A cushiony serum with niacinamide and propolis extract that helps skin look smoother and feel hydrated and calm.'
    },
    howToUse: {
      mn: 'Угаасны дараа 2-3 дусал аваад нүүрэнд хавтана. Дараа нь чийгшүүлэгч, өдөр нь нарны тос түрхэнэ.',
      en: 'After cleansing, press 2 to 3 drops into skin. Follow with moisturiser, and sunscreen in the day.'
    },
    category: 'treat',
    role: 'treat',
    concerns: ['texture', 'dullness'],
    skinTypes: ['normal', 'combination', 'oily', 'sensitive'],
    ingredients: ['propolis', 'niacinamide'],
    inci: null,
    inciSource: src('glow-serum-propolis-niacinamide'),
    priceMnt: 39000,
    size: '30 ml',
    images: pair('glow-serum-propolis-niacinamide', 'Glow Serum Propolis + Niacinamide', 'Glow Serum Propolis + Niacinamide'),
    badges: [{ mn: 'Өглөөний алхам', en: 'Morning step' }],
    stock: 40,
    routine: {
      am: { note: { mn: 'Нарны тосны өмнөх хөнгөн давхарга.', en: 'A light layer under sunscreen.' } }
    },
    source: src('glow-serum-propolis-niacinamide')
  },
  {
    slug: 'glow-deep-serum-rice-alpha-arbutin',
    name: 'Glow Deep Serum',
    subtitle: { mn: 'Rice + Alpha-Arbutin', en: 'Rice + Alpha-Arbutin' },
    description: {
      mn: 'Альфа арбутин, будааны устай серум. Арьсны өнгийг жигд, гэрэлтэй харагдуулахад тусална.',
      en: 'A serum with alpha arbutin and rice bran water that helps skin tone look more even and radiant.'
    },
    howToUse: {
      mn: 'Угаасны дараа 2-3 дусал аваад нүүрэнд хавтана. Өдөр хэрэглэвэл нарны тосыг заавал түрхэнэ.',
      en: 'After cleansing, press 2 to 3 drops into skin. If you use it in the morning, always finish with sunscreen.'
    },
    category: 'treat',
    role: 'treat',
    concerns: ['dullness'],
    skinTypes: ['normal', 'combination', 'dry'],
    ingredients: ['rice', 'alpha-arbutin'],
    inci: null,
    inciSource: src('glow-deep-serum-rice-alpha-arbutin'),
    priceMnt: 45000,
    size: '30 ml',
    images: pair('glow-deep-serum-rice-alpha-arbutin', 'Glow Deep Serum Rice + Alpha-Arbutin', 'Glow Deep Serum Rice + Alpha-Arbutin'),
    badges: [],
    stock: 25,
    routine: {},
    source: src('glow-deep-serum-rice-alpha-arbutin')
  },
  {
    slug: 'calming-barrier-serum',
    name: 'Calming Barrier Serum',
    subtitle: { mn: 'Green Tea-HA + Panthenol', en: 'Green Tea-HA + Panthenol' },
    description: {
      mn: 'Ногоон цай, пантенол бүхий хөнгөн серум. Салхи, хүйтэнд ядарсан арьсыг чийгшүүлж, тайвшруулахад тусална.',
      en: 'A light serum with green tea and panthenol that helps hydrate and calm skin tired by wind and cold.'
    },
    howToUse: {
      mn: 'Эссенсийн дараа 2-3 дусал аваад хавтана. Өглөө, орой хэрэглэж болно.',
      en: 'After essence, press in 2 to 3 drops. Suitable morning and evening.'
    },
    category: 'treat',
    role: 'treat',
    concerns: ['sensitivity', 'dryness'],
    skinTypes: ['sensitive', 'dry', 'normal'],
    ingredients: ['green-tea', 'panthenol'],
    inci: null,
    inciSource: src('calming-barrier-serum'),
    priceMnt: 45000,
    size: '30 ml',
    images: pair('calming-barrier-serum', 'Calming Barrier Serum', 'Calming Barrier Serum'),
    badges: [{ mn: 'Мэдрэг арьсанд', en: 'For sensitive skin' }],
    stock: 28,
    routine: {
      pm: { note: { mn: 'Салхинд гарсан өдрийн дараа арьсыг тайвшруулах давхарга.', en: 'A calming layer after a day out in the wind.' } }
    },
    source: src('calming-barrier-serum')
  },
  {
    slug: 'light-on-serum-centella-vita-c',
    name: 'Light On Serum',
    subtitle: { mn: 'Centella + Vita C', en: 'Centella + Vita C' },
    description: {
      mn: 'Центелла, С витамин бүхий хөнгөн серум. Арьсыг гэрэлтүүлж, гадаргууг жигд харагдуулахад тусална. Наалддаггүй, тослоггүй.',
      en: 'A lightweight serum with centella and vitamin C that helps skin look brighter and smoother. Not sticky, not greasy.'
    },
    howToUse: {
      mn: 'Угаасны дараа 2-3 дусал аваад хавтана. Өглөө хэрэглэвэл нарны тосыг заавал түрхэнэ.',
      en: 'After cleansing, press in 2 to 3 drops. Finish with sunscreen if you use it in the morning.'
    },
    category: 'treat',
    role: 'treat',
    concerns: ['dullness', 'texture'],
    skinTypes: ['normal', 'combination', 'oily'],
    ingredients: ['centella', 'vitamin-c'],
    inci: null,
    inciSource: src('light-on-serum-centella-vita-c'),
    priceMnt: 45000,
    size: '30 ml',
    images: pair('light-on-serum-centella-vita-c', 'Light On Serum Centella + Vita C', 'Light On Serum Centella + Vita C'),
    badges: [],
    stock: 24,
    routine: {},
    source: src('light-on-serum-centella-vita-c')
  },
  {
    slug: 'revive-eye-serum-ginseng-retinal',
    name: 'Revive Eye Serum',
    subtitle: { mn: 'Ginseng + Retinal', en: 'Ginseng + Retinal' },
    description: {
      mn: 'Женьшень, ретиналь бүхий нүдний серум. Нүдний орчмын арьсыг чийгшүүлж, шөнийн арчилгаанд тусална.',
      en: 'An eye serum with ginseng and retinal that hydrates the delicate area around the eyes. Best used in the evening.'
    },
    howToUse: {
      mn: 'Орой, нүдний ясан орчимд бага хэмжээгээр хавтана. Эхний долоо хоногт хоёр шөнө тутамд хэрэглэнэ. Жирэмсэн болон хөхүүл үед хэрэглэхээсээ өмнө эмчээс асууна уу.',
      en: 'In the evening, tap a small amount around the orbital bone. In the first week use every other night. If you are pregnant or breastfeeding, ask your doctor before using retinoids.'
    },
    category: 'treat',
    role: 'treat',
    concerns: ['eyes'],
    skinTypes: ['normal', 'dry', 'combination'],
    ingredients: ['ginseng', 'retinal'],
    inci: null,
    inciSource: src('revive-eye-serum-ginseng-retinal'),
    priceMnt: 48000,
    size: '30 ml',
    images: pair('revive-eye-serum-ginseng-retinal', 'Revive Eye Serum Ginseng + Retinal', 'Revive Eye Serum Ginseng + Retinal'),
    badges: [{ mn: 'Орой хэрэглэнэ', en: 'For evenings' }],
    stock: 15,
    routine: {},
    source: src('revive-eye-serum-ginseng-retinal')
  },
  {
    slug: 'dynasty-cream',
    name: 'Dynasty Cream',
    subtitle: { mn: 'Баялаг чийгшүүлэгч крем', en: 'Rich moisturiser' },
    description: {
      mn: 'Хүйтэн, хуурай улиралд зориулсан баялаг боловч тав тухтай шингэдэг крем. Арьсыг дүүрэн, шүүдэртэй харагдуулна.',
      en: 'A rich yet comfortable cream for the cold, dry months. It leaves skin looking plump and dewy.'
    },
    howToUse: {
      mn: 'Серумын дараа вандуйн хэмжээтэй авч нүүр, хүзүүнд зөөлөн түрхэнэ. Хүйтэнд гарахаасаа 15 минутын өмнө түрхвэл тохиромжтой.',
      en: 'After serum, take a pea-sized amount and smooth over face and neck. Apply 15 minutes before going out into the cold.'
    },
    category: 'moisturise',
    role: 'moisturise',
    concerns: ['dryness'],
    skinTypes: ['dry', 'normal', 'sensitive'],
    ingredients: [],
    inci: null,
    inciSource: src('dynasty-cream'),
    priceMnt: 39000,
    size: '50 ml',
    images: pair('dynasty-cream', 'Dynasty Cream', 'Dynasty Cream'),
    badges: [{ mn: 'Өвлийн хамгаалалт', en: 'Winter care' }],
    stock: 35,
    routine: {
      am: { note: { mn: 'Хүйтэнд гарахаасаа 15 минутын өмнө түрхэнэ.', en: 'Apply 15 minutes before heading into the cold.' } },
      pm: { note: { mn: 'Шөнөжин халаалтын хуурай агаараас хамгаална.', en: 'Helps through a night of dry radiator air.' } }
    },
    source: src('dynasty-cream')
  },
  {
    slug: 'relief-sun-rice-probiotics',
    name: 'Relief Sun',
    subtitle: { mn: 'Rice + Niacinamide, SPF50+ PA++++', en: 'Rice + Niacinamide, SPF50+ PA++++' },
    description: {
      mn: 'Будааны хандтай, SPF50+ PA++++ нарны тос. Зөөлөн бүтэцтэй, арьсыг чийгшүүлэх мэдрэмж өгнө. Өндөр уул, цас, нарлаг өвөлд заавал хэрэгтэй.',
      en: 'A creamy SPF50+ PA++++ sunscreen with rice extract that feels comfortably hydrating. Needed at altitude, on snow and on bright winter days.'
    },
    howToUse: {
      mn: 'Арчилгааны сүүлийн алхам. Нүүрэнд хоёр хуруу дүүрэн түрхэж, гадаа удаан байвал 2-3 цаг тутам давтана.',
      en: 'The last step of the morning. Apply a two-finger length to the face and reapply every 2 to 3 hours outdoors.'
    },
    category: 'protect',
    role: 'protect',
    concerns: ['sun', 'dryness'],
    skinTypes: ['dry', 'normal', 'sensitive'],
    ingredients: ['rice', 'niacinamide'],
    inci: null,
    inciSource: src('relief-sun-rice-probiotics'),
    priceMnt: 45000,
    size: '50 ml',
    images: pair('relief-sun-rice-probiotics', 'Relief Sun Rice + Niacinamide', 'Relief Sun Rice + Niacinamide'),
    badges: [{ mn: 'SPF50+', en: 'SPF50+' }],
    stock: 50,
    routine: {
      am: { note: { mn: 'Өвлийн нар, цасны тусгал хүчтэй. Үүлтэй өдөр ч түрхэнэ.', en: 'Winter sun and snow glare are strong. Wear it on cloudy days too.' } }
    },
    source: src('relief-sun-rice-probiotics')
  },
  {
    slug: 'relief-sun-aqua-fresh',
    name: 'Relief Sun Aqua-Fresh',
    subtitle: { mn: 'Rice + B5, SPF50+ PA++++', en: 'Rice + B5, SPF50+ PA++++' },
    description: {
      mn: 'Будааны үрийн ус бүхий хэт хөнгөн шингэн нарны тос. Тослог мэдрэмжийг илүүд үздэггүй хүмүүст тохиромжтой.',
      en: 'An ultra-light fluid sunscreen with rice seed water for people who dislike a rich finish.'
    },
    howToUse: {
      mn: 'Арчилгааны сүүлийн алхам. Нүүрэнд хоёр хуруу дүүрэн түрхэж, гадаа удаан байвал 2-3 цаг тутам давтана.',
      en: 'The last step of the morning. Apply a two-finger length to the face and reapply every 2 to 3 hours outdoors.'
    },
    category: 'protect',
    role: 'protect',
    concerns: ['sun'],
    skinTypes: ['normal', 'combination', 'oily'],
    ingredients: ['rice', 'panthenol'],
    inci: null,
    inciSource: src('relief-sun-aqua-fresh'),
    priceMnt: 45000,
    size: '50 ml',
    images: pair('relief-sun-aqua-fresh', 'Relief Sun Aqua-Fresh Rice + B5', 'Relief Sun Aqua-Fresh Rice + B5'),
    badges: [{ mn: 'SPF50+', en: 'SPF50+' }],
    stock: 45,
    routine: {},
    source: src('relief-sun-aqua-fresh')
  }
]

export const productBySlug = (slug: string): Product | undefined => products.find((p) => p.slug === slug)
