<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
    <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm flex flex-col items-center">
      <div class="flex flex-col items-center mb-4 sm:mb-6">
        <div class="bg-yellow-100 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
          <svg width="36" height="36" class="sm:w-12 sm:h-12" fill="none" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="24" fill="#FACC15"/>
            <text x="24" y="32" text-anchor="middle" font-size="28" fill="#fff">!</text>
          </svg>
        </div>
        <h2 class="text-base sm:text-lg font-bold mb-2 text-gray-800 text-center">Add New Role</h2>
        <p class="text-gray-600 text-center text-sm sm:text-base">Are you sure you want to perform this operation?</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full sm:w-auto">
        <button @click="$emit('cancel')" class="bg-red-500 text-white px-4 py-2 rounded font-semibold text-sm sm:text-base order-2 sm:order-1">No, Back</button>
        <button @click="$emit('confirm')" class="bg-blue-500 text-white px-4 py-2 rounded font-semibold text-sm sm:text-base order-1 sm:order-2">Yes, Continue!</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean
})
</script>

<style scoped>
</style>
