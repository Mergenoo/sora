<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()
useHead({ title: t('meta.notfound.title'), meta: [{ name: 'robots', content: 'noindex' }] })
const home = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main" class="wrap section grid min-h-[50vh] content-center gap-4">
      <h1>{{ props.error.statusCode === 404 ? t('notfound.title') : t('checkout.serverError') }}</h1>
      <p>{{ t('notfound.text') }}</p>
      <div><button type="button" class="btn btn-primary" @click="home">{{ t('notfound.cta') }}</button></div>
    </main>
    <SiteFooter />
  </div>
</template>
