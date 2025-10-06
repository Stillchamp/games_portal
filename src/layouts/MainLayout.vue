<template>
  <div class="min-h-screen bg-slate-25 flex overflow-auto">
    <aside class="w-72 bg-white shadow-card rounded-r-3xl py-8 px-6 flex flex-col justify-between">
      <div>
        <nav class="space-y-2">
          <SidebarLink
            v-for="item in sidebarItems"
            :key="item.label"
            :icon="item.icon"
            :label="item.label"
            :to="item.to"
            :disabled="item.disabled"
            @click="item.label === 'Administrative' ? toggleAdmin() : null"
          />
          <transition name="fade">
            <div v-if="showAdmin" class="ml-4 mt-2">
              <SidebarLink
                v-for="sub in adminItems"
                :key="sub.label"
                :icon="sub.icon"
                :label="sub.label"
                :to="sub.to"
                :disabled="sub.disabled"
              />
            </div>
          </transition>
        </nav>
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-3 rounded-xl bg-accent py-3 px-4 text-white font-medium hover:bg-[#f65758] transition"
      >
        <span
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg"
          >⇦</span
        >
        Log Out
      </button>
    </aside>

    <div class="flex-1 px-10 pb-10">
      <header
        class="sticky top-0 z-20 -mx-10 flex items-center justify-end gap-4 bg-slate-25/90 px-10 py-6 backdrop-blur"
      >
        <button type="button" class="relative">
          <img src="@/assets/notification.png" alt="Notifications" class="h-6 w-6" />
          <span class="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent"></span>
        </button>
        <div class="relative">
          <button 
            @click="toggleProfileDropdown"
            class="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <img
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=0D8ABC&color=fff`"
              alt="Profile"
              class="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p class="text-sm font-semibold text-slate-800">{{ userProfile.name }}</p>
              <p class="text-xs text-slate-500">{{ userProfile.role }}</p>
            </div>
            <svg
              class="h-5 w-5 text-slate-500 transition-transform"
              :class="showProfileDropdown ? 'rotate-180' : ''"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </button>
          
          <!-- Profile Dropdown -->
          <div 
            v-if="showProfileDropdown" 
            class="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]"
          >
            <button 
              @click="viewProfile" 
              class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg flex items-center gap-3"
            >
              <i class="fa fa-user text-blue-500"></i> View Profile
            </button>
            <button 
              @click="logout" 
              class="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center gap-3"
            >
              <i class="fa fa-sign-out-alt text-red-500"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        <slot />
      </main>
    </div>

    <!-- Profile Modal -->
    <div v-if="showProfileModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-semibold text-xl">User Profile</h2>
          <button @click="showProfileModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="text-center mb-6">
          <img
            :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=0D8ABC&color=fff`"
            alt="Profile"
            class="h-24 w-24 rounded-full object-cover mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-800">{{ userProfile.name }}</h3>
          <p class="text-gray-600">{{ userProfile.role }}</p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              v-model="userProfile.name"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readonly
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              v-model="userProfile.email"
              type="email" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readonly
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input 
              v-model="userProfile.role"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readonly
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input 
              v-model="userProfile.department"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readonly
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              v-model="userProfile.phone"
              type="tel" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readonly
            />
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button @click="showProfileModal = false" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarLink from '@/components/layout/SidebarLink.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showProfileDropdown = ref(false)
const showProfileModal = ref(false)

// Get user info from localStorage
const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    return null
  }
}

const extractNameFromEmail = (email) => {
  if (!email) return 'User'
  const parts = email.split('@')[0].split(/[._]/)
  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
}

const storedUser = getStoredUser()
const userEmail = storedUser?.email || 'user@example.com'
const userName = extractNameFromEmail(userEmail)

const userProfile = ref({
  name: userName,
  email: userEmail,
  role: 'Admin',
  department: 'System Administration',
  phone: '+234 123 456 7890'
})

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

function toggleAdmin() {
  showAdmin.value = !showAdmin.value
}

function toggleProfileDropdown() {
  showProfileDropdown.value = !showProfileDropdown.value
}

function viewProfile() {
  showProfileModal.value = true
  showProfileDropdown.value = false
}

function logout() {
  // Clear authentication data from localStorage
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  
  // Close dropdown
  showProfileDropdown.value = false
  
  // Navigate to login page
  router.push('/')
}

function handleClickOutside(event) {
  if (!event.target.closest('.relative')) {
    showProfileDropdown.value = false
  }
}

const isAuthenticated = ref(false)
onMounted(() => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated.value) {
    router.push('/')
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
