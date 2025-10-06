<template>
  <section class="rounded-3xl bg-white p-6 shadow-card">
    <header class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 class="text-xl font-semibold text-slate-800">Manage Users</h2>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1"
        @click="emit('add')"
      >
        <span class="text-lg leading-none">+</span>
        Add User
      </button>
    </header>

    <div class="overflow-hidden rounded-2xl border border-slate-100">
      <table class="min-w-full divide-y divide-slate-100 text-left">
        <thead class="bg-primary-600 text-xs font-semibold uppercase tracking-wide text-white">
          <tr>
            <th v-for="column in columns" :key="column.key" class="px-6 py-4">
              {{ column.label }}
            </th>
            <th class="px-6 py-4 text-right text-xs font-semibold uppercase"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white text-sm">
          <tr v-for="user in users" :key="user.email" class="transition hover:bg-slate-50">
            <td class="px-6 py-4 font-medium text-slate-700">{{ user.name }}</td>
            <td class="px-6 py-4 text-slate-500">{{ user.email }}</td>
            <td class="px-6 py-4 text-slate-500">{{ user.type }}</td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                :class="statusWrapper(user.status)"
              >
                <span class="h-2.5 w-2.5 rounded-full" :class="statusDot(user.status)"></span>
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button
                type="button"
                class="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 transition hover:text-rose-600"
                @click="emit('action', user)"
              >
                Action
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="!users.length">
            <td colspan="5" class="px-6 py-10 text-center text-sm text-slate-400">
              No users available yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  users: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['add', 'action'])

const columns = [
  { key: 'name', label: 'User Name' },
  { key: 'email', label: 'Email' },
  { key: 'type', label: 'User Type' },
  { key: 'status', label: 'Status' },
]

const statusConfig = {
  Active: {
    wrapper: 'bg-emerald-50 text-emerald-600',
    dot: 'bg-emerald-500',
  },
  Inactive: {
    wrapper: 'bg-amber-50 text-amber-600',
    dot: 'bg-amber-500',
  },
  Suspended: {
    wrapper: 'bg-rose-50 text-rose-500',
    dot: 'bg-rose-500',
  },
}

const statusWrapper = (status) => statusConfig[status]?.wrapper ?? 'bg-slate-100 text-slate-500'
const statusDot = (status) => statusConfig[status]?.dot ?? 'bg-slate-400'
</script>
