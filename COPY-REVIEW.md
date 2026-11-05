# Mongolian copy to check with a native speaker

The Mongolian was written for this demo and has not been reviewed by a native speaker. Everything in `i18n/locales/mn.json` and the `mn` fields in `content/*.ts` should be read once. These are the items most likely to need a change.

## Wording and tone
- `hero.title`, `hero.sub`, `hero.cta`: headline and first impression. "Дэлгүүр үзэх" is the button.
- `promo`, `hero.facts.*`, `perks.*`: store promises. They must match the delivery page and FAQ.
- `categories.treat` is called "Серум" on purpose. Do not use "эмчлэх" (to treat medically).
- `routine.*` and the `routine` notes in `content/products.ts`: tone of advice for the cold climate.
- `product.retinoidText`, `faq.a5`, `ingredients.ts` `retinal.note`: pregnancy and breastfeeding advice. Must read as "ask your doctor", never as a promise.
- `faq.q1` to `faq.a11`: all questions and answers.
- `delivery.*`: fees, days, returns. Check "карго" and "терминал" are the words customers use.
- `checkout.*` and `errors.*`: labels and error messages. Errors say what is wrong and how to fix it.
- `confirmation.text`: sentence with the phone number.
- `newsletter.text`: promise of one email a month.
- `closing.*`: closing band on the home page (title, text, button). Mongolian is a draft.

## Terms to confirm
- "хороо", "байр", "хаалганы дугаар", "аймаг" in the checkout form.
- "хүлээн авахдаа төлөх" for pay on delivery.
- "Жишээ" style placeholders are not used. If any remain after editing, remove them.
- Ingredient names in `ingredients.ts` (ниацинамид, пропполис, центелла, ретиналь, альфа арбутин). Confirm the spelling people use.
- Product subtitles keep the English packaging text (for example "Propolis + Niacinamide"). Confirm this is wanted.

## Style rules used
Sentence case, plain verbs, no en or em dashes, the same action keeps one name across the flow ("Сагсанд нэмэх", "Захиалгын хүсэлт илгээх").
