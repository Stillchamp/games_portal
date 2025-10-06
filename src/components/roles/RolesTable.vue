<template>
  <div class="min-h-screen bg-[#e6f0fa] p-3 sm:p-4 md:p-6">
    <div class="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-6 flex items-center">
      <svg width="20" height="20" class="sm:w-6 sm:h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#22C55E"/>
        <path d="M8 12l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="font-semibold text-gray-700 text-sm sm:text-base">Roles</span>
    </div>
    <div class="bg-white rounded-lg shadow p-3 sm:p-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
        <div class="flex items-center">
          <svg width="20" height="20" class="sm:w-6 sm:h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#22C55E"/>
            <path d="M8 12l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="font-semibold text-gray-700 text-sm sm:text-base">Role</span>
        </div>
        <button class="bg-[#22C55E] text-white px-3 py-2 sm:px-4 rounded flex items-center text-xs sm:text-sm font-medium hover:bg-green-700 transition w-full sm:w-auto justify-center" @click="$emit('add-role')">
          + Add New Role
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-xs sm:text-sm">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 text-xs sm:text-sm">#</th>
              <th class="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 text-xs sm:text-sm">Roles <span class="ml-1 hidden sm:inline">⇅</span></th>
              <th class="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 text-xs sm:text-sm hidden md:table-cell">Description <span class="ml-1">⇅</span></th>
              <th class="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 text-xs sm:text-sm hidden lg:table-cell">Permissions <span class="ml-1">⇅</span></th>
              <th class="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 text-xs sm:text-sm">Action <span class="ml-1 hidden sm:inline">⇅</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(role, i) in roles" :key="role.name" class="border-b hover:bg-gray-50">
              <td class="px-2 sm:px-4 py-2 text-xs sm:text-sm">{{ i + 1 }}</td>
              <td class="px-2 sm:px-4 py-2 font-bold text-xs sm:text-sm">
                <div class="flex flex-col">
                  <span>{{ role.name }}</span>
                  <span class="text-gray-600 font-normal text-xs sm:hidden">{{ role.description }}</span>
                </div>
              </td>
              <td class="px-2 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm hidden md:table-cell">{{ role.description }}</td>
              <td class="px-2 sm:px-4 py-2 text-xs sm:text-sm hidden lg:table-cell">
                <div class="flex flex-wrap gap-1">
                  <span v-for="permission in (role.permissions || []).slice(0, 3)" :key="permission" class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium text-xs">
                    {{ formatPermission(permission) }}
                  </span>
                  <span v-if="role.permissions && role.permissions.length > 3" class="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium text-xs">
                    +{{ role.permissions.length - 3 }} more
                  </span>
                  <span v-if="!role.permissions || role.permissions.length === 0" class="text-gray-400 text-xs">No permissions</span>
                </div>
              </td>
              <td class="px-2 sm:px-4 py-2">
                <div class="relative">
                  <button 
                    @click="toggleDropdown(i)" 
                    class="p-1 sm:p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <svg width="16" height="16" class="sm:w-5 sm:h-5" fill="none" viewBox="0 0 20 20">
                      <circle cx="10" cy="4" r="1.5" fill="#222"/>
                      <circle cx="10" cy="10" r="1.5" fill="#222"/>
                      <circle cx="10" cy="16" r="1.5" fill="#222"/>
                    </svg>
                  </button>
                  
                  <!-- Action Dropdown -->
                  <div 
                    v-if="actionIdx === i" 
                    class="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]"
                  >
                    <button 
                      @click="viewRole(role)" 
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg flex items-center gap-2"
                    >
                      <i class="fa fa-eye text-blue-500"></i> View
                    </button>
                    <button 
                      @click="editRole(role)" 
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <i class="fa fa-edit text-green-500"></i> Edit
                    </button>
                    <button 
                      @click="deleteRole(role)" 
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

    <!-- View Role Modal -->
    <div v-if="viewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <h2 class="font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Role Details</h2>
        <div class="mb-2 text-sm sm:text-base"><span class="font-semibold">Name:</span> {{ selectedRole.name }}</div>
        <div class="mb-2 text-sm sm:text-base"><span class="font-semibold">Description:</span> {{ selectedRole.description }}</div>
        <div class="mb-2 text-sm sm:text-base">
          <span class="font-semibold">Permissions:</span>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="permission in selectedRole.permissions" :key="permission" class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium text-xs">
              {{ formatPermission(permission) }}
            </span>
            <span v-if="!selectedRole.permissions || selectedRole.permissions.length === 0" class="text-gray-500 text-sm">No permissions assigned</span>
          </div>
        </div>
        <div class="flex justify-end mt-4 sm:mt-6">
          <button @click="viewModal = false" class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Close</button>
        </div>
      </div>
    </div>

    <!-- Edit Role Modal -->
    <div v-if="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <h2 class="font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Edit Role</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
          <input 
            v-model="selectedRole.name" 
            type="text" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            v-model="selectedRole.description" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 h-24 resize-none"
          ></textarea>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
          <div class="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
            <div v-for="permission in availablePermissions" :key="permission.key" class="flex items-center">
              <input 
                :id="`perm-${permission.key}`"
                v-model="selectedRole.permissions" 
                :value="permission.key"
                type="checkbox" 
                class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label :for="`perm-${permission.key}`" class="ml-2 text-sm text-gray-700">{{ permission.label }}</label>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4 sm:mt-6 gap-3">
          <button @click="editModal = false" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Cancel</button>
          <button @click="saveRole" class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Save</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md mx-auto">
        <h2 class="font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-red-600">Delete Role</h2>
        <p class="text-gray-700 mb-4">Are you sure you want to delete the role "{{ selectedRole.name }}"? This action cannot be undone.</p>
        <div class="flex justify-end mt-4 sm:mt-6 gap-3">
          <button @click="deleteModal = false" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Cancel</button>
          <button @click="confirmDelete" class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-2 sm:px-6 text-sm sm:text-base">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({ 
  roles: Array 
})
const emit = defineEmits(['add-role', 'edit-role', 'delete-role'])

