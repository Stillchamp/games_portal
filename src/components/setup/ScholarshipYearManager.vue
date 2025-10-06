<template>
  <div class="w-full max-w-full overflow-hidden">
    <ManageScholarshipYear :years="years" @create-year="showCreateModal = true" />
    <CreateScholarshipYearModal
      v-if="showCreateModal"
      :categories="categories"
      @close="showCreateModal = false"
      @add-category="addCategory"
      @edit-category="editCategory"
      @update-year="updateYear"
    />
    <CategoryModal
      v-if="showCategoryModal"
      :edit-data="editCategoryData"
      @close="closeCategoryModal"
      @add-category="saveCategory"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ManageScholarshipYear from './ManageScholarshipYear.vue'
import CreateScholarshipYearModal from './CreateScholarshipYearModal.vue'
import CategoryModal from './CategoryModal.vue'

const years = ref([
  {
    year: '2023/2024',
    categories: ['Primary', 'Secondary', 'Tertiary'],
    status: 'Active',
    id: 1,
  },
  {
    year: '2024/2025',
    categories: ['Primary', 'Secondary', 'Tertiary'],
    status: 'Active',
    id: 2,
  },
  {
    year: '2025/2026',
    categories: ['Primary', 'Secondary', 'Tertiary', 'Technical Colleges'],
    status: 'Active',
    id: 3,
  },
])

const categories = ref([])
const showCreateModal = ref(false)
const showCategoryModal = ref(false)
const editCategoryData = ref(null)

function addCategory(data) {
  categories.value.push(data)
}
function editCategory(idx) {
  editCategoryData.value = categories.value[idx]
  showCategoryModal.value = true
}
function saveCategory(data) {
  if (editCategoryData.value) {
    const idx = categories.value.findIndex(cat => cat === editCategoryData.value)
    if (idx !== -1) categories.value[idx] = data
  } else {
    categories.value.push(data)
  }
  closeCategoryModal()
}
function closeCategoryModal() {
  showCategoryModal.value = false
  editCategoryData.value = null
}
function updateYear(newYear) {
  years.value.push({ ...newYear, id: years.value.length + 1 })
  showCreateModal.value = false
}
</script>

<style scoped>
/* Responsive modal and overflow styles */
:deep(.fixed) {
  overflow-y: auto;
  align-items: flex-start !important;
}
@media (max-width: 768px) {
  :deep(.fixed .bg-white) {
    max-width: 98vw !important;
    padding: 1rem !important;
  }
}
</style>
