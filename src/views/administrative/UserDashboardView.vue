<template>
  <div class="space-y-8">
    <section class="rounded-3xl bg-slate-50 p-6 shadow-card">
      <header class="mb-6">
        <h2 class="text-xl font-semibold text-slate-800">User Overview</h2>
      </header>

      <div class="grid gap-4 md:grid-cols-3">
        <UserStatCard
          v-for="card in overviewCards"
          :key="card.label"
          :icon="card.icon"
          :total="card.total"
          :label="card.label"
          :accent="card.accent"
        />
      </div>
    </section>

    <ManageUsersTable :users="users" @add="handleAddUser" @action="handleRowAction" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import ManageUsersTable from '@/components/administrative/ManageUsersTable.vue'
import UserStatCard from '@/components/administrative/UserStatCard.vue'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const { users, totalUsers, activeUsers, inactiveUsers } = storeToRefs(userStore)

const overviewCards = computed(() => [
  {
    icon: 'total',
    total: totalUsers.value,
    label: 'Total Users',
  },
  {
    icon: 'active',
    total: activeUsers.value,
    label: 'Active',
  },
  {
    icon: 'inactive',
    total: inactiveUsers.value,
    label: 'Inactive',
    accent: 'bg-emerald-100 text-emerald-600',
  },
])

function handleAddUser() {
  router.push({ name: 'admin-user-add' })
}

function handleRowAction(user) {
  // Placeholder for contextual action menu logic
  console.info('Action clicked for', user)
}
</script>
