<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <!-- GAME-P Logo and Title -->
        <div class="flex items-center justify-center mb-6">
          <img src="@/assets/game.jpg" alt="GAME-P Logo" class="w-12 h-12 mr-3" />
          <h1 class="text-2xl font-bold text-gray-900">GAME-P</h1>
        </div>
      </div>

      <!-- Login Form Card -->
      <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <!-- Organization Logo -->
        <div class="flex justify-center mb-4">
          <div
            class="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border"
          >
            <img src="@/assets/game.jpg" alt="Organization Logo" class="w-16 game h-16 object-contain" />
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-xl font-semibold text-gray-900 mb-2 text-center">
          Gbemiga Abiodun Memorial<br />Education Programme Portal
        </h2>

        <!-- Subtitle -->
        <p class="text-gray-600 text-sm mb-8 text-center">Sign in to GAME-P</p>
        <form @submit="handleLogin" class="space-y-6">
          <!-- Email Input -->
          <div>
            <input
              v-model="email"
              type="email"
              placeholder="E-mail"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>

          <!-- Password Input -->
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.25 0-9.75-3.75-11-9 1.007-4.245 4.74-7.5 9-7.5 1.123 0 2.21.185 3.22.525M15 12a3 3 0 11-6 0 3 3 0 616 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3l18 18"
                />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 616 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group shadow-md"
          >
            Login
            <svg
              class="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <!-- Remember & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span class="ml-2 text-sm text-gray-600">Remember</span>
            </label>
            <router-link
              to="/forgot-password"
              class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Forgot Password
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

function handleLogin(e) {
  e.preventDefault()

  if (!email.value) {
    toast.error('Please enter your email.')
    return
  }

  if (!password.value) {
    toast.error('Please enter your password.')
    return
  }

  // For demo purposes, using the same credentials
  if (email.value !== 'akindehinisiaka@gmail.com' || password.value !== 'Akindehin1234') {
    toast.error('Invalid email or password.')
    return
  }

  toast.success('Login successful!')
  localStorage.setItem('isAuthenticated', 'true')
  localStorage.setItem('user', JSON.stringify({ email: email.value }))
  router.push('/dashboard')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

/* Background matching the Figma design */
.bg-gray-50 {
  background-color: #f9fafb;
}

/* Input styling to match Figma exactly */
input {
  font-size: 14px;
  letter-spacing: 0.025em;
}

input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

/* Enhanced focus styles */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Button styling */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
}

/* Card shadow matching Figma */
.shadow-lg {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.game{
  /* border: 2px solid red; */
   border-radius: 50px;
}

/* Checkbox styling */
input[type='checkbox']:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
