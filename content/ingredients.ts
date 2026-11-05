import type { Ingredient } from './types.ts'

export const ingredients: Ingredient[] = [
  {
    slug: 'niacinamide',
    name: { mn: 'Ниацинамид', en: 'Niacinamide' },
    what: { mn: 'B3 витамины нэг хэлбэр.', en: 'A form of vitamin B3.' },
    why: { mn: 'Арьсны гадаргууг жигд, өнгийг тэнцүү харагдуулахад, мөн арьсны хамгаалалтын давхаргыг дэмжихэд ашигладаг.', en: 'Used to help skin look smoother and more even in tone, and to support the skin barrier.' },
    note: { mn: 'Ихэнх арьсанд тохиромжтой. Анх удаа хэрэглэхдээ жижиг хэсэгт туршина.', en: 'Suits most skin types. Patch test the first time.' }
  },
  {
    slug: 'propolis',
    name: { mn: 'Пропполис', en: 'Propolis' },
    what: { mn: 'Зөгийн бал хураах үед зөгий үйлдвэрлэдэг ургамлын давирхайлаг бодис.', en: 'A resin-like substance bees make from plant material.' },
    why: { mn: 'Арьсыг чийгшүүлж, тайвшруулах зорилгоор серумд ордог.', en: 'Added to serums to help hydrate and calm skin.' },
    note: { mn: 'Зөгийн бүтээгдэхүүнд харшилтай бол хэрэглэхгүй.', en: 'Avoid if you are allergic to bee products.' }
  },
  {
    slug: 'alpha-arbutin',
    name: { mn: 'Альфа арбутин', en: 'Alpha arbutin' },
    what: { mn: 'Ургамлаас гаралтай ойролцоо бодис дээр суурилсан гэрэлтүүлэгч найрлага.', en: 'A brightening ingredient related to a plant compound.' },
    why: { mn: 'Арьсны өнгийг жигд, толбо мэт харагдах хэсгийг бүдэгрүүлэхэд ашигладаг.', en: 'Used to help skin tone look more even and to soften the look of dark spots.' },
    note: { mn: 'Өдөр хэрэглэвэл нарны тос заавал хэрэгтэй.', en: 'Pair with sunscreen if you use it in the day.' }
  },
  {
    slug: 'ginseng',
    name: { mn: 'Женьшень', en: 'Ginseng' },
    what: { mn: 'Солонгос, Монголын уламжлалт эмийн ургамал.', en: 'A root long used in Korean traditional herbal care.' },
    why: { mn: 'Арчилгааны бүтээгдэхүүнд арьсыг тэжээх, чийгшүүлэх зорилгоор нэмдэг.', en: 'Added to skincare to nourish and hydrate.' },
    note: { mn: 'Ургамлын хандад мэдрэмтгий бол жижиг хэсэгт туршина.', en: 'Patch test if you are sensitive to plant extracts.' }
  },
  {
    slug: 'rice',
    name: { mn: 'Будаа', en: 'Rice' },
    what: { mn: 'Будааны хоншоор, үрийн ус зэрэг хэлбэрээр хэрэглэдэг.', en: 'Used as rice bran water or rice seed water.' },
    why: { mn: 'Арьсыг зөөлрүүлж, чийгшүүлэх мэдрэмж өгдөг.', en: 'Gives a softening, hydrating feel.' },
    note: { mn: 'Ихэнх арьсанд зөөлөн.', en: 'Generally gentle.' }
  },
  {
    slug: 'centella',
    name: { mn: 'Центелла', en: 'Centella asiatica' },
    what: { mn: 'Ази тивд өргөн хэрэглэдэг ургамал.', en: 'A plant widely used across Asia.' },
    why: { mn: 'Ядарсан, улайсан мэт харагдах арьсыг тайвшруулах зорилгоор ордог.', en: 'Added to help soothe skin that looks tired or flushed.' },
    note: { mn: 'Мэдрэг арьсанд ихэвчлэн сайн тэсвэрлэдэг.', en: 'Usually well tolerated by sensitive skin.' }
  },
  {
    slug: 'vitamin-c',
    name: { mn: 'С витамин', en: 'Vitamin C' },
    what: { mn: 'Антиоксидант чанартай витамин.', en: 'An antioxidant vitamin.' },
    why: { mn: 'Арьсыг гэрэлтэй, өнгийг жигд харагдуулахад ашигладаг.', en: 'Used to help skin look brighter and more even.' },
    note: { mn: 'Өглөө хэрэглэвэл нарны тос заавал түрхэнэ.', en: 'If used in the morning, finish with sunscreen.' }
  },
  {
    slug: 'green-tea',
    name: { mn: 'Ногоон цай', en: 'Green tea' },
    what: { mn: 'Цайны навчны ханд.', en: 'An extract of tea leaves.' },
    why: { mn: 'Арьсыг тайвшруулж, чийгшүүлэх серумд ордог.', en: 'Found in serums that help calm and hydrate.' },
    note: { mn: 'Хүйтэн, салхитай өдрийн дараа тохиромжтой.', en: 'A good fit after a cold, windy day.' }
  },
  {
    slug: 'panthenol',
    name: { mn: 'Пантенол (B5)', en: 'Panthenol (B5)' },
    what: { mn: 'B5 витаминаас гаралтай чийг татагч найрлага.', en: 'A moisture-binding ingredient derived from vitamin B5.' },
    why: { mn: 'Арьсыг зөөлрүүлж, чийгийг барихад тусалдаг.', en: 'Helps soften skin and hold in moisture.' },
    note: { mn: 'Маш зөөлөн, ихэнх арьсанд тохиромжтой.', en: 'Very gentle and suits most skin.' }
  },
  {
    slug: 'aha-bha',
    name: { mn: 'AHA ба BHA', en: 'AHA and BHA' },
    what: { mn: 'Арьсны гадаргуугийн үхсэн эсийг зөөлөн арилгадаг хүчлүүд.', en: 'Acids that gently loosen dead cells on the skin surface.' },
    why: { mn: 'Арьсны гадаргууг жигд, цэвэр мэдрэмжтэй болгоход ашигладаг.', en: 'Used to help skin feel smoother and clearer on the surface.' },
    note: { mn: 'Долоо хоногт 2-3 удаагаас эхэлнэ. Заавал нарны тос түрхэнэ.', en: 'Start 2 to 3 times a week and always wear sunscreen.' }
  },
  {
    slug: 'retinal',
    name: { mn: 'Ретиналь', en: 'Retinal' },
    what: { mn: 'А витамины нэг хэлбэр (ретиноид).', en: 'A form of vitamin A (a retinoid).' },
    why: { mn: 'Нүдний орчмын арьсыг шөнийн арчилгаанд ашигладаг.', en: 'Used in evening care for the skin around the eyes.' },
    note: { mn: 'Жирэмсэн болон хөхүүл үед хэрэглэхээсээ өмнө эмчээс асууна уу. Орой хэрэглэж, өдөр нарны тос түрхэнэ.', en: 'If pregnant or breastfeeding, ask your doctor first. Use in the evening and wear sunscreen by day.' }
  },
  {
    slug: 'green-plum',
    name: { mn: 'Ногоон огор', en: 'Green plum' },
    what: { mn: 'Огорын жимсний ханд.', en: 'An extract of unripe plum fruit.' },
    why: { mn: 'Угаалга, тонерт арьсыг сэргэг, цэвэр мэдрэмжтэй болгоход ордог.', en: 'Used in cleansers and toners for a fresh, clean feel.' },
    note: { mn: 'Ихэнх арьсанд тохиромжтой.', en: 'Suits most skin types.' }
  }
]

export const ingredientBySlug = (slug: string): Ingredient | undefined => ingredients.find((i) => i.slug === slug)
