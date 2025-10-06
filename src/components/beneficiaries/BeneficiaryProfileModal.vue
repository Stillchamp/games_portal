<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    @click="$emit('close')"
  >
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative" @click.stop>
      <!-- Close Button -->
      <button
        class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10"
        @click="$emit('close')"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <div v-if="beneficiary" class="p-8">
        <!-- Header Section -->
        <div class="flex items-start space-x-6 mb-8">
          <!-- Profile Avatar -->
          <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {{ getInitials(beneficiary.name) }}
          </div>
          
          <!-- Profile Info -->
          <div class="flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900 mb-3">{{ beneficiary.name }}</h1>
                <div class="flex space-x-3">
                  <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {{ beneficiary.status || 'Active' }}
                  </span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {{ beneficiary.category || 'Secondary' }}
                  </span>
                  <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                    {{ beneficiary.awardType || 'Merit-Based' }}
                  </span>
                </div>
              </div>
              <button
                @click="$emit('edit-profile', beneficiary)"
                class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'">
            <!-- Statistics Cards -->
            <div class="grid grid-cols-3 gap-6 mb-8">
              <!-- Years in Program -->
              <div class="text-center p-6 bg-gray-50 rounded-lg">
                <div class="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="text-2xl font-bold text-gray-900 mb-1">{{ getYearsInProgram() }}</div>
                <div class="text-sm text-gray-600">Years in Program</div>
              </div>

              <!-- Amount Received -->
              <div class="text-center p-6 bg-gray-50 rounded-lg">
                <div class="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <div class="text-2xl font-bold text-gray-900 mb-1">₦{{ formatAmount(getTotalReceived()) }}</div>
                <div class="text-sm text-gray-600">Total Received</div>
              </div>

              <!-- Performance -->
              <div class="text-center p-6 bg-gray-50 rounded-lg">
                <div class="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div class="text-2xl font-bold text-gray-900 mb-1">{{ getPerformance() }}%</div>
                <div class="text-sm text-gray-600">Avg Performance</div>
              </div>
            </div>

            <!-- Quick Information -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <div>
                      <div class="text-sm text-gray-600">School:</div>
                      <div class="font-medium">{{ beneficiary.school || 'Government College Zaria' }}</div>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 13a2 2 0 002 2h6a2 2 0 002-2L16 7m-6 0V5a2 2 0 012-2h2a2 2 0 012 2v2"></path>
                    </svg>
                    <div>
                      <div class="text-sm text-gray-600">Application Year:</div>
                      <div class="font-medium">{{ beneficiary.applicationYear || '2023' }}</div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <div>
                      <div class="text-sm text-gray-600">Class/Level:</div>
                      <div class="font-medium">{{ beneficiary.classLevel || 'S.S 2' }}</div>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <div class="text-sm text-gray-600">Location:</div>
                      <div class="font-medium">{{ beneficiary.location || 'Zaria, Kaduna' }}</div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <div>
                      <div class="text-sm text-gray-600">Guardian:</div>
                      <div class="font-medium">{{ beneficiary.guardian || 'Alhaji Suleiman Ahmed' }}</div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <div class="text-sm text-gray-600">Guardian Contact:</div>
                      <div class="font-medium">{{ beneficiary.guardianContact || '08012344010' }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Personal Details Tab -->
          <div v-if="activeTab === 'personal'">
            <div class="grid grid-cols-2 gap-8">
              <!-- Left Column -->
              <div class="space-y-8">
                <!-- Personal Information Section -->
                <div class="bg-white rounded-lg border border-gray-200 p-6">
                  <div class="flex items-center mb-6">
                    <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900">Personal Information</h3>
                  </div>
                  <div class="space-y-3">
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Full Name:</span> {{ beneficiary.name || 'Olaiya Mosuru Mope' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Age:</span> {{ calculateAge(beneficiary.dateOfBirth) || '20' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Gender:</span> {{ beneficiary.gender || 'Male' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Address:</span> {{ beneficiary.address || 'Ungwan Boro, Zaria' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">LGA:</span> {{ beneficiary.lga || 'Zaria' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">State:</span> {{ beneficiary.state || 'Kaduna' }}
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <div class="text-gray-900">{{ beneficiary.phoneNumber || '08045678901' }}</div>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <div class="text-gray-900">{{ beneficiary.email || 'ahmed.suleiman@email.com' }}</div>
                    </div>
                  </div>
                </div>

                <!-- Guardian Information Section -->
                <div class="bg-white rounded-lg border border-gray-200 p-6">
                  <div class="flex items-center mb-6">
                    <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900">Guardian Information</h3>
                  </div>
                  <div class="space-y-3">
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Name:</span> {{ beneficiary.guardian || 'Alhaji Suleiman Ahmed' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Phone:</span> {{ beneficiary.guardianContact || '08067890123' }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div>
                <!-- Academic Information Section -->
                <div class="bg-white rounded-lg border border-gray-200 p-6">
                  <div class="flex items-center mb-6">
                    <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900">Academic Information</h3>
                  </div>
                  <div class="space-y-3">
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">School:</span> {{ beneficiary.school || 'Government College Zaria' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">School Address:</span> {{ beneficiary.schoolAddress || 'Zaria Township' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Class/Level:</span> {{ beneficiary.classLevel || 'SS2' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Scholarship Category:</span> {{ beneficiary.category || 'Secondary' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Scholarship Type:</span> {{ beneficiary.awardType || 'Merit-based' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Scholarship Amount:</span> {{ beneficiary.scholarshipAmount || '₦100,000' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Application Year:</span> {{ beneficiary.applicationYear || '2023' }}
                    </div>
                    <div class="text-gray-900">
                      <span class="text-sm font-medium text-gray-600">Status:</span> 
                      <span class="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full ml-1">
                        {{ beneficiary.status || 'Active' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Disbursement History Tab -->
          <div v-if="activeTab === 'disbursement'">
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Disbursement History</h3>
              <div class="space-y-4">
                <div class="bg-white rounded-lg p-4 border">
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">School Fees - 2023/2024 Session</div>
                      <div class="text-sm text-gray-600">Disbursed on March 15, 2024</div>
                    </div>
                    <div class="text-green-600 font-semibold">₦50,000</div>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-4 border">
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">Books & Materials Allowance</div>
                      <div class="text-sm text-gray-600">Disbursed on January 10, 2024</div>
                    </div>
                    <div class="text-green-600 font-semibold">₦15,000</div>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-4 border">
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">Uniform & Equipment</div>
                      <div class="text-sm text-gray-600">Disbursed on September 5, 2023</div>
                    </div>
                    <div class="text-green-600 font-semibold">₦25,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Academic Performance Tab -->
          <div v-if="activeTab === 'academic'">
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Academic Performance</h3>
              <div class="space-y-6">
                <div class="bg-white rounded-lg p-4 border">
                  <div class="flex justify-between items-center mb-3">
                    <h4 class="font-medium">2023/2024 Academic Session</h4>
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Excellent</span>
                  </div>
                  <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div class="text-gray-600">First Term</div>
                      <div class="font-semibold">85%</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Second Term</div>
                      <div class="font-semibold">88%</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Third Term</div>
                      <div class="font-semibold">90%</div>
                    </div>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-4 border">
                  <div class="flex justify-between items-center mb-3">
                    <h4 class="font-medium">2022/2023 Academic Session</h4>
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">Good</span>
                  </div>
                  <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div class="text-gray-600">First Term</div>
                      <div class="font-semibold">78%</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Second Term</div>
                      <div class="font-semibold">82%</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Third Term</div>
                      <div class="font-semibold">85%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="p-8 text-center">
        <p class="text-gray-500">No beneficiary selected.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  open: Boolean,
  beneficiary: Object,
  profileData: Object,
})

const emit = defineEmits(['close', 'edit-profile'])

// Active tab state
const activeTab = ref('overview')

// Tab configuration
const tabs = ref([
  { id: 'overview', name: 'Overview' },
  { id: 'personal', name: 'Personal Details' },
  { id: 'disbursement', name: 'Disbursement History' },
  { id: 'academic', name: 'Academic Performance' }
])

// Helper functions
const getInitials = (name) => {
  if (!name) return 'N/A'
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

const getYearsInProgram = () => {
  // Calculate years based on application year or default to 2
  const applicationYear = props.beneficiary?.applicationYear || '2023'
  const currentYear = new Date().getFullYear()
  const years = currentYear - parseInt(applicationYear)
  return Math.max(1, years) // At least 1 year
}

const getTotalReceived = () => {
  // Mock data - in real app, this would come from disbursement records
  return 90000 // ₦90,000 total
}

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-NG').format(amount)
}

const getPerformance = () => {
  // Mock performance calculation - in real app, this would be calculated from academic records
  return 87 // 87% average performance
}

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && props.open) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
/* Basic modal styles */
</style>
