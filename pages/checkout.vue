<script setup lang="ts">
import { catalog } from '~/utils/catalog'
import { delivery, districts } from '~/content/config'
import { productBySlug } from '~/content/products'
import { kitBySlug } from '~/content/kits'
import type { DeliveryType } from '~/utils/pricing'
import type { OrderErrors } from '~/utils/order'
const { t } = useI18n()
const { l } = useCatalog()
const localePath = useLocalePath()
const cart = useCart()
useSeo({ titleKey: 'checkout', noindex: true })

const mounted = ref(false)
onMounted(() => { mounted.value = true })
const form = reactive({ name: '', phone: '', delivery: 'ub' as DeliveryType, payment: 'cod' as 'cod' | 'transfer', district: '', khoroo: '', building: '', door: '', terminal: '', notes: '', website: '' })
const errors = ref<OrderErrors>({})
const status = ref<'idle' | 'sending' | 'error' | 'limited'>('idle')
const summary = ref<HTMLElement | null>(null)
const rules = { freeThresholdMnt: delivery.freeThresholdMnt, feesMnt: { ...delivery.feesMnt } }
const fee = computed(() => deliveryFee(form.delivery, cart.subtotal.value, rules))
const total = computed(() => orderTotal(cart.subtotal.value, fee.value))
const days = (k: DeliveryType) => `${delivery.etaDays[k][0]}-${delivery.etaDays[k][1]}`
const lines = computed(() => cart.lines.value.map((li) => ({ li, name: li.kind === 'kit' ? l(kitBySlug(li.slug)!.name) : productBySlug(li.slug)!.name, total: lineTotal(catalog, li) })))
const errorEntries = computed(() => Object.entries(errors.value) as [string, string][])
const err = (k: keyof OrderErrors) => (errors.value[k] ? t(errors.value[k]!) : '')
const describe = (k: keyof OrderErrors, hint?: string) => [errors.value[k] ? `${k}-err` : '', hint].filter(Boolean).join(' ') || undefined

const submit = async () => {
  errors.value = validateOrder({ ...form, lines: cart.lines.value })
  status.value = 'idle'
  if (Object.keys(errors.value).length) {
    await nextTick()
    summary.value?.focus()
    return
  }
  status.value = 'sending'
  try {
    const res = await $fetch<{ orderNumber: string; total: number; fee: number; createdAt: string }>('/api/order', { method: 'POST', body: { ...form, lines: cart.lines.value } })
    try {
      localStorage.setItem('sora-last-order', JSON.stringify({ ...res, name: form.name, phone: normalizePhone(form.phone), delivery: form.delivery, payment: form.payment, lines: lines.value.map((x) => ({ name: x.name, qty: x.li.qty, total: x.total })), subtotal: cart.subtotal.value }))
    } catch { /* storage blocked: the confirmation page falls back to a plain message */ }
    cart.clear()
    await navigateTo(localePath('/confirmation'))
  } catch (e: unknown) {
    status.value = (e as { statusCode?: number })?.statusCode === 429 ? 'limited' : 'error'
  }
}
</script>

