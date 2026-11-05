<script setup lang="ts">
defineProps<{ to: string; src: string; width: number; height: number; name: string; price: number; ratio?: string }>()
</script>

<template>
  <article class="grid gap-4">
    <NuxtLink :to="to" class="block overflow-hidden bg-ice" tabindex="-1" aria-hidden="true">
      <NuxtPicture :src="src" alt="" :width="width" :height="height" sizes="xs:100vw sm:50vw lg:30vw" loading="lazy" :img-attrs="{ class: 'w-full object-cover ' + (ratio ?? 'aspect-[4/5]') }" />
    </NuxtLink>
    <div>
      <h3 class="!text-base"><NuxtLink :to="to" class="underline underline-offset-4">{{ name }}</NuxtLink></h3>
      <p class="mt-1 font-bold">{{ formatMnt(price) }}</p>
    </div>
  </article>
</template>
