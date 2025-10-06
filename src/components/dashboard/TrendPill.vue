<template>
  <span
    class="inline-flex items-center gap-1 rounded-full bg-slate-100/70 px-3 py-1 text-sm font-medium text-[#1D4ED8]"
  >
    <span>{{ value }}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="h-4 w-4"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75 11.5 8.25 19.5 16.5" />
    </svg>
  </span>
</template>

<script setup>
defineProps({
  value: {
    type: String,
    required: true,
  },
})
</script>
