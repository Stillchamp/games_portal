<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center  justify-center bg-black bg-opacity-50"
    
    @click="$emit('close')"
  >
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative" 
    
    @click.stop>
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {{ getInitials(formData.name) }}
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <p class="text-sm text-gray-500">Update beneficiary information</p>
            </div>
          </div>
          <button
            class="text-gray-400 hover:text-gray-600 transition-colors"
            @click="$emit('close')"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="handleSubmit" class="p-8 space-y-8">
        <!-- Personal Information -->
        <div class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Personal Information
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="formData.name"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter full name"
                required
              />
            </div>

            <!-- Gender -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                v-model="formData.gender"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <!-- Date of Birth -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                v-model="formData.dateOfBirth"
                type="date"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                v-model="formData.phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="08012345678"
              />
            </div>

            <!-- Email -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="example@email.com"
              />
            </div>

            <!-- Address -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                v-model="formData.address"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter full address"
              ></textarea>
            </div>

            <!-- LGA -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Local Government Area</label>
              <input
                v-model="formData.lga"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter LGA"
              />
            </div>

            <!-- State -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                v-model="formData.state"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter state"
              />
            </div>
          </div>
        </div>

        <!-- Academic Information -->
        <div class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Academic Information
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- School Name -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">School Name</label>
              <input
                v-model="formData.schoolName"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter school name"
              />
            </div>

            <!-- School Address -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">School Address</label>
              <input
                v-model="formData.schoolAddress"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter school address"
              />
            </div>

            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                v-model="formData.category"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select category</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Tertiary">Tertiary</option>
                <option value="Technical">Technical</option>
              </select>
            </div>

            <!-- Class/Level -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Class/Level</label>
              <input
                v-model="formData.classLevel"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., SS2, 200L"
              />
            </div>

            <!-- Award Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Award Type</label>
              <select
                v-model="formData.awardType"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select award type</option>
                <option value="Merit-Based">Merit-Based</option>
                <option value="Need-Based">Need-Based</option>
              </select>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="formData.status"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Graduated">Graduated</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Guardian Information -->
        <div class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Guardian Information
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Guardian Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Guardian Name</label>
              <input
                v-model="formData.guardianName"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter guardian name"
              />
            </div>

            <!-- Guardian Phone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Guardian Phone</label>
              <input
                v-model="formData.guardianPhone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="08012345678"
              />
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span v-if="isSubmitting">Saving...</span>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  beneficiary: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'save'])

const isSubmitting = ref(false)

// Form data with default values
const formData = ref({
  name: '',
  gender: '',
  dateOfBirth: '',
  phone: '',
  email: '',
  address: '',
  lga: '',
  state: '',
  schoolName: '',
  schoolAddress: '',
  category: '',
  classLevel: '',
  awardType: '',
  status: '',
  guardianName: '',
  guardianPhone: ''
})

// Helper function to get initials
const getInitials = (name) => {
  if (!name) return 'N/A'
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

// Watch for beneficiary changes and populate form
watch(() => props.beneficiary, (newBeneficiary) => {
  if (newBeneficiary && Object.keys(newBeneficiary).length > 0) {
    formData.value = {
      name: newBeneficiary.name || '',
      gender: newBeneficiary.gender || '',
      dateOfBirth: newBeneficiary.dateOfBirth || '2004-06-18',
      phone: newBeneficiary.phone || '',
      email: newBeneficiary.email || '',
      address: newBeneficiary.address || 'Ungwan Boro, Zaria',
      lga: newBeneficiary.lga || 'Zaria',
      state: newBeneficiary.state || 'Kaduna',
      schoolName: newBeneficiary.schoolName || 'Government College Zaria',
      schoolAddress: newBeneficiary.schoolAddress || 'Zaria Township',
      category: newBeneficiary.category || '',
      classLevel: newBeneficiary.classLevel || 'SS2',
      awardType: newBeneficiary.awardType || '',
      status: newBeneficiary.status || '',
      guardianName: newBeneficiary.guardianName || 'Alhaji Suleiman Ahmed',
      guardianPhone: newBeneficiary.guardianPhone || '08067890123'
    }
  }
}, { immediate: true })

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Emit the save event with form data
    emit('save', {
      id: props.beneficiary.id,
      ...formData.value
    })
    
    // Close modal after successful save
    emit('close')
  } catch (error) {
    console.error('Error saving beneficiary:', error)
    // Handle error (show toast, etc.)
  } finally {
    isSubmitting.value = false
  }
}

// Handle ESC key to close modal
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

// Add event listener when modal opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>