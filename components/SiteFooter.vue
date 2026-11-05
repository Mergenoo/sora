<script setup lang="ts">
import { business } from '~/content/config'
const { t, locale } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="mt-8 bg-panel text-on-panel">
    <div class="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div>
        <p class="text-2xl font-extrabold tracking-tight">{{ business.name.toLowerCase() }}</p>
        <p class="mt-3 max-w-xs text-sm text-on-panel/85">{{ t('footer.text') }}</p>
      </div>
      <nav :aria-label="t('a11y.footer')" class="contents">
        <div>
          <h2 class="!text-base font-bold">{{ t('footer.shop') }}</h2>
          <ul class="mt-3 grid gap-1 text-sm">
            <li><NuxtLink class="inline-flex min-h-[44px] items-center" :to="localePath('/shop')">{{ t('nav.shop') }}</NuxtLink></li>
            <li><NuxtLink class="inline-flex min-h-[44px] items-center" :to="localePath('/kits')">{{ t('nav.kits') }}</NuxtLink></li>
            <li><NuxtLink class="inline-flex min-h-[44px] items-center" :to="localePath('/ingredients')">{{ t('nav.ingredients') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h2 class="!text-base font-bold">{{ t('footer.help') }}</h2>
          <ul class="mt-3 grid gap-1 text-sm">
            <li><NuxtLink class="inline-flex min-h-[44px] items-center" :to="localePath('/delivery')">{{ t('meta.delivery.title') }}</NuxtLink></li>
            <li><NuxtLink class="inline-flex min-h-[44px] items-center" :to="localePath('/faq')">{{ t('nav.faq') }}</NuxtLink></li>
            <li><NuxtLink class="inline-flex min-h-[44px] items-center" :to="localePath('/contact')">{{ t('contact.title') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h2 class="!text-base font-bold">{{ t('footer.company') }}</h2>
          <ul class="mt-3 grid gap-1 text-sm">
            <li><a class="inline-flex min-h-[44px] items-center" :href="telHref(business.phone)">{{ business.phoneDisplay }}</a></li>
            <li><a class="inline-flex min-h-[44px] items-center" :href="business.messenger" rel="noopener" target="_blank">Messenger</a></li>
            <li><NuxtLink class="inline-flex min-h-[44px] items-center" :to="localePath('/credits')">{{ t('credits.title') }}</NuxtLink></li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="border-t border-on-panel/20">
      <p class="wrap flex flex-wrap items-center justify-between gap-2 py-5 text-sm text-on-panel/85">
        <span>{{ t('footer.disclaimer') }}</span>
        <span>{{ t('footer.demo') }} <a class="link" href="https://mergenportfolio.vercel.app/" rel="noopener" target="_blank">Mergen</a></span>
      </p>
    </div>
  </footer>
</template>
