<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
    <div class="bg-white rounded-2xl shadow-card p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto max-h-[95vh] overflow-y-auto" style="font-family: 'Poppins', sans-serif;">
      <h2 class="font-semibold text-lg sm:text-xl mb-4 sm:mb-6">Add New Scholarship Year</h2>
  <div class="mb-4 sm:mb-6">
    <label class="block font-semibold mb-2 text-sm sm:text-base">Scholarship Year</label>
    <input 
      v-model="yearInput" 
      type="text" 
      placeholder="2024/2025" 
      class="w-full border border-slate-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
    />
  </div>
      <h3 class="font-semibold text-base sm:text-lg mb-2">Award Category</h3>
      <div class="border border-slate-300 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6 overflow-x-auto">
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[600px]">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="py-2 px-1 sm:px-2 text-xs sm:text-sm font-semibold">S/N</th>
                <th class="py-2 px-1 sm:px-2 text-xs sm:text-sm font-semibold">Category</th>
                <th class="py-2 px-1 sm:px-2 text-xs sm:text-sm font-semibold">Class/Level</th>
                <th class="py-2 px-1 sm:px-2 text-xs sm:text-sm font-semibold">Amount</th>
                <th class="py-2 px-1 sm:px-2 text-xs sm:text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cat, idx) in categories" :key="idx" class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-2 px-1 sm:px-2 font-semibold text-xs sm:text-sm">{{ idx + 1 }}</td>
                <td class="py-2 px-1 sm:px-2 font-semibold text-primary-700 text-xs sm:text-sm">{{ cat.name }}</td>
                <td class="py-2 px-1 sm:px-2">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="(level, i) in cat.levels" :key="i" class="bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold text-xs whitespace-nowrap">
                      {{ level }}
                    </span>
                  </div>
                </td>
                <td class="py-2 px-1 sm:px-2 font-bold text-sm sm:text-lg">₦{{ cat.amount.toLocaleString() }}</td>
                <td class="py-2 px-1 sm:px-2">
                  <button @click="editCategory(idx)" class="bg-red-200 text-red-700 font-semibold px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end mt-3 sm:mt-4">
          <button @click="showCategoryModal = true" class="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg px-3 py-2 sm:px-4 flex items-center gap-2 shadow transition text-xs sm:text-sm">
            + Add More
          </button>
        </div>
        <CategoryModal v-if="showCategoryModal" @close="closeCategoryModal" @add-category="addCategory" :edit-data="editData" />
      </div>
      
      <!-- Award Type Section -->
      <div class="mb-4 sm:mb-6">
        <label class="block font-semibold mb-3 text-sm sm:text-base">Award Type</label>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <label class="flex items-center">
            <input 
              type="radio" 
              value="Merit-Based"
              v-model="selectedAwardType" 
              class="mr-2 w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span class="text-xs sm:text-sm font-medium">Merit-Based</span>
          </label>
          <label class="flex items-center">
            <input 
              type="radio" 
              value="Need-Based"
              v-model="selectedAwardType" 
              class="mr-2 w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span class="text-xs sm:text-sm font-medium">Need-Based</span>
          </label>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-6 sm:mt-8">
        <button @click="$emit('close')" class="text-slate-500 font-semibold px-4 py-2 sm:px-6 rounded-lg text-sm sm:text-base order-2 sm:order-1">Cancel</button>
        <button @click="createYear" class="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg px-6 py-3 sm:px-8 shadow transition text-sm sm:text-base order-1 sm:order-2">Create</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import CategoryModal from './CategoryModal.vue'
import { toast } from 'vue3-toastify'

const emit = defineEmits(['update-year', 'close'])

const yearInput = ref('')
const categories = ref([])
const showCategoryModal = ref(false)
const editData = ref(null)

// Award Type from Figma
const selectedAwardType = ref('')

function closeCategoryModal() {
  showCategoryModal.value = false
  editData.value = null
}
function addCategory(data) {
  if (editData.value !== null) {
    categories.value[editData.value] = data
  } else {
    categories.value.push(data)
  }
  closeCategoryModal()
}
function editCategory(idx) {
  editData.value = idx
  showCategoryModal.value = true
}
function createYear() {
  if (!yearInput.value) {
    toast.error('Please enter a scholarship year.');
    return;
  }
  if (!selectedAwardType.value) {
    toast.error('Please select an award type.');
    return;
  }
  if (categories.value.length === 0) {
    toast.error('Please add at least one award category.');
    return;
  }
  // Check for empty category fields
  for (const cat of categories.value) {
    if (!cat.name || !cat.amount || !cat.levels || cat.levels.length === 0) {
      toast.error('Please fill all fields for each category.');
      return;
    }
  }
  const yearObj = {
    year: yearInput.value,
    categories: categories.value.map(cat => ({
      name: cat.name,
      levels: cat.levels,
      amount: cat.amount
    })),
    awardType: selectedAwardType.value,
    status: 'Active',
    id: Date.now()
  }
  toast.success('Scholarship set successfully!');
  console.log('Creating year:', yearObj)
  emit('update-year', yearObj)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
</style>
