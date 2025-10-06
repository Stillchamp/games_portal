<template>
  <div class="bg-white rounded-2xl shadow-card p-4 sm:p-6 md:p-8 w-full">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
      <h2 class="font-semibold text-lg sm:text-xl">Manage Scholarship Award Year</h2>
      <button @click="showModal = true" class="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 flex items-center gap-2 shadow transition text-sm sm:text-base w-full sm:w-auto justify-center">
        <span class="text-lg sm:text-xl font-bold">+</span> Create Year
      </button>
    </div>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <CreateScholarshipYearModal @close="showModal = false" @update-year="handleCreateYear" />
    </div>
    
    <!-- View Modal -->
    <div v-if="viewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div class="bg-white rounded-2xl shadow-card p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <h2 class="font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Scholarship Year Details</h2>
        <div class="mb-2 text-sm sm:text-base"><span class="font-semibold">Year:</span> {{ selectedYear.year }}</div>
        <div class="mb-2 text-sm sm:text-base"><span class="font-semibold">Status:</span> {{ selectedYear.status }}</div>
        <div class="mb-2 text-sm sm:text-base">
          <span class="font-semibold">Categories:</span>
          <div class="mt-1 flex flex-wrap gap-2">
            <span v-for="cat in selectedYear.categories" :key="cat.name || cat" :class="categoryClass(cat.name || cat)" class="inline-block px-3 py-1 rounded-full font-semibold text-xs sm:text-sm">
              {{ cat.name || cat }}
              <span v-if="cat.levels && cat.levels.length" class="ml-1 text-xs opacity-75">
                {{ cat.levels.join(' ') }}
              </span>
              <span v-if="cat.amount" class="ml-1 text-xs opacity-75">
                - ₦{{ formatAmount(cat.amount) }}
              </span>
            </span>
          </div>
        </div>
        <div class="flex justify-end mt-4 sm:mt-6">
          <button @click="viewModal = false" class="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Close</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div class="bg-white rounded-2xl shadow-card p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <h2 class="font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Edit Scholarship Year</h2>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <input 
            v-model="selectedYear.year" 
            type="text" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select 
            v-model="selectedYear.status" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Award Categories</label>
          <div v-if="selectedYear.categories && selectedYear.categories.length" class="space-y-3">
            <div v-for="(cat, index) in selectedYear.categories" :key="index" class="border border-gray-200 rounded-lg p-3">
              <div class="mb-2">
                <label class="block text-xs font-medium text-gray-600 mb-1">Category Name</label>
                <input 
                  v-model="cat.name" 
                  type="text" 
                  class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              
              <div class="mb-2" v-if="cat.levels">
                <label class="block text-xs font-medium text-gray-600 mb-1">Award Levels</label>
                <div class="flex flex-wrap gap-1">
                  <span v-for="(level, levelIndex) in cat.levels" :key="levelIndex" class="bg-gray-100 px-2 py-1 rounded text-xs flex items-center gap-1">
                    {{ level }}
                    <button @click="removeLevel(index, levelIndex)" class="text-red-500 hover:text-red-700">×</button>
                  </span>
                </div>
                <div class="mt-1 flex gap-2">
                  <input 
                    v-model="newLevel[index]" 
                    @keyup.enter="addLevel(index)"
                    type="text" 
                    placeholder="Add new level"
                    class="flex-1 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <button @click="addLevel(index)" class="bg-primary-500 text-white px-2 py-1 rounded text-xs hover:bg-primary-600">Add</button>
                </div>
              </div>
              
              <div class="mb-2" v-if="cat.amount">
                <label class="block text-xs font-medium text-gray-600 mb-1">Amount (₦)</label>
                <input 
                  v-model="cat.amount" 
                  type="number" 
                  class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              
              <button @click="removeCategory(index)" class="text-red-500 hover:text-red-700 text-xs">Remove Category</button>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4 sm:mt-6 gap-3">
          <button @click="editModal = false" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Cancel</button>
          <button @click="handleEditYear(selectedYear)" class="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Save</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div class="bg-white rounded-2xl shadow-card p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md mx-auto">
        <h2 class="font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-red-600">Delete Scholarship Year</h2>
        <p class="text-gray-700 mb-4">Are you sure you want to delete the scholarship year "{{ selectedYear.year }}"? This action cannot be undone.</p>
        <div class="flex justify-end mt-4 sm:mt-6 gap-3">
          <button @click="deleteModal = false" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Cancel</button>
          <button @click="confirmDelete" class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Delete</button>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left rounded-lg min-w-[700px]">
        <thead>
          <tr class="bg-primary-600 text-white rounded-lg">
            <th class="py-2 sm:py-3 px-2 sm:px-4 rounded-tl-lg text-xs sm:text-sm font-semibold">SCHOLARSHIP YEAR</th>
            <th class="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold">AVAILABLE AWARD CATEGORIES</th>
            <th class="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold">STATUS</th>
            <th class="py-2 sm:py-3 px-2 sm:px-4 rounded-tr-lg text-xs sm:text-sm font-semibold"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(year, idx) in years" :key="year.id" class="border-b border-slate-100 hover:bg-gray-50">
            <td class="py-3 sm:py-4 px-2 sm:px-4 font-semibold text-slate-700 text-xs sm:text-sm">{{ year.year }}</td>
            <td class="py-3 sm:py-4 px-2 sm:px-4">
              <div class="flex flex-wrap gap-1">
                <span v-for="cat in year.categories" :key="cat.name || cat" :class="categoryClass(cat.name || cat)" class="inline-block mr-1 mb-1 px-2 py-1 sm:px-3 sm:py-1 rounded-full font-semibold text-xs">
                  <span v-if="cat.levels && cat.levels.length" class="ml-1 text-xs text-slate-500">
                    {{ cat.levels.join(' , ') }}
                  </span>
                 
                </span>
              </div>
            </td>
            <td class="py-3 sm:py-4 px-2 sm:px-4">
              <span class="inline-flex items-center gap-2 text-green-600 font-semibold text-xs sm:text-sm">
                <span class="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-300 inline-block"></span> {{ year.status }}
              </span>
            </td>
            <td class="py-3 sm:py-4 px-2 sm:px-4">
              <div class="relative">
                <button 
                  @click="toggleDropdown(idx)" 
                  class="text-accent font-semibold text-xs sm:text-sm hover:text-accent/80 transition-colors"
                >
                  Action <span class="text-sm sm:text-lg">&#x25BC;</span>
                </button>
                
                <!-- Action Dropdown -->
                <div 
                  v-if="actionIdx === idx" 
                  class="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[120px]"
                >
                  <button 
                    @click="viewYear(year)" 
                    class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-t-lg flex items-center gap-2"
                  >
                    <i class="fa fa-eye text-blue-500"></i> View
                  </button>
                  <button 
                    @click="editYear(year)" 
                    class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <i class="fa fa-edit text-green-500"></i> Edit
                  </button>
                  <button 
                    @click="deleteYear(year)" 
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center gap-2"
                  >
                    <i class="fa fa-trash text-red-500"></i> Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
