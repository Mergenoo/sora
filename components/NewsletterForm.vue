<script setup lang="ts">
const { t } = useI18n()
const email = ref('')
const hp = ref('')
const state = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')
const invalid = ref(false)
const message = computed(() => (state.value === 'ok' ? t('newsletter.success') : state.value === 'error' ? t('newsletter.error') : ''))
const submit = async () => {
  invalid.value = !validateEmail(email.value)
  if (invalid.value) return
  state.value = 'sending'
  try {
    await $fetch('/api/newsletter', { method: 'POST', body: { email: email.value, website: hp.value } })
    state.value = 'ok'
    email.value = ''
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <form class="grid gap-3" novalidate @submit.prevent="submit">
    <div class="field">
      <label for="nl-email">{{ t('newsletter.label') }}</label>
      <div class="joined-field flex items-stretch">
        <input id="nl-email" v-model="email" class="input min-w-0 flex-1 !border-r-0" type="email" inputmode="email" autocomplete="email" :aria-invalid="invalid" :aria-describedby="invalid ? 'nl-err' : 'nl-hint'" required>
        <button class="btn btn-primary" type="submit" :disabled="state === 'sending'">{{ state === 'sending' ? t('newsletter.sending') : t('newsletter.submit') }}</button>
      </div>
      <p id="nl-hint" class="hint">{{ t('newsletter.text') }}</p>
      <p v-if="invalid" id="nl-err" class="err">{{ t('errors.email') }}</p>
    </div>
    <div class="absolute -left-[9999px]" aria-hidden="true"><label>Website <input v-model="hp" type="text" tabindex="-1" autocomplete="off"></label></div>
    <p role="status" aria-live="polite" class="min-h-[1.5em] font-semibold" :class="state === 'error' ? 'text-danger' : 'text-ok'">{{ message }}</p>
  </form>
</template>