const actionIdx = ref(null)
const viewModal = ref(false)
const editModal = ref(false)
const deleteModal = ref(false)
const selectedRole = ref({})
const originalRole = ref({})

const availablePermissions = ref([
  { key: 'create_users', label: 'Create Users' },
  { key: 'edit_users', label: 'Edit Users' },
  { key: 'delete_users', label: 'Delete Users' },
  { key: 'view_users', label: 'View Users' },
  { key: 'view_reports', label: 'View Reports' },
  { key: 'create_reports', label: 'Create Reports' },
  { key: 'manage_scholarships', label: 'Manage Scholarships' },
  { key: 'view_scholarships', label: 'View Scholarships' },
  { key: 'manage_system', label: 'Manage System Settings' },
  { key: 'manage_roles', label: 'Manage Roles' }
])

function toggleDropdown(idx) {
  actionIdx.value = actionIdx.value === idx ? null : idx
}

function viewRole(role) {
  selectedRole.value = { ...role }
  viewModal.value = true
  actionIdx.value = null
}

function editRole(role) {
  originalRole.value = role
  selectedRole.value = { 
    ...role, 
    permissions: role.permissions ? [...role.permissions] : [] 
  }
  editModal.value = true
  actionIdx.value = null
}

function deleteRole(role) {
  selectedRole.value = role
  deleteModal.value = true
  actionIdx.value = null
}

function saveRole() {
  emit('edit-role', selectedRole.value, originalRole.value)
  editModal.value = false
}

function confirmDelete() {
  emit('delete-role', selectedRole.value)
  deleteModal.value = false
  selectedRole.value = {}
}

function formatPermission(permission) {
  return permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function handleClickOutside(event) {
  if (!event.target.closest('.relative')) {
    actionIdx.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
