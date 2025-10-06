<template>
  <div class="min-h-screen bg-[#e6f0fa]">
    <ForgotPasswordNavbar />
    <div class="flex items-center justify-center w-full">
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-10 flex flex-col items-center mt-12">
        <img src="/src/assets/logo.png" alt="Logo" class="h-24 mb-6" />
        <h2 class="text-xl font-bold mb-6">Forgot Password</h2>
        <form class="w-full" @submit.prevent="handleForgot">
          <label class="block mb-2 font-semibold">Email<span class="text-red-500">*</span></label>
          <input v-model="email" type="email" placeholder="Example@xxx.com" class="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600" />
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-3 transition">Forgot Password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import ForgotPasswordNavbar from '@/components/layout/ForgotPasswordNavbar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const email = ref('')
const router = useRouter()

function handleForgot() {
  if (!email.value) {
    toast.error('Please enter your email.')
    return
  }
  // You can add more email format validation here if needed
  router.push('/verification')
}
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
