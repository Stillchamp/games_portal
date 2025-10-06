<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
  <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl max-h-[95vh] overflow-y-auto" style="min-width:300px;">
      <h2 class="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-800">Add New Role</h2>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
        <input 
          type="text" 
          v-model="roleName" 
          placeholder="Role Name" 
          class="flex-1 border border-[#B7C9D3] bg-[#E6F0FA] rounded px-3 py-2 sm:px-4 text-sm sm:text-base"
        />
        <input 
          type="text" 
          v-model="roleDesc" 
          placeholder="Description" 
          class="flex-1 border border-[#B7C9D3] bg-[#E6F0FA] rounded px-3 py-2 sm:px-4 text-sm sm:text-base" 
        />
      </div>
      <div class="mb-4">
        <div class="font-semibold mb-2 text-sm sm:text-base">Assign Permissions</div>
        <div class="border rounded-lg overflow-x-auto">
          <table class="min-w-full text-xs sm:text-sm">
            <thead>
              <tr class="bg-gray-50">
                <th class="py-2 px-2 sm:px-4 text-left font-semibold text-gray-600">Module</th>
                <th class="py-2 px-2 sm:px-4 text-left font-semibold text-gray-600">Permissions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(module, i) in modules" :key="module.name" class="border-t">
                <td class="py-2 px-2 sm:px-4 font-semibold text-xs sm:text-sm">{{ module.name }}</td>
                <td class="py-2 px-2 sm:px-4">
                  <div class="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
                    <label v-for="(permission, j) in module.permissions" :key="j" class="flex items-center">
                      <input 
                        type="checkbox" 
                        v-model="checked[module.name][j]" 
                        class="mr-2"
                      />
                      <span class="text-xs sm:text-sm">{{ permission }}</span>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-4 sm:mt-6">
     <button @click="$emit('cancel')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold text-sm sm:text-base order-2 sm:order-1">Cancel</button>
  <button @click="handleAddRole" class="bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm sm:text-base order-1 sm:order-2">Add Role</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['cancel', 'add-role'])
const roleName = ref('')
const roleDesc = ref('')

// Modules and permissions based on Figma design
const modules = [
  {
    name: 'Dashboard',
    permissions: ['View Dashboard']
  },
  {
    name: 'Beneficiaries',
    permissions: ['View Beneficiary', 'Edit Beneficiary Profile', 'Add Beneficiary']
  },
  {
    name: 'Set-Up',
    permissions: ['View Setup', 'Edit Setup', 'Create Setup/New']
  },
  {
    name: 'Administrative',
    permissions: ['View User', 'Edit User', 'Create User', 'View Roles & Permission', 'Edit Roles & Permission', 'Add/Create Role']
  },
  {
    name: 'User',
    permissions: ['View Profile', 'Edit Profile']
  },
  {
    name: 'Communications',
    permissions: ['View Communications', 'Send Message']
  }
]

const checked = ref({
  'Dashboard': [false],
  'Beneficiaries': [false, false, false],
  'Set-Up': [false, false, false],
  'Administrative': [false, false, false, false, false, false],
  'User': [false, false],
  'Communications': [false, false]
})

function handleAddRole() {
  if (!roleName.value || !roleDesc.value) {
    toast.error('Please enter role name and description.')
    return
  }
  
  const permissionsSelected = Object.entries(checked.value).reduce((acc, [moduleName, arr]) => {
    const module = modules.find(m => m.name === moduleName)
    acc[moduleName] = arr.map((v, i) => v ? module.permissions[i] : null).filter(Boolean)
    return acc
  }, {})
  
  emit('add-role', {
    name: roleName.value,
    description: roleDesc.value,
    permissions: permissionsSelected
  })
  
  // Reset form
  roleName.value = ''
  roleDesc.value = ''
  checked.value = {
    'Dashboard': [false],
    'Beneficiaries': [false, false, false],
    'Set-Up': [false, false, false],
    'Administrative': [false, false, false, false, false, false],
    'User': [false, false],
    'Communications': [false, false]
  }
}
</script>

<style scoped>
</style>
