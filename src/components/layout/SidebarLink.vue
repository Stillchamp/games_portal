<template>
  <RouterLink
    :to="to"
    class="group flex items-center justify-center md:justify-start gap-1 sm:gap-2 md:gap-3 
           rounded-lg md:rounded-xl 
           py-2 px-1 sm:py-2 sm:px-2 md:py-3 md:px-4 
           font-medium transition-all duration-200
           /* Mobile: Compact, icon-focused */
           flex-col md:flex-row
           text-xs sm:text-sm md:text-base"
    :class="[
      isActive
        ? 'bg-primary-600 text-white shadow-card'
        : 'text-slate-500 hover:bg-primary-50 hover:text-primary-600',
      disabled ? 'pointer-events-none opacity-50' : '',
    ]"
  >
    <!-- Icon -->
    <span
      class="inline-flex 
             h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 
             items-center justify-center 
             rounded-lg md:rounded-xl 
             bg-primary-50 text-primary-500 
             group-hover:bg-primary-100 group-hover:text-primary-600
             transition-all duration-200"
      :class="isActive ? 'bg-primary-500 text-white' : ''"
    >
      <img 
        v-if="iconSrc" 
        :src="iconSrc" 
        :alt="`${label} icon`" 
        class="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" 
      />
    </span>
    
    <!-- Label -->
    <span class="
      /* Mobile: Very small text, truncated */
      text-xs leading-tight md:text-base md:leading-normal
      /* Hide on very small mobile, show abbreviated on small mobile */
      hidden sm:block
      /* Truncate long text */
      truncate
      /* Responsive font weight */
      font-medium md:font-medium
    ">
      <!-- Show abbreviated text on small screens, full text on medium+ -->
      <span class="md:hidden">{{ label.slice(0, 4) }}</span>
      <span class="hidden md:inline">{{ label }}</span>
    </span>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import dashboardIcon from '@/assets/Home.png'
import beneficiariesIcon from '@/assets/Group 3470560.png'
import settingsIcon from '@/assets/Group 3470572.png'
import communicationIcon from '@/assets/Report Files.png'
import administrativeIcon from '@/assets/Test Paper.png'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const iconMap = {
  dashboard: dashboardIcon,
  users: beneficiariesIcon,
  settings: settingsIcon,
  chat: communicationIcon,
  award: administrativeIcon,
}

const route = useRoute()
const isActive = computed(() => route.path === props.to)
const iconSrc = computed(() => iconMap[props.icon] || iconMap.dashboard)
</script>