function isLastLevel(levels, level) {
  return levels.indexOf(level) === levels.length - 1;
}
import { ref } from 'vue'
import CreateScholarshipYearModal from './CreateScholarshipYearModal.vue'

const showModal = ref(false)
const viewModal = ref(false)
const editModal = ref(false)
const deleteModal = ref(false)
const years = ref([])
const actionIdx = ref(null)
const selectedYear = ref({})
const newLevel = ref({}) // For adding new levels to categories

function handleCreateYear(newYear) {
  // Only keep year, categories, status, and id
  years.value.push({
    year: newYear.year,
    categories: newYear.categories,
    status: newYear.status,
    id: newYear.id
  })
  showModal.value = false
}

function toggleDropdown(idx) {
  actionIdx.value = actionIdx.value === idx ? null : idx
}

function viewYear(year) {
  selectedYear.value = { ...year }
  viewModal.value = true
  actionIdx.value = null
}

function editYear(year) {
  selectedYear.value = JSON.parse(JSON.stringify(year)) // Deep copy
  editModal.value = true
  actionIdx.value = null
}

function deleteYear(year) {
  selectedYear.value = year
  deleteModal.value = true
  actionIdx.value = null
}

function confirmDelete() {
  years.value = years.value.filter(year => year.id !== selectedYear.value.id)
  deleteModal.value = false
  selectedYear.value = {}
}

function handleEditYear(updatedYear) {
  const index = years.value.findIndex(year => year.id === updatedYear.id)
  if (index !== -1) {
    years.value[index] = updatedYear
  }
  editModal.value = false
}

function addLevel(categoryIndex) {
  if (newLevel.value[categoryIndex] && newLevel.value[categoryIndex].trim()) {
    if (!selectedYear.value.categories[categoryIndex].levels) {
      selectedYear.value.categories[categoryIndex].levels = []
    }
    selectedYear.value.categories[categoryIndex].levels.push(newLevel.value[categoryIndex].trim())
    newLevel.value[categoryIndex] = ''
  }
}

function removeLevel(categoryIndex, levelIndex) {
  selectedYear.value.categories[categoryIndex].levels.splice(levelIndex, 1)
}

function removeCategory(categoryIndex) {
  selectedYear.value.categories.splice(categoryIndex, 1)
}

function formatAmount(amount) {
  return new Intl.NumberFormat('en-NG').format(amount)
}





function categoryClass(cat) {
  if (cat === 'Primary') return 'bg-green-100 text-green-700';
  if (cat === 'Secondary') return 'bg-blue-100 text-blue-700';
  if (cat === 'Tertiary') return 'bg-teal-100 text-teal-700';
  if (cat === 'Technical Colleges') return 'bg-blue-200 text-blue-800';
  return 'bg-gray-100 text-gray-700';
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
.table th, .table td { font-family: 'Poppins', sans-serif; }
</style>
