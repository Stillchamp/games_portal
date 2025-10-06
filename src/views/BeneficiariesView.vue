<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import StatsCard from '@/components/beneficiaries/StatsCard.vue'
import FilterBar from '@/components/beneficiaries/FilterBar.vue'
import BeneficiaryTable from '@/components/beneficiaries/BeneficiaryTable.vue'
import BulkUploadModal from '@/components/beneficiaries/BulkUploadModal.vue'
import SingleBeneficiaryModal from '@/components/beneficiaries/SingleBeneficiaryModal.vue'
import BeneficiaryProfileModal from '@/components/beneficiaries/BeneficiaryProfileModal.vue'
import EditProfileModal from '@/components/beneficiaries/EditProfileModal.vue'

const TOAST_DURATION_MS = 1000
const summaryMetrics = [
  {
    title: 'Beneficiary',
    icon: 'users',
    entries: [{ label: 'Total Beneficiaries', value: 1045 }],
  },
  {
    title: 'Status',
    icon: 'status',
    entries: [
      { label: 'Active', value: 803 },
      { label: 'Graduated', value: 243 },
    ],
  },
  {
    title: 'Gender',
    icon: 'gender',
    entries: [
      { label: 'Male', value: 325 },
      { label: 'Female', value: 463 },
    ],
  },
  {
    title: 'Award Type',
    icon: 'award',
    entries: [
      { label: 'Merit-Based', value: 803 },
      { label: 'Need-Based', value: 243 },
    ],
  },
]

const beneficiaries = ref([
  {
    id: 1,
    name: 'Alayantu Thomas Iyanu',
    gender: 'Male',
    category: 'Secondary',
    awardType: 'Merit-Based',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Aladejobi Suliat Bisole',
    gender: 'Female',
    category: 'Tertiary',
    awardType: 'Merit-Based',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Badeyori Ajoke Esther',
    gender: 'Female',
    category: 'Tertiary',
    awardType: 'Need-Based',
    status: 'Graduated',
  },
  {
    id: 4,
    name: 'Bayewu Tunmise Jokade',
    gender: 'Male',
    category: 'Technical',
    awardType: 'Merit-Based',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Orenaya Olayinka Peter',
    gender: 'Male',
    category: 'Primary',
    awardType: 'Merit-Based',
    status: 'Graduated',
  },
  {
    id: 6,
    name: 'Aladejobi Suliat Bisole',
    gender: 'Female',
    category: 'Tertiary',
    awardType: 'Merit-Based',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Badeyori Ajoke Esther',
    gender: 'Female',
    category: 'Tertiary',
    awardType: 'Need-Based',
    status: 'Graduated',
  },
  {
    id: 8,
    name: 'Adewale Kayode',
    gender: 'Male',
    category: 'Secondary',
    awardType: 'Merit-Based',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Fiyinfoluwa Damilola',
    gender: 'Female',
    category: 'Secondary',
    awardType: 'Need-Based',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Samuel Tobi',
    gender: 'Male',
    category: 'Technical',
    awardType: 'Merit-Based',
    status: 'Graduated',
  },
  {
    id: 11,
    name: 'Beatrice Okafor',
    gender: 'Female',
    category: 'Primary',
    awardType: 'Need-Based',
    status: 'Active',
  },
  {
    id: 12,
    name: 'Ibrahim Musa',
    gender: 'Male',
    category: 'Tertiary',
    awardType: 'Merit-Based',
    status: 'Active',
  },
  {
    id: 13,
    name: 'Chiamaka Nkem',
    gender: 'Female',
    category: 'Secondary',
    awardType: 'Need-Based',
    status: 'Graduated',
  },
  {
    id: 14,
    name: 'Oluwaseun Apata',
    gender: 'Male',
    category: 'Technical',
    awardType: 'Merit-Based',
    status: 'Active',
  },
  {
    id: 15,
    name: 'Zara Mohammed',
    gender: 'Female',
    category: 'Primary',
    awardType: 'Need-Based',
    status: 'Active',
  },
])

const filters = reactive({
  category: '',
  awardType: '',
  status: '',
  gender: '',
  search: '',
})

const page = ref(1)
const pageSize = 10

const showBulkModal = ref(false)
const showSingleModal = ref(false)
const showProfileModal = ref(false)
const showEditModal = ref(false)

const selectedBeneficiary = ref(null)

const profileData = ref({})

const categories = computed(() => {
  const set = new Set(beneficiaries.value.map((beneficiary) => beneficiary.category))
  return [...set]
})

const awardTypes = computed(() => {
  const set = new Set(beneficiaries.value.map((beneficiary) => beneficiary.awardType))
  return [...set]
})

const genders = computed(() => {
  const set = new Set(beneficiaries.value.map((beneficiary) => beneficiary.gender).filter(Boolean))
  return [...set]
})

const filteredBeneficiaries = computed(() => {
  return beneficiaries.value.filter((beneficiary) => {
    const matchesCategory = filters.category ? beneficiary.category === filters.category : true
    const matchesAwardType = filters.awardType ? beneficiary.awardType === filters.awardType : true
    const matchesStatus = filters.status ? beneficiary.status === filters.status : true
    const matchesGender = filters.gender ? beneficiary.gender === filters.gender : true
    const matchesSearch = filters.search
      ? beneficiary.name.toLowerCase().includes(filters.search.toLowerCase())
      : true

    return matchesCategory && matchesAwardType && matchesStatus && matchesGender && matchesSearch
  })
})

const emptyState = computed(() => filteredBeneficiaries.value.length === 0)

watch(
  filters,
  () => {
    page.value = 1
  },
  { deep: true },
)

watch(filteredBeneficiaries, (value) => {
  const maxPage = Math.max(1, Math.ceil(value.length / pageSize))
  if (page.value > maxPage) {
    page.value = maxPage
  }
})

