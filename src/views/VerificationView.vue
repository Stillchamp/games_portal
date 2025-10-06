<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
  <div class="flex w-full max-w-5xl min-h-[600px] bg-white rounded-xl shadow-md overflow-hidden" style="height:600px;">
      <div class="w-full md:w-1/2 p-10 ">
        <div class="flex items-center mb-8">
          <img src="@/assets/logo.png" alt="Logo" style="width: 67px; height: 59px; margin-right: 12px;" />
          <span class="font-semibold text-base text-gray-700">Game-P</span>
        </div>
  <div class="mb-8 text-center flex flex-col justify-center" style="margin-top:120px;">
          <h2 class="text-xl font-bold mb-2 text-green-700">A verification Email was sent to you!</h2>
          <p class="mb-6 text-gray-700">Kindly check your mail box and follow the instructions. Check spam folder in case you couldn't find it.</p>
        </div>
        <button @click="goToReset" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-3 transition">Confirm</button>
      </div>
      <div class="hidden md:block md:w-1/2 relative">
        <img src="@/assets/logo2.png" alt="Verification Side" class="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goToReset() {
  router.push('/reset-password')
}
</script>
