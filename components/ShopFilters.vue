<script setup lang="ts">
defineProps<{
  groups: { key: string; label: string; options: { v: string; label: string }[] }[]
  q: Record<string, string>
  kits?: { slug: string; name: string; to: string }[]
}>()
const emit = defineEmits<{ (e: 'set', key: string, value: string): void; (e: 'clear'): void }>()
const { t } = useI18n()
</script>

<template>
  <div class="grid gap-1">
    <details v-for="(g, i) in groups" :key="g.key" class="group border-b border-line py-3 last:border-b-0" :open="i < 2 || !!q[g.key]">
      <summary class="-mx-2 flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-2 font-bold transition-colors hover:bg-ice focus-visible:outline-offset-[-3px] motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
        <span>{{ g.label }}<span v-if="q[g.key]" class="ml-2 text-sm font-semibold text-muted">1</span></span>
        <span aria-hidden="true" class="relative h-3 w-3 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-3 before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-3 after:w-0.5 after:bg-ink group-open:after:hidden" />
      </summary>
      <div class="mt-2 flex flex-wrap gap-2">
        <button v-for="o in g.options" :key="o.v" type="button" class="chip !min-h-[44px] !px-4 !text-sm" :aria-pressed="q[g.key] === o.v" @click="emit('set', g.key, o.v)">{{ o.label }}</button>
      </div>
    </details>
    <details v-if="kits?.length" class="group border-b border-line py-3" open>
      <summary class="-mx-2 flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-2 font-bold transition-colors hover:bg-ice focus-visible:outline-offset-[-3px] motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
        <span>{{ t('nav.kits') }}</span>
        <span aria-hidden="true" class="relative h-3 w-3 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-3 before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-3 after:w-0.5 after:bg-ink group-open:after:hidden" />
      </summary>
      <ul class="mt-2 grid gap-1">
        <li v-for="k in kits" :key="k.slug"><NuxtLink :to="k.to" class="link inline-flex min-h-[44px] items-center">{{ k.name }}</NuxtLink></li>
      </ul>
    </details>
    <div class="pt-3"><button type="button" class="link inline-flex min-h-[44px] items-center" @click="emit('clear')">{{ t('common.clear') }}</button></div>
  </div>
</template>
