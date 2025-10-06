<template>
  <article
    class="relative overflow-hidden rounded-[24px] bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
  >
    <img
      :src="ellipseDecoration"
      alt=""
      class="pointer-events-none absolute -top-6 right-0 w-32 select-none"
    />

    <div class="relative z-10 flex items-start justify-between">
      <slot name="icon">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-600"
        >
          ℹ️
        </div>
      </slot>

      <div>
        <slot name="trend" />
      </div>
    </div>

    <p class="relative z-10 mt-6 text-4xl font-semibold leading-tight text-slate-900">
      {{ value }}
    </p>
    <p class="relative z-10 mt-2 text-base font-medium text-slate-600">
      {{ label }}
    </p>
  </article>
</template>

<script setup>
import ellipseDecoration from '@/assets/Ellipse 890.png'

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})
</script>
