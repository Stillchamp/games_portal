<template>
  <div
    class="flex items-center gap-4 rounded-2xl bg-white py-6 px-6 shadow-card transition hover:shadow-lg"
  >
    <span class="flex h-14 w-14 items-center justify-center rounded-full" :class="iconStyles">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-7 w-7"
        fill="currentColor"
      >
        <path
          d="M9 11a3 3 0 1 0-2.999-3A3 3 0 0 0 9 11m6 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3m-7 2c-2.67 0-8 1.337-8 4v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2c0-2.663-5.33-4-8-4m8 0a5.93 5.93 0 0 1 2.664.6A5.014 5.014 0 0 1 20 18v2a1 1 0 0 1-1 1h-5.5a2.5 2.5 0 0 0 .5-1.5v-1.083c0-1.4-.68-2.497-1.764-3.315A10.609 10.609 0 0 1 16 13"
        />
      </svg>
    </span>
    <div>
      <p class="text-3xl font-bold leading-none text-slate-900">{{ formattedTotal }}</p>
      <p class="mt-1 text-sm font-medium text-slate-500">{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'group',
  },
  total: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  accent: {
    type: String,
    default: '',
  },
})

const formattedTotal = computed(() => props.total.toString().padStart(2, '0'))
const iconStyles = computed(() => props.accent || 'bg-slate-100 text-slate-400')
</script>
