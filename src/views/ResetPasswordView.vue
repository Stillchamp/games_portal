<template>
  <div class="min-h-screen bg-[#e6f0fa]">
    <ForgotPasswordNavbar />

    <div class="flex flex-col items-center justify-center" style="min-height:80vh;">
      <h2 class="text-2xl font-bold mb-8 mt-8 text-center">Reset Password</h2>

      <div class="w-full max-w-lg bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <form class="w-full" @submit.prevent="handleReset">

          <!-- New Password -->
          <label class="block mb-2 font-semibold">New Password</label>
          <div class="relative mb-4">
            <input
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="New Password"
              class="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <!-- Toggle Icon -->
            <button
              type="button"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500"
              @click="showNewPassword = !showNewPassword"
            >
              <span v-if="showNewPassword">
                <!-- Eye Off -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.25 0-9.75-3.75-11-9
                       1.007-4.245 4.74-7.5 9-7.5 1.123 0 2.21.185 3.22.525M15 12a3
                       3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3l18 18" />
                </svg>
              </span>
              <span v-else>
                <!-- Eye -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478
                       0 8.268 2.943 9.542 7-1.274 4.057-5.064
                       7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
            </button>
          </div>

          <!-- Confirm Password -->
          <label class="block mb-2 font-semibold">Confirm New Password</label>
          <div class="relative mb-6">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm New Password"
              class="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <!-- Toggle Icon -->
            <button
              type="button"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <span v-if="showConfirmPassword">
                <!-- Eye Off -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.25 0-9.75-3.75-11-9
                       1.007-4.245 4.74-7.5 9-7.5 1.123 0 2.21.185 3.22.525M15 12a3
                       3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3l18 18" />
                </svg>
              </span>
              <span v-else>
                <!-- Eye -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478
                       0 8.268 2.943 9.542 7-1.274 4.057-5.064
                       7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-grblueen-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-3 transition"
            style="background:#009B2A;"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import ForgotPasswordNavbar from '@/components/layout/ForgotPasswordNavbar.vue'

const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const router = useRouter()

function handleReset() {
  if (!newPassword.value || !confirmPassword.value) {
    toast.error('Please fill in all fields.')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    toast.error('Passwords do not match.')
    return
  }
  router.push('/password-changed')
}
</script>
