<script setup lang="ts">
type Opt = { value: string; label: string }
const props = defineProps<{ modelValue: string; options: Opt[]; id: string; labelledby: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const open = ref(false)
const active = ref(0)
const root = ref<HTMLElement | null>(null)
const btn = ref<HTMLButtonElement | null>(null)
const list = ref<HTMLElement | null>(null)
const current = computed(() => props.options.find((o) => o.value === props.modelValue) ?? props.options[0]!)

const show = () => {
  active.value = Math.max(0, props.options.findIndex((o) => o.value === props.modelValue))
  open.value = true
  nextTick(() => list.value?.focus())
}
const hide = (returnFocus = true) => {
  open.value = false
  if (returnFocus) nextTick(() => btn.value?.focus())
}
const pick = (i: number) => {
  emit('update:modelValue', props.options[i]!.value)
  hide()
}
const onButtonKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); show() }
}
let typed = ''
let typedTimer: ReturnType<typeof setTimeout> | undefined
const onListKey = (e: KeyboardEvent) => {
  const last = props.options.length - 1
  if (e.key === 'ArrowDown') { e.preventDefault(); active.value = Math.min(last, active.value + 1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); active.value = Math.max(0, active.value - 1) }
  else if (e.key === 'Home') { e.preventDefault(); active.value = 0 }
  else if (e.key === 'End') { e.preventDefault(); active.value = last }
  else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(active.value) }
  else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); hide() }
  else if (e.key === 'Tab') hide(false)
  else if (e.key.length === 1) {
    typed += e.key.toLocaleLowerCase()
    clearTimeout(typedTimer)
    typedTimer = setTimeout(() => (typed = ''), 600)
    const hit = props.options.findIndex((o) => o.label.toLocaleLowerCase().startsWith(typed))
    if (hit >= 0) active.value = hit
  }
}
const onDoc = (e: MouseEvent) => { if (open.value && !root.value?.contains(e.target as Node)) hide(false) }
onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => { document.removeEventListener('mousedown', onDoc); clearTimeout(typedTimer) })
</script>

<template>
  <div ref="root" class="relative">
    <button
      :id="id"
      ref="btn"
      type="button"
      class="input !flex !w-auto min-w-[12rem] items-center justify-between gap-4 text-left"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-controls="`${id}-list`"
      :aria-labelledby="`${labelledby} ${id}`"
      @click="open ? hide() : show()"
      @keydown="onButtonKey"
    >
      <span>{{ current.label }}</span>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-transform motion-reduce:transition-none" :class="open ? 'rotate-180' : ''"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    <ul
      v-show="open"
      :id="`${id}-list`"
      ref="list"
      role="listbox"
      tabindex="-1"
      :aria-labelledby="labelledby"
      :aria-activedescendant="open ? `${id}-opt-${active}` : undefined"
      class="absolute right-0 top-full z-30 mt-2 min-w-full border-[1.5px] border-ink/40 bg-surface py-1 outline-none"
      @keydown="onListKey"
    >
      <li
        v-for="(o, i) in options"
        :id="`${id}-opt-${i}`"
        :key="o.value"
        role="option"
        :aria-selected="o.value === modelValue"
        class="flex min-h-[48px] cursor-pointer items-center justify-between gap-6 whitespace-nowrap px-4"
        :class="[i === active ? 'bg-tint' : '', o.value === modelValue ? 'font-bold' : 'font-medium']"
        @mouseenter="active = i"
        @click="pick(i)"
      >
        <span>{{ o.label }}</span>
        <svg v-if="o.value === modelValue" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
      </li>
    </ul>
  </div>
</template>
