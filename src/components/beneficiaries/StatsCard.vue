<template>
  <div
    class="flex h-full flex-col rounded-2xl border border-primary-100 bg-white/95 px-6 py-5 shadow-card backdrop-blur-sm"
  >
    <div class="flex items-start justify-between">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{{ title }}</p>
      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
        <img v-if="iconSrc" :src="iconSrc" :alt="`${title} icon`" class="h-6 w-6 object-contain" />
      </span>
    </div>
    <div class="mt-6">
      <div
        :class="
          hasMultipleEntries ? 'flex items-center gap-10 justify-center divide-x divide-slate-200' : 'grid gap-4'
        "
      >
        <div
          v-for="(entry, index) in entries"
          :key="entry.label"
          class="space-y-1"
          :class="hasMultipleEntries && index > 0 ? 'pl-6' : ''"
        >
          <p class="text-3xl font-semibold text-primary-600 sm:text-4xl">{{ entry.value }}</p>
          <p class="text-sm font-medium text-slate-500">{{ entry.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import usersIcon from '@/assets/Group 3470560.png'
import statusIcon from '@/assets/notification.png'
import genderIcon from '@/assets/Group 3470560.png'
import awardIcon from '@/assets/Group 3470560.png'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  entries: {
    type: Array,
    default: () => [],
  },
  icon: {
    type: String,
    default: 'users',
  },
})

const iconMap = {
  users: usersIcon,
  status: statusIcon,
  gender: genderIcon,
  award: awardIcon,
}

const iconSrc = computed(() => iconMap[props.icon] || usersIcon)
const hasMultipleEntries = computed(() => props.entries.length > 1)
</script>
