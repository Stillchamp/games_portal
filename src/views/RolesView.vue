<template>
  <div class="min-h-screen bg-[#e6f0fa] p-3 sm:p-4 md:p-6">
  <RolesTable 
    :roles="roles" 
    @add-role="openRoleCreationModal" 
    @edit-role="handleEditRole"
    @delete-role="handleDeleteRole"
  />
  <RoleCreationModal :show="showRoleCreationModal" @cancel="closeRoleCreationModal" @add-role="addRole" />
  <AddRoleModal :show="showAddRoleModal" @cancel="closeAddRoleModal" @confirm="closeAddRoleModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import RolesTable from '@/components/roles/RolesTable.vue'
import RoleCreationModal from '@/components/roles/RoleCreationModal.vue'
import AddRoleModal from '@/components/roles/AddRoleModal.vue'

const showRoleCreationModal = ref(false)
const showAddRoleModal = ref(false)
const roles = ref([
  { 
    name: 'Admin', 
    description: 'Has full access to all system features, manages users and settings.',
    permissions: ['create_users', 'edit_users', 'delete_users', 'view_reports', 'manage_scholarships', 'manage_system']
  },
  { 
    name: 'Board Member', 
    description: 'Oversees organizational activities and reviews reports.',
    permissions: ['view_reports', 'view_users', 'view_scholarships']
  }
])

function openRoleCreationModal() {
  showRoleCreationModal.value = true
}
function closeRoleCreationModal() {
  showRoleCreationModal.value = false
}
function addRole(role) {
  roles.value.push(role)
  closeRoleCreationModal()
  showAddRoleModal.value = true
}

function closeAddRoleModal() {
  showAddRoleModal.value = false
  toast.success('Role added successfully!')
}

function handleEditRole(updatedRole, originalRole) {
  const index = roles.value.findIndex(role => role.name === originalRole.name)
  if (index !== -1) {
    roles.value[index] = updatedRole
    toast.success('Role updated successfully!')
  }
}

function handleDeleteRole(roleToDelete) {
  roles.value = roles.value.filter(role => role.name !== roleToDelete.name)
  toast.success('Role deleted successfully!')
}
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
