<template>
  <div class="space-y-6">
    <header class="rounded-3xl bg-white px-6 py-4 shadow-card">
      <h1 class="text-xl font-semibold text-slate-800">Add User</h1>
    </header>

    <section class="rounded-3xl bg-white p-8 shadow-card">
      <form class="space-y-8" @submit.prevent="handleSubmit">
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-2">
            <label for="firstName" class="text-sm font-medium text-slate-600">First name</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="First name"
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div class="space-y-2">
            <label for="lastName" class="text-sm font-medium text-slate-600">Last name</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Last name"
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div class="space-y-2">
            <label for="email" class="text-sm font-medium text-slate-600">Email address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Email address"
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div class="space-y-2">
            <label for="role" class="text-sm font-medium text-slate-600">Users Role</label>
            <div class="relative">
              <select
                id="role"
                v-model="form.role"
                class="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              >
                <option disabled value="">Select role</option>
                <option v-for="roleOption in roleOptions" :key="roleOption" :value="roleOption">
                  {{ roleOption }}
                </option>
              </select>
              <svg
                class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          <div class="space-y-2 md:col-span-2 md:max-w-sm">
            <label for="status" class="text-sm font-medium text-slate-600">Status</label>
            <div class="relative">
              <select
                id="status"
                v-model="form.status"
                class="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              >
                <option disabled value="">Select status</option>
                <option
                  v-for="statusOption in statusOptions"
                  :key="statusOption"
                  :value="statusOption"
                >
                  {{ statusOption }}
                </option>
              </select>
              <svg
                class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="rounded-xl px-5 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-800"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  status: '',
})

const roleOptions = ['Program Team', 'Stakeholder', 'Administrator']
const statusOptions = ['Active', 'Inactive', 'Suspended']
const TOAST_DURATION_MS = 1000

async function handleSubmit() {
  const hasEmptyField = Object.values(form).some((value) => !value?.trim?.() && !value)

  if (hasEmptyField) {
    window.alert('Please fill in all fields before adding a user.')
    return
  }

  userStore.addUser({ ...form })
  toast.success('User added successfully', { autoClose: TOAST_DURATION_MS, hideProgressBar: false })

  Object.assign(form, {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: '',
  })

  await new Promise((resolve) => setTimeout(resolve, TOAST_DURATION_MS + 200))
  router.push({ name: 'admin-user' })
}

function handleCancel() {
  router.push({ name: 'admin-user' })
}
</script>
