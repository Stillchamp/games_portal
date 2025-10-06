<template>
  <!-- Mobile Menu Button - Only visible on small screens -->
  <button
    @click="toggleMobileSidebar"
    class="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors border border-blue-500"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path v-if="!isMobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Mobile Overlay - Only visible when sidebar is open on mobile -->
  <div 
    v-if="isMobileOpen" 
    @click="closeMobileSidebar"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity"
  ></div>

  <!-- Main Sidebar -->
  <aside
    :class="[
      'bg-white shadow-card transition-transform duration-300 ease-in-out',
      // Mobile: Slide-out sidebar
      'fixed top-0 left-0 h-full w-72 z-40 transform',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full',
      // Medium screens and up: Static sidebar
      'md:translate-x-0 md:static md:w-64 md:h-screen md:rounded-r-3xl',
      // Large screens: Wider
      'lg:w-72 xl:w-80',
      // Padding
      'py-4 px-3 md:py-4 md:px-3 lg:py-6 lg:px-4 xl:py-8 xl:px-6',
      // Flex layout
      'flex flex-col justify-between'
    ]"
  >
    <!-- Logo Section - Hidden on mobile, visible on medium+ screens -->
    <div class="hidden md:flex w-full items-center mb-4 lg:mb-6 xl:mb-8">
      <img :src="logo" alt="Logo" class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 mr-2 lg:mr-3" />
      <span class="font-bold text-lg lg:text-xl xl:text-2xl text-[#2563eb] truncate">Game P Portal</span>
    </div>
    <!-- Navigation Section -->
    <div class="flex-1 flex 
                /* Mobile: Horizontal layout, center items */
                flex-row items-center justify-center 
                /* Medium+: Vertical layout, stretch items */
                md:flex-col md:items-stretch md:justify-start
                /* Add proper spacing */
                px-2 sm:px-3 md:px-0">
      <nav class="flex 
                  /* Mobile: Horizontal with spacing */
                  flex-row space-x-1 sm:space-x-2 w-full justify-around
                  /* Medium+: Vertical with spacing */
                  md:flex-col md:space-x-0 md:space-y-1 lg:space-y-2 md:justify-start">
        <SidebarLink
        v-for="item in sidebarItems"
        :key="item.label"
        :icon="item.icon"
        :label="item.label"
        :to="item.to"
        :disabled="item.disabled"
        :class="
          /* Mobile: Compact layout */
          'text-xs sm:text-sm md:text-base'
        "
        @click="item.label === 'Administrative' ? toggleAdmin() : null"
        /> 
        <!-- Admin Submenu - Only visible on medium+ screens -->
        <transition name="fade">
          <div v-if="showAdmin" class="hidden md:block ml-4 mt-1 lg:mt-2 space-y-1">
            <SidebarLink
              v-for="sub in adminItems"
              :key="sub.label"
              :icon="sub.icon"
              :label="sub.label"
              :to="sub.to"
              :disabled="sub.disabled"
              class="text-sm lg:text-base pl-2"
            />
          </div>
        </transition>
      </nav>
    </div>
    <!-- Logout Button -->
    <button
      type="button"
      @click="handleLogout"
      class="inline-flex items-center gap-2 lg:gap-3 rounded-lg md:rounded-xl 
             bg-accent py-1.5 px-2 sm:py-2 sm:px-3 md:py-2 md:px-3 lg:py-3 lg:px-4
             text-white font-medium hover:bg-[#f65758] transition
             text-xs sm:text-sm md:text-base
             /* Mobile: Icon only */
             md:mt-auto md:mb-0
             /* Position in mobile layout */
             order-last md:order-none"
    >
      <span
        class="inline-flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-white/20 text-sm md:text-lg"
      >
        <i class="fa fa-sign-out-alt"></i>
      </span>
      <!-- Text hidden on mobile, visible on medium+ -->
      <span class="hidden md:inline lg:text-base">Log Out</span>
    </button>
  </aside>
</template>

<script setup>
import SidebarLink from '@/components/layout/SidebarLink.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.svg'

const router = useRouter()

// Mobile sidebar state
const isMobileOpen = ref(false)

const sidebarItems = ref([
  { icon: 'dashboard', label: 'Dashboard', to: '/dashboard', disabled: false },
  { icon: 'users', label: 'Beneficiaries', to: '/beneficiaries', disabled: false },
  { icon: 'settings', label: 'Setup', to: '/setup', disabled: false },
  { icon: 'chat', label: 'Communication', to: '/communication', disabled: false },
  { icon: 'award', label: 'Administrative', to: '#', disabled: false },
])

const adminItems = ref([
  { icon: 'award', label: 'User', to: '/administrative/user', disabled: false },
  { icon: 'award', label: 'Roles', to: '/administrative/roles', disabled: false },
])

const showAdmin = ref(false)

// Mobile sidebar functions
function toggleMobileSidebar() {
  isMobileOpen.value = !isMobileOpen.value
}

function closeMobileSidebar() {
  isMobileOpen.value = false
}

function toggleAdmin() {
  showAdmin.value = !showAdmin.value
}

function handleNavClick(item) {
  if (item.label === 'Administrative') {
    toggleAdmin()
  } else {
    // Close mobile sidebar when navigating
    closeMobileSidebar()
  }
}

function handleLogout() {
  // Clear authentication data from localStorage
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  
  // Close mobile sidebar
  closeMobileSidebar()
  
  // Navigate to login page
  router.push('/')
}
</script>

<style scoped>
/* Smooth transitions for responsive changes */
aside {
  transition: all 0.3s ease-in-out;
}

/* Fade transition for admin submenu */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Ensure proper stacking on mobile */
@media (max-width: 768px) {
  aside {
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}

/* Ensure sidebar doesn't interfere with content on larger screens */
@media (min-width: 768px) {
  aside {
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
