<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
    <div class="bg-white rounded-2xl shadow-card p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto max-h-[90vh] overflow-y-auto" style="font-family: 'Poppins', sans-serif;">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div>
          <label class="block font-semibold mb-2">Category</label>
          <input v-model="categoryName" type="text" placeholder="Input Category Name" class="w-full border border-slate-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary-600" />
        </div>
        <div>
          <label class="block font-semibold mb-2">Category Amount (N)</label>
          <input v-model="categoryAmount" type="text" inputmode="numeric" pattern="[0-9,]*" placeholder="Input Category Amount" class="w-full border border-slate-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary-600" @input="formatAmount" />
        </div>
      </div>
      <h3 class="font-semibold text-base sm:text-lg mb-2">Class/Level</h3>
      <div class="border border-slate-300 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 max-h-60 overflow-y-auto">
        <div v-for="(level, idx) in classLevels" :key="idx" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
          <input 
            v-model="classLevels[idx]" 
            type="text" 
            placeholder="Input Class/Level" 
            class="flex-1 border border-slate-300 rounded-lg px-3 py-2 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
          <button @click="removeLevel(idx)" class="bg-red-200 text-red-700 font-semibold px-4 py-2 sm:px-6 rounded-lg text-sm sm:text-base whitespace-nowrap">Delete</button>
        </div>
        <div class="flex justify-end mt-2">
          <button @click="addLevel" class="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg px-3 py-2 sm:px-4 flex items-center gap-2 shadow transition text-sm sm:text-base">
            + Add More
          </button>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-6 sm:mt-8">
        <button @click="$emit('close')" class="text-slate-500 font-semibold px-4 py-2 sm:px-6 rounded-lg text-sm sm:text-base order-2 sm:order-1">Cancel</button>
        <button @click="submitCategory" class="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg px-6 py-3 sm:px-8 shadow transition text-sm sm:text-base order-1 sm:order-2">Add Category</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
const emit = defineEmits(['add-category', 'close'])
const props = defineProps({ editData: Object })
const categoryName = ref('')
const categoryAmount = ref('')
const classLevels = ref([''])

watch(() => props.editData, (val) => {
  if (val && val.name) {
    categoryName.value = val.name
    categoryAmount.value = val.amount
    classLevels.value = Array.isArray(val.levels) ? [...val.levels] : ['']
  }
}, { immediate: true })

function formatAmount(e) {
  let val = e.target.value.replace(/[^\d]/g, '')
  if (val) {
    val = Number(val).toLocaleString()
  }
  categoryAmount.value = val
}
function addLevel() {
  classLevels.value.push('')
}
function removeLevel(idx) {
  classLevels.value.splice(idx, 1)
}
function submitCategory() {
  // User-friendly validation with specific toasts
  if (!categoryName.value) {
    toast.error('Please enter a category name.');
    return;
  }
  if (!categoryAmount.value) {
    toast.error('Please enter a category amount.');
    return;
  }
  if (classLevels.value.length === 0) {
    toast.error('Please add at least one class/level.');
    return;
  }
  
  // Check if any class level input field is empty
  const emptyLevels = classLevels.value.filter(level => !level || level.trim() === '');
  if (emptyLevels.length > 0) {
    toast.error('Input field empty: Please fill in all class/level fields.');
    return;
  }
  
  // Emit the new category object
  emit('add-category', {
    name: categoryName.value,
    amount: categoryAmount.value,
    levels: [...classLevels.value],
  });
  toast.success('Category added successfully!');
  // Reset form fields
  categoryName.value = '';
  categoryAmount.value = '';
  classLevels.value = [''];
  // Optionally close modal
  emit('close');
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
</style>