<template>
  <div class="wrap section !pt-8">
    <h1 class="!text-[clamp(2rem,1.4rem+2.5vw,3.25rem)]">{{ t('checkout.title') }}</h1>
    <p class="mt-2 text-muted">{{ t('checkout.intro') }}</p>

    <div v-if="mounted && !cart.lines.value.length" class="mt-8 grid gap-4">
      <p>{{ t('checkout.empty') }}</p>
      <div><NuxtLink :to="localePath('/shop')" class="btn btn-primary">{{ t('cart.emptyCta') }}</NuxtLink></div>
    </div>

    <form v-else class="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]" novalidate @submit.prevent="submit">
      <div class="grid gap-8">
        <div v-if="errorEntries.length" ref="summary" tabindex="-1" role="alert" class="card border-danger p-4 outline-none">
          <p class="font-bold text-danger">{{ t('checkout.errorSummary') }}</p>
          <ul class="mt-2 grid gap-1">
            <li v-for="[k, msg] in errorEntries" :key="k"><a class="link inline-flex min-h-[44px] items-center" :href="`#f-${k}`">{{ t(msg) }}</a></li>
          </ul>
        </div>

        <fieldset class="grid gap-4">
          <legend class="mb-2 text-xl font-extrabold">{{ t('checkout.contact') }}</legend>
          <div class="field">
            <label for="f-name">{{ t('checkout.name') }}</label>
            <input id="f-name" v-model="form.name" class="input" autocomplete="name" :aria-invalid="!!errors.name" :aria-describedby="describe('name')">
            <p v-if="errors.name" id="name-err" class="err">{{ err('name') }}</p>
          </div>
          <div class="field">
            <label for="f-phone">{{ t('checkout.phone') }}</label>
            <input id="f-phone" v-model="form.phone" class="input" type="tel" inputmode="tel" autocomplete="tel" :aria-invalid="!!errors.phone" :aria-describedby="describe('phone', 'phone-hint')">
            <p id="phone-hint" class="hint">{{ t('checkout.phoneHint') }}</p>
            <p v-if="errors.phone" id="phone-err" class="err">{{ err('phone') }}</p>
          </div>
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-2 text-xl font-extrabold">{{ t('checkout.deliveryTitle') }}</legend>
          <label v-for="k in (['ub', 'countryside', 'pickup'] as const)" :key="k" class="card flex cursor-pointer items-start gap-3 p-4 has-[:checked]:border-accent has-[:checked]:ring-2 has-[:checked]:ring-accent">
            <input v-model="form.delivery" type="radio" name="delivery" :value="k" class="mt-1 h-5 w-5 accent-[rgb(var(--c-accent))]">
            <span><span class="block font-bold">{{ t(`checkout.${k}`) }}</span><span class="text-sm text-muted">{{ t(`checkout.${k}Text`, { days: days(k) }) }}</span></span>
          </label>
        </fieldset>

        <fieldset v-if="form.delivery === 'ub'" class="grid gap-4 sm:grid-cols-2">
          <div class="field sm:col-span-2">
            <label for="f-district">{{ t('checkout.district') }}</label>
            <select id="f-district" v-model="form.district" class="input" autocomplete="address-level2" :aria-invalid="!!errors.district" :aria-describedby="describe('district')">
              <option value="">{{ t('checkout.districtPlaceholder') }}</option>
              <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
            </select>
            <p v-if="errors.district" id="district-err" class="err">{{ err('district') }}</p>
          </div>
          <div class="field">
            <label for="f-khoroo">{{ t('checkout.khoroo') }}</label>
            <input id="f-khoroo" v-model="form.khoroo" class="input" inputmode="numeric" :aria-invalid="!!errors.khoroo" :aria-describedby="describe('khoroo')">
            <p v-if="errors.khoroo" id="khoroo-err" class="err">{{ err('khoroo') }}</p>
          </div>
          <div class="field">
            <label for="f-building">{{ t('checkout.building') }}</label>
            <input id="f-building" v-model="form.building" class="input" :aria-invalid="!!errors.building" :aria-describedby="describe('building')">
            <p v-if="errors.building" id="building-err" class="err">{{ err('building') }}</p>
          </div>
          <div class="field sm:col-span-2">
            <label for="f-door">{{ t('checkout.door') }} <span class="font-normal text-muted">({{ t('checkout.optional') }})</span></label>
            <input id="f-door" v-model="form.door" class="input">
          </div>
          <div class="field sm:col-span-2">
            <label for="f-notes">{{ t('checkout.notes') }} <span class="font-normal text-muted">({{ t('checkout.optional') }})</span></label>
            <textarea id="f-notes" v-model="form.notes" class="input" rows="3" />
          </div>
        </fieldset>

        <fieldset v-if="form.delivery === 'countryside'" class="grid gap-4">
          <div class="field">
            <label for="f-terminal">{{ t('checkout.terminal') }}</label>
            <input id="f-terminal" v-model="form.terminal" class="input" :aria-invalid="!!errors.terminal" :aria-describedby="describe('terminal', 'terminal-hint')">
            <p id="terminal-hint" class="hint">{{ t('checkout.terminalHint') }}</p>
            <p v-if="errors.terminal" id="terminal-err" class="err">{{ err('terminal') }}</p>
          </div>
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-2 text-xl font-extrabold">{{ t('checkout.paymentTitle') }}</legend>
          <label v-for="k in (['cod', 'transfer'] as const)" :key="k" class="card flex cursor-pointer items-start gap-3 p-4 has-[:checked]:border-accent has-[:checked]:ring-2 has-[:checked]:ring-accent">
            <input v-model="form.payment" type="radio" name="payment" :value="k" class="mt-1 h-5 w-5 accent-[rgb(var(--c-accent))]">
            <span><span class="block font-bold">{{ t(`checkout.${k}`) }}</span><span class="text-sm text-muted">{{ t(`checkout.${k}Text`) }}</span></span>
          </label>
        </fieldset>

        <div class="absolute -left-[9999px]" aria-hidden="true"><label>Website <input v-model="form.website" type="text" tabindex="-1" autocomplete="off"></label></div>
      </div>

      <aside class="card grid h-fit content-start gap-4 p-5 lg:sticky lg:top-24" :aria-label="t('checkout.summary')">
        <h2 class="!text-xl">{{ t('checkout.summary') }}</h2>
        <ul class="grid gap-2 text-sm">
          <li v-for="x in lines" :key="x.li.kind + x.li.slug" class="flex justify-between gap-4"><span>{{ x.name }} x {{ x.li.qty }}</span><span class="shrink-0">{{ formatMnt(x.total) }}</span></li>
        </ul>
        <dl class="grid gap-1 border-t border-line pt-3">
          <div class="flex justify-between"><dt>{{ t('cart.subtotal') }}</dt><dd>{{ formatMnt(cart.subtotal.value) }}</dd></div>
          <div class="flex justify-between"><dt>{{ t('cart.delivery') }}</dt><dd>{{ fee === 0 ? t('checkout.free') : formatMnt(fee) }}</dd></div>
          <div class="flex justify-between text-xl font-extrabold"><dt>{{ t('checkout.total') }}</dt><dd>{{ formatMnt(total) }}</dd></div>
        </dl>
        <button class="btn btn-primary" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? t('checkout.sending') : t('checkout.submit') }}</button>
        <p role="status" aria-live="polite" class="min-h-[1.5em] font-semibold text-danger">{{ status === 'error' ? t('checkout.serverError') : status === 'limited' ? t('checkout.rateLimited') : '' }}</p>
      </aside>
    </form>
  </div>
</template>
