<template>
  <div class="" style=" min-height: 300px;">
    <div class="bg-white rounded-2xl shadow-card p-4 sm:p-6 md:p-8 w-full  mx-auto">
      <h2 class="font-semibold text-lg sm:text-xl mb-4 sm:mb-6">Scholarship Award Year</h2>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white rounded-xl shadow-card p-3 sm:p-4 flex flex-col items-center flex-1 min-w-[180px] sm:min-w-[220px]"
        >
          <span
            :class="[
              'inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl',
              stat.iconColor,
              stat.label === 'Inactive' ? 'bg-green-100' : 'bg-gray-100'
            ]"
          >
            <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor"/>
              <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" fill="currentColor"/>
            </svg>
          </span>
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 sm:mt-4">{{ stat.value }}</div>
          <div class="text-sm sm:text-base text-gray-500 mt-2 text-center">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { value: '03', label: 'Total Year', iconColor: 'text-gray-400' },
  { value: '01', label: 'Active Year', iconColor: 'text-gray-400' },
  { value: '01', label: 'Inactive', iconColor: 'text-green-500' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
</style>