const openAddSingle = () => {
  showSingleModal.value = true
}

const handleChangePage = (value) => {
  page.value = value
}

const handleSubmitSingle = (payload) => {
  const newBeneficiary = {
    id: Date.now(),
    name: payload.fullName,
    gender: payload.gender ?? 'Not specified',
    category: payload.category,
    awardType: payload.awardType,
    status: 'Active',
    email: payload.email,
    notes: payload.notes,
  }

  beneficiaries.value = [newBeneficiary, ...beneficiaries.value]
  page.value = 1
  showSingleModal.value = false

  // TODO: Replace with API call or store mutation
  console.info('Added new beneficiary', newBeneficiary)
  toast.success('Beneficiary added successfully', {
    autoClose: TOAST_DURATION_MS,
    hideProgressBar: false,
  })

  return new Promise((resolve) => setTimeout(resolve, TOAST_DURATION_MS + 200))
}

const handleDownloadTemplate = () => {
  // TODO: Replace with real download logic
  console.info('Download bulk template requested')
}

const handleUploadBulk = (file) => {
  // TODO: Replace with the upload logic (API call, validation, etc.)
  console.info('Uploading bulk file', file)
  showBulkModal.value = false
}

const handleViewProfile = (beneficiary) => {
  console.log('row-view-profile event fired', beneficiary)
  selectedBeneficiary.value = beneficiary
  profileData.value = {
    yearsInProgram: '2 years',
    totalReceived: '₦0K',
    averagePerformance: '0%',
    quickInformation: [
      { label: 'School', value: 'Government College Zaria' },
      { label: 'Location', value: 'Zaria, Kaduna' },
      { label: 'Application Year', value: '2023' },
      { label: 'Guardian', value: 'Alhaji Suleiman Ahmed' },
      { label: 'Class/Level', value: 'S.S.2' },
      { label: 'Guardian Contact', value: '08012384010' },
    ],
  }
  showProfileModal.value = true
  console.log('showProfileModal', showProfileModal.value)
  console.log('selectedBeneficiary', selectedBeneficiary.value)
}

const handleCloseProfile = () => {
  showProfileModal.value = false
  selectedBeneficiary.value = null
  profileData.value = {}
}

const handleEditProfile = (beneficiary) => {
  console.log('Edit profile requested for:', beneficiary)
  selectedBeneficiary.value = beneficiary
  showEditModal.value = true
}

const handleSaveProfile = (updatedData) => {
  console.log('Saving profile data:', updatedData)

  // Find and update the beneficiary in the array
  const index = beneficiaries.value.findIndex((b) => b.id === updatedData.id)
  if (index !== -1) {
    beneficiaries.value[index] = { ...beneficiaries.value[index], ...updatedData }
  }

  // Close the modal
  showEditModal.value = false
  selectedBeneficiary.value = null

  // TODO: Replace with actual API call
  console.log('Profile updated successfully')
}

const handleCloseEdit = () => {
  showEditModal.value = false
  selectedBeneficiary.value = null
}

const handleEditFromProfile = (beneficiary) => {
  console.log('Edit from profile modal:', beneficiary)
  // Close profile modal and open edit modal
  showProfileModal.value = false
  selectedBeneficiary.value = beneficiary
  showEditModal.value = true
}
</script>

<template>
  <div class="space-y-10">
    <section
      class="rounded-[32px] bg-gradient-to-r from-primary-50 via-white to-primary-100 p-8 shadow-card"
    >
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          v-for="metric in summaryMetrics"
          :key="metric.title"
          :title="metric.title"
          :entries="metric.entries"
          :icon="metric.icon"
        />
      </div>
    </section>

    <section>
      <FilterBar
        :filters="filters"
        :categories="categories"
        :award-types="awardTypes"
        :genders="genders"
        @update:filters="Object.assign(filters, $event)"
        @add-bulk="showBulkModal = true"
        @add-single="openAddSingle"
      >
        <template #leading>
          <h2 class="text-xl font-semibold text-slate-800">Beneficiary Overview</h2>
        </template>
      </FilterBar>
    </section>

    <section class="space-y-4">
      <template v-if="!emptyState">
        <BeneficiaryTable
          :beneficiaries="filteredBeneficiaries"
          :page-size="pageSize"
          :current-page="page"
          @update:page="handleChangePage"
          @row-view-profile="handleViewProfile"
          @row-edit-profile="handleEditProfile"
        />
      </template>
      <div
        v-else
        class="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-12 text-center shadow-card"
      >
        <h3 class="text-lg font-semibold text-slate-700">No beneficiaries found</h3>
        <p class="mt-2 text-sm text-slate-500">
          Try adjusting your filters or search to find beneficiaries.
        </p>
      </div>
    </section>

    <BulkUploadModal
      :open="showBulkModal"
      @close="showBulkModal = false"
      @download-template="handleDownloadTemplate"
      @upload="handleUploadBulk"
    />

    <SingleBeneficiaryModal
      :open="showSingleModal"
      :categories="categories"
      :award-types="awardTypes"
      @close="showSingleModal = false"
      @submit="handleSubmitSingle"
    />

    <BeneficiaryProfileModal
      v-if="showProfileModal && selectedBeneficiary"
      :open="showProfileModal"
      :beneficiary="selectedBeneficiary"
      :profile-data="profileData"
      @close="handleCloseProfile"
      @edit-profile="handleEditFromProfile"
    />

    <EditProfileModal
      v-if="showEditModal && selectedBeneficiary"
      :open="showEditModal"
      :beneficiary="selectedBeneficiary"
      @close="handleCloseEdit"
      @save="handleSaveProfile"
    />
  </div>
</template>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family:'Poppins', sans-serif ;
}